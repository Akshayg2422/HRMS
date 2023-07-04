import { getAppConfigData } from '../../../../store/auth/actions';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface DeviceInfo {
    brand: string;
    model: string;
    platform: string;
}

function DeviceInfo() {
    const dispatch = useDispatch()

    useEffect(() => {
        const userAgent = navigator.userAgent;
        const platform = navigator.platform;
        const regex = /\(([^)]+)\)/;
        const match = regex.exec(userAgent);
        if (match && match.length > 1) {
            const deviceInfo = match[1].split(';');
            const brand = deviceInfo[0].trim();
            const model = deviceInfo[1].trim();
            dispatch(getAppConfigData({ brand, model, platform }))
        }

    }, []);


    return (
        <></>
    );
}

export default DeviceInfo
