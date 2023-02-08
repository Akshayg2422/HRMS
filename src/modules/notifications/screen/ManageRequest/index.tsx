import { BackArrow, Card } from '@components'
import React from 'react'
import { useTranslation } from 'react-i18next';

function ManageRequest() {
  const { t } = useTranslation();

    return (
        <div>
            <Card>
                <BackArrow />
                <h2 className='my-3'>{'Manage Request'}</h2>
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
                // onClick={() => fetchPendingDetail(currentPage, -2)}
              >
                {t("all")}
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
                // onClick={() => fetchPendingDetail(currentPage, -1)}
              >
                {t("pending")}
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
                // onClick={() => fetchPendingDetail(currentPage, 1)}
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
                // onClick={() => fetchPendingDetail(currentPage, 0)}
              >
                {t("rejected")}
              </a>
            </li>
          </ul>
        </div>
            </Card>
        </div>
    )
}

export { ManageRequest }
