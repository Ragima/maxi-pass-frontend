import React from 'react';
import { mountSmart, shallowSmart } from "helpers/tests/enzymeHelpers";
import DropdownMenu from 'components/DropdownMenu';

import { redirectToLogin } from 'helpers/auth/redirect';

jest.mock('helpers/auth/redirect');

describe('DropdownMenu', () => {
    let props = {};
    beforeEach(() => {
        props = {
            signOut: jest.fn(),
        };
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<DropdownMenu {...props}/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<DropdownMenu {...props}/>);
        expect(wrap.find('DropdownMenu')).toHaveLength(2);
        expect(wrap.find('Link')).toHaveLength(2);
    });
    it('should render link if admin', () => {
        const wrap = mountSmart(<DropdownMenu {...props} role='admin'/>);
        expect(wrap.find('DropdownMenu')).toHaveLength(2);
        expect(wrap.find('Link')).toHaveLength(2);
    });
    it('should render link if real admin', () => {
        const wrap = mountSmart(<DropdownMenu {...props} isAdmin/>);
        expect(wrap.find('DropdownMenu')).toHaveLength(2);
        expect(wrap.find('Link')).toHaveLength(3);
    });
    it('should call signOut', async () => {
        redirectToLogin.mockImplementationOnce(() => {});
        const wrap = mountSmart(<DropdownMenu {...props} teamName='team'/>);
        wrap.find('DropdownItem').last().getElement().props.onClick();
        expect(props.signOut).toBeCalled();
    });
});
