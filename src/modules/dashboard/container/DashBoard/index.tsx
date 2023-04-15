import React from "react";
import { Icons } from "@assets";
// import { matchRouteName } from "../../../../store/dashboard/actions";
import { Card, Container, ImageView } from "@components";
import { ROUTE, useNav, NAV_ITEM } from "@utils";
import { useDispatch, useSelector } from "react-redux";
import { currentNavIndex } from "../../../../store/app/actions";



function DashBoardCard() {
  const navigate = useNav();
  const dispatch = useDispatch();

  const { userDetails } = useSelector(
    (state: any) => state.AuthReducer
  );

  const currentNav = (it: any, index: any) => {
    dispatch(currentNavIndex(index));
    navigate(it.route);
  };



  return (
    <Container flexDirection={"row"} >

      {
        userDetails.is_admin ?
          NAV_ITEM.map((it, index) => {

            return (
              <>
                {it.name !== "Dashboard" && <Container additionClass={"col-xl-3 col-md-6"}>
                  <Card
                    onClick={() => currentNav(it, index)}
                  >
                    <Container
                      additionClass={"d-flex py-3"}
                    >
                      <ImageView additionClass="mr-1" icon={it?.image} alt={it.name} height={50} width={50} />
                      <h4 className="text-black m-auto font-weight-bold">
                        {it.name}
                      </h4>
                    </Container>
                  </Card>
                </Container>}
              </>
            );
          })
          :
          userDetails.is_branch_admin ?
            NAV_ITEM && NAV_ITEM.map((it, index) => {

              if (it.is_admin === false) {
                return (
                  <>
                    {it.name !== "Dashboard" && <Container additionClass={"col-xl-3 col-md-6"}>
                      <Card
                        onClick={() => currentNav(it, index)}
                      >
                        <Container
                          additionClass={"d-flex py-3"}
                        >
                          <ImageView additionClass="mr-1" icon={it?.image} alt={it.name} height={50} width={50} />
                          <h4 className="text-black m-auto font-weight-bold">
                            {it.name}
                          </h4>
                        </Container>
                      </Card>
                    </Container>}
                  </>
                );
              }
            }) : ""
      }

    </Container >
  );
}




export default DashBoardCard;
