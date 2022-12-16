import React from "react";
import { Icons } from "@assets";
import { Card, Container, ImageView } from "@components";
import { ROUTE, useNav, NAV_ITEM } from "@utils";
import { useDispatch } from "react-redux";
import { currentNavIndex } from "../../../../store/app/actions";

function DashBoardCard() {
  const navigate = useNav();
  const dispatch = useDispatch();


  const currentNav = (it: any, index: any) => {
    dispatch(currentNavIndex(index));
    navigate(it.route);
  };

  return (
    <Container flexDirection={"row"} margin={"mt-3"}>
      {NAV_ITEM.map((it, index) => {
        return (
          <>
            {it.name !== "Dashboard" && <Container additionClass={"col-xl-3 col-md-6"}>
              <Card
                additionClass={"border"}
                style={{ border: "1px bg-gray" }}
                onClick={() => currentNav(it, index)}
              >
                <Container
                  additionClass={"row py-3"}
                  justifyContent={"justify-content-center"}
                >
                  <Container col={"col-auto"} alignItems={"align-items-center"}>
                    <ImageView additionClass={'m-0'} icon={it?.image} alt={it.name} height={50} width={50} />
                  </Container>
                  <div className="col">
                    <h5 className="text-black h3 mb-0 mt-2 font-weight-bold">
                      {it.name}
                    </h5>
                  </div>
                </Container>
              </Card>
            </Container>}
          </>
        );
      })}
    </Container >
  );
}

export default DashBoardCard;
