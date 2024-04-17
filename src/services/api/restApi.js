const apiHost = 'https://jsonplaceholder.typicode.com';

async function request(url, params, method = 'GET', host = '') {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (params) {
    if (method === 'GET') {
      url += '?' + objectToQueryString(params);
    } else {
      options.body = JSON.stringify(params);
    }
  }

  const _host = host === '' ? apiHost : host;
  const response = await fetch(_host + url, options);

  if (response.status !== 200) {
    return generateErrorResponse('The server responded with error status.');
  }

  const result = await response.json();
  return result;
}

function objectToQueryString(obj) {
  return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
}

function generateErrorResponse(message) {
  return { status : 'error', message };
}

const get = (url, params) => {
  return request(url, params);
}

const create = (url, params) => {
  return request(url, params, 'POST');
}

const update = (url, params) => {
  return request(url, params, 'PUT');
}

const remove = (url, params) => {
  return request(url, params, 'DELETE');
}

export default {
  get,
  create,
  update,
  remove
};