import { api, apiInstance } from 'api_layer';
import urls from 'api_layer/urls';

export const createUser = api.post(urls.user.create);
export const getUsers = api.get(urls.user.get);
export const getUser = (data, auth) => apiInstance.get(`${urls.user.get}/${data.id}`, { auth }); 
export const restoreUser = (data, auth) => apiInstance.put(`${urls.user.restore}/${data.id}/restore`, {}, { auth });
export const deleteUser = (data, auth) => apiInstance.delete(`${urls.user.delete}/${data.id}`, { auth }); 
export const editUser = (data, auth) => apiInstance.put(`${urls.user.edit}/${data.id}`, data, { auth });
export const toggleBlock = (data, auth) => apiInstance.put(`${urls.user.edit}/${data.id}/toggle_block`, {}, { auth });


export const changeUserRole = (data, auth) => apiInstance.put(`${urls.user.edit}/${data.id}/change_role`, data, { auth }); 
export const changeRoleSupport = (data, auth) => apiInstance.put(`${urls.user.edit}/${data.id}/change_role`, data, { auth });

export const generateReport = (data, auth) => apiInstance.post(`${urls.user.get}/${data.user_id}/generate_report`, data, { auth }); 
