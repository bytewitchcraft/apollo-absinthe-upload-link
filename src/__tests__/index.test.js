import { createUploadMiddleware } from '../index'

jest.mock('../request')
jest.mock('../extractFiles')

const generateOperations = (context = { headers: {} }) => ({
  variables: {},
  getContext: () => context,
})

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
})
