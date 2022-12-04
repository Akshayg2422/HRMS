import { BackArrow, Card, Container, Icon, ImageView, InputText, NoRecordFound, Upload } from '@components'
import { Icons } from '@assets';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNav } from '@utils';


function ElockerUpload() {
    let dispatch = useDispatch();
    const { t } = useTranslation();
    const navigation = useNav();

    const [fileUpload, setFileUpload] = useState<any>([])


    const Upload = () => {
        const input = document.getElementById('selectImage') as HTMLInputElement | null;
        if (input != null) {
            input.click()
        }
    }

    const changeHandler = (e: any) => {
        const file = e.target.files[0];
        let filePath = e.target.value
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const doc = { data: reader.result, name: file.name, path: filePath }
            setFileUpload([...fileUpload, doc])
        }
    }

    const fileDelete = (index: number) => {
        const deleted = fileUpload.filter(function (ele: any, i: number) {
            return i != index;
        });
        setFileUpload(deleted)
    }


    return (
        <div>
            <BackArrow />
            <Container additionClass='mt-5'>
                {fileUpload && fileUpload.length > 0 && fileUpload.map((item: any, index: number) => {
                    return (
                        <Container additionClass={"col-xl-3 col-md-6"}>
                            <Card
                                additionClass={"border"}
                                style={{ border: "1px bg-gray" }}
                            //   onClick={() => navigate(it.route)}
                            >
                                <Container
                                    additionClass={"row py-3"}
                                    justifyContent={"justify-content-center"}
                                >
                                    <Container col={"col-auto"} alignItems={"align-items-center"}>
                                        {/* <ImageView additionClass={'m-0'} icon={it.icon} alt={it.name} height={50} width={50} /> */}
                                    </Container>
                                    <div className="col">
                                        <h5 className="text-black h3 mb-0 mt-2 font-weight-bold">
                                            {it.name}
                                        </h5>
                                    </div>
                                </Container>
                            </Card>
                        </Container>
                    )
                })
                }
                <Container additionClass={"col-xl-2 col-md-6"} display={'d-flex'} justifyContent={'justify-content-center'}>
                    <Card
                        additionClass={"border"}
                        onClick={() => Upload()}
                    >
                        <Container
                            additionClass={"col"}
                            justifyContent={"justify-content-center"}
                        >
                            <Container col={"col"} alignItems={"align-items-center"}>
                                <ImageView additionClass={'text-center'} icon={Icons.Download} alt={'download'} height={50} width={50} />
                            </Container>
                            <div className="col">
                                <h5 className="text-black font-weight-bold">
                                    {"upload"}
                                </h5>
                                <input id='selectImage' hidden type="file" multiple={true} onChange={(e) => changeHandler(e)} />
                            </div>
                        </Container>
                    </Card>
                </Container>
            </Container>
        </div>
    )

}

export default ElockerUpload
