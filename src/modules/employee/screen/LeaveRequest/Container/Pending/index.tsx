import React, { useEffect } from "react";

const Pending = () => {
  const array = [1, 2, 3, 4, 5];


  return (
    <div>
      <div className="row">
        {array.map((el) => {
          return (
            <div className="col-xl-3 col-md-6">
              <div className="card card-stats">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <h5 className="card-title text-uppercase text-muted mb-0">
                        Total traffic
                      </h5>
                      <span className="h2 font-weight-bold mb-0">350,897</span>
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
  );
};

export default Pending;
