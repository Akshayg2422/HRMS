import { BackArrow, FormWrapper, InputText } from '@components'
import { postEsslConfig } from '../../../../../store/auth/actions';
import { goBack, showToast, useNav, validateName } from '@utils'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

function ManageEsslConfig() {

    let dispatch = useDispatch();
    const navigation = useNav();


    const [esslConfig, setEsslConfig] = useState({
        name: '',
        password: '',
        baseUrl: '',
    })

    const addEsslConfig = () => {

        const params = {
            essl_config: {
                baseurl:'http://localhost:3001/manage-essl-config',
                password: esslConfig.password,
                username: esslConfig.name
            }
        }
        console.log("params------->", params);

        dispatch(postEsslConfig({
            params,
            onSuccess: (success: any) => {
                console.log("successs----->", success);
                showToast("success", success.message)

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
        <FormWrapper title={'Add ESSL config'} onClick={() => {
            addEsslConfig()
        }}>
            <InputText
                label={'User name'}
                placeholder={'User name'}
                validator={validateName}
                value={esslConfig.name}
                name={"name"}
                onChange={(event) => {
                    onChangeHandler(event);
                }}
            />
            <InputText
                label={'Password'}
                placeholder={'Password'}
                value={esslConfig.password}
                name={"password"}
                onChange={(event) => {
                    onChangeHandler(event);
                }}
            />
            <InputText
                label={'Base URL'}
                placeholder={'Base URL'}
                value={esslConfig.baseUrl}
                name={"baseUrl"}
                onChange={(event) => {
                    onChangeHandler(event);
                }}
            />
        </FormWrapper>
    )
}

export default ManageEsslConfig