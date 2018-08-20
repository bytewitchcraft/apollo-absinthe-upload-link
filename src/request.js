import { ajax } from 'rxjs'
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
  }).pipe(map(({ response }) => response))

export default request
