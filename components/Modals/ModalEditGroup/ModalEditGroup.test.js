import React from 'react';
import { mountSmart, shallowSmart } from "helpers/tests/enzymeHelpers";
import ModalEditGroup from 'components/Modals/ModalEditGroup';

describe('ModalEditGroup', () => {
    it('should match snapshot', () => {
        const wrap = shallowSmart(<ModalEditGroup/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<ModalEditGroup/>);
        expect(wrap.find('ModalEditGroup')).toHaveLength(1);
    });
});
