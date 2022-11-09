import { api, apiInstance } from 'api_layer';
import urls from 'api_layer/urls';

export const createInvitation = api.post(urls.invitation.create);
export const getInvitations = api.get(urls.user.invitations);
export const acceptInvitation = api.put(urls.invitation.accept);
export const deleteInvitation = (data, auth) => apiInstance.delete(`${urls.invitation.delete}/${data.id}`, { auth }); 
export const resendInvitation = (data, auth) => apiInstance.get(`${urls.invitation.resend}/${data.id}`, { auth }); 
