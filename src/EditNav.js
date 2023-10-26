export default function EditNav({ $target, inititalState }) {
  const $editNav = document.createElement('div');
  $editNav.className = 'edit-nav';
  $target.appendChild($editNav);

  this.state = inititalState;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    // docs 그래프 구하기
    const selectionNav = document.querySelector(
      `.nav-document-container[data-id="${this.state.selectedDoc.id}"]`
    );

    $editNav.innerHTML = '';

    if (selectionNav) {
      const docsGraph = [selectionNav.children[1].innerText];
      let currentNav = selectionNav;
      while (true) {
        if (currentNav.dataset.depth === '1') break;

        let prevNav = currentNav.previousElementSibling;
        if (
          Number(selectionNav.dataset.depth) > Number(prevNav.dataset.depth)
        ) {
          docsGraph.push(prevNav.children[1].innerText);
        }
        currentNav = prevNav;
      }

      docsGraph.reverse();
      // 경로 구하기
      if (docsGraph.length !== 0) {
        docsGraph.forEach((docsName, idx) => {
          const $docsName = document.createElement('div');
          $docsName.className = 'edit-nav-item';
          $docsName.innerText = docsName;

          const $slash = document.createElement('span');
          $slash.className = 'slash';
          $slash.innerText = '/';

          $editNav.appendChild($docsName);

          if (idx !== docsGraph.length - 1) $editNav.appendChild($slash);
        });
      }
    }
  };
}
