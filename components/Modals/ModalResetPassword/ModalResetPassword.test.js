import React from 'react';
import { mountSmart, shallowSmart } from "helpers/tests/enzymeHelpers";
import ModalResetPassword from 'components/Modals/ModalResetPassword';

describe('ModalResetPassword', () => {
    it('should match snapshot', () => {
        const wrap = shallowSmart(<ModalResetPassword/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<ModalResetPassword/>);
        expect(wrap.find('ModalResetPassword')).toHaveLength(1);
    });
});
