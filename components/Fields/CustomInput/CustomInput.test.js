import React from 'react';
import { mountSmart, shallowSmart, mockStore, defineMatchMedia } from "helpers/tests/enzymeHelpers";
import CustomInput from 'components/Fields/CustomInput';
import { copyToClipboard, directToSite } from 'helpers/data/dataTransform';

jest.mock('helpers/data/dataTransform');

describe('CustomInput', () => {
    let props = {};
    beforeEach(() => {
        props = {
            input: { onChange: jest.fn() },
            meta: {},
        };
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<CustomInput {...props}/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<CustomInput {...props}/>);
        expect(wrap.find('CustomInput')).toHaveLength(1);
    });
    it('should not render ErrorText if it was not touched', () => {
        const wrap = mountSmart(<CustomInput {...props} meta={{ error: true }}/>);
        expect(wrap.find('Text__ErrorText')).toHaveLength(0);
    });
    it('should not render ErrorText if there is no error', () => {
        const wrap = mountSmart(<CustomInput {...props} meta={{ touched: true }}/>);
        expect(wrap.find('Text__ErrorText')).toHaveLength(0);
    });
    it('should render ErrorText if there is error and it was touched', () => {
        const wrap = mountSmart(<CustomInput {...props} meta={{ touched: true, error: true }}/>);
        expect(wrap.find('Text__ErrorText')).toHaveLength(1);
    });
    it('should render 2 icons withCopy', () => {
        const wrap = mountSmart(<CustomInput {...props} withCopy/>);
        expect(wrap.find('Icon')).toHaveLength(2);
    });
    it('should call copyToClipboard withCopy', () => {
        copyToClipboard.mockImplementationOnce(() => {});
        const wrap = mountSmart(<CustomInput {...props} withCopy/>);
        wrap.find('Icon').last().getElement().props.onClick();
        expect(copyToClipboard).toBeCalled();
    });
    it('should change value through formatValue func', () => {
        const wrap = mountSmart(<CustomInput {...props} formatValue={a => a + 1}/>);
        wrap.find('Input__StyledInput').first().getElement().props.onChange({}, { value: 2 });
        expect(props.input.onChange).toBeCalledWith(3);
    });
    it('should change value through default formatValue func', () => {
        const wrap = mountSmart(<CustomInput {...props}/>);
        wrap.find('Input__StyledInput').first().getElement().props.onChange({}, { value: 2 });
        expect(props.input.onChange).toBeCalledWith(2);
    });
    it('should call directToSite with http url if showLink prop is peresent', () => {
        directToSite.mockImplementationOnce(() => {});
        const wrap = mountSmart(<CustomInput {...props} input={{ value: 'http://facebook.com' }} showLink/>);
        wrap.find('.right-icon').last().getElement().props.onClick();
        expect(directToSite).toBeCalled();
    });
    it('should call directToSite without http url if showLink prop is peresent', () => {
        directToSite.mockImplementationOnce(() => {});
        const wrap = mountSmart(<CustomInput {...props} input={{ value: 'facebook.com' }} showLink/>);
        wrap.find('.right-icon').last().getElement().props.onClick();
        expect(directToSite).toBeCalled();
    });
});
