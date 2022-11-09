import { apiInstance } from 'api_layer';
import urls from 'api_layer/urls';

export const addGroupVault = (data, auth) => apiInstance.post(`${urls.link.groupVaults}/${data.group_id}/${data.vault_id}`, {}, { auth }); 
export const removeGroupVault = (data, auth) => apiInstance.delete(`${urls.link.groupVaults}/${data.group_id}/${data.vault_id}`, { auth }); 

export const addUserVault = (data, auth) => apiInstance.post(`${urls.link.userVaults}/${data.user_id}/${data.vault_id}`, {}, { auth }); 
export const removeUserVault = (data, auth) => apiInstance.delete(`${urls.link.userVaults}/${data.user_id}/${data.vault_id}`, { auth }); 
export const changeVaultPolicy = (data, auth) => apiInstance.put(`${urls.link.userVaults}/${data.user_id}/${data.vault_id}/change_role`, data.data, { auth }); 

export const addGroupUser = (data, auth) => apiInstance.post(`${urls.link.groupUsers}/${data.group_id}/${data.user_id}`, {}, { auth }); 
export const removeGroupUser = (data, auth) => apiInstance.delete(`${urls.link.groupUsers}/${data.group_id}/${data.user_id}`, { auth }); 
export const changeUserRole = (data, auth) => apiInstance.put(`${urls.link.groupUsers}/${data.group_id}/${data.user_id}/change_role`, data.data, { auth }); 
