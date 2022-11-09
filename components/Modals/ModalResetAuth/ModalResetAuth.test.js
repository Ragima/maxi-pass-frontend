import React from 'react';
import { mountSmart, shallowSmart } from "helpers/tests/enzymeHelpers";
import ModalResetAuth from 'components/Modals/ModalResetAuth';

describe('ModalResetAuth', () => {
    it('should match snapshot', () => {
        const wrap = shallowSmart(<ModalResetAuth/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<ModalResetAuth/>);
        expect(wrap.find('ModalResetAuth')).toHaveLength(1);
    });
});
