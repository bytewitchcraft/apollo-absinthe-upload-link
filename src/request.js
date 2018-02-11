import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/dom/ajax'
import 'rxjs/add/operator/map'

/**
 * Request function
 *
 * @param {Object} opts
 */
const request = opts =>
  Observable.ajax({
    url: opts.uri,
    body: opts.body,
    method: 'POST',
    headers: opts.headers,
  }).map(({ response }) => response)

export default request
