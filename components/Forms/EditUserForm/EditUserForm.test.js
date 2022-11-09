import React from 'react';
import { mountSmart, shallowSmart, mockStore, defineMatchMedia } from "helpers/tests/enzymeHelpers";
import EditUserForm from 'components/Forms/EditUserForm';
import WEditUserForm from 'components/Forms/EditUserForm/EditUserForm';

describe('EditUserForm', () => {
    const store = mockStore({});
    it('should match snapshot', () => {
        const wrap = shallowSmart(<EditUserForm user={{}}/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<EditUserForm user={{}}/>, store);
        expect(wrap.find('EditUserForm')).toHaveLength(1);
    });
    it('should call editUser and onSubmit on submit', async () => {
        const editUser = jest.fn();
        const onSubmit = jest.fn();
        const wrap = mountSmart(<WEditUserForm user={{ id: 1, name: 'v sda' }} editUser={editUser} onSubmit={onSubmit} intl={{ formatMessage: () => 'sd' }}/>);
        await wrap.find('form').getElement().props.onSubmit();
        expect(editUser).toBeCalledWith({ id: 1, name: 'v sda' });
        expect(onSubmit).toBeCalled();
    });
    it('should call editUser and not to call onSubmit on submit', async () => {
        const editUser = jest.fn();
        const onSubmit = jest.fn();
        const wrap = mountSmart(<WEditUserForm user={{ id: 1, name: 'v sda' }} editUser={editUser} onSubmit={null} intl={{ formatMessage: () => 'sd' }}/>);
        await wrap.find('form').getElement().props.onSubmit();
        expect(editUser).toBeCalledWith({ id: 1, name: 'v sda' });
        expect(onSubmit).not.toBeCalled();
    });
});
