import { Card, ChooseBranchFromHierarchical, Container } from "@components";
import { getPendingLeaveDetails } from "../../../../store/employee/actions";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Pending } from "./Container";

const LeaveRequest = () => {
  const { t } = useTranslation();
  let dispatch = useDispatch();


  const array = [1, 2, 3, 4, 5];

  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  useEffect(() => {
    fetchPendingDetail()
  }, [hierarchicalBranchIds]);

  const fetchPendingDetail = () => {
    const params: object = {
      ...hierarchicalBranchIds,
    };
    dispatch(getPendingLeaveDetails({ params }));
  };

  return (
    <div>
      <Card additionClass="my-3">
        <div className="col-lg-6">
          <ChooseBranchFromHierarchical />
        </div>
        <div className="nav-wrapper mx-xl-4">
          <ul
            className="nav nav-pills nav-fill flex-column flex-md-row"
            id="tabs-icons-text"
            role="tablist"
          >
            <li className="nav-item">
              <a
                className="nav-link mb-sm-3 mb-md-0 active"
                id="tabs-icons-text-1-tab"
                data-toggle="tab"
                href="#tabs-icons-text-1"
                role="tab"
                aria-controls="tabs-icons-text-1"
                aria-selected="true"
                onClick={fetchPendingDetail}
              >
                {t("pending")}
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link mb-sm-3 mb-md-0"
                id="tabs-icons-text-2-tab"
                data-toggle="tab"
                href="#tabs-icons-text-2"
                role="tab"
                aria-controls="tabs-icons-text-2"
                aria-selected="true"
              >
                {t("markAsPresent")}
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link mb-sm-3 mb-md-0"
                id="tabs-icons-text-3-tab"
                data-toggle="tab"
                href="#tabs-icons-text-3"
                role="tab"
                aria-controls="tabs-icons-text-3"
                aria-selected="false"
              >
                {t("approved")}
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link mb-sm-3 mb-md-0"
                id="tabs-icons-text-4-tab"
                data-toggle="tab"
                href="#tabs-icons-text-4"
                role="tab"
                aria-controls="tabs-icons-text-4"
                aria-selected="false"
              >
                {t("rejected")}
              </a>
            </li>
          </ul>
        </div>
      </Card>
      {/* <Card> */}
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="tabs-icons-text-1"
          role="tabpanel"
          aria-labelledby="tabs-icons-text-1-tab"
        >
          <Pending />
        </div>
        <div
          className="tab-pane fade"
          id="tabs-icons-text-2"
          role="tabpanel"
          aria-labelledby="tabs-icons-text-2-tab"
        >
          <div className="row">
            {array.map((el) => {
              return (
                <div className="col-xl-3 col-md-6">
                  <div className="card card-stats">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h5 className="card-title text-uppercase text-muted mb-0">
                            hello
                          </h5>
                          <span className="h2 font-weight-bold mb-0">
                            350,897
                          </span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                            <i className="ni ni-active-40"></i>
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 mb-0 text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-arrow-up"></i> 3.48%
                        </span>
                        <span className="text-nowrap">Since last month</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="tabs-icons-text-3"
          role="tabpanel"
          aria-labelledby="tabs-icons-text-3-tab"
        >
          <p className="description">
            Raw denim you probably haven't heard of them jean shorts Austin.
            Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache
            cliche tempor, williamsburg carles vegan helvetica. Reprehenderit
            butcher retro keffiyeh dreamcatcher synth.
          </p>
        </div>
      </div>
      {/* </Card> */}
    </div>
  );
};

export default LeaveRequest;
function dispatch(arg0: { type: string; payload: any }) {
  throw new Error("Function not implemented.");
}
