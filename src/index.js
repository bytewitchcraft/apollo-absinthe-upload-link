import { HttpLink } from 'apollo-link-http'
import { ApolloLink, concat } from 'apollo-link'
import { printAST } from 'apollo-client'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/map';
import { pipe, append, join } from 'ramda'

const isObject = value => value !== null && typeof value === 'object'

const isFileList = value =>
  typeof FileList !== 'undefined' && value instanceof FileList

const isUploadFile = value =>
  typeof File !== 'undefined' && value instanceof File

const extractFiles = variables => {
  const files = []
  const walkTree = (tree, path = []) => {
    const mapped = Array.isArray(tree) ? tree : Object.assign({}, tree)
    Object.keys(mapped).forEach(key => {
      const value = mapped[key]
      const name = pipe(append(key), join('.'))(path)

      if (isUploadFile(value) || isFileList(value)) {
        const file = isFileList(value)
          ? Array.prototype.slice.call(value)
          : value

        files.push({ file, name })
        mapped[key] = name
      } else if (isObject(value)) {
        mapped[key] = walkTree(value, name)
      }
    })

    return mapped
  }

  return {
    files,
    variables: walkTree(variables),
  }
}

const createUploadMiddleware = ({ uri }) =>
  new ApolloLink((operation, forward) => {
    if (typeof FormData !== 'undefined' && isObject(operation.variables)) {
      const { variables, files } = extractFiles(operation.variables)

      if (files.length > 0) {
        const formData = new FormData()
        formData.append('query', printAST(operation.query))
        formData.append('variables', JSON.stringify(variables))
        files.forEach(({ name, file }) => formData.append(name, file))

        return Observable.ajax({
          url: uri,
          body: formData,
          method: 'POST',
        }).map(({ response }) => response)
      }
    }

    return forward(operation)
  })

export const createLink = opts =>
  concat(createUploadMiddleware(opts), new HttpLink(opts))
