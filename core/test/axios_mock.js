const axiosMock = () => {
  const get = jest.fn()
  const post = jest.fn()
  const put = jest.fn()
  const _delete = jest.fn()

  const mockClear = () => {
    get.mockClear()
    post.mockClear()
    put.mockClear()
    _delete.mockClear()
  }

  return {
    get,
    put,
    post,
    mockClear,
    delete: _delete,
  }
}

export default axiosMock
