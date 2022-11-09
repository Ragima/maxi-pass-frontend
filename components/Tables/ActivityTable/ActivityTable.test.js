import React from 'react';
import { mountSmart, shallowSmart, mockStore, resizeTo, act } from "helpers/tests/enzymeHelpers";
import ActivityTable from 'components/Tables/ActivityTable';
import WActivityTable from 'components/Tables/ActivityTable/ActivityTable';
import debounce from 'lodash/debounce';

jest.mock('lodash/debounce');

describe('ActivityTable', () => {
    let props = { };
    beforeEach(() => {
        props = {
            getActivities: jest.fn(),
            activities: {
                current_page: 1,
                total_pages: 2,
                data: [],
            },
            intl: { formatMessage: jest.fn() },
        };
    });
    const store = mockStore({ activities: { data: [], current_page: 1, total_pages: 2 }, users: [], user: {} }); 
    it('should match snapshot', () => {
        const wrap = shallowSmart(<ActivityTable {...props}/>, store);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<ActivityTable {...props}/>, store);
        expect(wrap.find('ActivityTable')).toHaveLength(1);
        expect(wrap.find('Grid')).toHaveLength(1);
    });
    it('should changeFromDate', () => {
        const wrap = mountSmart(<ActivityTable {...props}/>, store);
        act(() => wrap.find('DayPickerInput').first().getElement().props.onDayChange('from'));
        wrap.update();
        expect(wrap.find('DayPickerInput').first().getElement().props.value).toEqual('from');
    });
    it('should changeFromDate to undefined', () => {
        const wrap = mountSmart(<ActivityTable {...props}/>, store);
        act(() => wrap.find('Input').at(3).find('Icon').last()
            .getElement().props.onClick());
        wrap.update();
        expect(wrap.find('DayPickerInput').first().getElement().props.value).toEqual('');
    });
    it('should changeToDate to undefined', () => {
        const wrap = mountSmart(<ActivityTable {...props}/>, store);
        act(() => wrap.find('Input').at(4).find('Icon').last()
            .getElement().props.onClick());
        wrap.update();
        expect(wrap.find('DayPickerInput').last().getElement().props.value).toEqual('');
    });
    it('should changeToDate', () => {
        const wrap = mountSmart(<ActivityTable {...props}/>, store);
        act(() => wrap.find('DayPickerInput').last().getElement().props.onDayChange('to'));
        wrap.update();
        expect(wrap.find('DayPickerInput').last().getElement().props.value).toEqual('to');
    });
    it('should call getActivities', () => {
        debounce.mockImplementationOnce(fn => fn());
        const wrap = mountSmart(<WActivityTable {...props} activities={{ data: [{}] }}/>, store);
        act(() => wrap.find('Input').first().getElement().props.onChange({}, { value: 'action', name: 'activity_type' }));
        wrap.update();
        wrap.find('ActivityTable').instance().getData();
        expect(props.getActivities).toBeCalledWith({
            activity_type: "action",
            page: 1,
        });
    });
    it('should not render data and pagination if empty activities', () => {
        const wrap = mountSmart(<ActivityTable {...props} activities={{ data: [] }}/>, store);
        expect(wrap.find('NoDataText')).toHaveLength(1);
    });
    it('should render data and pagination if not empty activities', () => {
        const store = mockStore({ activities: { data: [{}], current_page: 1, total_pages: 2 }, users: [], user: {} }); 
        const wrap = mountSmart(<ActivityTable {...props}/>, store);
        expect(wrap.find('ActivityData')).toHaveLength(1);
    });
    it('should call getActivities on page changing', () => {
        const wrap = mountSmart(<WActivityTable {...props} activities={{ data: [{}], current_page: 1, total_pages: 2 }}/>, store);
        wrap.find('Pagination').getElement().props.onPageChange({}, { activePage: 2 });
        expect(props.getActivities).toBeCalledWith({ page: 2 });
    });
    it('should not render grid on mobile', () => {
        resizeTo('mobile');
        const wrap = mountSmart(<ActivityTable {...props}/>, store);
        expect(wrap.find('Grid')).toHaveLength(0);
    });
});
