import { BackArrow, Card, Container, Icon, InputText, NoRecordFound, Upload, Modal, Carousel, ImageView, CommonTable, Input, Secondary, Primary, useKeyPress, TableWrapper, Search } from '@components'
import { Icons } from '@assets';
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { convertToUpperCase, showToast, useNav, validateName } from '@utils';
import { attachUserDocument, getEmployeeDocument } from '../../../../store/employee/actions';
import axios from 'axios';
import fileDownload from 'js-file-download';
import { Button } from 'reactstrap';


function ELocker() {
    let dispatch = useDispatch();
    const { t } = useTranslation();

    const [search, setSearch] = useState("");
    const [model, setModel] = useState(false);
    const [uploadModel, setUploadModel] = useState(false)
    const [viewDocument, setViewDocument] = useState<any>([])
    const [preview, setPreview] = useState('')
    const [previewModel, setPreviewModel] = useState(false)
    const [title, setTitle] = useState('')
    const [documents, setDocuments] = useState<any>([])
    const [documentListData, setDocumentListData] = useState<any>([])
    let enterPress = useKeyPress("Enter");



    const { employeeDocuments } =
        useSelector((state: any) => state.EmployeeReducer);


    useEffect(() => {
        if (enterPress) {
            SelectedBranchFilter()
        }
    }, [enterPress])

    useEffect(() => {
        fetchEmployeeDocuments()
    }, [])



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
                setDocuments([...documents, { id: Math.floor(new Date().valueOf() * Math.random()), name: check, attachment: encoded }])
            }
        }
        else if (check != null) {
            showToast("error", 'Please upload Pdf/jpeg files only.')
        }
    }

    const fetchEmployeeDocuments = () => {
        const params = {
            ...(search && { q: search })
        };

        dispatch(getEmployeeDocument({
            params,
            onSuccess: (success: any) => () => {
                setDocumentListData(success.details)
            },
            onError: (error: any) => () => {

            }
        }));
    };





    const resetAttachment = () => {
        setDocuments([])
        setTitle('')
    }

    const AttachDocuments = () => {
        let attachments = documents.map((el: any) => el.attachment)
        if (validateName(title).status) {
            if (attachments.length > 0) {
                const params = {
                    tag: title,
                    attachments: attachments
                };
                setUploadModel(!uploadModel)
                dispatch(attachUserDocument({
                    params,
                    onSuccess: (success: any) => () => {
                        showToast("success", "uploaded");
                        fetchEmployeeDocuments()
                        resetAttachment()
                    },
                    onError: (error: string) => () => {
                        showToast("error", error);
                        fetchEmployeeDocuments()
                        resetAttachment()
                    },
                }));
            } else {
                showToast("error", t("attachmentCannotBeEmpty"));
            }
        } else {
            showToast("error", t("fileNameCannotBeEmpty"));
        }

    };



    const documentsList = (data: any) => {
        return data && data.length > 0 && data.map((el: any) => {
            return {
                name: el.name,
                "Attachments": el.attachments.length
            };
        });
    };


    const viewUserDocument = (item: any) => {
        setModel(!model)
        setViewDocument(item)
    }



    const handleDownload = (url: any) => {
        axios.post(url, {
            responseType: 'blob',
        })
            .then((res) => {
                fileDownload(res.data, viewDocument.name)
            })
            .catch((error) => {
                console.log(error);
            })
    }


    const handlePreview = (item: string) => {
        setPreview(item)
        setPreviewModel(!previewModel)
    }

    const onDelete = ((id: number) => {
        let filteredData = documents.filter((el: any) => el.id !== id)
        setDocuments(filteredData)
    })


    const handleUploadModelCancel = () => {
        setUploadModel(!uploadModel)
        resetAttachment()
    }

    const SelectedBranchFilter = () => {

        let filteredDocument = [...documentListData]
        if (search !== "") {
            filteredDocument = filteredDocument.filter((element: any) => {
                return element.name.replace(/\s/g, '').toLowerCase().includes(search.replace(/\s/g, '').toLowerCase())
            })
            setDocumentListData(filteredDocument)
        }
        else {
            setDocumentListData(employeeDocuments?.details)
        }
    }

    const memoizedTable = useMemo(() => {
        return <>
            {documentListData && documentListData.length > 0 ? (
                <CommonTable
                    // noHeader
                    card={false}
                    title={"Documents List"}
                    displayDataSet={documentsList(documentListData)}
                    tableOnClick={(e, index, item) => {
                        let current = documentListData[index]
                        viewUserDocument(current)
                    }}
                // tableOnClick={(e, index, item) => {
                //   const selectedId = registeredEmployeesList[index].id;
                //   dispatch(getSelectedEmployeeId(selectedId));
                //   goTo(navigation, ROUTE.ROUTE_VIEW_EMPLOYEE_DETAILS);
                // }}
                />
            ) : <NoRecordFound />}
        </>
    }, [documentListData])

    return (
        <div>
            <TableWrapper
                title={t("E_Locker")}
                buttonChildren={
                    <Primary size={'btn-sm'} text={'Add'} additionClass={''} onClick={() => setUploadModel(!uploadModel)} />
                }
            >
                <Container additionClass='mt-1 mx-3'>


                    <Container
                        flexDirection={"row"}
                        additionClass={"col"}
                        alignItems={"align-items-center"}
                    >
                        <Container col={"col-xl-3 col-md-6 col-sm-12 ml--2"}>
                            <InputText
                                placeholder={t("search")}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                            />

                        </Container>

                        <Search variant="Button" additionalClassName='mt--3 mr-2' onClick={() => SelectedBranchFilter()} />

                    </Container>

                </Container>
                <>
                    {
                        memoizedTable
                    }
                </>
            </TableWrapper>


            <Modal size={'modal-sm'} title={convertToUpperCase(viewDocument.name)} showModel={model} toggle={() => setModel(!model)} >
                {viewDocument && viewDocument.attachments && viewDocument.attachments.length > 0 ? viewDocument.attachments.map((el: any) => {
                    return (
                        <>
                            <Card backgroundColor={'bg-primary'}>
                                <Container additionClass='row'>
                                    <Container additionClass='col' >
                                        <ImageView icon={el.endsWith('.pdf') ? Icons.PDF_DUMMY : Icons.IMAGE_DUMMY} height={'50px'} additionClass={"d-block"} />
                                    </Container>
                                    <Container additionClass='col' display={'d-flex'} justifyContent={'justify-content-end'}>
                                        <ImageView icon={Icons.Eye} height={'20px'} additionClass={'m-3 mr-4'} onClick={() => { handlePreview(el) }} />
                                        <ImageView icon={Icons.DownloadSecondary} height={'30px'} additionClass={'mt-2'} onClick={() => { handleDownload(el) }} />
                                    </Container>
                                </Container>
                            </Card>
                        </>
                    )
                }) : <NoRecordFound />}
            </Modal>
            <Modal
                showModel={previewModel}
                size={'modal-xl'}
                title={"Documents"}
                toggle={() => setPreviewModel(!previewModel)} >
                <Container additionClass='vh-100'>
                    {preview != null && (preview.endsWith('.jpeg') || preview.endsWith('.jpg') || preview.endsWith('.png')) && <img src={preview} style={{ height: '100%', width: '100%' }} />}
                    {preview != "" && preview.endsWith('.pdf') &&
                        <iframe src={`${preview}#toolbar=0`} style={{ width: "100%", height: "100%", overflow: 'hidden', position: 'static' }}
                        />
                    }
                </Container>

            </Modal>
            <Modal showModel={uploadModel} toggle={() => handleUploadModelCancel()} size={'modal-sm'} title={"Upload Documents"}>
                <Container>
                    <InputText
                        label={t("title")}
                        placeholder={t("enterfilename")}
                        validator={validateName}
                        value={title}
                        name={"title"}
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }}
                    />
                    <Container>
                        <h4>Add Files</h4>
                        <Container flexDirection={"row"} margin={"mt-3"}>
                            {documents.length > 0 && documents.map((el: any, i: number) => {
                                return (
                                    <Container additionClass={"col-xl-4 col-md-6"}>
                                        <Card
                                            additionClass={"border text-center"}
                                            style={{ border: "1px bg-gray" }}
                                        >
                                            <ImageView additionClass='text-center top-0 end-0 m-1' icon={Icons.Delete} style={{ position: 'absolute', height: '15px' }} onClick={() => {
                                                onDelete(el.id)
                                            }} />
                                            <ImageView additionClass='text-center' icon={el.name.endsWith('.pdf') ? Icons.PDF_DUMMY_SECONDARY : Icons.IMAGE_DUMMY_SECONDARY} height={'40px'} />
                                        </Card>
                                    </Container>
                                )
                            })}
                            <Container additionClass={"col-xl-4 col-sm-3 col-md-6 "}>
                                {documents.length < 3 && <>
                                    <Card
                                        onClick={() => { Upload() }}
                                        additionClass={"border text-center"}
                                        style={{ border: "1px bg-gray" }}
                                    >
                                        <ImageView additionClass='text-center ml-1' icon={Icons.AddFiles} height={'40px'} />
                                        <input id='selectImage' hidden type="file" accept="image/jpeg,image/gif,image/png,application/pdf,.pdf," onChange={(e) => changeHandler(e)} />
                                    </Card>
                                </>
                                }
                            </Container>

                        </Container>
                        <Container margin={"mt-5"} additionClass={'text-right'}>
                            <Secondary
                                text={t("cancel")}
                                onClick={() => handleUploadModelCancel()}
                            />
                            <Primary
                                text={t("upload")}
                                onClick={() => AttachDocuments()}
                            />
                        </Container>
                    </Container>
                </Container>
            </Modal>
        </div>
    )
}

export default ELocker
