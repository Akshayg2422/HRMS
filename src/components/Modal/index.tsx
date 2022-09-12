import React, { useEffect, useState } from "react";


interface ModelProps  {
  children?: React.ReactNode;
  title?: string;
  size?: 'modal-sm' | 'modal-lg' | 'modal-xl'
  toggle?:()=>void;
  saveChange?:()=>void;
  showModel?:boolean;
  footer?: boolean;
}

const Modal = ({ children, title, size = 'modal-lg', toggle, showModel, saveChange, footer }: ModelProps) => {
  const[modalShow,setModelShow]=useState('');
  const[display,setDisplay]=useState('none')


 const openModal=()=> {
    setModelShow('show')
    setDisplay('block')
}

const closeModal=()=> {
  setModelShow('')
  setDisplay('none')
}


useEffect(() => {
  showModel? openModal() : closeModal();
},[showModel]);


  return (
    <div
      className={'modal fade ' + modalShow}
      role="dialog"
      aria-hidden="true"
      style={{ display: display }} >
      <div className={`modal-dialog modal-dialog-centered modal-dialog-scrollable ${size}`} role="document">
        <div className="modal-content">
          <div className="modal-header mx-3 mt-3">
            <h5 className="modal-title" >{title}</h5>
            <button type="button" className="close" onClick={toggle} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{children}</div>

         { footer && <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={saveChange}>Save change</button>
            <button type="button" className="btn btn-link  ml-auto" onClick={toggle}>Close</button>
          </div>}
        </div>
      </div>
    </div>
);
}

export default Modal;
