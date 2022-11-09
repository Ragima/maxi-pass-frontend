import FileManager from 'helpers/data/fileManager';

describe('FileManager', () => {
    let methods;
    let fm;
    beforeEach(() => {
        methods = {
            get: jest.fn(async () => {}),
            create: jest.fn(async () => {}),
            delete: jest.fn(async () => {}),
            update: jest.fn(async () => {}),
        };
        fm = new FileManager(methods);
    });
    it('should assign methods', () => {
        expect(fm.methods).toEqual(methods);
    });
    it('should update files depending on its parameters', async () => {
        const files = [
            { to: 'delete', id: 1 },
            { to: 'delete' },
            { to: 'update', id: 1 },
            { to: 'update' },
            { to: 'create' },
            { },
        ];
        await fm.updateFiles({ files });
        expect(methods.delete).toBeCalledTimes(1);
        expect(methods.create).toBeCalledTimes(2);
        expect(methods.update).toBeCalledTimes(1);
    });
    it('should not stop calling methods if any of them returned an error', async () => {
        const methods = {
            get: jest.fn(async () => {}),
            create: jest.fn(async () => { throw 'error'; }),
            delete: jest.fn(async () => {}),
            update: jest.fn(async () => {}),
        };
        const fm = new FileManager(methods);
        const files = [
            { to: 'update' },
            { to: 'create' },
            { to: 'update', id: 1 },
        ];
        await fm.updateFiles({ files });
        expect(methods.create).toBeCalledTimes(2);
        expect(methods.update).toBeCalledTimes(1);
    });
    it.each([
        [{ file: { size: 23 } }, true],
        [{}, true],
        [undefined, true],
        [{ file: { size: 1048576 } }, true],
        [{ file: { size: 1048577 } }, false],
        [{ file: { size: 9999999999 } }, false],
    ])('if document is %o should return %s', (value, expected) => {
        expect(FileManager.isValidSize(value)).toEqual(expected);
    });
    it('should download file', () => {
        const mock = jest.fn();
        global.URL = {
            createObjectURL: mock,
        };
        FileManager.downloadFile(undefined, { name: 'file' });
        expect(mock).toBeCalled();
    });
});
