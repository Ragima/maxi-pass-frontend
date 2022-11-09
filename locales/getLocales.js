import _ from 'lodash';
import locales from './allLocales';

export default (locale) => {
    return _.reduce(locales, (result, value, key) => {
        result[key] = value[locale];
        return result;
    }, {});
};
