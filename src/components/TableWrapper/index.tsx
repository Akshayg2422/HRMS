import React from 'react'
import { TableWrapperProps } from './interfaces'


function TableWrapper({ title, children, buttonChildren, filterChildren }: TableWrapperProps) {
    return (
        <div className='col'>
            <div className={'card shadow'}>
                <div className="card-header border-0">
                    <div className="row align-items-center">
                            {title && <div className='col'>
                                <h3 className="mb-0" >{title}</h3>
                            </div>
                            }
                            <div className='col text-right'>
                                {
                                    buttonChildren
                                }
                            </div>
                    </div>
                    <div>
                        {
                            filterChildren
                        }
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}

export { TableWrapper }