import React from 'react';
import { mountSmart, shallowSmart, act, mockStore } from "helpers/tests/enzymeHelpers";
import CopyMoveList from 'components/Elements/CopyMoveList';
import WCopyMoveList from 'components/Elements/CopyMoveList/CopyMoveList';

describe('CopyMoveList', () => {
    let props = {};
    const store = mockStore({});
    beforeEach(() => {
        props = {
            header: <div className='header'>a</div>,
            copyItem: jest.fn(async () => 'result'),
            moveItem: jest.fn(async () => 'result'),
            intl: { formatMessage: jest.fn() },
            item: { id: 14, vault_id: 13, type: 'login', vaults: [{ id: 4, items: [], title: 'sd' }, { id: 5, items: [14], title: 'asd' }] },   
        };
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<CopyMoveList {...props}/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', async () => {
        const wrap = await mountSmart(<CopyMoveList {...props}/>, store);
        expect(wrap.find('CopyMoveList')).toHaveLength(1);
    });
    it('should call moveItem', async () => {
        const wrap = await mountSmart(<WCopyMoveList {...props}/>);
        wrap.update();
        await wrap.find('Button').first().simulate('click');
        expect(props.moveItem).toBeCalledWith({
            vaultId: 13,
            id: 14,
            type: 'login',
            data: {
                target_vault_id: 4,
            },
        });
    });
    it('should call copyItem', async () => {
        const wrap = await mountSmart(<WCopyMoveList {...props}/>);
        wrap.update();
        await wrap.find('Button').last().simulate('click');
        expect(props.copyItem).toBeCalledWith({
            vaultId: 13,
            id: 14,
            type: 'login',
            data: {
                target_vault_id: 5,
            },
        });
    });
});
