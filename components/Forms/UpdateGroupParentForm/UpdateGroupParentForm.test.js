import React from 'react';
import { mountSmart, shallowSmart, mockStore } from "helpers/tests/enzymeHelpers";
import UpdateGroupParentForm from 'components/Forms/UpdateGroupParentForm';
import WUpdateGroupParentForm from 'components/Forms/UpdateGroupParentForm/UpdateGroupParentForm';

describe('UpdateGroupParentForm', () => {
    const store = mockStore({ groups: [], user: { lead: false } });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<UpdateGroupParentForm/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<UpdateGroupParentForm group={{ id: 1, parent_group_id: 2 }}/>, store);
        expect(wrap.find('UpdateGroupParentForm')).toHaveLength(1);
    });
    it('should call createGroup and onSubmit on submit', async () => {
        const createInnerGroup = jest.fn(async () => ({}));
        const onSubmit = jest.fn();
        const wrap = mountSmart(<WUpdateGroupParentForm
            group={{ id: 1, parent_group_id: 2 }}
            createInnerGroup={createInnerGroup}
            onSubmit={onSubmit}
            intl={{ formatMessage: () => 'sd' }}
        />, store);
        await wrap.find('form').getElement().props.onSubmit();
        expect(createInnerGroup).toBeCalled();
        expect(onSubmit).toBeCalled();
    });
    it('should call createGroup and CreateInnerGroup and not to call onSubmit on submit', async () => {
        const createInnerGroup = jest.fn(async () => ({ id: 1 }));
        const onSubmit = jest.fn();
        const wrap = mountSmart(<WUpdateGroupParentForm
            group={{ id: 1, parent_group_id: 2 }}
            createInnerGroup={createInnerGroup}
            onSubmit={null}
            intl={{ formatMessage: () => 'sd' }}
        />, store);
        await wrap.find('FormWrap').getElement().props.onSubmit({ id: 2 });
        expect(createInnerGroup).toBeCalled();
        expect(onSubmit).not.toBeCalled();
    });
    it('should call deleteParentGroup and onSubmit on submit', async () => {
        const deleteParentGroup = jest.fn(async () => ({}));
        const onSubmit = jest.fn();
        const wrap = mountSmart(<WUpdateGroupParentForm
            group={{ id: 1, parent_group_id: 2 }}
            deleteParentGroup={deleteParentGroup}
            onSubmit={onSubmit}
            intl={{ formatMessage: () => 'sd' }}
        />, store);
        await wrap.find('Button__DangerSubmitButton').getElement().props.onClick();
        expect(deleteParentGroup).toBeCalled();
        expect(onSubmit).toBeCalled();
    });
    it('should call deleteParentGroup and CreateInnerGroup and not to call onSubmit on submit', async () => {
        const deleteParentGroup = jest.fn(async () => ({ id: 1 }));
        const onSubmit = jest.fn();
        const wrap = mountSmart(<WUpdateGroupParentForm
            group={{ id: 1, parent_group_id: 2 }}
            deleteParentGroup={deleteParentGroup}
            onSubmit={null}
            intl={{ formatMessage: () => 'sd' }}
        />, store);
        await wrap.find('Button__DangerSubmitButton').getElement().props.onClick();
        expect(deleteParentGroup).toBeCalled();
        expect(onSubmit).not.toBeCalled();
    });
});
