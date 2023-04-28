import React, { useEffect } from "react";
import { Contact, Features, Home, Navbar, Policy, Flowchart, AboutUs, LaunchScreen, LaunchSuccessScreen } from "./Container";
import { hideLoader } from '../../store/loader/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";


function ZenylogSite(props) {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(hideLoader())
    }, [])

    return (
        <div>
            <h1>1</h1>
            <Navbar />
            <Home />
            <AboutUs />
            <Features />
            <Flowchart />
            <Contact />
            <Policy />
        </div >
    )
}
export default ZenylogSite;
