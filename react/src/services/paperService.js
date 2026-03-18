const BASE_URL = '/api/v1/papers';

export function searchPapers(query) {
  return fetch(`${BASE_URL}/search?topic=${query}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error occure while searching');
      }
      return response.json();
    });
}