import { proxyTmdb } from '../../server/tmdb.js'

export default function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    return response.status(405).json({ status_message: 'Method not allowed.' })
  }

  const { id } = request.query
  if (typeof id !== 'string' || !/^\d+$/.test(id)) {
    return response.status(400).json({ status_message: 'Movie ID must be numeric.' })
  }

  return proxyTmdb(`/movie/${id}?language=en-US&append_to_response=credits`, response)
}
