const express = require('express');
const url = require('url');
const { makeRequest } = require('./service');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;
const { API_URL, API_KEY_VALUE } = process.env;

app.get('/', (req, res, next) => {
    res.send('Connected')
})

app.get('/api/movies', async (req, res, next) => {
    const requestUrl = `${API_URL}/discover/movie`
    const params = url.parse(req.url, true).query
    try {
        const { data } = await makeRequest({
            url: requestUrl,
            params: {
                ...params,
                api_key: API_KEY_VALUE,
            },
        })
        res.status(200).send({ data })
    } catch (e) {
        res.send(e)
    }
})

app.get('/api/movies/:id', async (req, res, next) => {
    const requestUrl = `${API_URL}/movie`
    const params = url.parse(req.url, true).query
    console.log(makeRequest)
    try {
        const { data } = await makeRequest({
            url: `${requestUrl}/${req.params.id}`,
            params: {
                ...params,
                append_to_responce: true,
                api_key: API_KEY_VALUE
            },
        })
        console.log(data)
        res.status(200).send(data)
    } catch (e) {
        res.send(e)
    }
})

app.get('/api/genres', async (req, res, next) => {
    const requestUrl = `${API_URL}//genre/movie/list`
    const params = url.parse(req.url, true).query
    try {
        const { data } = await makeRequest({
            url: requestUrl,
            params: {
                ...params,
                language: 'en',
                api_key: API_KEY_VALUE
            },
        })
        res.status(200).send(data)
    } catch (e) {
        res.send(e)
    }
})

app.listen(PORT, () => {
    console.log(`Starting Proxy at ${PORT}`);
});

module.exports = app;