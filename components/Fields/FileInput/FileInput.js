import React, { useRef, useCallback } from 'react';
import { Flex } from 'styled_components/Flexbox';
import ErrorCaption from 'components/Elements/ErrorCaption';
import PropTypes from 'prop-types';
import CommonButton from 'components/Elements/CommonButton';
import Document from 'components/Fields/FileInput/Document';
import FileManager from 'helpers/data/fileManager';
import _ from 'lodash';


const FileInput = ({ input: { onChange, value, ...restInput }, meta, title, params, getDocument, updatable }) => {
    const isError = !!(meta.touched && meta.error);
    const multipleInput = useRef(null);

    const addNewFiles = (e) => {
        const files = e.target.files;
        const data = [...value, ..._.map(files, file => ({ name: file.name, file, id: null, to: 'create' }))];
        onChange(data);
    }; 

    const updateFile = index => (e) => {
        const file = e.target.files[0];
        const data = _.map(value, (doc, position) => (position === index 
            ? ({ ...doc, to: 'update', file, name: file.name })
            : doc));
        onChange(data);
    };

    const uploadFile = () => multipleInput.current && multipleInput.current.click();

    const downloadFile = document => async () => {
        const blobFile = await getDocument({ fileId: document.id, ...params });
        FileManager.downloadFile(blobFile, document);
    };

    const deleteFile = index => () => {
        const data = _.map(value, (doc, position) => (position === index 
            ? ({ ...doc, to: 'delete' })
            : doc));
        onChange(data);
    };

    return (
        <>
            <Flex direction='column' margin='10px 0' align='flex-end' relative height='auto'>
                {_.map(value, (doc, index) => <Document downloadFile={downloadFile(doc)} updatable={updatable} document={doc} onUpdate={updateFile(index)} onDelete={deleteFile(index)}/>)}
                <input type='file' multiple onChange={addNewFiles} style={{ display: 'none' }} ref={multipleInput}/>
                {updatable && <CommonButton margin='5px 10px' type='button' {...restInput} onClick={uploadFile} compact>{title}</CommonButton>}
                {isError && <ErrorCaption>{meta.error}</ErrorCaption>}
            </Flex>
        </>
    );
};

FileInput.propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    updatable: PropTypes.bool,
    label: PropTypes.string,
};

export default FileInput;
