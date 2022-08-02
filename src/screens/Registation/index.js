
import {RegisterWelcomeCard,RegisterAdmin,LogoHeader,RegisterCompany,SignInOtp} from './Container'
function RegistationScreen (props) {

    const steps = {
        LANDING_OPTIONS :1,
        SIGNIN:2,
        REGISTER_ADMIN:3,
        REGISTER_OTP:4,
        REGISTER_COMPANY:5,
        SIGN_IN_OTP:6
    }

    const currentStep =5

    return (
        <div  class={'row main-content'} >
        <div class={'col-md-6'} >
        <RegisterWelcomeCard />
        </div>
        <div class={'col-6'} >
             { currentStep === steps.REGISTER_COMPANY && <RegisterCompany/> }
        </div>
        </div>
    )
}
export default RegistationScreen
