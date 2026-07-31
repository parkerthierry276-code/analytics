import {decodeUri} from './decodeUri.js'

/**
 * Get a given query parameter value
 * @param  {string} param - Key of parameter to find
 * @param  {string} url - url to search
 * @return {string} match
 */
export function paramsGet(param, url) {
  try {
    // Use URLSearchParams to safely parse query strings and avoid constructing RegExp from user input
    const search = url ? (new URL(url, 'http://example.com')).search : (typeof window !== 'undefined' ? window.location.search : '')
    const params = new URLSearchParams(search)
    const value = params.get(param)
    return decodeUri(value == null ? '' : value)
  } catch (e) {
    // Fallback to empty string on malformed input
    return ''
  }
}
