import React from 'react';
import { mountSmart, shallowSmart, mockStore } from "helpers/tests/enzymeHelpers";
import AcceptForm from 'components/Forms/AcceptForm';
import WAcceptForm from 'components/Forms/AcceptForm/AcceptForm';

describe('AcceptForm', () => {
    const store = mockStore({});
    it('should match snapshot', () => {
        const wrap = shallowSmart(<AcceptForm/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<AcceptForm />, store);
        expect(wrap.find('AcceptForm')).toHaveLength(1);
    });
    it('should call signIn on submit', () => {
        const acceptInvitation = jest.fn();
        const wrap = mountSmart(<WAcceptForm acceptInvitation={acceptInvitation} intl={{ formatMessage: () => 'sd' }}/>, store);
        wrap.find('form').getElement().props.onSubmit();
        expect(acceptInvitation).toBeCalled();
    });
});
