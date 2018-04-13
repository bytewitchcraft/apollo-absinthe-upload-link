import { HttpLink } from 'apollo-link-http'
import { ApolloLink, concat } from 'apollo-link'
import { printAST } from 'apollo-client'
import request from './request'
import extractFiles from './extractFiles'
import { isObject } from './validators'

export const createUploadMiddleware = ({ uri, headers }) =>
  new ApolloLink((operation, forward) => {
    if (typeof FormData !== 'undefined' && isObject(operation.variables)) {
      const { variables, files } = extractFiles(operation.variables)

      if (files.length > 0) {
        const { headers: contextHeaders } = operation.getContext()
        const formData = new FormData()

        formData.append('query', printAST(operation.query))
        formData.append('variables', JSON.stringify(variables))
        files.forEach(({ name, file }) => formData.append(name, file))

        return request({
          uri,
          body: formData,
          headers: { ...contextHeaders, ...headers },
        })
      }
    }

    return forward(operation)
  })

export const createLink = opts =>
  concat(createUploadMiddleware(opts), new HttpLink(opts))

export { ReactNativeFile } from './validators'