const tmdbBaseUrl = 'https://api.themoviedb.org/3'

export async function proxyTmdb(path, response) {
  const tmdbApiKey = process.env.TMDB_API_KEY
  if (!tmdbApiKey) {
    response.status(500).json({ status_message: 'TMDB_API_KEY is missing from the server environment.' })
    return
  }

  const url = new URL(`${tmdbBaseUrl}${path}`)
  url.searchParams.set('api_key', tmdbApiKey)

  try {
    const tmdbResponse = await fetch(url)
    const data = await tmdbResponse.json()
    response.status(tmdbResponse.status).json(data)
  } catch (error) {
    console.error('TMDB request failed:', error)
    response.status(502).json({ status_message: 'Could not connect to TMDB. Please try again.' })
  }
}
