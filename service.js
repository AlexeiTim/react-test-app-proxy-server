const axios = require('axios');

module.exports.makeRequest = makeRequest = ({
    url = '/',
    method = 'get',
    headers,
    params,
    data,
    responseType = 'json',
    paramsSerializer,
}) => {
    return axios({
        url,
        method,
        responseType,
        headers,
        params,
        data,
        paramsSerializer,
        withCredentials: false,
    })
}