import React from 'react';
import { mountSmart, shallowSmart, mockStore } from "helpers/tests/enzymeHelpers";
import Settings from 'pages/settings';
import WSettings from 'pages_components/Settings';

describe('Settings', () => {
    const store = mockStore({ user: {} });
    let props;
    beforeEach(() => {
        props = {
            intl: { formatMessage: jest.fn() },
            enableTwoFactor: jest.fn(),
            disableTwoFactor: jest.fn(),
        };
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<Settings/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself and not render a message for pass change', () => {
        const wrap = mountSmart(<Settings/>, store);
        expect(wrap.find('Settings')).toHaveLength(1);
        expect(wrap.find('Message')).toHaveLength(0);
    });

    it('should render itself and not render a message for pass change when user otp is required', () => {
        const store = mockStore({ user: { otpRequired: true } });
        const wrap = mountSmart(<Settings/>, store);
        expect(wrap.find('Settings')).toHaveLength(1);
        expect(wrap.find('Message')).toHaveLength(0);
    });
    it('should render message for pass change ', () => {
        const store = mockStore({ user: { password_expired: true } });
        const wrap = mountSmart(<Settings/>, store);
        expect(wrap.find('Message')).toHaveLength(1);
    });
    it('should render enabled button and call enable otp on callback ', () => {
        const wrap = mountSmart(<WSettings {...props} role='admin' otpRequired={false}/>, store);
        wrap.find('ConfirmModal').getElement().props.callback();
        expect(props.enableTwoFactor).toBeCalled();
    });
    it('should render disabled button and call disable otp on callback ', () => {
        const wrap = mountSmart(<WSettings {...props} role='admin' otpRequired/>, store);
        wrap.find('ConfirmModal').getElement().props.callback();
        expect(props.disableTwoFactor).toBeCalled();
    });
    it('should not render otp button if user is lead', () => {
        const wrap = mountSmart(<WSettings {...props} role='admin' otpRequired isLead/>, store);
        expect(wrap.find('ConfirmModal')).toHaveLength(0);
    });
});
