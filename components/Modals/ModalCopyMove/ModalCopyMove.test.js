import React from 'react';
import { mountSmart, shallowSmart } from "helpers/tests/enzymeHelpers";
import ModalCopyMove from 'components/Modals/ModalCopyMove';

describe('ModalCopyMove', () => {
    const props = {
        item: {},
    };
    it('should match snapshot', () => {
        const wrap = shallowSmart(<ModalCopyMove {...props}/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<ModalCopyMove {...props}/>);
        expect(wrap.find('ModalCopyMove')).toHaveLength(1);
    });
});
