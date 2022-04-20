import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function Modal({children}) {
    let modalRoot = document.getElementById('modal');
    // if there is no modal element in index.html, 
    // it will be created and appended to document.body
    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.setAttribute('id', 'modal')
      document.body.appendChild(modalRoot);
    }

    // // Only use create a new element and mount to it if your portal is not a dynamic component. The component changes will cause re-render
    // const el = document.createElement('div');

    // useEffect(() => {
    //     modalRoot.appendChild(el)
    //     return () => modalRoot.removeChild(el)
    // },[])

  return (
    ReactDOM.createPortal(children, modalRoot)
  )
}
