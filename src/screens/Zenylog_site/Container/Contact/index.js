import React, { useState } from "react";
import { InputItem } from "../../components";

import { Icons } from '@assets'

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
      <div id="Contact" className="container-fluid pt-4">
        <div className="card container-fluid">
          <h1 class="card-header text-website-primary mx-6">Contact{' '}<u>us</u></h1>
          <div className="row card-body">
            <div className="col-sm-6">
              <h1 className="mt-5 text-primary">Get a quote</h1>
              <p className="mb-5">
                Fill up the form and our Team will get back <br />
                to you within 24 hours
              </p>

              <div className="d-flex align-items-stretch mt-5">
                <img
                  className="ml-3"
                  src={Icons.Mobile}
                  height={"30px"}
                  width={"25px"}
                />
                <p className="ml-3 ">+91 93424 99299</p>
              </div>
              <div className="d-flex align-items-stretch mt-4">
                <img
                  className="ml-3"
                  src={Icons.Mail}
                  height={"25px"}
                  width={"30px"}
                ></img>
                <p className="ml-3">maplebell.official@gmail.com</p>
              </div>
              <div className="d-flex align-items-stretch mt-4">
                <img
                  className="ml-3"
                  src={Icons.Location}
                  height={"35px"}
                  width={"30px"}
                ></img>
                <p className="ml-3">
                  #363, 19th Main Road, 1st Block,
                  <br /> Rajajinagar, Bengaluru - 560010
                </p>
              </div>
              <div class="card-profile-stats d-flex  justify-content-start container">
                <div>
                  <img src={Icons.Instagram} height="30px" width={"30px"}></img>
                </div>
                <div>
                  <img src={Icons.FacebookWeb} height="30px" width={"20px"}></img>
                </div>
                <div>
                  <img src={Icons.Twitter} height="30px" width={"30px"}></img>
                </div>
                <div>
                  <img src={Icons.Linkedin} height="30px" width={"30px"}></img>
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
                    class="btn btn-lg text-white btn-block col-sm-6"
                    style={{ background: '#0d6e78' }}
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
