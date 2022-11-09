import { api, apiInstance } from 'api_layer';
import urls from 'api_layer/urls';

export const createVault = api.post(urls.vault.create);
export const getVaults = api.get(urls.vault.get);
export const getVault = (data, auth) => apiInstance.get(`${urls.vault.get}/${data.id}`, { auth }); 
export const deleteVault = (data, auth) => apiInstance.delete(`${urls.vault.delete}/${data.id}`, { auth }); 
export const editVault = (data, auth) => apiInstance.put(`${urls.vault.edit}/${data.id}`, data, { auth }); 

export const getVaultItems = (data, auth) => apiInstance.get(`${urls.vault.vaultItems}/${data.id}/vault_items`, { auth }); 
export const getVaultItem = (data, auth) => apiInstance.get(`${urls.vault.vaultItems}/${data.id}/${data.form}_items/${data.item_id}`, { auth }); 
export const deleteVaultItem = (data, auth) => apiInstance.delete(`${urls.vault.delete}/${data.vaultId}/${data.type}_items/${data.id}`, { auth }); 
export const editVaultItem = (data, auth) => apiInstance.put(`${urls.vault.vaultItems}/${data.vaultId}/${data.type}_items/${data.id}`, data.data, { auth }); 
export const createVaultItem = (data, auth) => apiInstance.post(`${urls.vault.vaultItems}/${data.vaultId}/${data.type}_items`, data.data, { auth }); 

export const copyItem = (data, auth) => apiInstance.post(`${urls.vault.vaultItems}/${data.vaultId}/${data.type}_items/${data.id}/copy`, data.data, { auth }); 
export const moveItem = (data, auth) => apiInstance.post(`${urls.vault.vaultItems}/${data.vaultId}/${data.type}_items/${data.id}/move`, data.data, { auth }); 

export const generateReport = (data, auth) => apiInstance.post(`${urls.vault.get}/${data.vault_id}/generate_report`, data, { auth }); 

export const deleteDocument = (data, auth) => apiInstance.delete(`${urls.vault.delete}/${data.vaultId}/${data.type}_items/${data.id}/documents/${data.fileId}`, { auth }); 
export const editDocument = (data, auth) => apiInstance.put(`${urls.vault.vaultItems}/${data.vaultId}/${data.type}_items/${data.id}/documents/${data.fileId}`, data.data, { auth }); 
export const createDocument = (data, auth) => apiInstance.post(`${urls.vault.vaultItems}/${data.vaultId}/${data.type}_items/${data.id}/documents`, data.data, { auth, headers: { 'Content-Type': 'multipart/form-data' } }); 

export const getDocument = (data, auth) => apiInstance.get(`${urls.vault.vaultItems}/${data.vaultId}/${data.type}_items/${data.id}/documents/${data.fileId}`, { auth, responseType: 'arraybuffer' });
