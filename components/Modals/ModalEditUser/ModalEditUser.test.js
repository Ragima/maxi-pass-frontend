import React from 'react';
import { mountSmart, shallowSmart } from "helpers/tests/enzymeHelpers";
import ModalEditUser from 'components/Modals/ModalEditUser';

describe('ModalEditUser', () => {
    it('should match snapshot', () => {
        const wrap = shallowSmart(<ModalEditUser/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<ModalEditUser/>);
        expect(wrap.find('ModalEditUser')).toHaveLength(1);
    });
});
