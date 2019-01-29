import { HttpLink } from 'apollo-link-http'
import { ApolloLink, concat } from 'apollo-link'
import { print } from 'graphql/language/printer'
import request from './request'
import extractFiles from './extractFiles'
import { isObject } from './validators'
import { parseAndCheckHttpResponse } from 'apollo-link-http-common'
import { Observable } from 'apollo-link'

export const createUploadMiddleware = ({ uri, headers, fetch, credentials }) =>
  new ApolloLink((operation, forward) => {
    if (typeof FormData !== 'undefined' && isObject(operation.variables)) {
      const { variables, files } = extractFiles(operation.variables)

      if (files.length > 0) {
        const context = operation.getContext()
        const { headers: contextHeaders } = context
        const formData = new FormData()

        formData.append('query', print(operation.query))
        formData.append('variables', JSON.stringify(variables))
        files.forEach(({ name, file }) => formData.append(name, file))

        let options = {
          method: 'POST',
          headers: Object.assign({}, contextHeaders, headers),
          body: formData,
        }

        // add context.fetchOptions to fetch options
        options = Object.assign(context.fetchOptions || {}, options)

        // is there a custom fetch? then use it
        if (fetch) {
          return new Observable(observer => {
            fetch(uri, options)
              .then(response => {
                operation.setContext({ response })
                return response
              })
              .then(parseAndCheckHttpResponse(operation))
              .then(result => {
                // we have data and can send it to back up the link chain
                observer.next(result)
                observer.complete()
                return result
              })
              .catch(err => {
                if (err.result && err.result.errors && err.result.data) {
                  observer.next(err.result)
                }
                observer.error(err)
              })
          })
        } else {
          const withCredentials = credentials === "include";
          
          return request({
            uri,
            body: formData,
            headers: Object.assign({}, contextHeaders, headers),
            withCredentials,
            crossDomain: withCredentials
          })
        }
      }
    }

    return forward(operation)
  })

export const createLink = opts =>
  concat(createUploadMiddleware(opts), new HttpLink(opts))

export { ReactNativeFile } from './validators'
