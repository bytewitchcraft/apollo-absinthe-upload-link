import { createUploadMiddleware } from '../index'
import fetchMock from 'fetch-mock'
import { execute } from 'apollo-link'
import gql from 'graphql-tag'

jest.mock('../request')
jest.mock('../extractFiles')

const generateOperations = (context = { headers: {} }) => ({
  variables: {},
  getContext: () => context,
})

const sampleMutation = gql`
  mutation SampleMutation {
    stub {
      id
    }
  }
`
const makePromise = res =>
  new Promise((resolve, reject) => setTimeout(() => resolve(res)))

const data = { data: { hello: 'world' } }

const makeCallback = (done, body) => {
  return (...args) => {
    try {
      body(...args)
      done()
    } catch (error) {
      done.fail(error)
    }
  }
}

describe('#createUploadMiddleware', () => {
  it('should pass headers from context', () => {
    const { request } = createUploadMiddleware({ uri: 'http://example.com' })
    const headers = { authorization: '1234' }
    const operations = generateOperations({ headers })
    const forward = jest.fn()

    const result = request(operations, forward)

    expect(forward).toHaveBeenCalledTimes(0)
    expect(result.headers).toEqual(headers)
  })
  it('should pass headers from options', () => {
    const headers = { authorization: '1234' }
    const { request } = createUploadMiddleware({
      uri: 'http://example.com',
      headers,
    })
    const operations = generateOperations()
    const forward = jest.fn()

    const result = request(operations, forward)

    expect(result.headers).toEqual(headers)
  })
  it('should combine headers from options and context', () => {
    const optionsHeaders = { 'x-spree-token': 'token' }
    const contextHeaders = { authorization: '1234' }
    const { request } = createUploadMiddleware({
      uri: 'http://example.com',
      headers: optionsHeaders,
    })
    const operations = generateOperations({ headers: contextHeaders })
    const forward = jest.fn()

    const result = request(operations, forward)

    expect(result.headers).toEqual(
      Object.assign({}, contextHeaders, optionsHeaders),
    )
  })
  it('uses custom fetch function', done => {
    const variables = { params: 'stub' }
    fetchMock.post('begin:http://data/', makePromise(data))
    const link = createUploadMiddleware({
      uri: 'http://data/',
      fetch: fetch,
    })
    execute(link, {
      query: sampleMutation,
      variables,
    }).subscribe(
      makeCallback(done, result => {
        const [uri, options] = fetchMock.lastCall()
        const { method, body } = options
        expect(body).toBeDefined()
        expect(method).toBe('POST')
        expect(uri).toBe('http://data/')
      }),
    )
  })
})
