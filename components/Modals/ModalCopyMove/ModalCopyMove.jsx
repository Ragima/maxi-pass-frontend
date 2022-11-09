import React from 'react';
import PropTypes from 'prop-types';
import ModalWrap from 'components/Modals/ModalWrap';
import CommonButton from 'components/Elements/CommonButton';
import CopyMoveList from '../../Elements/CopyMoveList';

const ModalCopyMove = ({ intl, item }) => {
    const trigger = <CommonButton icon='copy' content={intl.formatMessage({ id: 'copyMove' })}/>;

    return (
        <ModalWrap title='copyMove' icon='archive' trigger={trigger} relative flex>
            {({ closeModal }) => (
                <CopyMoveList closeModal={closeModal} item={item}/>
            )}
        </ModalWrap>
    );
};

ModalCopyMove.propTypes = {
    intl: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
};

export default ModalCopyMove;
