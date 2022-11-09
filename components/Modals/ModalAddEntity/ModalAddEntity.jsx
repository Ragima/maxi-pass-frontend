import React from 'react';
import PropTypes from 'prop-types';
import ModalWrap from 'components/Modals/ModalWrap';
import CommonButton from 'components/Elements/CommonButton';
import EntityTable from 'Tables/EntityTable';

const ModalAddEntity = ({ intl, onSelect, data, modalKey, fields }) => {
    const trigger = <CommonButton icon='add' content={intl.formatMessage({ id: modalKey })}/>;

    return (
        <ModalWrap title={modalKey} icon='archive' trigger={trigger}>
            {() => <EntityTable data={data} onSelect={onSelect} tableKey={modalKey} fields={fields}/>}
        </ModalWrap>
    );
};

ModalAddEntity.propTypes = {
    intl: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    fields: PropTypes.array.isRequired,
    modalKey: PropTypes.string.isRequired,
};

export default ModalAddEntity;
