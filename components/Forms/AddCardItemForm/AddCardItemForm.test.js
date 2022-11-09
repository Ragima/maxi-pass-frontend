import React from 'react';
import { mountSmart, shallowSmart, mockStore } from "helpers/tests/enzymeHelpers";
import AddCardItemForm from 'components/Forms/AddCardItemForm';
import WAddCardItemForm from 'components/Forms/AddCardItemForm/AddCardItemForm';

jest.mock('helpers/auth/redirect');

describe('AddCardItemForm', () => {
    const store = mockStore({});
    let props = {};
    beforeEach(() => {
        props = {
            editVaultItem: jest.fn(async () => ({ id: 1 })), 
            createVaultItem: jest.fn(async () => ({ id: 1 })), 
            intl: { formatMessage: jest.fn() },
        };
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<AddCardItemForm {...props}/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<AddCardItemForm {...props} updatable/>, store);
        expect(wrap.find('AddCardItemForm')).toHaveLength(1);
        expect(wrap.find('Button__SubmitButton')).toHaveLength(1);
    });
    it('should render all fields', () => {
        const wrap = mountSmart(<AddCardItemForm {...props} updatable dropFields={0}/>, store);
        expect(wrap.find('FieldWrap')).toHaveLength(11);
    });
    it('should render without last fields', () => {
        const wrap = mountSmart(<AddCardItemForm {...props} updatable dropFields={1}/>, store);
        expect(wrap.find('FieldWrap')).toHaveLength(10);
    });
    it('should not render itself submit button if vault is not updatable', () => {
        const wrap = mountSmart(<AddCardItemForm {...props}/>, store);
        expect(wrap.find('Button__SubmitButton')).toHaveLength(0);
    });
    it('should call editVaultItem', async () => {
        const wrap = mountSmart(<WAddCardItemForm {...props} update/>);
        await wrap.find('form').getElement().props.onSubmit();
        expect(props.editVaultItem).toBeCalled();
    });
    it('should call createVaultItem', async () => {
        const wrap = mountSmart(<WAddCardItemForm {...props}/>);
        await wrap.find('form').getElement().props.onSubmit();
        expect(props.createVaultItem).toBeCalled();
    });
});
