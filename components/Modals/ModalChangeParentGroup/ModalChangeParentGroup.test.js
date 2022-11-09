import React from 'react';
import { mountSmart, shallowSmart } from "helpers/tests/enzymeHelpers";
import ModalChangeParentGroup from 'components/Modals/ModalChangeParentGroup';

describe('ModalChangeParentGroup', () => {
    it('should match snapshot', () => {
        const wrap = shallowSmart(<ModalChangeParentGroup/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<ModalChangeParentGroup/>);
        expect(wrap.find('ModalChangeParentGroup')).toHaveLength(1);
    });
});
