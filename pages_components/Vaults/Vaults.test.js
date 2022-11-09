import React from 'react';
import { mountSmart, shallowSmart, mockStore } from "helpers/tests/enzymeHelpers";
import Vaults from 'pages/vaults';

describe('Vaults', () => {
    const store = mockStore({ vaults: [], user: { role_id: 'admin' } });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<Vaults/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<Vaults/>, store);
        expect(wrap.find('Vaults')).toHaveLength(1);
    });
    it('should render full page for admin', () => {
        const wrap = mountSmart(<Vaults/>, store);
        expect(wrap.find('PageItemsLayout')).toHaveLength(1);
    });
    it('should render only table for user', () => {
        const store = mockStore({ vaults: [], user: { role_id: 'user' } });
        const wrap = mountSmart(<Vaults/>, store);
        expect(wrap.find('PageItemsLayout')).toHaveLength(0);
        expect(wrap.find('VaultsTable')).toHaveLength(1);
    });
    it('should render all vaults if filter is false', () => {
        const store = mockStore({
            vaults: [{ id: 1 }, { id: 2 }, { id: 3 }],
            user: { role_id: 'admin' },
            relations: {
                group_vaults: [{ vault_id: 1, group_id: 2 }],
            },
        });
        const wrap = mountSmart(<Vaults/>, store);
        wrap.find('Button__CommonButton').first().simulate('click');
        expect(wrap.find('VaultsTable').getElement().props.data).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
    });
    it('should render only vaults with not empty groups', () => {
        const store = mockStore({
            vaults: [{ id: 1 }, { id: 2 }, { id: 3 }],
            user: { role_id: 'admin' },
            relations: {
                group_vaults: [{ vault_id: 1, group_id: 2 }],
            },
        });
        const wrap = mountSmart(<Vaults/>, store);
        wrap.find('Button__CommonButton').at(1).simulate('click');
        expect(wrap.find('VaultsTable').getElement().props.data).toEqual([{ id: 1 }]);
    });
});
