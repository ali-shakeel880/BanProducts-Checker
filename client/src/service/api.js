import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
import { getAccessToken, getRefreshToken, setAccessToken, getType } from '../utils/common-utils';

const API_URL = '';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000, 
    headers: {
        "content-type": "application/json"
    }
});

axiosInstance.interceptors.request.use(
    function(config) {
        if (config.TYPE && config.TYPE.params) {
            config.params = config.TYPE.params;
        } else if (config.TYPE && config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
        
        // Dynamic content-type handling
        if (config.headers['Content-Type'] === 'multipart/form-data') {
            delete axiosInstance.defaults.headers.common['Content-Type'];
        } else {
            axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';
        }

        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function(response) {
        // Stop global loader here
        return processResponse(response);
    },
    function(error) {
        // Stop global loader here
        return Promise.reject(ProcessError(error));
    }
);

const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data };
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        };
    }
};

const ProcessError = async (error) => {
    if (error.response) {
        if (error.response?.status === 403) {
            sessionStorage.clear();
        } else {
            console.log("ERROR IN RESPONSE: ");
            return {
                isError: true,
                msg: API_NOTIFICATION_MESSAGES.responseFailure,
                code: error.response.status
            };
        }
    } else if (error.request) { 
        console.log("ERROR IN RESPONSE: ");
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        };
    } else { 
        console.log("ERROR IN RESPONSE: ");
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        };
    }
};

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? '' : body,
            responseType: value.responseType,
            headers: {
                'Content-Type': value.method === 'POST' && body instanceof FormData ? 'multipart/form-data' : 'application/json',
                authorization: getAccessToken(),
            },
            TYPE: getType(value, body),
            onUploadProgress: function(progressEvent) {
                if (showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function(progressEvent) {
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            }
        });
}

// Add a new method specifically for file uploads
API.uploadFile = async (data) => {
    try {
        const response = await axiosInstance.post('/file/upload', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response;
    } catch (error) {
        console.error('Error uploading file', error);
        return ProcessError(error);
    }
};

export { API };
