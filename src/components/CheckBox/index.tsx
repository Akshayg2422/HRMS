import React from 'react';
import {Container} from '@components';
import {ContainerProps} from '../Interface'

interface CheckBoxProps extends ContainerProps {
  label?: string;
  data: Array<{id: string, name: string}>;
  error?: string;
}



const CheckBox = ({label, data, error, col, additionClass}: CheckBoxProps) => (


  <Container col={col}>
    {label && <label className="form-control-label ml-2" >{label}</label>}

      {
        data.map((item, index) => (
            <div className={`d-flex flex-row justify-content-between py-2 m-2 ${additionClass}`}>
            <h5 className='text-black  font-weight-light mt-2'>{item.name}</h5>
            <input type="checkbox"></input>
            </div>
        ))
      }

    {error && <code className="text-danger">{error}</code>}
  </Container >

)

export default CheckBox;