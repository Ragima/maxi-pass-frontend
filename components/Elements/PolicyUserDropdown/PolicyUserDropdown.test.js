import React from 'react';
import { mountSmart, shallowSmart, mockStore } from "helpers/tests/enzymeHelpers";
import PolicyUserDropdown from 'components/Elements/PolicyUserDropdown';
import WPolicyUserDropdownn from 'components/Elements/PolicyUserDropdown/PolicyUserDropdown';

describe('PolicyUserDropdown', () => {
    let props = {};
    const store = mockStore({});
    beforeEach(() => {
        props = {
            user: { id: '2' },
            changeVaultPolicy: jest.fn(),
            mainId: '1',
            relation: { id: 56 },
        };
    });
    it('should match snapshot', () => {
        const component = shallowSmart(<PolicyUserDropdown {...props}/>, store);
        expect(component).toMatchSnapshot();
    });
    it('should render itself', () => {
        const component = mountSmart(<PolicyUserDropdown {...props}/>, store);
        expect(component.find('PolicyUserDropdown')).toHaveLength(1);
    });
    it('should call changeUserLeadRole', () => {
        const component = mountSmart(<WPolicyUserDropdownn {...props}/>);
        component.find('Icon').getElement().props.onClick();
        expect(props.changeVaultPolicy).toBeCalledWith({ id: 56, vault_id: '1', user_id: '2', data: { vault_writer: true } });
    });
    it('should call changeUserLeadRole with false vault-writer option', () => {
        const component = mountSmart(<WPolicyUserDropdownn {...props} relation={{ id: 56, vault_writer: true }}/>);
        component.find('Icon').getElement().props.onClick();
        expect(props.changeVaultPolicy).toBeCalledWith({ id: 56, vault_id: '1', user_id: '2', data: { vault_writer: false } });
    });
    it('should render Dropdown with true value if it is true', () => {
        const store = mockStore({ relations: { user_vaults: [{ vault_id: 1, user_id: 2, vault_writer: true }] } });
        const component = mountSmart(<PolicyUserDropdown {...props}/>, store);
        expect(component.find('Icon').getElement().props.title).toEqual('Writer');
    });
    it('should render Dropdown with false value if it is not false', () => {
        const store = mockStore({ relations: { user_vaults: [{ vault_id: 1, user_id: 2, vault_writer: false }] } });
        const component = mountSmart(<PolicyUserDropdown {...props}/>, store);
        expect(component.find('Icon').getElement().props.title).toEqual('Reader');
    });
});
