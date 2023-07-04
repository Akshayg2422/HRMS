import React from 'react'
import { TABLE_ELEMENT_TEXT_BUTTON, TABLE_CONTENT_TYPE_REPORT, TABLE_ELEMENT_TEXT_IMAGE, convertToUpperCase } from '@utils'
import { Container, Badge, ImageView, Primary, Secondary, } from '@components';
import { Icons } from '@assets'

interface TableProps {
  displayDataSet?: Array<{}>;
  tableDataSet?: Array<{}>;
  additionalDataSet?: Array<{
    elt: number,
    elv: string,
    elh: string
  }>;
  tableOnClick?: (event: any, index: number, item: object) => void;
  tableValueOnClick?: (event: any, index: number, item: object, elv: string) => void;
  tableContentType?: number;
  comparisonDataSet?: Array<{ key: string, elt: number, elv: any, elh: string }>;
  custombutton?: string
  customButtonColor?: string
  customClass?: string

}

interface Element {
  elt: number,
  elv: string,
  elh: string
}

function index({ displayDataSet, tableDataSet, custombutton, customClass, additionalDataSet, tableOnClick, tableValueOnClick, tableContentType, comparisonDataSet, customButtonColor = "primary" }: TableProps) {

  const renderTableHeader = () => {
    if (displayDataSet) {
      const header = Object.keys(displayDataSet[0])
      return header.map(key => {
        return <th className={`${customClass}`} scope="col" key={key}>{key}</th>
      })
    }
  }

  function renderTableValue(eachObject: object) {
    return Object.keys(eachObject).map((key: string) => {
      return <td  style={{ whiteSpace: 'pre-wrap' }} key={key} >{tableContentType ? getTableRowElement(key, eachObject) : getValueElement(key, eachObject)}</td>
    })
  }



  function getValueElement(key: string, item: object) {
    let element = <span>{key == 'name' || key == 'Name' || key == 'NAME' ? convertToUpperCase(item[key as keyof object]) : item[key as keyof object]}</span>;
    // switch (key) {
    //   case 'STATUS':
    //     element = <span className='text-primary'>{item[key]}</span>
    //     break;
    // }
    return element;
  }

  function getTableRowElement(key: string, item: object) {
    let element = <span>{item[key as keyof object]}</span>;
    switch (tableContentType) {
      case TABLE_CONTENT_TYPE_REPORT:
        element = <div className="d-flex">
          <div className="d-flex flex-column justify-content-center ">
            <h6 className="mb-0 text-xs mb-2 ml-2">1 logs</h6>
            <div className='d-flex justify-content-center align-items-center mb-2'>
              <ImageView icon={Icons.TickActive} height={16} width={16} />
            </div>
            <Secondary text={'Modify'} size={'btn-sm'} style={{ borderRadius: '20px', fontSize: '8px' }} />
          </div>

        </div>
        break;
    }
    return element;
  }

  function getElement(item: Element) {
    let element:any = null;
    switch (item.elt) {
      case TABLE_ELEMENT_TEXT_BUTTON:
        element = <span style={{ cursor: 'pointer' }} className={`text-${item.elv == 'Reject' ? "danger" : "primary"} ${custombutton}`}>{item.elv}</span>
        break;
      case TABLE_ELEMENT_TEXT_IMAGE:
        element = <span className='text-primary'>{item.elv}</span>
        break;
    }
    return element;
  }


  return (
    <div className="table-responsive scroll-hidden">
      <table className="table align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            {
              renderTableHeader()
            }
            {
              additionalDataSet && (
                additionalDataSet.map(item => {
                  return item.elh && <th scope="col">{item.elh}</th>
                })
              )
            }

          </tr>

        </thead>
        <tbody>
          {displayDataSet && displayDataSet.length > 0 &&
            displayDataSet.map((each_table_obj: object, idx: number) => {
              return (
                <tr key={idx} onClick={(e) => {
                  if (tableOnClick) {
                    e.preventDefault();
                    e.stopPropagation();
                    tableOnClick(e, idx, each_table_obj)
                  }
                }}>
                  {renderTableValue(each_table_obj)}
                  {
                    additionalDataSet && (
                      additionalDataSet.map(item => {
                        return item.elv && <td scope="row" onClick={(e) => {
                          if (tableValueOnClick) {
                            tableValueOnClick(e, idx, each_table_obj, item.elv)
                            e.preventDefault();
                            e.stopPropagation();
                          }
                        }}><span>{getElement(item)}</span></td>
                      })
                    )
                  }
                </tr>)
            })
          }
        </tbody>
      </table>
    </div>
  )

}

export default index