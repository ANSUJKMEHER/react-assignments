/**
 * API service for fetching photos from Picsum Photos
 * Endpoint: https://picsum.photos/v2/list?page={page}&limit={limit}
 */

const PICSUM_BASE_URL = 'https://picsum.photos/v2/list';
// Alternate proxy path configured in vite.config.js for CORS environments
const PROXY_BASE_URL = '/api/picsum/v2/list';

export async function fetchPhotos(page = 1, limit = 10, signal = null) {
  // Determine url (try direct first, proxy if in Vite development mode)
  const isDev = Boolean(import.meta.env?.DEV);
  const primaryUrl = `${PICSUM_BASE_URL}?page=${page}&limit=${limit}`;
  const proxyUrl = `${PROXY_BASE_URL}?page=${page}&limit=${limit}`;

  const fetchWithTimeout = async (url) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    try {
      const response = await fetch(url, {
        signal: signal || controller.signal,
        headers: {
          Accept: 'application/json'
        }
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API responded with HTTP status ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Invalid response structure: expected array of photo items');
      }

      return data;
    } catch (err) {
      clearTimeout(timeoutId);
      throw err;
    }
  };

  try {
    return await fetchWithTimeout(primaryUrl);
  } catch (err) {
    // If direct failed and we're in dev with proxy, try proxy
    if (isDev && !signal?.aborted) {
      try {
        return await fetchWithTimeout(proxyUrl);
      } catch (proxyErr) {
        throw new Error(
          `Picsum Photos API unreachable (${err.message}). The remote origin server may be experiencing downtime or Cloudflare 522 connection timeouts.`
        );
      }
    }
    throw new Error(
      `Picsum Photos API unreachable (${err.message}). The remote origin server may be experiencing downtime or Cloudflare 522 connection timeouts.`
    );
  }
}
