import axios from 'axios';


export async function APIRequest(url, method='GET', data=null, headers={}) {
    return await axios({
        url: url,
        method: method,
        params: data,
        data: data,
        headers: headers,
    })
    .then(response => response.data)
    .catch(_ => _);
}
