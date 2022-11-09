import * as regexps from 'constants/regexps';
import _ from 'lodash';
import { getAllChildrens } from 'helpers/data/treeSearch';
import FileManager from 'helpers/data/fileManager';


export default {
    ..._.mapValues(regexps, (value, key) => data => (value.test(_.toString(data)) ? false : `${key}Validation`)),
    userLastName: (data) => (regexps.userNames.test(_.toString(data)) ? false : 'userLastNameValidation'),
    labelValue: (data) => (regexps.label.test(_.toString(data)) ? false : 'labelValidation'),
    passwordMatch: (data, { password }) => (data === password ? false : 'passwordMatchValidation'),
    parentGroup: (data, isLead) => (!isLead || data ? false : 'parentGroupValidation'),
    documents: (data) => {
        const filteredData = _.reject(data, { to: 'delete' });

        if (_.size(filteredData) > 3) return 'maxDocumentsValidation';

        return !_.every(filteredData, FileManager.isValidSize) && 'documentSizeValidation';
    },
    updateGroup: (data, groupToUpdate, groups) => (!data
        ? 'groupPresenceValidation'
        : data === groupToUpdate
            ? 'groupItselfValidation'
            : _.map(getAllChildrens(groupToUpdate, groups), 'id').includes(data) && 'groupChildsValidation'),
    inviteUser: (data, invitedUsers) => {
        if (regexps.email.test(data)) {
            if (invitedUsers.length) {
                return data && invitedUsers.some(user => user.email == data) && 'invitedUserCancel';
            }
        } else {
            return 'emailValidation';
        }
    },
};
