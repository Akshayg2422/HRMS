import { useState } from "react";
import { useApp } from '@contexts'


const useLoader = (initialValue: boolean) => {


    const { isLoading, setLoading } = useApp();

    const hideLoader = () => {
        if (setLoading) {
            setLoading(false);
        }
    };
    const showLoader = () => {
        if (setLoading) {
            setLoading(true);
        }
    };

    return {
        isLoading,
        showLoader,
        hideLoader,
    };
};
export { useLoader };