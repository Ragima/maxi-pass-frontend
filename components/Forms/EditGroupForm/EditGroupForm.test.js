import React from 'react';
import { mountSmart, shallowSmart, mockStore, defineMatchMedia } from "helpers/tests/enzymeHelpers";
import EditGroupForm from 'components/Forms/EditGroupForm';
import WEditGroupForm from 'components/Forms/EditGroupForm/EditGroupForm';

describe('EditGroupForm', () => {
    const store = mockStore({});
    it('should match snapshot', () => {
        const wrap = shallowSmart(<EditGroupForm/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<EditGroupForm />, store);
        expect(wrap.find('EditGroupForm')).toHaveLength(1);
    });
    it('should call editGroup and onSubmit on submit', async () => {
        const editGroup = jest.fn();
        const onSubmit = jest.fn();
        const wrap = mountSmart(<WEditGroupForm group={{ id: 1, name: 'v' }} editGroup={editGroup} onSubmit={onSubmit} intl={{ formatMessage: () => 'sd' }}/>);
        await wrap.find('form').getElement().props.onSubmit();
        expect(editGroup).toBeCalledWith({ id: 1, name: 'v' });
        expect(onSubmit).toBeCalled();
    });
    it('should call editGroup and not to call onSubmit on submit', async () => {
        const editGroup = jest.fn();
        const onSubmit = jest.fn();
        const wrap = mountSmart(<WEditGroupForm group={{ id: 1, name: 'v' }} editGroup={editGroup} onSubmit={null} intl={{ formatMessage: () => 'sd' }}/>);
        await wrap.find('form').getElement().props.onSubmit();
        expect(editGroup).toBeCalledWith({ id: 1, name: 'v' });
        expect(onSubmit).not.toBeCalled();
    });
});
