import React from 'react'

type ScreenTitleProps = {
    title: any;
    additionclass?: string;
    subTitle?: any;
}

function FormTypography({ title, additionclass, subTitle }: ScreenTitleProps) {
    return (
        <div className='mt-4'>
            <h5 className={`ct-title ${additionclass} text-muted`} >{title}</h5>
            <h4 className={`ct-title ${additionclass} `} >{subTitle ? subTitle : '-'}</h4>
        </div>
    )
}

export default FormTypography;