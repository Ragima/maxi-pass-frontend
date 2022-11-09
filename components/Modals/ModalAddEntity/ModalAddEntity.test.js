import React from 'react';
import { mountSmart, shallowSmart } from "helpers/tests/enzymeHelpers";
import ModalAddEntity from 'components/Modals/ModalAddEntity';

describe('ModalAddEntity', () => {
    const props = {
        onSelect: jest.fn(),
        data: [],
        fields: [],
        modalKey: 'addGroup',
    };
    it('should match snapshot', () => {
        const wrap = shallowSmart(<ModalAddEntity {...props}/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<ModalAddEntity {...props}/>);
        expect(wrap.find('ModalAddEntity')).toHaveLength(1);
    });
});
