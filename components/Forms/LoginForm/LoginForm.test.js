import React from 'react';
import { mountSmart, shallowSmart, mockStore } from "helpers/tests/enzymeHelpers";
import LoginForm from 'components/Forms/LoginForm';
import WLoginForm from 'components/Forms/LoginForm/LoginForm';

describe('LoginForm', () => {
    const store = mockStore({});
    it('should match snapshot', () => {
        const wrap = shallowSmart(<LoginForm/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<LoginForm />, store);
        expect(wrap.find('LoginForm')).toHaveLength(1);
        expect(wrap.find('FieldWrap')).toHaveLength(3);
    });
    it('should not render team fields if team is present itself', () => {
        const wrap = mountSmart(<LoginForm team='team'/>, store);
        expect(wrap.find('LoginForm')).toHaveLength(1);
        expect(wrap.find('FieldWrap')).toHaveLength(2);
    });
    it('should call signIn on submit', async () => {
        const signIn = jest.fn();
        const initialize = jest.fn();
        const wrap = mountSmart(<WLoginForm signIn={signIn} initialize={initialize} intl={{ formatMessage: () => 'sd' }}/>, store);
        await wrap.find('form').getElement().props.onSubmit();
        expect(signIn).toBeCalled();
    });
    it('should call signIn on submit and add auth field if it returned specific error', async () => {
        const signIn = jest.fn(async () => { throw ['Your authenticated code is invalid ']; });
        const initialize = jest.fn();
        const wrap = mountSmart(<WLoginForm signIn={signIn} initialize={initialize} intl={{ formatMessage: () => 'sd' }}/>, store);
        await wrap.find('form').getElement().props.onSubmit();
        expect(signIn).toBeCalled();
        wrap.update();
        expect(wrap.find('FieldWrap')).toHaveLength(4);
    });
    it('should call signIn on submit and to not add auth field if it returned wrong error', async () => {
        const signIn = jest.fn(async () => { throw ['Boo ']; });
        const initialize = jest.fn();
        const wrap = mountSmart(<WLoginForm signIn={signIn} initialize={initialize} intl={{ formatMessage: () => 'sd' }}/>, store);
        await wrap.find('form').getElement().props.onSubmit();
        expect(signIn).toBeCalled();
        wrap.update();
        expect(wrap.find('FieldWrap')).toHaveLength(3);
    });
    it('should call signIn on submit with team if it is present', async () => {
        const signIn = jest.fn();
        const initialize = jest.fn();
        const wrap = mountSmart(<WLoginForm signIn={signIn} initialize={initialize} team='team' intl={{ formatMessage: () => 'sd' }}/>, store);
        await wrap.find('form').getElement().props.onSubmit();
        expect(signIn).toBeCalledWith({ team_name: 'team' });
    });
});
