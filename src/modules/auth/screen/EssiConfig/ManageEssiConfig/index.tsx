import { FormWrapper, InputText } from '@components'
import { postEsslConfig } from '../../../../../store/auth/actions';
import { goBack, showToast, useNav, validateDefault, validateName } from '@utils'
import React, { useEffect, useState } from 'react'
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

    useEffect(() => {
        if (editEsslConfigDetails) {
            setEsslConfig({ ...esslConfig, name: editEsslConfigDetails?.essl_config?.username, baseUrl: editEsslConfigDetails?.essl_config?.baseurl, password: editEsslConfigDetails?.essl_config?.password })
        }
    }, [])


    // editEsslConfigDetails
    const validateParams = () => {
        if (validateName(esslConfig.name).status === false) {
            showToast("error", t("invalidName"));
            return false;
        } else if (validateDefault(esslConfig.baseUrl).status === false) {
            showToast("error", t("invalidBaseurl"));
            return false;
        } else if (validateDefault(esslConfig.password).status === false) {
            showToast("error", t("invalidPassword"));
            return false;
        }
        else {
            return true;
        }
    }

    const addEsslConfig = () => {
        if (validateParams()) {
            const params = {
                essl_config: {
                    baseurl: esslConfig.baseUrl,
                    password: esslConfig.password,
                    username: esslConfig.name
                }
            }
            dispatch(postEsslConfig({
                params,
                onSuccess: (success: any) => () => {
                    showToast("success", success.message)
                    goBack(navigation);
                },
                onError: (error: string) => () => {
                    showToast("error", error)
                },
            }));
        }
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
                validator={validateDefault}
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
                validator={validateDefault}
                value={esslConfig.password}
                name={"password"}
                onChange={(event) => {
                    onChangeHandler(event);
                }}
            />

        </FormWrapper>
    )
}

export { ManageEsslConfig }