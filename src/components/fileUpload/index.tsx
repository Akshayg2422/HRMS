
import React, { Children } from 'react';
import Card from '../Card'
import {Icons} from '@assets';
import {ImageView,Container} from '@components';


type ScreenTitleProps = {
  title: string;
  onClick?: () => void;
  Children ?: any;
}


const Fileupload = ({title, onClick,Children}: ScreenTitleProps) => {
  return (
    <>
      <Card backgroundColor={'bg-z-gray'} style={{border: '1px solid black', borderStyle: 'dashed', }} padding={'p-2'} margin={'m-3'} display={'d-flex'} justifyContent={'justify-content-center'} alignItems={'align-items-center'} onClick={onClick}>
        <ImageView icon={Icons.Employee} additionClass={" mx-auto d-block mb-3"}/>
        <small>{title}</small>
        {
          Children
        }
      </Card></>
  )
}
export default Fileupload;