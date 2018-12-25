const API_BASE_URL = `http://localhost:${window.appConfig.SERVER_PORT}`;

export function call(endpoint, init = {}, noJson = false) {
  init.mode = "cors";
  init.method = init.method || "GET";
  init.credentials = "same-origin";
  init.headers = init.headers || {};
  return fetch(`${API_BASE_URL}${endpoint}`, init).then(data =>
    noJson ? data : data.json()
  );
}
