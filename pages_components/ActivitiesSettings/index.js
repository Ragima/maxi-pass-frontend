import React from 'react';
import ActivitiesSettingsTable from 'components/Tables/ActivitiesSettingsTable';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

const ActivitiesSettings = ({ data, intl }) => {
    return (
    <>
        <Message content={intl.formatMessage({ id: 'activitySettingsTitle' })}/>
        <ActivitiesSettingsTable settings={data}/>
    </>);
};

ActivitiesSettings.propTypes = {
    data: PropTypes.array.isRequired,
    intl: PropTypes.object.isRequired,
};

export default ActivitiesSettings;
