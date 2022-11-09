import React from 'react';
import { ErrorText } from 'styled_components/Text';
import PropTypes from 'prop-types';
import _ from 'lodash';

const ErrorCaption = ({ intl, children }) => <ErrorText>{intl.formatMessage({ id: children })}</ErrorText>;

ErrorCaption.propTypes = {
    intl: PropTypes.object.isRequired,
    children: PropTypes.string.isRequired,
};

export default ErrorCaption;
