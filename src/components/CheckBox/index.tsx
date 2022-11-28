import React,{useRef} from 'react';
import {ContainerProps} from '../Interface'


interface CheckBoxProps extends ContainerProps {
  text?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void 
  checked?: boolean
  id?:string;
}

const CheckBox = ({ text, onChange, checked,id }: CheckBoxProps) => {
  return (
    <div className="custom-control custom-checkbox custom-checkbox-primary">
      <input checked={checked} type="checkbox" className="custom-control-input" id={id}  onChange={onChange} />
      <label className="custom-control-label" htmlFor={id}>{text}</label>
    </div>
  )
}


export default CheckBox;