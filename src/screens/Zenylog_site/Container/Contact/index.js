import React, { useState } from "react";
import { InputItem } from "../../../../components";
import Location from "../../../../assets/images/Location/Location.png";
import Instagram from "../../../../assets/images/Instagram/Instagram.png";
import Facebook from "../../../../assets/images/Facebook/Facebook2@2x.png";
import Twitter from "../../../../assets/images/Twitter/Twitter2.png";
import Mail from "../../../../assets/images/Mail/Mail.png";
import Mobile from "../../../../assets/images/Mobile/Mobile.png";
import Linkedin from "../../../../assets/images/Linkedin/Linkedin.png";
const Contact = (props) => {
  const [Name, SetName] = useState("");
  const [Email, SetEmail] = useState("");
  const [Number, SetNumber] = useState("");
  const [Message, SetMessage] = useState("");

  const YourName = {
    isManditory: false,
    inputType: InputItem.INPUT_TYPES.TEXT,
    value: Name,
    onChange: SetName,
    label: "Your Name",
    placeholder: "",
  };
  const EmailId = {
    isManditory: false,
    inputType: InputItem.INPUT_TYPES.TEXT,
    value: Email,
    onChange: SetEmail,
    label: "Email Id",
    placeholder: "",
  };
  const PhoneNumber = {
    isManditory: false,
    inputType: InputItem.INPUT_TYPES.TEXT,
    value: Number,
    onChange: SetNumber,
    label: "Phone Number",
    placeholder: "",
  };
  const Messages = {
    isManditory: false,
    inputType: InputItem.INPUT_TYPES.TEXT,
    value: Message,
    onChange: SetMessage,
    label: "Message",
    placeholder: "Message",
  };

  return (
    <>
      <div className="container-fluid mt-2">
        <div className="card container-fluid">
          <h1 class="card-header">Contact us</h1>  
          <div className="row card-body">
            <div className="col-sm-6">
              <h1 className="mt-5">Get a quote</h1>
              <p className="mb-5">
                Fill up the form and our Team will get back <br />
                to you within 24 hours
              </p>

              <div className="row mt-5">
                <img
                  className="ml-3"
                  src={Mobile}
                  height={"30px"}
                  width={"30px"}
                ></img>
                <p className="ml-3">+91 96067 00006</p>
              </div>
              <div className="row mt-4">
                <img
                  className="ml-3"
                  src={Mail}
                  height={"30px"}
                  width={"30px"}
                ></img>
                <p className="ml-3">maplebell.official@gmail.com</p>
              </div>
              <div className="row mt-4">
                <img
                  className="ml-4 mt-2"
                  src={Location}
                  height={"30px"}
                  width={"20px"}
                ></img>
                <p className="ml-3">
                  #363, 19th Main Road, 1st Block,
                  <br /> Rajajinagar, Bengaluru - 560010
                </p>
              </div>
              <div class="card-profile-stats d-flex  justify-content-center container">
                    <div>
                      <img src={Instagram} height="30px" width={"30px"}></img>
                    </div>
                    <div>
                      <img src={Facebook} height="30px" width={"20px"}></img>
                    </div>
                    <div>
                      <img src={Twitter} height="30px" width={"30px"}></img>
                    </div>
                    <div>
                      <img src={Linkedin} height="30px" width={"30px"}></img>
                    </div>
                </div>
            </div>
            <div className=" col-lg-6 col-md-8 mt-2">
              <div className="card p-4">
                <div class="form-group">
                  <form>
                    <InputItem.Item {...YourName} />
                    <InputItem.Item {...EmailId} />
                    <InputItem.Item {...PhoneNumber} />
                    <InputItem.Item {...Messages} />
                  </form>
                </div>
                <div className="col-lg-6 col-8 text-right mb-3">
                  <button
                    type="button"
                    class="btn btn-primary btn-lg btn-block col-sm-6"
                  >
                    SEND
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
