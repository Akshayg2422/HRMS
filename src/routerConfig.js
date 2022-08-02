import React from 'react';
import { PolicyScr, ZenylogSite } from './screens';
import{Routes, Route} from 'react-router-dom';

const RouterConfig=()=>{
    return(
        <Routes>
            <Route path="/" element={<ZenylogSite/>}/>
            <Route path="/Policy" element={<PolicyScr/>}/>
        </Routes>
    )
}
export default RouterConfig;