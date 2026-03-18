import { getReviewPapers } from "../models/paperModel.js";

const S2_API_KEY = '65l4dYpVPj4lLuDtQwcq01wF4KbGMswd18y7sQKD';

export const getRecentReviews = (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    const papers = getReviewPapers(limit, offset);
    res.json({ papers });
};

export const searchReviewPapers = (req, res) => {
    const { topic } = req.query;

    if (!topic) {
        return res.status(400).json({ message: "No topic provided" });
    }

    // abstract selected data to avoid heavy request
    const fields = 'title,authors,year,abstract,url,publicationTypes,citationCount';
    const limit = 9;
    const baseUrl = 'https://api.semanticscholar.org/graph/v1/paper/search';
    const url = `${baseUrl}?query=${topic}&fields=${fields}&limit=${limit}&publicationTypes=Review`;

    fetch(url, {
        method: 'GET',
        headers: {
            'x-api-key': S2_API_KEY,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.status === 429) {
            return res.status(429).json({ error: "Too many requests. 1 request per 1 second" });
        }
        return response.json();
    })
    .then(data => {
        const abstractedResults = (data.data || [])
            .filter(paper => paper.abstract)
            .slice(0, 3)
            .map(paper => ({
                id: paper.paperId,
                title: paper.title,
                year: paper.year,
                authors: paper.authors?.map(a => a.name).join(', ') || 'Unknown Authors',
                abstract: paper.abstract,
                url: paper.url,
                citationCount: paper.citationCount,
                isReview: paper.publicationTypes?.includes('Review') || false
            }));

        res.json({
            papers: abstractedResults
        });
    })
};