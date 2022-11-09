import React from 'react';
import { mountSmart, shallowSmart, mockStore, defineMatchMedia } from "helpers/tests/enzymeHelpers";
import CustomCheckbox from 'components/Fields/CustomCheckbox';

describe('CustomCheckbox', () => {
    let props = {};
    beforeEach(() => {
        props = {
            input: {
                onChange: jest.fn(),
            },
            meta: {},
            onChange: jest.fn(),
        };
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<CustomCheckbox {...props}/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<CustomCheckbox {...props}/>);
        expect(wrap.find('CustomCheckbox')).toHaveLength(1);
    });
    it('should call onChange', () => {
        const wrap = mountSmart(<CustomCheckbox {...props}/>);
        wrap.find('Checkbox').getElement().props.onChange({}, { checked: true });
        expect(props.onChange).toBeCalledWith(true);
    });
});
