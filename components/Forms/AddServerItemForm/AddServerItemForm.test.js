import React from 'react';
import { mountSmart, shallowSmart, mockStore, defineMatchMedia } from "helpers/tests/enzymeHelpers";
import AddServerItemForm from 'components/Forms/AddServerItemForm';
import WAddServerItemForm from 'components/Forms/AddServerItemForm/AddServerItemForm';

jest.mock('helpers/auth/redirect');

describe('AddServerItemForm', () => {
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
        const wrap = shallowSmart(<AddServerItemForm {...props}/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<AddServerItemForm {...props} updatable/>, store);
        expect(wrap.find('AddServerItemForm')).toHaveLength(1);
        expect(wrap.find('Button__SubmitButton')).toHaveLength(1);
    });
    it('should render all fields', () => {
        const wrap = mountSmart(<AddServerItemForm {...props} updatable dropFields={0}/>, store);
        expect(wrap.find('FieldWrap')).toHaveLength(9);
    });
    it('should render without last fields', () => {
        const wrap = mountSmart(<AddServerItemForm {...props} updatable dropFields={1}/>, store);
        expect(wrap.find('FieldWrap')).toHaveLength(8);
    });
    it('should not render itself submit button if vault is not updatable', () => {
        const wrap = mountSmart(<AddServerItemForm {...props}/>, store);
        expect(wrap.find('Button__SubmitButton')).toHaveLength(0);
    });
    it('should call editVaultItem', async () => {
        const wrap = mountSmart(<WAddServerItemForm {...props} update/>, store);
        await wrap.find('form').getElement().props.onSubmit({ documents: [] });
        expect(props.editVaultItem).toBeCalled();
    });
    it('should call createVaultItem', async () => {
        const wrap = mountSmart(<WAddServerItemForm {...props}/>, store);
        await wrap.find('form').getElement().props.onSubmit({ documents: [] });
        expect(props.createVaultItem).toBeCalled();
    });
});
