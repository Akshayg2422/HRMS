import {
  Card,
  Container,
  Divider,
  ImageView,
  InputDefault,
  InputNumber,
} from "@components";
import { useSelector } from "react-redux";
import { DOMAIN, getGenderByValue, getImageUri } from "@utils";
import { useTranslation } from "react-i18next";
import { Icons } from "@assets";
import { Col, Row } from "react-bootstrap";

const Profile = () => {
  const isHfws = localStorage.getItem(DOMAIN);

  const { t } = useTranslation();
  const { dashboardDetails } = useSelector(
    (state: any) => state.DashboardReducer
  );


  return (
    <Container additionClass="row justify-content-center my-4 m-0">
      <Card additionClass={"col-lg-12 col-md-8"}>
        <Container additionClass={"col text-center mt-3"}>
          <ImageView
            // style={{ objectFit: 'cover' }}
            width={'100px'}
            height={'99px'}

            icon={
              dashboardDetails && dashboardDetails.user_details.profile_photo
                ? getImageUri(dashboardDetails.user_details.profile_photo)
                : Icons.ProfilePlaceHolder
            }
            additionClass={"rounded-circle"}
          ></ImageView>
          <Container additionClass={"text-center my-3"}>
            <h1 className="text-black">{dashboardDetails.user_details.name}</h1>
            <h3 className="text-black">
              {dashboardDetails.user_details.designation}
            </h3>
          </Container>
        </Container>
        <Container>
          <h2>{t("basicInformation")}</h2>
        </Container>
        <Container additionClass="row m-0" margin={"mt-4"}>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <InputNumber
              disabled={true}
              label={t("mobileNumber")}
              value={dashboardDetails.user_details.mobile_number}
            />
          </div>
          {isHfws !== "HFWS" && <div className="col-lg-6 col-md-6 col-sm-12">
            <InputDefault
              disabled={true}
              label={t("email")}
              value={dashboardDetails.user_details.email}
            />
          </div>}
          <div className="col-lg-6 col-md-6 col-sm-12">
            <InputDefault
              disabled={true}
              label={t("gender")}
              value={getGenderByValue(dashboardDetails.user_details.gender)}
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <InputDefault
              disabled={true}
              label={t("companyBranch")}
              value={dashboardDetails.company_branch.name}
            />
          </div>
        </Container>
      </Card>
    </Container>
  );
};

export default Profile;
