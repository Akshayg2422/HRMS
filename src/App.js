import "./App.css";
// import ButtonPrimary from "./element/button/ButtonPrimary";
// import Input from "./element/Input";
// import Rightcontent from "./CommonComponent/Rightcontent/rightcontent";
// import Loginscreen from "./Components/LoginScreen/Login";
// import Color from './utils/colors'
// import {Container, Button, Input} from  './components'
// import {RegisterWelcomeCard} from './screens/Registation/Container'
import { RegistationScreen } from "./screens";
import { BrowserRouter } from "react-router-dom";
import {ZenylogSite} from "./screens"
import RouterConfig from "./routerConfig";
function App() {
  return( 
    <BrowserRouter>
        <RouterConfig/>
    </BrowserRouter>
  )
}

export default App;
