import { Container, Upload } from '@components';
import React, { useState, useRef } from 'react';
import {useAuth} from '@contexts'

function DocumentUpload() {
 const {fileUpload, SetFileUpload} = useAuth();

  const fileUploadChange = (e: any, index: number) => {

    const file = e.target.files[0];
    let filePath = e.target.value
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let updateDocument = [...fileUpload!]
      updateDocument[index] = { ...updateDocument[index], "base64": reader ? reader.result + "" : '', filePath }
      if (SetFileUpload) {
        SetFileUpload(updateDocument)
      }
    }
  }

  const fileUploadDelete = (index: number) => {
    let updateDocument = [...fileUpload!]
    updateDocument[index] = { ...updateDocument[index], base64: "" , filePath:"" }
    console.log(JSON.stringify(updateDocument) + "=====")
    if (SetFileUpload) {
      SetFileUpload(updateDocument)
    }
  }

  return (
    <>
      <h5>{'Uploaded files'}</h5>
      <Container flexDirection={'row'}>
        {fileUpload!.map((item, index) => {
          return (
            <Container display={'d-inline'} >
              <Upload id={'register'} suffix={index} item={item} onChange={(e) => { fileUploadChange(e, index) }} onDelete={()=>fileUploadDelete(index)}/>
            </Container>
          );
        })}
      </Container>
    </>
  );
}

export default DocumentUpload;
