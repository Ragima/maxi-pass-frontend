import React from 'react';
import { mountSmart, shallowSmart, mockStore, resizeTo, checkDispatchedActions } from "helpers/tests/enzymeHelpers";
import HeaderLayout from 'components/Layouts/HeaderLayout';
import WHeaderLayout from 'components/Layouts/HeaderLayout/HeaderLayout';
import actions from 'redux/actions/menuActions';

describe('HeaderLayout', () => {
    let props = {};
    let store = mockStore({});
    beforeEach(() => {
        props = {
            router: { pathname: '/smth' },
            email: 'asdas',
            showMenu: jest.fn(),
            signOut: jest.fn(),
            hideMenu: jest.fn(),
        };
        store = mockStore({ menu: { isOpen: true }, user: { email: 'asda' } });
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<HeaderLayout {...props}/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<HeaderLayout {...props}/>, store);
        expect(wrap.find('HeaderLayout')).toHaveLength(1);
    });
    it('should dispatch showMenu on icon click', () => {
        resizeTo('mobile');
        store = mockStore({ menu: { isOpen: false }, user: { email: 'asda' } });
        const showMenu = () => store.dispatch(actions.showMenu());
        const wrap = mountSmart(<HeaderLayout {...props} showMenu={showMenu}/>, store);
        wrap.find('Icon').first().getElement().props.onClick();
        expect(store.getActions().find(action=>action.type==='SHOW_MENU').type).toEqual('SHOW_MENU');
    });
    it('should dispatch hideMenu on icon click', () => {
        resizeTo('mobile');
        store = mockStore({ menu: { isOpen: true }, user: { email: 'asda' } });
        const hideMenu = () => store.dispatch(actions.hideMenu());
        const wrap = mountSmart(<HeaderLayout {...props} hideMenu={hideMenu}/>, store);
        wrap.find('Icon').first().getElement().props.onClick();
        expect(store.getActions().find(action=>action.type==='HIDE_MENU').type).toEqual('HIDE_MENU');
    });
    it('should not render menu and content if mobile size', () => {
        resizeTo('mobile');
        const wrap = mountSmart(<HeaderLayout {...props}/>, store);
        expect(wrap.find('Content')).toHaveLength(0);
        expect(wrap.find('Menu')).toHaveLength(0);
    });
    it('should not render toggle icon if computer size', () => {
        resizeTo('computer');
        const wrap = mountSmart(<HeaderLayout {...props}/>, store);
        expect(wrap.find('Icon')).toHaveLength(4);
    });
    it('should call hideMenu if menu is open and width greater than mobile', () => {
        mountSmart(<WHeaderLayout {...props} isMenuOpen/>, store);
        expect(props.hideMenu).toBeCalled();
    });
    it('should not call hideMenu if menu is closed', () => {
        mountSmart(<WHeaderLayout {...props} isMenuOpen={false}/>, store);
        expect(props.hideMenu).not.toBeCalled();
    });
    it('should not call hideMenu if width equal to mobile', () => {
        resizeTo('mobile');
        mountSmart(<WHeaderLayout {...props} isMenuOpen/>, store);
        expect(props.hideMenu).not.toBeCalled();
    });

    it('should not call logOut when user is signed in', () => {
        mountSmart(<WHeaderLayout {...props} isMenuOpen isSignIn={true}/>, store);
        expect(props.signOut).not.toBeCalled();
    });
});
