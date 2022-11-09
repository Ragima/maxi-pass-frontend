import React, { useRef } from 'react';
import { Flex } from 'styled_components/Flexbox';
import { Text } from 'styled_components/Text';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import FileManager from 'helpers/data/fileManager';

const Document = ({ document, onDelete, onUpdate, downloadFile, intl, updatable }) => {
    const input = useRef(null);

    const uploadFile = () => input.current && input.current.click();

    return document.to !== 'delete' && (
        <Flex height='auto' padding='10px' align='baseline'>
            <Icon circular inverted color='grey' style={{ flex: '0 0 auto' }} name='file'/>
            <Text truncate inverted style={{ flex: '1 1 100%', padding: '0 5px', color: FileManager.isValidSize(document) ? '#44444f' : '#9f3a38' }}>{document.name}</Text>
            {document.id && document.to !== 'update' && <Icon style={{ flex: '0 0 auto' }} title={intl.formatMessage({ id: 'download' })} circular inverted color='blue' name='download' onClick={downloadFile} link/>}
            <input type='file' multiple onChange={onUpdate} style={{ display: 'none' }} ref={input}/>
            {updatable && (
                <>
                    <Icon style={{ flex: '0 0 auto' }} title circular inverted title={intl.formatMessage({ id: 'update' })} color='blue' name='upload' onClick={uploadFile} link/>
                    <Icon style={{ flex: '0 0 auto' }} circular inverted title={intl.formatMessage({ id: 'delete' })} color='red' name='delete' onClick={onDelete} link/>
                </>
            )}
        </Flex>);
};

Document.propTypes = {
    document: PropTypes.object.isRequired,
    updatable: PropTypes.bool,
    intl: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    downladFile: PropTypes.func.isRequired,
};

export default Document;
