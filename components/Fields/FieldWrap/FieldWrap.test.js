import React from 'react';
import { mountSmart, shallowSmart, mockStore, defineMatchMedia } from "helpers/tests/enzymeHelpers";
import FieldWrap from 'components/Fields/FieldWrap';

describe('FieldWrap', () => {
    let props = {};
    beforeEach(() => {
        props = {
            name: 'name',
            validate: jest.fn(),
            component: null,
        };
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<FieldWrap {...props}/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<FieldWrap {...props}/>);
        expect(wrap.find('FieldWrap')).toHaveLength(1);
        expect(wrap.find('Field').getElement().props.initialValue).toEqual(undefined);
    });
    it('should render customInput field if component is not defined', () => {
        const wrap = mountSmart(<FieldWrap {...props} emptyValue/>);
        expect(wrap.find('CustomInput')).toHaveLength(1);
        expect(wrap.find('Field').getElement().props.parse).toEqual(null);
    });
    it('should render customInput field if component is input', () => {
        const wrap = mountSmart(<FieldWrap {...props} emptyValue component='input'/>);
        expect(wrap.find('CustomInput')).toHaveLength(1);
        expect(wrap.find('Field').getElement().props.parse).toEqual(null);
    });
    it('should render CustomMultipleInput field if component is multiple input', () => {
        const wrap = mountSmart(<FieldWrap {...props} emptyValue component='multiple_input'/>);
        expect(wrap.find('CustomMultipleInput')).toHaveLength(1);
        expect(wrap.find('Field').getElement().props.parse).toEqual(null);
    });
    it('should render CustomCheckbox field if component is checkbox', () => {
        const wrap = mountSmart(<FieldWrap {...props} emptyValue component='checkbox'/>);
        expect(wrap.find('CustomCheckbox')).toHaveLength(1);
        expect(wrap.find('Field').getElement().props.parse).toEqual(null);
    });
    it('should render TreeField field if component is tree', () => {
        const store = mockStore({ groups: [] });
        const wrap = mountSmart(<FieldWrap {...props} emptyValue component='tree'/>, store);
        expect(wrap.find('TreeField')).toHaveLength(1);
        expect(wrap.find('Field').getElement().props.parse).toEqual(null);
    });
    it('should render PassGenerator field if component is tree', () => {
        const store = mockStore({ groups: [] });
        const wrap = mountSmart(<FieldWrap {...props} emptyValue component='password_generator'/>, store);
        expect(wrap.find('PassGenerator')).toHaveLength(1);
        expect(wrap.find('Field').getElement().props.parse).toEqual(null);
    });
});
