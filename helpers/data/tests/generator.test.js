import { generatePassword, passwordStrength } from 'helpers/data/generator';

describe('generatePassword', () => {
    it('should return 20 a', () => {
        expect(generatePassword({})).toHaveLength(20);
    });
    it('should return 10 a', () => {
        expect(generatePassword({ digits: true, upper: true, symbols: true, length: 10 })).toHaveLength(10);
    });
});

describe('passwordStrength', () => {
    it.each([
        ['', 0],
        [{ length: 0, match: () => false }, 0],
        ['a', 1],
        ['a9b2', 2],
        ['aC92', 3],
        ['aC9#2', 4],
        ['aaC9#aC9#aC9#aC9#aC9#aC9#aC9#', 5],
    ])('should return proper password strength %#', (value, expected) => {
        expect(passwordStrength(value)).toEqual(expected);
    });
});
