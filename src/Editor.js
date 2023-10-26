import { addStorage, getStorage } from './storage.js';

export default function Editor({ $target, initialState, onEditing }) {
  // contenteditable 에디터
  const $editContainer = document.createElement('div');
  $editContainer.className = 'edit-container';

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    // 선택한 문서 content 값 표시
    // state 유효성 검사

    const { selectedDoc, currentFocus } = this.state;
    const { pathname } = location;

    if (pathname === '/') {
      $editContainer.remove();
    } else {
      $target.appendChild($editContainer);

      $editContainer.innerHTML = '';

      if (selectedDoc.content !== '') {
        const textList = JSON.parse(selectedDoc.content);

        textList.forEach((line) => {
          const { type, text } = line;
          const $newLine = document.createElement('div');
          $newLine.setAttribute('contenteditable', 'true');
          $newLine.innerText = text;
          $newLine.className = 'edit-line';

          if (type === 'h1-title') {
            $newLine.className = 'edit-line h1-title';
          } else if (type === 'h2-title') {
            $newLine.className = 'edit-line h2-title';
          } else if (type === 'h3-title') {
            $newLine.className = 'edit-line h3-title';
          }

          $editContainer.appendChild($newLine);
        });

        // 포커스 위치 설정
        if (currentFocus.element === 'content') {
          const selection = window.getSelection();

          const range = document.createRange();

          range.selectNodeContents($editContainer.lastChild);
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      } else {
        const $firstLine = document.createElement('div');
        $firstLine.setAttribute('contenteditable', 'true');
        $firstLine.className = 'edit-line';
        $editContainer.appendChild($firstLine);
        if (currentFocus.element === 'content') {
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents($editContainer.lastChild);
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    }
  };

  let timer = null;
  // 입력 이벤트
  $editContainer.addEventListener('focusin', (e) => {
    const target = e.target;
    target.setAttribute('placeholder', '내용을 입력하세요');
  });

  $editContainer.addEventListener('focusout', (e) => {
    const target = e.target;
    target.setAttribute('placeholder', '');
  });

  $editContainer.addEventListener('input', (e) => {
    const target = e.target;
    const text = e.target.innerText;

    const selection = window.getSelection();

    const { anchorNode, anchorOffset, focusNode, focusOffset } = selection;

    const currentSelection = anchorNode.parentElement;

    if (text === '# ') {
      target.innerText = '';

      target.classList.add('h1-title');
    }

    if (text === '## ') {
      target.innerText = '';

      target.classList.add('h2-title');
    }

    if (text === '### ') {
      target.innerText = '';

      target.classList.add('h3-title');
    }

    const docsTextList = document.querySelectorAll('.edit-line');
    let docsText = [];
    docsTextList.forEach((node) => {
      const nodeClass = [...node.classList];
      const isH1 = nodeClass.find((c) => c === 'h1-title');
      const isH2 = nodeClass.find((c) => c === 'h2-title');
      const isH3 = nodeClass.find((c) => c === 'h3-title');

      let textLine = {};
      if (isH1) {
        textLine = {
          type: isH1,
        };
      } else if (isH2) {
        textLine = {
          type: isH2,
        };
      } else if (isH3) {
        textLine = {
          type: isH3,
        };
      } else {
        textLine = {
          type: 'content',
        };
      }

      const text = node.innerHTML;

      textLine = { ...textLine, text: text };

      docsText.push(textLine);
    });

    if (timer !== null) clearTimeout(timer);

    const newContent = JSON.stringify(docsText);

    timer = setTimeout(() => {
      const { selectedDoc } = this.state;
      const editDoc = getStorage('selectedDoc', {
        title: selectedDoc.title,
        content: selectedDoc.content,
      });

      const newDoc = { ...editDoc, content: newContent };

      addStorage('selectedDoc', newDoc);

      onEditing(newDoc);

      currentSelection.focus();
    }, 2000);
  });

  $editContainer.addEventListener('keydown', (e) => {
    const target = e.target;
    const selection = window.getSelection();

    const { anchorNode, anchorOffset, focusNode, focusOffset } = selection;

    const { keyCode } = e;
    // 엔터키
    if (keyCode === 13) {
      e.preventDefault();
      const $newLine = document.createElement('div');
      $newLine.setAttribute('contenteditable', 'true');
      $newLine.className = 'edit-line';
      target.after($newLine);
      $newLine.focus();
    }
    // backspace
    if (keyCode === 8 && anchorOffset === 0) {
      e.preventDefault();
      const $preLine = target.previousElementSibling;

      if ($preLine) {
        const currentLineText = target.innerText;

        const range = document.createRange();

        target.remove();

        $preLine.innerText += currentLineText;

        range.selectNodeContents($preLine);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        const $newLine = document.createElement('div');
        $newLine.setAttribute('contenteditable', 'true');
        target.after($newLine);
        $newLine.className = 'edit-line';
        target.remove();
        $newLine.focus();
      }
    }

    // 화살표 위
    if (keyCode === 38) {
      e.preventDefault();
      const $preLine = target.previousElementSibling;

      if ($preLine) {
        // $preLine.focus();

        const range = document.createRange();

        range.selectNodeContents($preLine);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
    // 화살표 아래
    if (keyCode === 40) {
      e.preventDefault();

      const $nextLine = target.nextElementSibling;
      if ($nextLine) {
        // $nextLine.focus();

        const range = document.createRange();

        range.selectNodeContents($nextLine);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  });
}
