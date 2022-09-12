import React from 'react'

interface AccordionProps {
    header?: React.ReactNode
    child?: React.ReactNode
}
function index({header, child}: AccordionProps) {
    return (
        <div className="accordion" id="accordionExample">
            <div >
                <div id="headingOne" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <small>sasa</small>
                </div>
                <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                    <small>sasa</small>
                </div>
            </div>
        </div>
    )
}

export default index