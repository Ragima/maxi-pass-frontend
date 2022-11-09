import React from 'react';
import PropTypes from 'prop-types';
import ModalWrap from 'components/Modals/ModalWrap';
import CommonButton from 'components/Elements/CommonButton';
import { Message } from 'semantic-ui-react';
import EntityTable from 'Tables/EntityTable';
import { user as userFields } from 'constants/entityFields';

const ModalSendReport = ({ intl, users, generateGroupReport, generateVaultReport,
    data, trigger, type, user, generateUserReport, generateActivityReport, modalOpenMode }) => {
    const defaultTrigger = <CommonButton icon='file alternate outline' content={intl.formatMessage({ id: 'sendStructure' })}/>;
    const requests = {
        group: generateGroupReport,
        vault: generateVaultReport,
        user: generateUserReport,
        activity: generateActivityReport,
    };
   
    const onSelectModal = closeModal => async (id) => {
        const request = requests[type];
        const params = type === 'activity' ? data : { [`${type}_id`]: data.id };
        try {
            await request({ ...params, [type === 'user' ? 'report_receiver_id' : 'user_id']: id });
        } finally {
            closeModal();
        }
    };

    return (
        <ModalWrap modalOpenMode={modalOpenMode} title='sendStructure' icon='file alternate outline' trigger={trigger || defaultTrigger}>
            {({ closeModal }) => (
                <>
                    <Message
                        content={intl.formatMessage({ id: 'reportMessage' })}
                    />
                    <EntityTable
                        data={[user, ...users]}
                        onSelect={onSelectModal(closeModal)}
                        tableKey="sendStructure"
                        fields={userFields}
                        actionTitle={intl.formatMessage({ id: 'send' })}
                        actionIcon='file alternate outline'
                    />
                </>
            )}
        </ModalWrap>
    );
};

ModalSendReport.propTypes = {
    intl: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    generateVaultReport: PropTypes.func.isRequired,
    generateActivityReport: PropTypes.func.isRequired,
    generateGroupReport: PropTypes.func.isRequired,
    generateUserReport: PropTypes.func.isRequired,
    trigger: PropTypes.any,
    data: PropTypes.array.isRequired,
    modalOpenMode: PropTypes.func,    
};

export default ModalSendReport;
