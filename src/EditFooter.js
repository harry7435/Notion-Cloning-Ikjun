import { addStorage } from './storage.js';

export default function EditFooter({ $target, initialState, onClick }) {
  const $footer = document.createElement('footer');
  $footer.className = 'edit-footer';

  const findChildDoc = (selectedDoc, childDocList) => {
    if (Object.keys(selectedDoc).length === 0) {
      addStorage('childDocList', []);
      return;
    }

    const childDocs = selectedDoc.documents;

    childDocs.forEach((child) => {
      childDocList.push({
        id: child.id,
        title: child.title,
      });
    });

    addStorage('childDocList', childDocList);
    return childDocList;
  };

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    $target.appendChild($footer);
    $footer.innerHTML = '';

    const { selectedDoc } = this.state;
    // child 문서 탐색
    const childDocList = findChildDoc(selectedDoc, []);

    if (childDocList) {
      childDocList.forEach((child) => {
        const $childLinkBox = document.createElement('div');
        $childLinkBox.className = 'child-link-box';
        $childLinkBox.setAttribute('data-id', child.id);

        const $childLink = document.createElement('a');
        $childLink.className = 'child-link';
        $childLink.setAttribute('href', `/documents/${child.id}`);
        $childLink.innerText = child.title;

        const $childLinkIcon = document.createElement('span');
        $childLinkIcon.innerHTML = `<svg role="graphics-symbol" viewBox="0 0 16 16" class="page" style="width: 19.8px; height: 19.8px; display: block; fill: rgba(255, 255, 255, 0.443); flex-shrink: 0;"><path d="M4.35645 15.4678H11.6367C13.0996 15.4678 13.8584 14.6953 13.8584 13.2256V7.02539C13.8584 6.0752 13.7354 5.6377 13.1406 5.03613L9.55176 1.38574C8.97754 0.804688 8.50586 0.667969 7.65137 0.667969H4.35645C2.89355 0.667969 2.13477 1.44043 2.13477 2.91016V13.2256C2.13477 14.7021 2.89355 15.4678 4.35645 15.4678ZM4.46582 14.1279C3.80273 14.1279 3.47461 13.7793 3.47461 13.1436V2.99219C3.47461 2.36328 3.80273 2.00781 4.46582 2.00781H7.37793V5.75391C7.37793 6.73145 7.86328 7.20312 8.83398 7.20312H12.5186V13.1436C12.5186 13.7793 12.1836 14.1279 11.5205 14.1279H4.46582ZM8.95703 6.02734C8.67676 6.02734 8.56055 5.9043 8.56055 5.62402V2.19238L12.334 6.02734H8.95703ZM10.4336 9.00098H5.42969C5.16992 9.00098 4.98535 9.19238 4.98535 9.43164C4.98535 9.67773 5.16992 9.86914 5.42969 9.86914H10.4336C10.6797 9.86914 10.8643 9.67773 10.8643 9.43164C10.8643 9.19238 10.6797 9.00098 10.4336 9.00098ZM10.4336 11.2979H5.42969C5.16992 11.2979 4.98535 11.4893 4.98535 11.7354C4.98535 11.9746 5.16992 12.1592 5.42969 12.1592H10.4336C10.6797 12.1592 10.8643 11.9746 10.8643 11.7354C10.8643 11.4893 10.6797 11.2979 10.4336 11.2979Z"></path></svg>`;

        $childLinkBox.appendChild($childLinkIcon);
        $childLinkBox.appendChild($childLink);

        $footer.appendChild($childLinkBox);
      });
    }
  };

  $footer.addEventListener('click', (e) => {
    e.preventDefault();
    const clickedId = e.target.closest('div').dataset.id;
    onClick(clickedId);
  });
}
