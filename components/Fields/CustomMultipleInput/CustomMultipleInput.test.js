import React from 'react';
import { mountSmart, shallowSmart, mockStore, act } from "helpers/tests/enzymeHelpers";
import CustomMultipleInput from 'components/Fields/CustomMultipleInput';

describe('CustomMultipleInput', () => {
    let props = {};
    beforeEach(() => {
        props = {
            input: {
                onChange: jest.fn(),
            },
            meta: {},
        };
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<CustomMultipleInput {...props}/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<CustomMultipleInput {...props}/>);
        expect(wrap.find('CustomMultipleInput')).toHaveLength(1);
    });
    it('should not render ErrorText if it was not touched', () => {
        const wrap = mountSmart(<CustomMultipleInput {...props} meta={{ error: true }}/>);
        expect(wrap.find('Text__ErrorText')).toHaveLength(0);
    });
    it('should not render ErrorText if there is no error', () => {
        const wrap = mountSmart(<CustomMultipleInput {...props} meta={{ touched: true }}/>);
        expect(wrap.find('Text__ErrorText')).toHaveLength(0);
    });
    it('should render ErrorText if there is error and it was touched', () => {
        const wrap = mountSmart(<CustomMultipleInput {...props} meta={{ touched: true, error: true }}/>);
        expect(wrap.find('Text__ErrorText')).toHaveLength(1);
    });
    it('should render FieldsLine', () => {
        const wrap = mountSmart(<CustomMultipleInput {...props} input={{ value: undefined }}/>);
        expect(wrap.find('FieldsLine')).toHaveLength(1);
    });
    it('should render 2 FieldsLines', () => {
        const wrap = mountSmart(<CustomMultipleInput {...props} input={{ value: { 0: { value: 'asd' } } }}/>);
        expect(wrap.find('FieldsLine')).toHaveLength(2);
    });
    it('should delete field if it is not last', () => {
        const onChange = jest.fn();
        const wrap = mountSmart(<CustomMultipleInput {...props} input={{ value: { 0: { value: 'asd' }, 1: { value: 'asdas' } }, onChange }}/>);
        expect(wrap.find('FieldsLine')).toHaveLength(3);
        act(() => wrap.find('FieldsLine').first().getElement().props.deleteField());
        wrap.update();
        expect(onChange).toBeCalledWith({ 1: { value: 'asdas' } });
    });
    it('should do nothing to field if it is last', () => {
        const onChange = jest.fn();
        const wrap = mountSmart(<CustomMultipleInput {...props} input={{ value: { 0: { value: 'asd' }, 1: { value: 'asdas' } }, onChange }}/>);
        expect(wrap.find('FieldsLine')).toHaveLength(3);
        act(() => wrap.find('FieldsLine').last().getElement().props.deleteField());
        wrap.update();
        expect(onChange).toBeCalledWith({ 0: { value: 'asd' }, 1: { value: 'asdas' } });
        expect(wrap.find('FieldsLine')).toHaveLength(3);
    });
    it('should change data in proper place', () => {
        const onChange = jest.fn();
        const wrap = mountSmart(<CustomMultipleInput {...props} input={{ value: { 0: { value: 'asd' } }, onChange }}/>);
        expect(wrap.find('FieldsLine')).toHaveLength(2);
        wrap.find('FieldsLine').first().getElement().props.onChange({}, { value: 'hey', name: 'value' });
        expect(onChange).toBeCalledWith({ 0: { value: 'hey' } });
    });
    it('should change data in proper place with another name', () => {
        const onChange = jest.fn();
        const wrap = mountSmart(<CustomMultipleInput {...props} input={{ value: { 0: { value: 'asd' } }, onChange }}/>);
        expect(wrap.find('FieldsLine')).toHaveLength(2);
        wrap.find('FieldsLine').first().getElement().props.onChange({}, { value: 'hey', name: 'label' });
        expect(onChange).toBeCalledWith({ 0: { value: 'asd', label: 'hey' } });
    });
});
