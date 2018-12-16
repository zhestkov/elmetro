import * as config from "../config";

const API_BASE_URL = `http://localhost:${config.port}`;

export function call(endpoint, init = {}, noJson = false) {
  init.mode = "cors";
  init.method = init.method || "GET";
  init.credentials = "same-origin";
  init.headers = init.headers || {};
  return fetch(`${API_BASE_URL}${endpoint}`, init).then(
    data => (noJson ? data : data.json())
  );
}
