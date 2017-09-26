import url from "url";

/**
 * ApiService contains all functions used to make requests to the backend. It also
 * contains helper functions that are used to help make web requests less verbose
 */
class ApiService {
  getJson(endpoint, json = {}) {
    return this.requestJson("GET", endpoint, { query: json });
  }

  postJson(endpoint, json = {}) {
    return this.requestJson("POST", endpoint, { body: json });
  }

  putJson(endpoint, json = {}) {
    return this.requestJson("PUT", endpoint, { body: json });
  }

  requestJson(method, pathname, { body = {}, query = {}, headers = {} }) {
    return fetch(url.format({ pathname, query }), {
      method,
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers
      },
      body:
        method === "GET" || method === "DELETE" ? null : JSON.stringify(body)
    })
      .then(this.handleResponse)
      .then(response => {
        logger.group(`making ${method} request to ${pathname}`);
        logger.info("query: ", query);
        logger.info("body: ", body);
        logger.info("response: ", response);
        logger.groupEnd();
        return response;
      })
      .catch(err => {
        logger.error(`Request to ${pathname} failed: ${err}`);
        throw err;
      });
  }

  handleResponse(response) {
    // eslint-disable-line class-methods-use-this
    return response
      .json()
      .catch(err => {
        throw new Error(`failed to parse response body: ${err}`);
      })
      .then(json => {
        if (!response.ok || json.status === "error") {
          const error = new Error(json.message);
          error.response = response;
          throw error;
        }
        return json;
      });
  }
}

export default ApiService;
