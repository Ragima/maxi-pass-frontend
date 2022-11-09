import { api, apiInstance } from 'api_layer';
import urls from 'api_layer/urls';

export const createGroup = api.post(urls.group.create);
export const getGroups = api.get(urls.group.get);
export const deleteGroup = (data, auth) => apiInstance.delete(`${urls.group.delete}/${data.id}`, { auth }); 
export const getGroup = (data, auth) => apiInstance.get(`${urls.group.get}/${data.id}`, { auth }); 
export const createInnerGroup = (data, auth) => apiInstance.put(
    `${urls.group.create}/${data.innerId}/update_parent/${data.id}`,
    data,
    { auth }); 

export const deleteParentGroup = (data, auth) => apiInstance.delete(`${urls.group.create}/${data.innerId}/delete_parent/${data.id}`, { auth }); 
export const editGroup = (data, auth) => apiInstance.put(`${urls.group.edit}/${data.id}`, data, { auth }); 
export const generateReport = (data, auth) => apiInstance.post(`${urls.group.get}/${data.group_id}/generate_report`, data, { auth }); 
