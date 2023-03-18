import { BackArrow, FormWrapper, InputText } from '@components'
import { postEsslConfig } from '../../../../../store/auth/actions';
import { goBack, showToast, useNav, validateName } from '@utils'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function ManageEsslConfig() {

    let dispatch = useDispatch();
    const { t } = useTranslation();
    const navigation = useNav();


    const { editEsslConfigDetails } = useSelector(
        (state: any) => state.AuthReducer
    );

    const [esslConfig, setEsslConfig] = useState({
        name: '',
        password: '',
        baseUrl: '',
    })

    // editEsslConfigDetails

    const addEsslConfig = () => {

        const params = {
            essl_config: {
                baseurl: 'http://localhost:3001/manage-essl-config',
                password: esslConfig.password,
                username: esslConfig.name
            }
        }
        console.log("params------->", params);

        dispatch(postEsslConfig({
            params,
            onSuccess: (success: any) => {
                console.log("successs----->", success);

                goBack(navigation);
            },
            onError: (error: string) => {
                showToast("error", error)
            },
        }));

    }

    const onChangeHandler = (e: any) => {
        setEsslConfig({ ...esslConfig, [e.target?.name]: e.target?.value });
    };

    return (
        <FormWrapper title={editEsslConfigDetails ? t('EditEsslConfig') : t('AddEsslConfig')} buttonTittle={editEsslConfigDetails ? t("update") : t("submit")} onClick={() => {
            addEsslConfig()
        }}>
            <InputText
                label={t('BaseUrl')}
                placeholder={t('BaseUrl')}
                value={esslConfig.baseUrl}
                name={"baseUrl"}
                onChange={(event) => {
                    onChangeHandler(event);
                }}
            />
            <InputText
                label={t('userName')}
                placeholder={t('UserName')}
                validator={validateName}
                value={esslConfig.name}
                name={"name"}
                onChange={(event) => {
                    onChangeHandler(event);
                }}
            />
            <InputText
                label={t('password')}
                placeholder={t('password')}
                value={esslConfig.password}
                name={"password"}
                onChange={(event) => {
                    onChangeHandler(event);
                }}
            />

        </FormWrapper>
    )
}

export  {ManageEsslConfig}