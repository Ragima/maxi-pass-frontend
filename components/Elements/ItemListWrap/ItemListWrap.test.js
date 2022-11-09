import React from 'react';
import { mountSmart, shallowSmart } from "helpers/tests/enzymeHelpers";
import ItemListWrap from 'components/Elements/ItemListWrap';

describe('ItemListWrap', () => {
    let props = {};
    let child = {};
    beforeEach(() => {
        props = {
            data: ['one', 'two'],
            keyName: 'newVault',
            searchKey: 'searchVaults',
            modalComponent: <div className='toFind'/>,
        };
        child = jest.fn(data => <div data={data}>a</div>);
    });
    it('should match snapshot', () => {
        const component = shallowSmart(<ItemListWrap {...props}>{child}</ItemListWrap>);
        expect(component).toMatchSnapshot();
    });
    it('should render itself', () => {
        const component = mountSmart(<ItemListWrap {...props}>{child}</ItemListWrap>);
        expect(component.find('ItemListWrap')).toHaveLength(1);
    });
    it('should render itself searchWrap', () => {
        const component = mountSmart(<ItemListWrap {...props} withSearch>{child}</ItemListWrap>);
        expect(component.find('SearchWrap')).toHaveLength(1);
    });
    it('should render its modal component', () => {
        const component = mountSmart(<ItemListWrap {...props}>{child}</ItemListWrap>);
        expect(component.find('.toFind')).toHaveLength(1);
    });
    it('should call children with given data', () => {
        mountSmart(<ItemListWrap {...props}>{child}</ItemListWrap>);
        expect(child).toBeCalledWith(props.data);
    });
    it('should call children with given data if data is absent', () => {
        mountSmart(<ItemListWrap {...props} data={undefined}>{child}</ItemListWrap>);
        expect(child).toBeCalledWith([]);
    });
});
