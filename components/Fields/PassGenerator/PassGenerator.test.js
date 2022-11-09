import React from 'react';
import { mountSmart, shallowSmart } from "helpers/tests/enzymeHelpers";
import PassGenerator from 'components/Fields/PassGenerator';
import { getProgressData } from 'components/Fields/PassGenerator/PassGenerator';
import { copyToClipboard } from 'helpers/data/dataTransform';

jest.mock('helpers/data/dataTransform');
describe('PassGenerator', () => {
    let props = {};
    beforeEach(() => {
        props = {
            input: { onChange: jest.fn() },
            meta: {},
        };
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<PassGenerator {...props}/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<PassGenerator {...props}/>);
        expect(wrap.find('PassGenerator')).toHaveLength(1);
    });
    it('should not render ErrorText if it was not touched', () => {
        const wrap = mountSmart(<PassGenerator {...props} meta={{ error: true }}/>);
        expect(wrap.find('Text__ErrorText')).toHaveLength(0);
    });
    it('should not render ErrorText if there is no error', () => {
        const wrap = mountSmart(<PassGenerator {...props} meta={{ touched: true }}/>);
        expect(wrap.find('Text__ErrorText')).toHaveLength(0);
    });
    it('should render ErrorText if there is error and it was touched', () => {
        const wrap = mountSmart(<PassGenerator {...props} meta={{ touched: true, error: true }}/>);
        expect(wrap.find('Text__ErrorText')).toHaveLength(1);
    });
    it('should call onChange', () => {
        const wrap = mountSmart(<PassGenerator {...props}/>);
        wrap.find('.right-icon').first().simulate('click');
        wrap.find('GeneratePassForm').getElement().props.onSubmit('newPass');
        expect(props.input.onChange).toBeCalledWith('newPass');
    });
    it('should toggle input type', () => {
        const wrap = mountSmart(<PassGenerator {...props}/>);
        wrap.find('.eye-icon').first().simulate('click');
        expect(wrap.find('Input').first().getElement().props.type).toEqual('');
        wrap.find('.eye-icon').first().simulate('click');
        expect(wrap.find('Input').first().getElement().props.type).toEqual('password');
    });
    it('should render 4 icons withCopy', () => {
        const wrap = mountSmart(<PassGenerator {...props} withCopy/>);
        expect(wrap.find('Icon')).toHaveLength(4);
    });
    it('should call copyToClipboard withCopy', () => {
        copyToClipboard.mockImplementationOnce(() => {});
        const wrap = mountSmart(<PassGenerator {...props} withCopy/>);
        wrap.find('Icon').last().getElement().props.onClick();
        expect(copyToClipboard).toBeCalled();
    });
});

describe('getProgressData', () => {
    it.each([
        ['', { percent: 0, color: 'red' }],
        ['a', { percent: 20, color: 'red' }],
        ['a9b2', { percent: 40, color: 'orange' }],
        ['aC92', { percent: 60, color: 'yellow' }],
        ['aC9#2', { percent: 80, color: 'olive' }],
        ['aaC9#aC9#aC9#aC9#aC9#aC9#aC9#', { percent: 100, color: 'green' }],
    ])('should return proper value if password strength %#', (value, expected) => {
        expect(getProgressData(value)).toEqual(expected);
    });
});
