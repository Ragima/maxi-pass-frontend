import { redirect } from 'helpers/auth/redirect';
import { onFormItemSubmit } from "../itemsSubmit";


jest.mock('helpers/auth/redirect');

describe('onFormItemSubmit', () => {
    let editVaultItem;
    let createVaultItem;
    let props = {};
    beforeEach(() => {
        editVaultItem = jest.fn(async () => ({ id: 4 }));        
        createVaultItem = jest.fn(async () => ({ id: 4 })); 
        redirect.mockImplementationOnce(() => {});
        props = {
            editVaultItem,
            fields: [{ name: 'labels', component: 'multiple_input' }, { name: 'web_addresses', component: 'multiple_input' }, { name: 'a' }, { name: 'b' }],
            createVaultItem,
            update: false,
            id: 1,
            vaultId: 2,
            type: 'login',
        };       
    });

    it('should call editVaultItem if update', async () => {
        await onFormItemSubmit({}, { ...props, update: true });
        expect(editVaultItem).toBeCalled();
        expect(redirect).toBeCalled();
    });
    it('should call createVaultItem if update', async () => {
        await onFormItemSubmit({}, props);
        expect(createVaultItem).toBeCalled();
        expect(redirect).toBeCalled();
    });
    it('should call createVaultItem if data is undefined', async () => {
        await onFormItemSubmit(undefined, props, ['web_addresses', 'labels']);
        expect(createVaultItem).toBeCalledWith({
            data: {
                login_item: {
                    a: "",
                    b: "",
                    idLabel: 1,
                    idLabelWeb: 1,
                    newLabel0: "",
                    newTextFieldLink0: "",
                    newTextFieldName0: "",
                    newValue0: "",
                },
            },
            id: 1,
            vaultId: 2,
            type: 'login',
        });
    });
    it('should format date in proper way 1', async () => {
        const data = {
            a: 'a',
        };
        await onFormItemSubmit(data, props, ['web_addresses', 'labels']);
        expect(createVaultItem).toBeCalledWith({
            data: {
                login_item: {
                    a: 'a',
                    b: '',
                    newTextFieldName0: '',
                    newTextFieldLink0: '',
                    idLabelWeb: 1,
                    newLabel0: '',
                    newValue0: '',
                    idLabel: 1,
                },
            },
            id: 1,
            vaultId: 2,
            type: 'login',
        });
    });
    it('should format date in proper way 2', async () => {
        const data = {
            a: 'a',
            b: 'b',
            web_addresses: {
                a: {
                    label: 'w1',
                    value: 'w1',
                },
            },
            labels: {
                a: {
                    label: 'l1',
                    value: 'l1',
                },
                s: {
                    label: 'l2',
                    value: 'l2',
                },
            },
        };
        await onFormItemSubmit(data, props, ['web_addresses', 'labels']);
        expect(createVaultItem).toBeCalledWith({
            data: {
                login_item: {
                    a: 'a',
                    b: 'b',
                    newTextFieldName0: 'w1',
                    newTextFieldLink0: 'w1',
                    newTextFieldName1: '',
                    newTextFieldLink1: '',
                    idLabelWeb: 2,
                    newLabel0: 'l1',
                    newValue0: 'l1',
                    newLabel1: 'l2',
                    newValue1: 'l2',
                    newLabel2: '',
                    newValue2: '',
                    idLabel: 3,
                },
            },
            id: 1,
            vaultId: 2,
            type: 'login',
        });
    });
});
