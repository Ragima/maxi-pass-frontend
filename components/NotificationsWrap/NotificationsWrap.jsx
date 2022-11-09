import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const NotificationsWrap = ({ notify, intl, clearNotify }) => {
    const createNotification = (type, message) => {
        switch (type) {
        case 'success':
            NotificationManager.success(intl.formatMessage({ id: message }), 'Success', 5000, null, true);
            break;
        default:
            NotificationManager.error(message, 'Error', 5000, null, true);
            break;
        }
    };

    useEffect(() => {
        const { type, message } = notify;
        if (type && message) {
            createNotification(type, message);
            clearNotify();
        }            
    }, [notify]);

    return <NotificationContainer/>;
};

NotificationsWrap.propTypes = {
    notify: PropTypes.object,
    intl: PropTypes.object.isRequired,
    clearNotify: PropTypes.func.isRequired,
};

NotificationsWrap.defaultProps = {
    notify: {},
};

export default NotificationsWrap;
