import React from 'react';
import { mountSmart, shallowSmart, mockStore, resizeTo, checkDispatchedActions } from "helpers/tests/enzymeHelpers";
import MenuLayout from 'components/Layouts/MenuLayout';

describe('MenuLayout', () => {
    let props = {};
    let store = mockStore({});
    beforeEach(() => {
        props = {
            router: { pathname: '/smth' },
            showMenu: jest.fn(),
            hideMenu: jest.fn(),
        };
        store = mockStore({ menu: { isOpen: true }, user: { role_id: 'admin' } });
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<MenuLayout {...props}/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<MenuLayout {...props}/>, store);
        expect(wrap.find('MenuLayout')).toHaveLength(1);
    });
    it('should render menu if it is open', () => {
        const wrap = mountSmart(<MenuLayout {...props}/>, store);
        expect(wrap.find('Menu')).toHaveLength(1);
    });
    it('should dispatch hideMenu if sidebar is about to hide', () => {
        const wrap = mountSmart(<MenuLayout {...props}/>, store);
        wrap.find('Menu').getElement().props.hideMenu();
        expect(checkDispatchedActions(store, ['HIDE_MENU'])).toBeTruthy();
    });
    it('should render its children', () => {
        const wrap = mountSmart(<MenuLayout {...props}><div className='toFind'>Smth</div></MenuLayout>, store);
        wrap.find('Menu').getElement().props.hideMenu();
        expect(wrap.find('.toFind')).toHaveLength(1);
    });
});
