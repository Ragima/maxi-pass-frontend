import React from 'react';
import { mountSmart, shallowSmart } from "helpers/tests/enzymeHelpers";
import GeneratePassForm from 'components/Forms/GeneratePassForm';
import { formatValue } from 'components/Forms/GeneratePassForm/GeneratePassForm';

describe('GeneratePassForm', () => {
    it('should match snapshot', () => {
        const wrap = shallowSmart(<GeneratePassForm/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<GeneratePassForm />);
        expect(wrap.find('GeneratePassForm')).toHaveLength(1);
    });
    it('should call editGroup and onSubmit on submit', async () => {
        const onSubmit = jest.fn();
        const wrap = mountSmart(<GeneratePassForm onSubmit={onSubmit}/>);
        await wrap.find('form').getElement().props.onSubmit();
        expect(onSubmit).toBeCalled();
    });
    it('should call editGroup and not to call onSubmit on submit', async () => {
        const onSubmit = jest.fn();
        const wrap = mountSmart(<GeneratePassForm onSubmit={null}/>);
        await wrap.find('form').getElement().props.onSubmit();
        expect(onSubmit).not.toBeCalled();
    });
    it('should return max allowed value', async () => {
        expect(formatValue(128)).toEqual(128);
    });
    it('should return no more than max allowed value', async () => {
        expect(formatValue(2342234)).toEqual(128);
    });
    it('should return min allowed value', async () => {
        expect(formatValue(0)).toEqual(0);
    });
    it('should return no less than allowed value', async () => {
        expect(formatValue(-4545)).toEqual(0);
    });
    it('should return value', async () => {
        expect(formatValue(45)).toEqual(45);
    });
});
