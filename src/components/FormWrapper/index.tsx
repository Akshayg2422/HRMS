import React from 'react'
import { Primary } from '@components'

interface FormWrapperProps {
    title?: string;
    children?: React.ReactNode;
    onClick?: () => void
    hideFooter? : boolean
}

function 
index({ title, children, onClick, hideFooter = false }: FormWrapperProps) {
    return (
        <div className="container p-5">
            <div className="row">
                <div className="card">
                    <div className="card-header">
                        <h3 className='mb-0  p-2'>{title} </h3>
                    </div>

                    <div className="card-body" >
                        <form id="create-form">
                            <div className='row justify-content-center'>
                                <div className='col-xl-7 col-md-10 my-3'>
                                    {
                                        children
                                    }
                                </div>
                            </div>
                        </form>
                        {!hideFooter && <div className="row col-lg-4 ml-4 mt-5 mb-3 float-right">
                            <Primary text={'Submit'} onClick={onClick} />
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index