import React from 'react';
import { mountSmart, shallowSmart } from "helpers/tests/enzymeHelpers";
import Document from 'components/Fields/FileInput/Document';

describe('Document', () => {
    let props = {};
    beforeEach(() => {
        props = {
            document: { id: 1, name: 'doc1' },
            onUpdate: jest.fn(),
            onDelete: jest.fn(),
            downloadFile: jest.fn(),
            updatable: true,
        };
    });
    it('should match snapshot', () => {
        const wrap = shallowSmart(<Document {...props}/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<Document {...props}/>);
        expect(wrap.find('Document')).toHaveLength(1);
    });
    it('should render document name with error color', () => {
        const wrap = mountSmart(<Document {...props} document={{ id: 1, name: 'error', file: { size: 999999999999 } }}/>);
        expect(wrap.find('Text').text()).toEqual('error');
        expect(wrap.find('Text').prop('style')).toHaveProperty('color', '#9f3a38');
    });
    it('should render document name without error color', () => {
        const wrap = mountSmart(<Document {...props} document={{ id: 1, name: 'error', file: { size: 454 } }}/>);
        expect(wrap.find('Text').text()).toEqual('error');
        expect(wrap.find('Text').prop('style')).toHaveProperty('color', '#44444f');
    });
    it('should render download icon if document has id and its status is not update', () => {
        const wrap = mountSmart(<Document {...props} document={{ id: 1, name: 'error', file: { size: 454 } }}/>);
        expect(wrap.find('Icon').at(1).prop('name')).toEqual('download');
    });
    it('should not render download icon if document has no id', () => {
        const wrap = mountSmart(<Document {...props} document={{ name: 'error', file: { size: 454 } }}/>);
        expect(wrap.find('Icon').at(1).prop('name')).not.toEqual('download');
    });
    it('should not render download icon if document has status update', () => {
        const wrap = mountSmart(<Document {...props} document={{ name: 'error', id: 1, to: 'update', file: { size: 454 } }}/>);
        expect(wrap.find('Icon').at(1).prop('name')).not.toEqual('download');
    });
    it('should upload file on button click', () => {
        const wrap = mountSmart(<Document {...props}/>);
        wrap.find('Icon').at(2).getElement().props.onClick();
        expect(wrap.find('Icon').at(2)).toHaveLength(1);
    });
    it('should no render delete and update icon if document is not updatable', () => {
        const wrap = mountSmart(<Document {...props} updatable={false}/>);
        expect(wrap.find('Icon')).toHaveLength(2);
    });
});
