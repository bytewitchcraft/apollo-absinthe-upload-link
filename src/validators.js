export const isObject = value => value !== null && typeof value === 'object'

export const isFileList = value =>
  typeof FileList !== 'undefined' && value instanceof FileList

export const isUploadFile = value =>
  (typeof File !== 'undefined' && value instanceof File) ||
  (typeof Blob !== 'undefined' && value instanceof Blob) ||
  value instanceof ReactNativeFile

/**
 * A React Native FormData file object.
 * @see {@link https://github.com/facebook/react-native/blob/v0.45.1/Libraries/Network/FormData.js#L34}
 * @typedef {Object} ReactNativeFileObject
 * @property {String} uri - File system path.
 * @property {String} [type] - File content type.
 * @property {String} [name] - File name.
 */

/**
 * A React Native file.
 */
export class ReactNativeFile {
  /**
   * Constructs a new file.
   * @param {ReactNativeFileObject} file
   * @example
   * const file = new ReactNativeFile({
   *  uri: uriFromCameraRoll,
   *  type: 'image/jpeg',
   *  name: 'photo.jpg'
   * })
   */
  constructor({ uri, type, name }) {
    this.uri = uri
    this.type = type
    this.name = name
  }

  /**
   * Creates an array of file instances.
   * @param {ReactNativeFileObject[]} files
   * @example
   * const files = ReactNativeFile.list([{
   *   uri: uriFromCameraRoll1,
   *   type: 'image/jpeg',
   *   name: 'photo-1.jpg'
   * }, {
   *   uri: uriFromCameraRoll2,
   *   type: 'image/jpeg',
   *   name: 'photo-2.jpg'
   * }])
   */
}

ReactNativeFile.list = files => files.map(file => new ReactNativeFile(file))
