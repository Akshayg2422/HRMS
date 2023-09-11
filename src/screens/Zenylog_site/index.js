import React, { useEffect } from "react";
import { Contact, Features, Home, Navbar, Policy, Flowchart, AboutUs, LaunchScreen, LaunchSuccessScreen, Subscription } from "./Container";
import { hideLoader } from '../../store/loader/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";


function ZenylogSite(props) {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(hideLoader())
    }, [])

    return (
        <div className="container-fluid">
            <Navbar />
            <Home />
            <AboutUs />
            <Features />
            <Flowchart />
            <Subscription/>
            <Contact />
            <Policy />
        </div >
    )
}
export default ZenylogSite;
