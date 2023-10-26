import { addStorage, getStorage } from './storage.js';

export default function EditHeader({ $target, initialState, onEditing }) {
  const $editHeader = document.createElement('header');
  $editHeader.className = 'edit-header';
  $target.appendChild($editHeader);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    const { selectedDoc, currentFocus } = this.state;
    const title = selectedDoc.title;
    const { pathname } = location;

    if (pathname === '/') {
      $editHeader.remove();
    } else {
      $target.appendChild($editHeader);

      $editHeader.innerHTML =
        title !== undefined
          ? `
      <input type="text" id="title" name="title" placeholder="제목 없음" />
     `
          : '';

      const $editHeaderInput = document.querySelector('input#title');

      if ($editHeaderInput) {
        if (currentFocus.element === 'title' || title === '') {
          $editHeaderInput.focus();
        }

        $editHeaderInput.value = title;
      }
    }

    const $editHeaderInput = document.querySelector('input#title');

    if (!!$editHeaderInput) {
      // focus 이벤트
      $editHeaderInput.addEventListener('focus', (e) => {
        const $input = e.target;
        $input.placeholder = '';
      });

      $editHeaderInput.addEventListener('blur', (e) => {
        const $input = e.target;
        if ($input.text !== '') $input.placeholder = '제목 없음';
      });

      let timer = null;
      // 수정 이벤트
      $editHeaderInput.addEventListener('keyup', (e) => {
        const newTitle = e.target.value;
        const { selectedDoc } = this.state;
        const editDoc = getStorage('selectedDoc', {
          title: selectedDoc.title,
          content: selectedDoc.content,
        });

        const newDoc = { ...editDoc, title: newTitle };

        // 엔터키 이벤트
        if (e.keyCode === 13) {
          $editHeader.nextSibling.firstChild.focus();
        } else {
          if (timer !== null) clearTimeout(timer);

          timer = setTimeout(() => {
            addStorage('selectedDoc', newDoc);

            onEditing(newDoc);
          }, 1500);
        }
      });
    }
  };

  this.render();
}
