import React from 'react';
import { mountSmart, shallowSmart, mockStore, resizeTo, act } from "helpers/tests/enzymeHelpers";
import ActivitiesSettingsTable from 'components/Tables/ActivitiesSettingsTable';
import WActivitiesSettingsTable from 'components/Tables/ActivitiesSettingsTable/ActivitiesSettingsTable';

describe('ActivitiesSettingsTable', () => {
    const store = mockStore({});
    const props = { settings: [{ id: 1, entity_type: 1, action_type: 11, active_status: false }, { id: 2, entity_type: 2, action_type: 22, active_status: false }] };
    it('should match snapshot', () => {
        const wrap = shallowSmart(<ActivitiesSettingsTable {...props}/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<ActivitiesSettingsTable {...props}/>, store);
        expect(wrap.find('ActivitiesSettingsTable')).toHaveLength(1);
    });
    it('should render its children', () => {
        const wrap = mountSmart(<ActivitiesSettingsTable {...props}/>, store);
        expect(wrap.find('TableHeaderCell')).toHaveLength(3);
        expect(wrap.find('TableRow')).toHaveLength(3);
    });
    it('should render 4 cells if computer', () => {
        const wrap = mountSmart(<ActivitiesSettingsTable {...props}/>, store);
        expect(wrap.find('TableCell')).toHaveLength(9);
    });
    it('should not render table if mobile', () => {
        resizeTo('mobile');
        const wrap = mountSmart(<ActivitiesSettingsTable {...props}/>, store);
        expect(wrap.find('Table')).toHaveLength(0);
        expect(wrap.find('Text')).toHaveLength(1);
    });
    it('should update checkbox', async () => {
        resizeTo('computer');
        const markActivity = jest.fn(async () => {});
        const unmarkActivity = jest.fn(async () => {});
        const intl = { formatMessage: jest.fn() };
        const wrap = mountSmart(<WActivitiesSettingsTable {...props} markActivity={markActivity} unmarkActivity={unmarkActivity} intl={intl}/>);
        expect(wrap.find('Checkbox').first().getElement().props.checked).toEqual(false);
        await wrap.find('Checkbox').first().getElement().props.onChange();
        expect(markActivity).toBeCalledWith({ id: 1 });
        wrap.update();
        expect(wrap.find('Checkbox').first().getElement().props.checked).toEqual(true);
        await wrap.find('Checkbox').first().getElement().props.onChange();
        wrap.update();
        expect(unmarkActivity).toBeCalledWith({ id: 1 });
        expect(wrap.find('Checkbox').first().getElement().props.checked).toEqual(false);
    });
    it('should not update checkbox', async () => {
        resizeTo('computer');
        const markActivity = jest.fn(async () => { throw new Error(); });
        const intl = { formatMessage: jest.fn() };
        const wrap = mountSmart(<WActivitiesSettingsTable {...props} markActivity={markActivity} intl={intl}/>);
        expect(wrap.find('Checkbox').first().getElement().props.checked).toEqual(false);
        await wrap.find('Checkbox').first().getElement().props.onChange();
        expect(markActivity).toBeCalledWith({ id: 1 });
        wrap.update();
        expect(wrap.find('Checkbox').first().getElement().props.checked).toEqual(false);
    });
});
