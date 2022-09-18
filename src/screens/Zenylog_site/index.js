import React from "react";
import { Contact,Features,Home,Navbar,Policy,Flowchart,AboutUs } from "./Container";

function ZenylogSite (props) {

    return (
        <div>
            <Navbar/>
            <Home/>
            <AboutUs/>
            <Features/>
            <Flowchart/>
            <Contact/>
            <Policy/>
        </div>
    )
}
export default ZenylogSite;
