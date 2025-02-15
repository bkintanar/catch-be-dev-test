import { getBaseURL } from '~/utils'

export const useMyFetch = async (url, options) => {
  const { $apiFetch } = useNuxtApp()

  let headers = {
    accept: 'application/json',
    'accept-language': '',
  }

  Object.keys(headers).forEach(key => {
    if (headers[key] === null || headers[key] === undefined) {
      delete headers[key]
    }
  })

  return await $apiFetch(url, {
    ...options,
    async onRequest ({ options }) {
      options.headers = headers
      options.baseURL = getBaseURL()
    }
  })
}
