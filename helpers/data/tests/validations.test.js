import validations from 'helpers/data/validations';

const regAssert = /.+Validation/;

describe('emailValidate', () => {
    it.each(['aa@aa.aa', 'aa@aaa.aa'])('%s should pass validation test', (value) => {
        expect(validations.email(value)).toEqual(false);
    });
    it.each(['', undefined, 'aa@aaaaa', 's'])('%s should not pass validation test', (value) => {
        expect(validations.email(value)).toMatch(regAssert);
    });
});

describe('teamName', () => {
    it.each(['hello', 'newteam', 'a'.repeat(50)])('%s should pass validation test', (value) => {
        expect(validations.teamName(value)).toEqual(false);
    });
    it.each(['', undefined, 'new team', 'a'.repeat(51)])('%s should not pass validation test', (value) => {
        expect(validations.teamName(value)).toMatch(regAssert);
    });
});

describe('userNames', () => {
    it.each(['hello', 'new team', 'a'.repeat(50)])('%s should pass validation test', (value) => {
        expect(validations.userNames(value)).toEqual(false);
    });
    it.each(['', undefined, 'a'.repeat(51)])('%s should not pass validation test', (value) => {
        expect(validations.userNames(value)).toMatch(regAssert);
    });
});

describe('userName', () => {
    it.each(['hello', 'new team', 'a'.repeat(100)])('%s should pass validation test', (value) => {
        expect(validations.userName(value)).toEqual(false);
    });
    it.each(['', undefined, 'a'.repeat(101)])('%s should not pass validation test', (value) => {
        expect(validations.userName(value)).toMatch(regAssert);
    });
});

describe('groupName', () => {
    it.each(['hello', 'new team', 'a'.repeat(50)])('%s should pass validation test', (value) => {
        expect(validations.groupName(value)).toEqual(false);
    });
    it.each(['', undefined, 'a'.repeat(51)])('%s should not pass validation test', (value) => {
        expect(validations.groupName(value)).toMatch(regAssert);
    });
});

describe('password', () => {
    it.each(['new team', 'a'.repeat(128)])('%s should pass validation test', (value) => {
        expect(validations.password(value)).toEqual(false);
    });
    it.each(['', undefined, 'hello', 'a'.repeat(129), 'a'.repeat(7)])('%s should not pass validation test', (value) => {
        expect(validations.password(value)).toMatch(regAssert);
    });
});

describe('newPassword', () => {
    it.each(['aaaaaaaaaaaaaaa7H!'])('%s should pass validation test', (value) => {
        expect(validations.newPassword(value)).toEqual(false);
    });
    it.each(['', undefined, 'hello', 'a'.repeat(129), 'a'.repeat(7), 'aaaaaaaaaaaa7H!', 'aaaaaaaaaaaaaH!a', 'aaaaaaaaaaaa7a!a', 'aaaaaaaaaaaa7Haa'])('%s should not pass validation test', (value) => {
        expect(validations.newPassword(value)).toMatch(regAssert);
    });
});

describe('vaultTitle', () => {
    it.each(['hello', 'new team', 'a'.repeat(50)])('%s should pass validation test', (value) => {
        expect(validations.vaultTitle(value)).toEqual(false);
    });
    it.each(['', undefined, 'a'.repeat(51)])('%s should not pass validation test', (value) => {
        expect(validations.vaultTitle(value)).toMatch(regAssert);
    });
});

describe('vaultItemTitle', () => {
    it.each(['hello', 'new team', 'a'.repeat(50)])('%s should pass validation test', (value) => {
        expect(validations.vaultItemTitle(value)).toEqual(false);
    });
    it.each(['', undefined, 'a'.repeat(51)])('%s should not pass validation test', (value) => {
        expect(validations.vaultItemTitle(value)).toMatch(regAssert);
    });
});

describe('vaultItemTags', () => {
    it.each(['hello', 'new team', 'a'.repeat(300), '', undefined])('%s should pass validation test', (value) => {
        expect(validations.vaultItemTags(value)).toEqual(false);
    });
    it.each(['a'.repeat(301)])('%s should not pass validation test', (value) => {
        expect(validations.vaultItemTags(value)).toMatch(regAssert);
    });
});

describe('passwordMatch', () => {
    it.each([['hello', { password: 'hello' }], ['new team', { password: 'new team' }], ['', { password: '' }]])('%s should pass validation test', (data, values) => {
        expect(validations.passwordMatch(data, values)).toEqual(false);
    });
    it.each([['hello', { password: 'helslo' }], ['new team', { password: 'n' }]])('%s should not pass validation test', (data, values) => {
        expect(validations.passwordMatch(data, values)).toMatch(regAssert);
    });
});

describe('vaultDescription', () => {
    it.each(['hello', 'new team', '', undefined, 'a'.repeat(70)])('%s should pass validation test', (value) => {
        expect(validations.vaultDescription(value)).toEqual(false);
    });
    it.each(['a'.repeat(71)])('%s should not pass validation test', (value) => {
        expect(validations.vaultDescription(value)).toMatch(regAssert);
    });
});

describe('cardholderName', () => {
    it.each(['hello', 'new team', 'a'.repeat(100), '', undefined])('%s should pass validation test', (value) => {
        expect(validations.cardholderName(value)).toEqual(false);
    });
    it.each(['a'.repeat(101)])('%s should not pass validation test', (value) => {
        expect(validations.cardholderName(value)).toMatch(regAssert);
    });
});
describe('cardType', () => {
    it.each(['hello', 'new team', 'a'.repeat(100), '', undefined])('%s should pass validation test', (value) => {
        expect(validations.cardType(value)).toEqual(false);
    });
    it.each(['a'.repeat(101)])('%s should not pass validation test', (value) => {
        expect(validations.cardType(value)).toMatch(regAssert);
    });
});
describe('cvc', () => {
    it.each(['hello', 'new team', 'a'.repeat(20), '', undefined])('%s should pass validation test', (value) => {
        expect(validations.cvc(value)).toEqual(false);
    });
    it.each(['a'.repeat(21)])('%s should not pass validation test', (value) => {
        expect(validations.cvc(value)).toMatch(regAssert);
    });
});

describe('number', () => {
    it.each(['1'.repeat(30), '', undefined, '12312312312123', '12312 123123 12312 1231'])('%s should pass validation test', (value) => {
        expect(validations.number(value)).toEqual(false);
    });
    it.each(['hello', 'new team', 'a'.repeat(30), 'a'.repeat(31)])('%s should not pass validation test', (value) => {
        expect(validations.number(value)).toMatch(regAssert);
    });
});

describe('cardDate', () => {
    it.each(['1'.repeat(7), '', undefined, '12312', '23/3422'])('%s should pass validation test', (value) => {
        expect(validations.cardDate(value)).toEqual(false);
    });
    it.each(['23/34223', 'a'.repeat(8)])('%s should not pass validation test', (value) => {
        expect(validations.cardDate(value)).toMatch(regAssert);
    });
});

describe('notes', () => {
    it.each(['1'.repeat(300), '', undefined, '12312', '23/3422'])('%s should pass validation test', (value) => {
        expect(validations.notes(value)).toEqual(false);
    });
    it.each(['a'.repeat(301)])('%s should not pass validation test', (value) => {
        expect(validations.notes(value)).toMatch(regAssert);
    });
});

describe('dynamicField', () => {
    it.each(['1'.repeat(200), '', undefined, '12312', '23/3422'])('%s should pass validation test', (value) => {
        expect(validations.dynamicField(value)).toEqual(false);
    });
    it.each(['a'.repeat(201)])('%s should not pass validation test', (value) => {
        expect(validations.dynamicField(value)).toMatch(regAssert);
    });
});

describe('passwordGenerator', () => {
    it.each(['1'.repeat(128), '', undefined, '12312', '23/3422'])('%s should pass validation test', (value) => {
        expect(validations.passwordGenerator(value)).toEqual(false);
    });
    it.each(['a'.repeat(129)])('%s should not pass validation test', (value) => {
        expect(validations.passwordGenerator(value)).toMatch(regAssert);
    });
});

describe('parentGroup', () => {
    it.each(['1'.repeat(128), '', undefined, '12312', '23/3422'])('%s should pass validation test', (value) => {
        expect(validations.parentGroup(value, false)).toEqual(false);
    });
    it.each(['', undefined])('%s should not pass validation test 2', (value) => {
        expect(validations.parentGroup(value, true)).toMatch(regAssert);
    });
    it.each(['', undefined])('%s should not pass validation test', (value) => {
        expect(validations.updateGroup(value, true)).toMatch(regAssert);
    });
});

describe('documents', () => {
    it.each([
        { value: [{}, {}, {}, { to: 'delete' }] },
        { value: [{}, {}, {}] },
        { value: [{}, {}] },
        { value: [{}] },
        { value: [{ file: { size: 45 } }] },
        { value: [{ file: { size: 99999999999 }, to: 'delete' }] },
    ])('%o should pass validation test', (value) => {
        expect(validations.documents(value.value)).toEqual(false);
    });
    it.each([
        { value: [{}, {}, {}, {}] },
        { value: [{}, {}, {}, {}, {}] },
        { value: [{}, {}, {}, {}, {}, {}] },
    ])('%o should not pass validation test with max documents error', (value) => {
        expect(validations.documents(value.value)).toEqual('maxDocumentsValidation');
    });
    it.each([
        { value: [{ file: { size: 99999999999 } }] },
        { value: [{ file: { size: 23 } }, { file: { size: 999999999999 } }, {}] },
    ])('%o should not pass validation test with max documents error', (value) => {
        expect(validations.documents(value.value)).toEqual('documentSizeValidation');
    });
});

describe('updateGroup', () => {
    it.each([
        ['1', '2', []],
        ['1', '2', [{ id: '1', parent_group_id: null }, { id: '2', parent_group_id: '1' }]],
    ])('%s should pass validation test', (d, v, g) => {
        expect(validations.updateGroup(d, v, g)).toEqual(false);
    });
    it.each([
        ['4', '1', [{ id: '2', parent_group_id: null }, { id: '1', parent_group_id: '2' }, { id: '4', parent_group_id: '1' }]],
        ['1', '2', [{ id: '2', parent_group_id: null }, { id: '1', parent_group_id: '2' }]],
    ])('%s should pass validation test', (d, v, g) => {
        expect(validations.updateGroup(d, v, g)).toEqual('groupChildsValidation');
    });
    it.each([
        ['2', '2'],
        ['1', '1'],
    ])('%s should pass validation test', (d, v) => {
        expect(validations.updateGroup(d, v)).toEqual('groupItselfValidation');
    });
    it.each(['', undefined])('%s should not pass validation presence test', (value) => {
        expect(validations.updateGroup(value)).toEqual('groupPresenceValidation');
    });
});
