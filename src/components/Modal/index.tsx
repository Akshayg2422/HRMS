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
  style?: any
  AdditionalClass?: string
}

const Modal = ({ children, title, size = 'modal-lg', toggle, showModel, saveChange, footer, style,AdditionalClass }: ModelProps) => {
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
    <ReactModal
      className={`modal-dialog-centered ${size}  ${AdditionalClass} scroll-hidden`}
      isOpen={modalShow}
      toggle={toggle}
      fade={false}
      style={style}
    >
      <div className="modal-header"
      >
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
      <div className="modal-body scroll-hidden"
        style={{ overflowY: 'auto', maxHeight: "600px" }}
      >{children}</div>

      {footer && <div className="modal-footer">
        <button type="button" className="btn btn-link" onClick={toggle}>Close</button>
        <button type="button" className="btn btn-primary ml-auto" onClick={saveChange}>Save change</button>
      </div>}
    </ReactModal>
  );
}

export default Modal;
