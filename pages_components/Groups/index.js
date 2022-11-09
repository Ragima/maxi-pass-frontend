import React from 'react';
import Tree from 'components/Elements/Tree';
import ModalAddGroup from 'components/Modals/ModalAddGroup';
import { Flex } from 'styled_components/Flexbox';

const Groups = () => {
    return (
        <>
            <Flex padding='0 0 10px 0' justify='flex-end' height='auto'>
                <ModalAddGroup/>
            </Flex>
            <Tree/>
        </>
    );
};

export default Groups;
