import React, { useEffect, useState } from "react";
import {
  Modal as ReactModal,
} from "reactstrap";

interface ModelProps {
  children?: React.ReactNode;
  title?: string;
  size?: 'modal-sm' | 'modal-lg' | 'modal-xl'
  toggle?: () => void;
  saveChange?: () => void;
  showModel?: boolean;
  footer?: boolean;
}

const Modal = ({ children, title, size = 'modal-lg', toggle, showModel, saveChange, footer }: ModelProps) => {
  const [modalShow, setModelShow] = useState<any>('');
  const [display, setDisplay] = useState('none')


  const openModal = () => {
    setModelShow('show')
    setDisplay('block')
  }

  const closeModal = () => {
    setModelShow('')
    setDisplay('none')
  }

  useEffect(() => {
    if (showModel) {
      document.documentElement.classList.add('overflow-hidden');
      document.body.classList.add('overflow-hidden');
    }
    else {
      document.documentElement.classList.remove('overflow-hidden');
      document.body.classList.remove('overflow-hidden');
    }
  }, [showModel])

  useEffect(() => {
    showModel ? openModal() : closeModal();
  }, [showModel]);


  return (
    // <div
    //   className={`${'modal fade ' + modalShow}`}
    //   role="dialog"
    //   aria-hidden="true"
    //   style={{ display: display, }} >
    //   <div className={`modal-dialog modal-dialog-centered modal-dialog-scrollable  ${size}`} role="document">
    //     <div className="modal-content  ">
    //       <div className="modal-header mx-3 mt-3">
    //         <h5 className="modal-title" >{title}</h5>
    //         <button type="button" className="close" onClick={toggle} aria-label="Close">
    //           <span aria-hidden="true">&times;</span>
    //         </button>
    //       </div>
    //       <div className="modal-body scroll-hidden overflow-auto">{children}</div>

    //       {footer && <div className="modal-footer">
    //         <button type="button" className="btn btn-link" onClick={toggle}>Close</button>
    //         <button type="button" className="btn btn-primary ml-auto" onClick={saveChange}>Save change</button>
    //       </div>}
    //     </div>
    //   </div>
    // </div>

    <ReactModal 
      className={`modal-dialog-centered ${size}`}  
      isOpen={modalShow}
      toggle={toggle}
    >
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
         {title}
        </h5>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={toggle}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body scroll-hidden overflow-auto">{children}</div>

      {footer && <div className="modal-footer">
        <button type="button" className="btn btn-link" onClick={toggle}>Close</button>
        <button type="button" className="btn btn-primary ml-auto" onClick={saveChange}>Save change</button>
      </div>}
    </ReactModal>
  );
}

export default Modal;
