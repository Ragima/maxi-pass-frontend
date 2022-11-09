import React from 'react';
import { mountSmart, shallowSmart, mockStore } from "helpers/tests/enzymeHelpers";
import ActivitiesSettings, { afterFunc } from 'pages/activities_settings';

describe('ActivitiesSettings', () => {
    const store = mockStore({ user: {} });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<ActivitiesSettings/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<ActivitiesSettings/>, store);
        expect(wrap.find('ActivitiesSettings')).toHaveLength(1);
    });
});

jest.mock('helpers/initialize/initialize');
import { runAction } from "helpers/initialize/initialize";

describe('afterFunc', () => {
    it('should call return data', async () => {
        runAction.mockImplementationOnce(async () => { return 'data'; });
        expect(await afterFunc()).toEqual({ data: 'data' });
    });
    it('should return empty array', async () => {
        runAction.mockImplementationOnce(() => { throw new Error(); });
        expect(await afterFunc()).toEqual({ data: [] });
    });
});
