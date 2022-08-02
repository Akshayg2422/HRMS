import React from 'react'

const Button = props => (
    <div className={`icon icon-sm icon-shape text-white shadow rounded-circle ${props.bg_color}`} onClick={props.onClick}>
        <i className={`ni ${props.icon}`}></i>
    </div>
)

export default Button;