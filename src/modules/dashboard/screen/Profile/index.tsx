import {
  Card,
  Container,
  Divider,
  ImageView,
  InputDefault,
  InputNumber,
} from "@components";
import React from "react";
import { useSelector } from "react-redux";
import {
  GENDER_LIST,
  getGenderByValue,
  getImageUri,
  getObjectFromArrayByKey,
} from "@utils";
import { useTranslation } from "react-i18next";

const Profile = () => {

  const { t } = useTranslation();
  const { dashboardDetails } = useSelector(
    (state: any) => state.DashboardReducer
  );

  
  console.log("dashboardDetails", dashboardDetails);
  const details = dashboardDetails?.details?.user_details;
  const companyDetails = dashboardDetails.details.company_branch;

  return (
    <Container additionClass="row justify-content-center my-4">
      <Card additionClass={"col-lg-6 col-md-8"}>
        <Container additionClass={"col text-center"}>
          <Container additionClass={"text-center"}>
            <h1 className="text-black">{t("personalData")}</h1>
          </Container>
          <ImageView
            icon={getImageUri(details.profile_photo)}
            additionClass={"rounded-circle col-lg-3  order-lg-2"}
            height={"130px"}
          ></ImageView>
          <Container additionClass={"text-center my-3"}>
            <h1 className="text-black">{details.name}</h1>
            <h3 className="text-black">{details.designation}</h3>
          </Container>
        </Container>
        <Divider />
        <Container>
          <h2>{t("basicInformation")}</h2>
        </Container>
        <Container margin={"mt-4"}>
          <InputNumber
            disabled={true}
            label={t("mobileNumber")}
            value={details.mobile_number}
          />
          <InputDefault disabled={true} label={t("email")} value={details.email} />
          <InputDefault
            disabled={true}
            label={t("gender")}
            value={getGenderByValue(details.gender)}
          />
          <InputDefault
            disabled={true}
            label={t("companyBranch")}
            value={companyDetails.name}
          />
        </Container>
      </Card>
    </Container>
  );
};

export default Profile;
