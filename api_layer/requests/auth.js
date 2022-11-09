import { api, apiInstance } from 'api_layer';
import urls from 'api_layer/urls';
import _ from 'lodash';

export const signIn = api.post(urls.auth.sign_in);
export const signOut = api.delete(urls.auth.sign_out);
export const signUp = api.post(urls.auth.sign_up);
export const validateToken = api.get(urls.auth.validate_token);
export const getHomePage = api.get(urls.pages.home);
export const updateSettings = api.put(urls.user.settings);
export const resetPassword = api.post(urls.auth.password);
export const changePassword = data => apiInstance.put(urls.auth.password, data.data, { auth: _.pick(data.headers, ['client', 'access-token', 'uid']) });

export const enableTwoFactor = (data, auth) => apiInstance.post(`${urls.auth.enable_two_factor}/${data.teamName}`, {}, { auth }); 
export const disableTwoFactor = (data, auth) => apiInstance.post(`${urls.auth.disable_two_factor}/${data.teamName}`, {}, { auth }); 

export const resetTwoFactor = api.post(urls.auth.reset_two_factor); 
