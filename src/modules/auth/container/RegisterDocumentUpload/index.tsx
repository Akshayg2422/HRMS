import { Container, Upload } from '@components';
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDocumentsInput } from "../../../../store/auth/actions";


function DocumentUpload() {
  let dispatch = useDispatch();

  const { fileUpload } = useSelector(
    (state: any) => state.AuthReducer
  );

  const fileUploadChange = (e: any, index: number) => {
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {

      let encoded = reader && reader.result && reader.result.toString().replace(/^data:(.*,)?/, '');

      dispatch(updateDocumentsInput(encoded ? encoded : '', index));
    }
  }

  const fileUploadDelete = (index: number) => {
    dispatch(updateDocumentsInput('', index));
  }

  return (
    <Container additionClass={'mt-xl-3'}>
      <h5>{'Uploaded files'}</h5>
      <Container flexDirection={'row'}>
        {fileUpload && fileUpload!.map((item: { name: string; base64: string; filePath: string; }, index: number) => {
          return (
            <Container display={'d-inline'} additionClass={'col'} >
              <Upload id={'register'} suffix={index} item={item} onChange={(e) => { fileUploadChange(e, index) }} onDelete={() => fileUploadDelete(index)} />
            </Container>
          );
        })}
      </Container>
    </Container>
  );
}

export default DocumentUpload;
