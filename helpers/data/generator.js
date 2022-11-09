import _ from 'lodash';

const lowerData = 'abcdefghijklmnopqrstuvwxyz';
const upperData = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const digitsData = '0123456789';
const symbolsData = '![]{}()%&*$#^<>~@|';

export const generatePassword = ({ digits, upper, symbols, length = 20 }) => {
    let text = '';
    const data = lowerData
    + (digits ? digitsData : '')
    + (upper ? upperData : '')
    + (symbols ? symbolsData : '');
    _.times(length, () => {
        text += _.sample(data);
    });
    if (!text.match(/[a-z]/) || (digits && !text.match(/\d/)) || (upper && !text.match(/[A-Z]/)) || (symbols && !text.match(/[“!", "@", "#", "$", "%", "^", "&", "*"]/))) {
        return generatePassword({ digits, upper, symbols, length });
    } else {
        return text;
    }
};

export const passwordStrength = (password) => {
    if (!password) return 0;

    let score = 0;
    if (password.length > 0) score += 1;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) score += 1;
    if (password.match(/\d+/) && (password.length > 3)) score += 1;
    if (password.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/) && (password.length > 3)) score += 1;
    if (password.length > 12) score += 1;
    return score;
};
