import { createUploadMiddleware } from '../index'

jest.mock('../request')
jest.mock('../extractFiles')

describe('#createUploadMiddleware', () => {
  it('should pass headers from context', () => {
    const { request } = createUploadMiddleware({ uri: 'http://example.com' })
    const headers = { authorization: '1234' }
    const operations = {
      variables: {},
      getContext: () => ({ headers }),
    }
    const forward = jest.fn()

    const result = request(operations, forward)

    expect(forward).toHaveBeenCalledTimes(0)
    expect(result.headers).toEqual(headers)
  })
})
