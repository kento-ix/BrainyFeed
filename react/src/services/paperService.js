const BASE_URL = '/api/v1/papers';

export function searchPapers(query) {
  return fetch(`${BASE_URL}/search?topic=${query}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error occurred while searching');
      }
      return response.json();
    });
}

export function savePaper(email, paper) {
  return fetch(`${BASE_URL}/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      paperId: paper.id,
      title: paper.title,
      authors: paper.authors,
      year: paper.year,
      abstract: paper.abstract,
      url: paper.url,
      isReview: paper.isReview
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error occurred while saving');
    }
    return response.json();
  });
}

export function getSavedPapers(email, limit, offset) {
  return fetch(`${BASE_URL}/saved?email=${email}&limit=${limit}&offset=${offset}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error occurred while fetching saved papers');
      }
      return response.json();
    });
}
