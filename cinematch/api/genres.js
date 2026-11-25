import { proxyTmdb } from '../server/tmdb.js'

export default function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    return response.status(405).json({ status_message: 'Method not allowed.' })
  }

  return proxyTmdb('/genre/movie/list?language=en-US', response)
}
