import {
  Card,
  Container,
  Divider,
  ImageView,
  InputDefault,
  InputNumber,
} from "@components";
import { useSelector } from "react-redux";
import {
  getGenderByValue,
  getImageUri,
} from "@utils";
import { useTranslation } from "react-i18next";
import {Icons} from '@assets'

const Profile = () => {

  const { t } = useTranslation();
  const { dashboardDetails } = useSelector(
    (state: any) => state.DashboardReducer
  );

  


  return (
    <Container additionClass="row justify-content-center my-4">
      <Card additionClass={"col-lg-6 col-md-8"}>
        <Container additionClass={"col text-center"}>
          <Container additionClass={"text-center"}>
            <h1 className="text-black">{t("personalData")}</h1>
          </Container>
          <ImageView
            icon={dashboardDetails && dashboardDetails.user_details ? getImageUri(dashboardDetails.user_details.profile_photo) : Icons.ProfilePlaceHolder}
            additionClass={"rounded-circle col-lg-3  order-lg-2"}
            height={"130px"}
          ></ImageView>
          <Container additionClass={"text-center my-3"}>
            <h1 className="text-black">{dashboardDetails.user_details.name}</h1>
            <h3 className="text-black">{dashboardDetails.user_details.designation}</h3>
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
            value={dashboardDetails.user_details.mobile_number}
          />
          <InputDefault disabled={true} label={t("email")} value={dashboardDetails.user_details.email} />
          <InputDefault
            disabled={true}
            label={t("gender")}
            value={getGenderByValue(dashboardDetails.user_details.gender)}
          />
          <InputDefault
            disabled={true}
            label={t("companyBranch")}
            value={dashboardDetails.company.name}
          />
        </Container>
      </Card>
    </Container>
  );
};

export default Profile;
