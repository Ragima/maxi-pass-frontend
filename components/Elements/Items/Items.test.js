import React from 'react';
import { mountSmart, shallowSmart, mockStore } from "helpers/tests/enzymeHelpers";
import { ItemWrap, VaultItem, GroupItem, InvitationItem, UserItem, GroupVaultsItem } from 'components/Elements/Items';

describe('Items', () => {
    describe('ItemWrap', () => {
        let props = {};
        const child = <div className='toFind' />;
        beforeEach(() => {
            props = {
                icon: 'user',
            };
        });
        it('should match snapshot', () => {
            const component = shallowSmart(<ItemWrap {...props}>{child}</ItemWrap>);
            expect(component).toMatchSnapshot();
        });
        it('should render itself', () => {
            const component = mountSmart(<ItemWrap {...props}>{child}</ItemWrap>);
            expect(component.find('ItemWrap')).toHaveLength(1);
        });
        it('should render action', () => {
            const component = mountSmart(<ItemWrap {...props} action={<div className='action'>s</div>}>{child}</ItemWrap>);
            expect(component.find('ItemWrap')).toHaveLength(1);
            expect(component.find('.action')).toHaveLength(1);
        });
        it('should render its children', () => {
            const component = mountSmart(<ItemWrap {...props}>{child}</ItemWrap>);
            expect(component.find('.toFind')).toHaveLength(1);
        });
        it('should call onDelete', () => {
            const deleteMock = jest.fn();
            const component = mountSmart(<ItemWrap {...props} deleteIcon onDelete={deleteMock}>{child}</ItemWrap>);
            component.find('Icon').last().getElement().props.onClick();
            expect(deleteMock).toBeCalled();
        });
        it('should render additionalLink', () => {
            const component = mountSmart(<ItemWrap {...props} additionalLink={{ href: 'asdasd' }}>{child}</ItemWrap>);
            expect(component.find('Link')).toHaveLength(1);
        });
        it('should render 0 links if href is not defined', () => {
            const component = mountSmart(<ItemWrap {...props}>{child}</ItemWrap>);
            expect(component.find('Link')).toHaveLength(0);
        });
        it('should render 2 links if href is defined', () => {
            const component = mountSmart(<ItemWrap {...props} link={{ href: 'asdasd' }}>{child}</ItemWrap>);
            expect(component.find('Link')).toHaveLength(2);
        });
    });
    describe('VaultItem', () => {
        let props = {};
        beforeEach(() => {
            props = {
                item: { title: 'name', description: 'desc' },
            };
        });
        it('should match snapshot', () => {
            const component = shallowSmart(<VaultItem {...props}/>);
            expect(component).toMatchSnapshot();
        });
        it('should render itself', () => {
            const component = mountSmart(<VaultItem {...props}/>);
            expect(component.find('VaultItem')).toHaveLength(1);
        });
        it('should render its name', () => {
            const component = mountSmart(<VaultItem {...props}/>);
            expect(component.find('Text').text()).toEqual('name');
        });
    });
    describe('GroupItem', () => {
        let props = {};
        beforeEach(() => {
            props = {
                item: { name: 'name' },
            };
        });
        it('should match snapshot', () => {
            const component = shallowSmart(<GroupItem {...props}/>);
            expect(component).toMatchSnapshot();
        });
        it('should render itself', () => {
            const component = mountSmart(<GroupItem {...props}/>);
            expect(component.find('GroupItem')).toHaveLength(1);
        });
        it('should render its name', () => {
            const component = mountSmart(<GroupItem {...props}/>);
            expect(component.find('Text').text()).toEqual('name');
        });
    });
    describe('GroupVaultsItem', () => {
        let props = {};
        beforeEach(() => {
            props = {
                item: { group: { name: 'asda' }, vaults: [{ title: 'asd' }, { title: 'qqqq' }] },
            };
        });
        it('should match snapshot', () => {
            const component = shallowSmart(<GroupVaultsItem {...props}/>);
            expect(component).toMatchSnapshot();
        });
        it('should render itself', () => {
            const component = mountSmart(<GroupVaultsItem {...props}/>);
            expect(component.find('GroupVaultsItem')).toHaveLength(1);
        });
        it('should render its name', () => {
            const component = mountSmart(<GroupVaultsItem {...props}/>);
            expect(component.find('ListItem')).toHaveLength(3);
        });
    });
    describe('UserItem', () => {
        let props = {};
        const store = mockStore({});
        beforeEach(() => {
            props = {
                item: { name: 'name' },
            };
        });
        it('should match snapshot', () => {
            const component = shallowSmart(<UserItem {...props}/>, store);
            expect(component).toMatchSnapshot();
        });
        it('should render itself', () => {
            const component = mountSmart(<UserItem {...props}/>, store);
            expect(component.find('UserItem')).toHaveLength(1);
        });
        it('should render itself if extension user', () => {
            const props = {
                item: { name: 'name', extension_access: true },
            };
            const component = mountSmart(<UserItem {...props}/>, store);
            expect(component.find('UserItem')).toHaveLength(1);
            expect(component.find('Icon').first().getElement().props.name).toEqual('user outline');
        });
        it('should render its name', () => {
            const component = mountSmart(<UserItem {...props}/>, store);
            expect(component.find('Text').text()).toEqual('name');
        });
        it('should render empty href if it is admin', () => {
            const component = mountSmart(<UserItem {...props} item={{ role_id: 'admin' }}/>, store);
            expect(component.find('ItemWrap').getElement().props.link.href).toEqual(false);
        });
        it('should render not empty href if it is admin', () => {
            const component = mountSmart(<UserItem {...props}/>, store);
            expect(component.find('ItemWrap').getElement().props.link.href).not.toEqual(undefined);
        });
        it('should render UserRoleDropdown if type is group', () => {
            const component = mountSmart(<UserItem {...props} type='group'/>, store);
            expect(component.find('UserItem')).toHaveLength(1);
            expect(component.find('UserRoleDropdown')).toHaveLength(1);
        });
        it('should render PolicyUserDropdown if type is vault', () => {
            const component = mountSmart(<UserItem {...props} type='vault'/>, store);
            expect(component.find('UserItem')).toHaveLength(1);
            expect(component.find('PolicyUserDropdown')).toHaveLength(1);
        });
    });
    describe('InvitationItem', () => {
        let props = {};
        beforeEach(() => {
            props = {
                item: { email: 'email', accept_to: {} },
            };
        });
        it('should match snapshot', () => {
            const component = shallowSmart(<InvitationItem {...props}/>);
            expect(component).toMatchSnapshot();
        });
        it('should render itself', () => {
            const component = mountSmart(<InvitationItem {...props}/>);
            expect(component.find('InvitationItem')).toHaveLength(1);
        });
        it('should render its name', () => {
            const component = mountSmart(<InvitationItem {...props}/>);
            expect(component.find('Text').text()).toEqual('email');
        });
    });
});
