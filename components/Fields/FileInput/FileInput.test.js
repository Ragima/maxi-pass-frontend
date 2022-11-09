import React from 'react';
import { mountSmart, shallowSmart, mockStore } from "helpers/tests/enzymeHelpers";
import FileInput from 'components/Fields/FileInput';
import WFileInput from 'components/Fields/FileInput/FileInput';
import FileManager from 'helpers/data/fileManager';

jest.mock('helpers/data/fileManager');

describe('FileInput', () => {
    let props = {};
    let store;
    beforeEach(() => {
        props = {
            input: {
                onChange: jest.fn(),
                value: [{ id: 5, name: 'hi' }, { id: 2, name: 'johb' }],
            },
            meta: {
                touched: true,
            },
            getDocument: jest.fn(async () => {}),
            updatable: true,
        };
        store = mockStore({});
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<FileInput {...props}/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<FileInput {...props}/>, store);
        expect(wrap.find('FileInput')).toHaveLength(1);
    });
    it('should render 2 documents', () => {
        const wrap = mountSmart(<FileInput {...props}/>, store);
        expect(wrap.find('Document')).toHaveLength(2);
    });
    it('should render error', () => {
        const wrap = mountSmart(<FileInput {...props} meta={{ touched: true, error: "name" }}/>, store);
        expect(wrap.find('ErrorCaption').text()).toEqual('Name');
    });
    it('should handle addNewFiles', () => {
        const wrap = mountSmart(<FileInput {...props}/>, store);
        wrap.find('input').last().getElement().props.onChange({ target: { files: [{ name: 1 }, { name: 2 }] } });
        expect(props.input.onChange).toBeCalledWith([...props.input.value,
            { name: 1, id: null, file: { name: 1 }, to: 'create' }, { id: null, name: 2, file: { name: 2 }, to: 'create' }]);
    });
    it('should handle updateFile', () => {
        const wrap = mountSmart(<FileInput {...props}/>, store);
        wrap.find('Document').first().getElement().props.onUpdate({ target: { files: [{ name: 1 }] } });
        expect(props.input.onChange).toBeCalledWith([{ name: 1, id: 5, file: { name: 1 }, to: 'update' }, { id: 2, name: 'johb' }]);
    });
    it('should handle deleteFile', () => {
        const wrap = mountSmart(<FileInput {...props}/>, store);
        wrap.find('Document').first().getElement().props.onDelete();
        expect(props.input.onChange).toBeCalledWith([{ id: 5, name: 'hi', to: 'delete' }, { id: 2, name: 'johb' }]);
    });
    it('should handle downloadFile', async () => {
        FileManager.mockImplementationOnce(() => {});
        const wrap = mountSmart(<WFileInput {...props}/>, store);
        await wrap.find('Document').first().getElement().props.downloadFile();
        expect(props.getDocument).toBeCalled();
    });
    it('should upload file on button click', () => {
        const wrap = mountSmart(<FileInput {...props}/>, store);
        wrap.find('Button__CommonButton').getElement().props.onClick();
        expect(wrap.find('Button__CommonButton')).toHaveLength(1);
    });
    it('should not render button if field is not updatable', () => {
        const wrap = mountSmart(<FileInput {...props} updatable={false}/>, store);
        expect(wrap.find('Button__CommonButton')).toHaveLength(0);
    });
});
