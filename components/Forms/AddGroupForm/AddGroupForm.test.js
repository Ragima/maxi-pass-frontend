import React from 'react';
import { mountSmart, shallowSmart, mockStore, defineMatchMedia } from "helpers/tests/enzymeHelpers";
import AddGroupForm from 'components/Forms/AddGroupForm';
import WAddGroupForm from 'components/Forms/AddGroupForm/AddGroupForm';

describe('AddGroupForm', () => {
    const store = mockStore({ groups: [], user: { lead: false } });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<AddGroupForm/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<AddGroupForm />, store);
        expect(wrap.find('AddGroupForm')).toHaveLength(1);
    });
    it('should call createGroup and onSubmit on submit', async () => {
        const createGroup = jest.fn(async () => ({}));
        const onSubmit = jest.fn();
        const wrap = mountSmart(<WAddGroupForm createGroup={createGroup} onSubmit={onSubmit} intl={{ formatMessage: () => 'sd' }}/>, store);
        await wrap.find('form').getElement().props.onSubmit();
        expect(createGroup).toBeCalled();
        expect(onSubmit).toBeCalled();
    });
    it('should call createGroup and not to call onSubmit and CreateInnerGroup on submit', async () => {
        const createGroup = jest.fn(async () => ({ }));
        const createInnerGroup = jest.fn(() => {});
        const onSubmit = jest.fn();
        const wrap = mountSmart(<WAddGroupForm
            createGroup={createGroup}
            createInnerGroup={createInnerGroup}
            onSubmit={null}
            intl={{ formatMessage: () => 'sd' }}
        />, store);
        await wrap.find('form').getElement().props.onSubmit();
        expect(createGroup).toBeCalled();
        expect(createInnerGroup).not.toBeCalled();
        expect(onSubmit).not.toBeCalled();
    });
    it('should call createGroup and CreateInnerGroup and not to call onSubmit on submit', async () => {
        const createGroup = jest.fn(async () => ({ id: 1 }));
        const createInnerGroup = jest.fn(() => {});
        const onSubmit = jest.fn();
        const wrap = mountSmart(<WAddGroupForm
            createGroup={createGroup}
            createInnerGroup={createInnerGroup}
            onSubmit={null}
            intl={{ formatMessage: () => 'sd' }}
        />, store);
        await wrap.find('FormWrap').getElement().props.onSubmit({ id: 2 });
        expect(createGroup).toBeCalled();
        expect(onSubmit).not.toBeCalled();
    });
});
