import inputKeys from 'constants/multipleInputKeys';
import _ from 'lodash';
import { redirect } from 'helpers/auth/redirect';
import { fillWithEmpty, formatMultipleInput } from "./dataTransform";

export const onFormItemSubmit = async (data = {}, { update, editVaultItem, createVaultItem, fields, type, id, vaultId, doNotRedirect = false }, formatKeys = []) => {
    const request = update ? editVaultItem : createVaultItem;
    const filledData = fillWithEmpty(fields, data);
    const finalData = formatMultipleKeys(formatKeys, filledData);
    const response = await request({ data: { [`${type}_item`]: finalData }, type, id, vaultId });
    if (!doNotRedirect) redirect(`/vault_items/${vaultId}/${type}/${response.id}`);
    return response;
};

const formatMultipleKeys = (keys, data) => {
    const mappedKeys = _.reduce(keys, (acc, key) => ({ ...acc, ...formatMultipleInput(data[key], inputKeys[key]) }), {});
    return { ..._.omit(data, keys), ...mappedKeys };
};
