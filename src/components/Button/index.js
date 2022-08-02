
import React from 'react';
import PropTypes from 'prop-types';

export const BUTTON_SIZE = {'SMALL':'SMALL', 'MEDIUM': 'MEDIUM', 'LARGE':'LARGE' }
export const BUTTON_VARINAT = {'PRIMARY':'PRIMARY', 'SECONDARY': 'SECONDARY', 'DISABLED':'DISABLED' }

const Button = props => {
    
    let SIZE = props?.SIZE ? props.SIZE : BUTTON_SIZE.MEDIUM
    let VARIANT = props?.VARIANT ? props.VARIANT : BUTTON_VARINAT.PRIMARY

    let SIZE_CLASS = SIZE === BUTTON_SIZE.LARGE ? 'btn btn-lg' : SIZE === BUTTON_SIZE.SMALL ? 'btn btn-sm' : 'btn btn-md'
    let VARIANT_CLASS = VARIANT === BUTTON_VARINAT.PRIMARY ? 'btn-primary' : VARIANT == BUTTON_VARINAT.SECONDARY ? 'btn-secondary' : VARIANT == BUTTON_VARINAT.DISABLED ? 'btn-diabled' :'btn' 
    let designClass = SIZE_CLASS +' ' + VARIANT_CLASS
    
    return ( 
    <button type="button" 
    className={`${designClass}`} onClick={props.onClick} >{props.text}</button>
    )
}

// Button.propTypes = {
//     text: PropTypes.string.isRequired
// };

export default Button;