import React from 'react';
import { mountSmart, shallowSmart, mockStore } from "helpers/tests/enzymeHelpers";
import UserRoleDropdown from 'components/Elements/UserRoleDropdown';
import WUserRoleDropdown from 'components/Elements/UserRoleDropdown/UserRoleDropdown';

describe('UserRoleDropdown', () => {
    let props = {};
    const store = mockStore({});
    beforeEach(() => {
        props = {
            user: { id: '2' },
            changeUserLeadRole: jest.fn(),
            mainId: '1',
            relation: { id: 45 },
        };
    });
    it('should match snapshot', () => {
        const component = shallowSmart(<UserRoleDropdown {...props}/>, store);
        expect(component).toMatchSnapshot();
    });
    it('should render itself', () => {
        const component = mountSmart(<UserRoleDropdown {...props}/>, store);
        expect(component.find('UserRoleDropdown')).toHaveLength(1);
    });
    it('should render Dropdown if user is not admin', () => {
        const component = mountSmart(<UserRoleDropdown {...props}/>, store);
        expect(component.find('Icon')).toHaveLength(1);
    });
    it('should render not Dropdown if user is admin', () => {
        const component = mountSmart(<UserRoleDropdown {...props} user={{ role_id: 'admin' }}/>, store);
        expect(component.find('Icon')).toHaveLength(0);
    });
    it('should render Dropdown with lead value if it is lead', () => {
        const store = mockStore({ relations: { group_users: [{ group_id: 1, user_id: 2, role: 'lead' }] } });
        const component = mountSmart(<UserRoleDropdown {...props}/>, store);
        expect(component.find('Icon').getElement().props.title).toEqual('Lead');
    });
    it('should render Dropdown with user value if it is not lead', () => {
        const store = mockStore({ relations: { group_users: [{ group_id: 1, user_id: 2, role: 'user' }] } });
        const component = mountSmart(<UserRoleDropdown {...props}/>, store);
        expect(component.find('Icon').getElement().props.title).toEqual('User');
    });
    it('should call changeUserLeadRole', () => {
        const component = mountSmart(<WUserRoleDropdown {...props}/>);
        component.find('Icon').getElement().props.onClick();
        expect(props.changeUserLeadRole).toBeCalledWith({ id: 45, group_id: '1', user_id: '2', data: { role: 'lead' } });
    });
    it('should call changeUserLeadRole with user role', () => {
        const component = mountSmart(<WUserRoleDropdown {...props} relation={{ id: 45, role: 'lead' }}/>);
        component.find('Icon').getElement().props.onClick();
        expect(props.changeUserLeadRole).toBeCalledWith({ id: 45, group_id: '1', user_id: '2', data: { role: 'user' } });
    });
});
