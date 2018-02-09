export const isObject = value => value !== null && typeof value === 'object'
export const isFileList = value =>
  typeof FileList !== 'undefined' && value instanceof FileList

export const isUploadFile = value =>
  typeof File !== 'undefined' && value instanceof File
