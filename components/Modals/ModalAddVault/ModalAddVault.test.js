import React from 'react';
import { mountSmart, shallowSmart } from "helpers/tests/enzymeHelpers";
import ModalAddVault from 'components/Modals/ModalAddVault';

describe('ModalAddVault', () => {
    it('should match snapshot', () => {
        const wrap = shallowSmart(<ModalAddVault/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<ModalAddVault/>);
        expect(wrap.find('ModalAddVault')).toHaveLength(1);
    });
});
