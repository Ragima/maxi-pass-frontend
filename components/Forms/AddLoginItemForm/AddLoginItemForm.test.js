import React from 'react';
import { mountSmart, shallowSmart, mockStore } from "helpers/tests/enzymeHelpers";
import AddLoginItemForm from 'components/Forms/AddLoginItemForm';
import WAddLoginItemForm from 'components/Forms/AddLoginItemForm/AddLoginItemForm';

jest.mock('helpers/auth/redirect');

describe('AddLoginItemForm', () => {
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
        const wrap = shallowSmart(<AddLoginItemForm {...props}/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<AddLoginItemForm {...props} updatable/>, store);
        expect(wrap.find('AddLoginItemForm')).toHaveLength(1);
        expect(wrap.find('Button__SubmitButton')).toHaveLength(1);
    });
    it('should render all fields', () => {
        const wrap = mountSmart(<AddLoginItemForm {...props} updatable dropFields={0}/>, store);
        expect(wrap.find('FieldWrap')).toHaveLength(15);
    });
    it('should render without last fields', () => {
        const wrap = mountSmart(<AddLoginItemForm {...props} updatable dropFields={1}/>, store);
        expect(wrap.find('FieldWrap')).toHaveLength(14);
    });
    it('should not render itself submit button if vault is not updatable', () => {
        const wrap = mountSmart(<AddLoginItemForm {...props}/>, store);
        expect(wrap.find('Button__SubmitButton')).toHaveLength(0);
    });
    it('should call editVaultItem', async () => {
        const wrap = mountSmart(<WAddLoginItemForm {...props} update/>);
        await wrap.find('form').getElement().props.onSubmit();
        expect(props.editVaultItem).toBeCalled();
    });
    it('should call createVaultItem', async () => {
        const wrap = mountSmart(<WAddLoginItemForm {...props}/>);
        await wrap.find('form').getElement().props.onSubmit();
        expect(props.createVaultItem).toBeCalled();
    });
});
