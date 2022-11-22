import { BackArrow, Card, Container, Icon, InputText, NoRecordFound, Upload, Modal, Carousel } from '@components'
import { Icons } from '@assets';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Document, Page } from 'react-pdf';
import { useTranslation } from 'react-i18next';
import { showToast, useNav } from '@utils';
import { attachUserDocument, getEmployeeDocument } from '../../../../store/employee/actions';
import { saveAs } from 'file-saver';
import axios from 'axios';
function ELocker() {
    let dispatch = useDispatch();
    const { t } = useTranslation();
    const navigation = useNav();

    const [search, setSearch] = useState("");
    const [model, setModel] = useState(false);
    const [viewDocument, setViewDocument] = useState<any>([])


    const { employeeDocuments } =
        useSelector((state: any) => state.EmployeeReducer);

    useEffect(() => {
        fetchEmployeeDocuments()
    }, [])


    const handleDownload = async (dataUrl: string, name: string) => {
        let extension = dataUrl.split('.').pop()
        let filename = `${name}.${extension}`
        const blob = new Blob([dataUrl]);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    }


    const Upload = () => {
        const input = document.getElementById('selectImage') as HTMLInputElement | null;
        if (input != null) {
            input.click()
        }
    }

    const changeHandler = (e: any) => {
        let fileName = document.getElementById('selectImage') as HTMLInputElement | null;
        let check = fileName && fileName.value.toLowerCase()
        if (check != null && (check.endsWith('.jpeg') || check.endsWith('.jpg') || check != null && check.endsWith('.pdf'))) {
            const file = e.target.files[0];
            const name = file.name.split(".")
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                let encoded = reader && reader.result && reader.result.toString().replace(/^data:(.*,)?/, '');
                console.log('encoded', encoded);
                AttachDocuments(name[0], encoded)
            }
        }
        else if (check != null) {
            showToast("info", 'Please upload Pdf/jpeg files only.')
        }
    }

    // const fileDelete = (e: any, index: number) => {
    //     e.stopPropagation();
    //     const deleted = fileUpload.filter(function (ele: any, i: number) {
    //         return i != index;
    //     });
    //     setFileUpload(deleted)
    // }


    const fetchEmployeeDocuments = () => {
        const params = {
            q: search
        };
        dispatch(getEmployeeDocument({
            params,
        }));
    };


    const AttachDocuments = (name: string, file: any) => {
        const params = {
            tag: name,
            attachments: [file]
        };
        dispatch(attachUserDocument({
            params,
            onSuccess: (success: any) => {
                showToast("success", "uploaded");
                fetchEmployeeDocuments()
            },
            onError: (error: string) => {
                showToast("error", error);
                fetchEmployeeDocuments()
            },
        }));
    };

    const viewUserDocument = (item: any) => {
        setModel(!model)
        setViewDocument(item)
    }


    const download = (e: any, item: any) => {
        e.stopPropagation();

        console.log(JSON.stringify(item));
        if (item?.attachments.length > 0) {

            item.attachments.map((each: any) => {
                handleDownload(each, item.name)
            })
        }


        // item.attachments.map((el: any) => {
        //     let extension = el.split('.').pop()
        //     let filename = `${item.name}.${extension}`
        //     const blob = new Blob([el]);
        //     const url = window.URL.createObjectURL(blob);
        //     const a = document.createElement("a");
        //     a.href = url;
        //     a.download = filename
        //     document.body.appendChild(a);
        //     a.click();
        //     window.URL.revokeObjectURL(url);
        //     // var FileSaver = require('file-saver');
        //     // saveAs(el, filename);
        // })

    };
    return (
        <div>
            <Card>
                <BackArrow />
                <Container additionClass='mt-2'>
                    <h1>{t("E_Locker")}</h1>
                    <Container
                        flexDirection={"row"}
                        additionClass={"col"}
                        alignItems={"align-items-center"}
                    >
                        <Container col={"col-xl-3 col-md-6 col-sm-12"}>
                            <InputText
                                placeholder={t("search")}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                            />
                        </Container>
                        <Container
                            col={"col"}
                            additionClass={"mb-3"}
                            justifyContent={"justify-content-center"}
                            alignItems={"align-items-center"}
                            onClick={() => Upload()}

                        >
                            <Icon
                                text={t('add') + " " + "+"}
                            />
                            <input id='selectImage' hidden type="file" multiple={true} accept="image/jpeg,image/gif,image/png,application/pdf,.pdf," onChange={(e) => changeHandler(e)} />
                        </Container>
                    </Container>

                </Container>
            </Card>
            <Container>
                <Card>
                    {employeeDocuments && employeeDocuments?.details?.length > 0 ? employeeDocuments?.details.map((item: any, index: number) => {
                        return (
                            <Card onClick={() => { viewUserDocument(item) }}>
                                <Container additionClass='row'>
                                    <Container additionClass='col' >
                                        <h3>{item.name}</h3>
                                    </Container>
                                    {/* <Container additionClass='col' display={'d-flex'} justifyContent={'justify-content-end'}>
                                        <Icon
                                            icon={Icons.Delete}
                                            onClick={(e) => fileDelete(e, index)
                                            }
                                        />
                                    </Container> */}
                                    <Container additionClass='col' display={'d-flex'} justifyContent={'justify-content-end'}>
                                        <Icon
                                            icon={Icons.DownloadSecondary}
                                            onClick={(e) => download(e, item)
                                            }
                                        />
                                    </Container>
                                </Container>
                            </Card>
                        )
                    }) :
                        <NoRecordFound />
                    }
                </Card>
            </Container>
            <Modal
                showModel={model}
                size={'modal-xl'}
                title={"Documents"}
                toggle={() => setModel(!model)} >
                <Container additionClass='vh-100'>
                    {viewDocument && viewDocument.attachments && viewDocument.attachments.length > 0 ? (
                        <>
                            {viewDocument.attachments.length > 0 && viewDocument.attachments.map((el: any) => {
                                return (
                                    <>
                                        {el != null && el.endsWith('.pdf') && <iframe src={`${el}#view=fitH`} height='60%' style={{ margin: "10px" }} width="90%" />}
                                        {el != null && (el.endsWith('.jpeg') || el.endsWith('.jpg') || el.endsWith('.png')) && <Carousel images={[el]} height={700} />}
                                    </>
                                )
                            })}

                        </>
                    ) : (
                        <NoRecordFound />
                    )}
                </Container>

            </Modal>
        </div>
    )
}

export default ELocker
