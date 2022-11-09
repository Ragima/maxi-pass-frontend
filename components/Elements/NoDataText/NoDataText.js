import React from 'react';
import { NoDataText as UINoDataText } from 'styled_components/Text';
import PropTypes from 'prop-types';

const NoDataText = ({ textId, intl }) => <UINoDataText>{intl.formatMessage({ id: textId })}</UINoDataText>;

NoDataText.propTypes = {
    textId: PropTypes.string.isRequired,
    intl: PropTypes.object.isRequired,
};

export default NoDataText;
