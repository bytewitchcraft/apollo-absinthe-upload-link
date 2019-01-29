import { ajax } from 'rxjs/ajax'
import { map } from 'rxjs/operators'

/**
 * Request function
 *
 * @param {Object} opts
 */
const request = opts =>
  ajax({
    url: opts.uri,
    body: opts.body,
    method: 'POST',
    headers: opts.headers,
    withCredentials: opts.withCredentials,
    crossDomain: opts.crossDomain
  }).pipe(map(({ response }) => response))

export default request
