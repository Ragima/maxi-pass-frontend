import React from 'react';
import { mountSmart, shallowSmart } from "helpers/tests/enzymeHelpers";
import ModalEditVault from 'components/Modals/ModalEditVault';

describe('ModalEditVault', () => {
    it('should match snapshot', () => {
        const wrap = shallowSmart(<ModalEditVault/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<ModalEditVault/>);
        expect(wrap.find('ModalEditVault')).toHaveLength(1);
    });
});
