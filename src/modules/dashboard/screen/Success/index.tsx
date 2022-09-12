import React from "react";
import { Container, Logo } from "@components";
import { Images } from '@assets'


const SuccessScreen = () => {
    return (
        <Container height={'vh-100'} width={'vw-100'} style={{
            backgroundImage: `url(${Images.Welcome})`
        }}>
            <Container padding={'p-5'} alignItems={'align-content-start'}>
                <Logo />
            </Container>
            <Container flexDirection={'flex-column'} display={'d-flex'} justifyContent={'justify-content-center'} alignItems={'align-items-center'}>
                <h1 style={{ color: 'white' }}>{"Welcome to zenylog"}</h1>
                <h4 style={{ color: 'white' }}>{'Google has been successfully registered with zenylog.'}</h4>
                <Container margin={'m-4'}>
                    <h5 style={{ color: 'white' }}>Click here to login</h5>
                </Container>
            </Container>

        </Container>
    )
}

export default SuccessScreen