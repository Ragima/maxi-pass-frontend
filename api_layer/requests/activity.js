import { apiInstance, api } from 'api_layer';
import urls from 'api_layer/urls';

const per_page = 10;

export const getActivities = (data, auth) => apiInstance.get(urls.activity.get, { params: { per_page, ...data }, auth }); 

export const generateReport = (data, auth) => apiInstance.post(urls.activity.report, { ...data, per_page }, { auth }); 

export const unmarkActivity = (data, auth) => apiInstance.delete(`${urls.activity.settings}/${data.id}`, { auth }); 
export const markActivity = (data, auth) => apiInstance.post(`${urls.activity.settings}/${data.id}`, data, { auth }); 

export const getActivitiesSettings = api.get(urls.activity.settings);
