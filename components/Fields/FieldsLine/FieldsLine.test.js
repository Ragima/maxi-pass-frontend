import React from 'react';
import { mountSmart, shallowSmart, mockStore, act } from "helpers/tests/enzymeHelpers";
import FieldsLine from 'components/Fields/FieldsLine';

describe('FieldsLine', () => {
    let props = {};
    beforeEach(() => {
        props = {
            onChange: jest.fn(),
            onBlur: jest.fn(),
            deleteField: jest.fn(),
        };
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<FieldsLine {...props}/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<FieldsLine {...props}/>);
        expect(wrap.find('FieldsLine')).toHaveLength(1);
    });
    it('should not call directToSite with empty url if showLink prop is present', () => {
        window.open = jest.fn();
        const wrap = mountSmart(<FieldsLine {...props} showLink/>);
        wrap.find('Icon').at(1).getElement().props.onClick();
        expect(window.open).not.toBeCalledWith('http://', '_blank');
    });
    it('should call directToSite with http url if showLink prop is peresent', () => {
        window.open = jest.fn();
        const wrap = mountSmart(<FieldsLine {...props} value={{ value: 'http://facebook.com' }} showLink/>);
        wrap.find('Icon').at(1).getElement().props.onClick();
        expect(window.open).toBeCalledWith('http://facebook.com', '_blank');
    });
    it('should call directToSite without http url if showLink prop is peresent', () => {
        window.open = jest.fn();
        const wrap = mountSmart(<FieldsLine {...props} value={{ value: 'facebook.com' }} showLink/>);
        wrap.find('Icon').at(1).getElement().props.onClick();
        expect(window.open).toBeCalledWith('http://facebook.com', '_blank');
    });
    it('should call onChange on first input', () => {
        const wrap = mountSmart(<FieldsLine {...props}/>);
        wrap.find('Input').first().getElement().props.onChange();
        expect(props.onChange).toBeCalled();
    });
    it('should call onChange on last input', () => {
        const wrap = mountSmart(<FieldsLine {...props}/>);
        wrap.find('Input').last().getElement().props.onChange();
        expect(props.onChange).toBeCalled();
    });
    it('should call deleteField on first icon', () => {
        const wrap = mountSmart(<FieldsLine {...props}/>);
        wrap.find('Icon').last().getElement().props.onClick();
        expect(props.deleteField).toBeCalled();
    });
});
