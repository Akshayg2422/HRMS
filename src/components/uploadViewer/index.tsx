import React, { useEffect, useRef } from "react";
import Dropzone from "dropzone";
import { Card, Container, ImageView } from '@components'
import { Icons } from '@assets';

Dropzone.autoDiscover = false;
interface DropZoneProps {
  id: string;
  suffix: number
  item: { name: string, base64: string, filePath: string },
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete?: () => void;
}

const DropZone = ({ id, suffix, item, onChange, onDelete }: DropZoneProps) => {

  const inputRef = React.useRef<HTMLInputElement>(null)

  return (
    <>
      <Container display={'d-flex'} flexDirection={'flex-column'} justifyContent={'justify-content-center'} alignItems={'align-items-center'} margin={'mt-2'}>
        <Card cardPadding={'m--2'} onClick={() => { if (inputRef) { inputRef.current!.click(); } }}>
          <input
            className="custom-file-input d-none"
            onChange={onChange}
            type="file"
            accept="image/png, image/jpeg"
            ref={inputRef}
          />
          {item.base64 ?
            <div>
              <img style={{ position: 'absolute', right: 20, top: 20 }} src={Icons.Delete} alt={'image'} onClick={(e) => {
                if (onDelete) {
                  onDelete();
                  e.preventDefault();
                  e.stopPropagation();
                }
              }} />
              <img style={{ height: '120px', width: '120px', borderRadius: 10 }} src={item.base64} alt={'image'} />
            </div> :
            <img style={{ height: '120px', width: '120px', padding: '15px' }} alt={'placeholder'} src={Icons.Gallery} />}
        </Card>

        <small className="text-center mt--3">{item.name}</small>
      </Container>
    </>
  );

}

export default DropZone;