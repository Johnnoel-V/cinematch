import { proxyTmdb } from '../../server/tmdb.js'

export default function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    return response.status(405).json({ status_message: 'Method not allowed.' })
  }

  const page = Number(request.query.page || 1)
  if (!Number.isInteger(page) || page < 1) {
    return response.status(400).json({ status_message: 'Page must be a positive whole number.' })
  }

  return proxyTmdb(`/movie/popular?language=en-US&page=${page}`, response)
}
