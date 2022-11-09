/* eslint-disable no-restricted-syntax */
import _ from 'lodash';

const BYTES_IN_MB = 1048576;
class FileManager {
    constructor(methods) {
        this.methods = methods;
    }

    async updateFiles({ files, params = {} }) {
        for (const document of files) {
            try {
                const data = new FormData();
                data.append('document[file]', document.file);

                if (document.to === 'delete') {
                    if (document.id) await this.methods.delete({ fileId: document.id, ...params });
                } else if (document.to === 'update') {
                    if (document.id) {
                        await this.methods.update({ fileId: document.id, data, ...params });
                    } else {
                        await this.methods.create({ data, ...params });
                    }
                } else if (document.to === 'create') {
                    await this.methods.create({ data, ...params });
                }
            } catch {
                continue;
            }
        }
    }

    static isValidSize(doc) {
        const size = _.get(doc, 'file.size');
        return !size || size <= BYTES_IN_MB;
    }

    static downloadFile = (file, doc) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(new Blob([file]));
        link.setAttribute('download', doc.name);
        document.body.appendChild(link);
        link.click();
    }
}

export default FileManager;
