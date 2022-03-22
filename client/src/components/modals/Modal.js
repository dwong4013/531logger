import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function Modal({children}) {
    const mount = document.getElementById('modal');

    // useEffect(() => {
    //     mount.appendChild(children)
    //     return () => mount.removeChild(children)
    // },[mount])

  return (
    ReactDOM.createPortal(children, mount)
  )
}
