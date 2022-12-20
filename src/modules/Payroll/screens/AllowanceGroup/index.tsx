import { Container, DropDown, FormWrapper, Icon, ImageView, InputText, Modal, Primary, Secondary } from '@components'
import { Icons } from '@assets';
import { goTo, ROUTE, useNav } from '@utils'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

function AllowanceGroup() {

    const navigation = useNav();
    const { t } = useTranslation();
    let dispatch = useDispatch();
    const [addAllowanceModel, setAddAllowanceModel] = useState(false)
    const [selectAllowanceModel, setSelectAddAllowanceModel] = useState(false)


    return (
        <>
            <FormWrapper
                title={t('AllowanceGroup')}
                onClick={() => console.log('clicked')}>
                <InputText
                    label={t("GroupName")}
                    onChange={(event) => {
                        // onChangeHandler(event);
                    }}
                />
                <Container additionClass="text-right">
                    <Primary
                        text={t("add")}
                        onClick={() => setSelectAddAllowanceModel(!selectAllowanceModel)}
                        col={"col-xl-3"}
                        size={"btn-md"}
                    />
                </Container>
            </FormWrapper>
            <Modal
                title={t("SelectAllowance")}
                showModel={selectAllowanceModel}
                toggle={() => setSelectAddAllowanceModel(!selectAllowanceModel)}
            >
                <Container>
                    <Container additionClass={'text-right'}
                    >
                        <Primary
                            size='btn-sm'
                            text={t("AddNew")}
                            onClick={() => setAddAllowanceModel(!addAllowanceModel)}
                        />
                    </Container>
                    <Container>
                        {[0, 1, 2].map(() => {
                            return (
                                <Container additionClass='row mx-3'>
                                    <Container additionClass="row">
                                        <Container additionClass='col-xl-7'>
                                            <InputText
                                                size='sm'
                                                label={t("GroupName")}
                                                onChange={(event) => {
                                                    // onChangeHandler(event);
                                                }}
                                            />
                                        </Container>
                                        <td className="col-2 mt-5" style={{ whiteSpace: "pre-wrap" }}><ImageView icon={Icons.TickDefault} onClick={() => {
                                            // setCurrentEmployeeShiftId(el.id)
                                        }} /></td>
                                    </Container>
                                </Container>
                            )
                        })}
                    </Container>
                    <Container margin={"mt-5"} additionClass={"text-right"}>
                        <Secondary
                            text={t("cancel")}
                            onClick={() => setSelectAddAllowanceModel(!selectAllowanceModel)}
                        />
                        <Primary
                            text={t("submit")}
                            onClick={() => console.log('clicked')}
                        />
                    </Container>
                </Container>
            </Modal>
            <Modal
                title={t("AddAllowance")}
                showModel={addAllowanceModel}
                toggle={() => setAddAllowanceModel(!addAllowanceModel)}
            >
                <Container>
                    <Container additionClass='col-xl-6'>
                        <InputText
                            label={t("AllowanceName")}
                            onChange={(event) => {
                                // onChangeHandler(event);
                            }}
                        />
                        <InputText
                            label={t("Hint")}
                            onChange={(event) => {
                                // onChangeHandler(event);
                            }}
                        />
                    </Container>

                    <Container margin={"mt-5"} additionClass={"text-right"}>
                        <Secondary
                            text={t("cancel")}
                            onClick={() => setAddAllowanceModel(!addAllowanceModel)}
                        />
                        <Primary
                            text={t("add")}
                            onClick={() => console.log('clicked')}
                        />
                    </Container>
                </Container>
            </Modal>
        </>
    )
}

export default AllowanceGroup
