import axios from 'axios';
import config from 'api_layer/urls';
import _ from 'lodash';

const baseURL = config[`API_HOST_${process.env.NODE_ENV}`];

export const apiInstance = axios.create({ baseURL });

const updateConfig = (config) => {
    const configWithAuth = _.update(config, 'headers.common', headers => ({ ...headers, ..._.get(config, 'auth', {}) }));
    return _.omit(configWithAuth, 'auth');
};

apiInstance.interceptors.request.use(config => updateConfig(config));

export const apiCreator = (instance = apiInstance) => ({
    get: url => (data, auth) => instance.get(url, { params: data, auth }), 
    delete: url => (data, auth) => instance.delete(url, { params: data, auth }), 
    post: url => (data, auth) => instance.post(url, data, { auth }), 
    put: url => (data, auth) => instance.put(url, data, { auth }), 
});

export const api = apiCreator();
