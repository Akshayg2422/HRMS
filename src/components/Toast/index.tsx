import React, { useEffect } from 'react';

  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
  
  
  function Toast(message: string){

    useEffect(()=>{
        if(message!==""){
            toast(message);
        }
    },[message])
    
// return   toast(message)
    return (
      <div>
        <ToastContainer />
      </div>
    );
  }
  export default Toast;
