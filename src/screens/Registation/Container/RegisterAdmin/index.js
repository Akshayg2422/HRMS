import { useState } from "react";
import { Button, InputItem, DropDown } from "../../../../components";
import { RegisterHeader, LogoHeader } from "../index";
const RegisterAdmin = () => {
  const genderItems = [
    { key: "M", value: "Male" },
    { key: "F", value: "Female" },
    { key: "O", value: "Others" },
  ];
  const [gender, setGender] = useState(genderItems[0]);
  const [name, setName] = useState("");

  const validateName = (value) => {
    if (value.length > 3) return "";
    else return "Name Should be minimun 3 Characters";
  };

  console.log("inpppp", InputItem)
  const fullNameInput = {
    isManditory: false,
    validate: validateName,
    value: name,
    inputType: InputItem.INPUT_TYPES.TEXT,
    onChange: setName,
    label: "Full Name",
    placeholder: "Type your full name*",
  };

  return (
    <div>
      <LogoHeader />
      <div>
        <RegisterHeader />
      </div>
      <div class="row justify-content-center">
        <div class="form-group col-8">
          <form>
            <InputItem.Item {...fullNameInput} />
            {/* <Input
              label={"Mobile number"}
              placeholder={"Type your full Name"}
            />
            <Input
              label={"Company email"}
              placeholder={"Type your full Name"}
            />
            <Input label={"Gender"} placeholder={"Type your full Name"} /> */}
            <DropDown
              items={genderItems}
              selected={gender}
              onSelect={setGender}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
export default RegisterAdmin;
