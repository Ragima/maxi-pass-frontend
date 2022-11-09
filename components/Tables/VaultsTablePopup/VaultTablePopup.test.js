import React from 'react';
import { mountSmart, shallowSmart } from "helpers/tests/enzymeHelpers";
import VaultTablePopup from './VaultsTablePopup';

describe('VaultTablePopup', () => {
let props = {};
let child = {};
beforeEach(() => {   
    props = {
        intl: { formatMessage: jest.fn() },
        vault: {created_at: "2022-02-16",
        description: "test",
        id: "c298f9fd-632b-4a63-9bd1-e882024811e9",
        is_shared: true,
        items: 2,
        title: "test1",
        updated_at: "2022-02-1"},
        users: [],
    };        
    child = jest.fn(data => <div data={data}>a</div>)
});
it('should match snapshot', () => {
    const wrap = shallowSmart(<VaultTablePopup {...props}/>);
    expect(wrap).toMatchSnapshot();
});
it('should render itself', () => {
 const component = mountSmart(<VaultTablePopup {...props}>{child}</VaultTablePopup>);
 expect(component.find('VaultTablePopup')).toHaveLength(1);
});
});