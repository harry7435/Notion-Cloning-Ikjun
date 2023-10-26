import EditHeader from './EditHeader.js';
import Editor from './Editor.js';
import EditFooter from './EditFooter.js';
import { request } from './api.js';
import { getStorage } from './storage.js';
import EditNav from './EditNav.js';

export default function EditPage({
  $target,
  initialState,
  onEditDoc,
  onClick,
}) {
  const $editPage = document.createElement('div');
  $editPage.className = 'edit-main';

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    editNav.setState(nextState);

    editHeader.setState(nextState);

    editor.setState(nextState);

    editFooter.setState(nextState);

    this.render();
  };

  this.render = () => {};

  $target.appendChild($editPage);
  // edit-nav
  const editNav = new EditNav({
    $target: $editPage,
    inititalState: this.state,
  });

  //  edit header
  const editHeader = new EditHeader({
    $target: $editPage,
    initialState: this.state,
    onEditing: async (newDoc) => {
      await request(`/documents/${newDoc.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: newDoc.title,
          content: newDoc.content,
        }),
      });

      const updatedDoc = await request(`/documents/${newDoc.id}`, {
        method: 'GET',
      });

      const docs = await request('/documents', {
        method: 'GET',
      });

      const nextState = {
        ...this.state,
        docsTree: docs,
        selectedDoc: updatedDoc,
        currentFocus: {
          id: newDoc.id,
          element: 'title',
        },
      };

      onEditDoc(nextState);
    },
  });
  // editor
  const editor = new Editor({
    $target: $editPage,
    initialState: this.state,
    onEditing: async (newDoc) => {
      await request(`/documents/${newDoc.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: newDoc.title,
          content: newDoc.content,
        }),
      });

      const updatedDoc = await request(`/documents/${newDoc.id}`, {
        method: 'GET',
      });

      const docs = await request('/documents', {
        method: 'GET',
      });

      const nextState = {
        ...this.state,
        docsTree: docs,
        selectedDoc: updatedDoc,
        currentFocus: {
          id: newDoc.id,
          element: 'content',
        },
      };

      onEditDoc(nextState);
    },
  });

  const editFooter = new EditFooter({
    $target: $editPage,
    initialState: this.state,
    onClick: (clickedId) => {
      onClick(clickedId);
    },
  });
}
