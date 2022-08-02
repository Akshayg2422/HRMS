
import React from 'react';
import PropTypes from 'prop-types';

const Button = props => (
    <button type="button" className={`${props.className} btn btn-secondary`} onClick={props.onClick}>{props.text}</button>
)


Button.propTypes = {
    text: PropTypes.string.isRequired
};

export default Button;