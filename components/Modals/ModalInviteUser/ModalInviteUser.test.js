import React from 'react';
import { mountSmart, shallowSmart } from "helpers/tests/enzymeHelpers";
import ModalInviteUser from 'components/Modals/ModalInviteUser';

describe('ModalInviteUser', () => {
    it('should match snapshot', () => {
        const wrap = shallowSmart(<ModalInviteUser/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<ModalInviteUser/>);
        expect(wrap.find('ModalInviteUser')).toHaveLength(1);
    });
});
