export default jest.fn(opts => ({
  url: opts.url,
  method: 'POST',
  body: opts.body,
  headers: opts.headers,
}))
