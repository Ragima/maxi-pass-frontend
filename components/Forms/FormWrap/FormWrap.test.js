import React from 'react';
import { mountSmart, shallowSmart, mockStore, defineMatchMedia } from "helpers/tests/enzymeHelpers";
import FormWrap from 'components/Forms/FormWrap';

describe('FormWrap', () => {
    let props = {};
    beforeEach(() => {
        props = {
            onSubmit: jest.fn(async () => 4),
            children: jest.fn(data => <div className='toFind' data={data}>a</div>),
        };
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<FormWrap {...props}/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<FormWrap {...props}/>);
        expect(wrap.find('FormWrap')).toHaveLength(1);
    });
    it('should render its children', () => {
        const wrap = mountSmart(<FormWrap {...props}/>);
        expect(wrap.find('.toFind')).toHaveLength(1);
    });
    it('should call onSubmit', () => {
        const wrap = mountSmart(<FormWrap {...props}/>);
        wrap.find('form').getElement().props.onSubmit();
        expect(props.onSubmit).toBeCalled();
    });
    it('should pass isLoading true to children while submitting', () => {
        const wrap = mountSmart(<FormWrap {...props}/>);
        wrap.find('form').getElement().props.onSubmit();
        expect(props.children).toBeCalledWith({ isLoading: true, validating: false, active: undefined, values: {} });
    });
    it('should render hidden input if autocomplete', () => {
        const wrap = mountSmart(<FormWrap {...props}/>);
        expect(wrap.find('input')).toHaveLength(2);
    });
});
