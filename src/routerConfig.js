import React from 'react';
import { PolicyScr, ZenylogSite , TermsOfUse} from './screens';
import{Routes, Route} from 'react-router-dom';

const RouterConfig=()=>{
    return(
        <Routes>
            <Route path="/" element={<ZenylogSite/>}/>
            <Route path="/PrivacyPolicy" element={<PolicyScr/>}/>
            <Route path="/TermsOfUse" element={<TermsOfUse/>}/>
        </Routes>
    )
}
export default RouterConfig;