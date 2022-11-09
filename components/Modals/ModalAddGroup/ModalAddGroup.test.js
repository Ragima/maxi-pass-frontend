import React from 'react';
import { mountSmart, shallowSmart } from "helpers/tests/enzymeHelpers";
import ModalAddGroup from 'components/Modals/ModalAddGroup';

describe('ModalAddGroup', () => {
    it('should match snapshot', () => {
        const wrap = shallowSmart(<ModalAddGroup/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<ModalAddGroup/>);
        expect(wrap.find('ModalAddGroup')).toHaveLength(1);
    });
});
