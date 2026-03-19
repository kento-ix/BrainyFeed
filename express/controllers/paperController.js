import { upsertPaper, savePaperForUser, getSavedPapersByEmail } from "../models/paperModel.js";

const S2_API_KEY = process.env.S2_API_KEY;

export const searchReviewPapers = (req, res) => {
    const { topic } = req.query;

    if (!topic) {
        return res.status(400).json({ error: "No topic provided" });
    }

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
            return res.status(429).json({ error: "Too many requests. Please wait 1 second and try again." });
        }
        return response.json();
    })
    .then(data => {
        const papers = (data.data || [])
            .filter(paper => paper.abstract)
            .slice(0, 3)
            .map(paper => ({
                id: paper.paperId,
                title: paper.title,
                year: paper.year,
                authors: paper.authors?.map(a => a.name).join(', ') || 'Unknown Authors',
                abstract: paper.abstract,
                url: paper.url,
                isReview: paper.publicationTypes?.includes('Review') || false
            }));

        res.json({
            data: papers,
            links: [
                { 
                    href: `/api/v1/papers/search?topic=${topic}`, 
                    rel: "self",       
                    type: "GET" 
                },
                { 
                    href: `/api/v1/papers/save`,
                    rel: "save-paper", 
                    type: "POST" 
                }
            ]
        });
    })
    .catch(() => {
        res.status(500).json({ error: "Internal server error" });
    });
};

export const savePaper = (req, res) => {
    const { email, paperId, title, authors, year, abstract, url, isReview } = req.body;

    upsertPaper(paperId, title, authors, year, url, abstract, isReview);
    const result = savePaperForUser(email, paperId);

    if (!result) {
        return res.status(500).json({ error: "Failed to save paper" });
    }

    res.status(201).json({
        data: { email, paperId },
        links: [
            { 
                href: `/api/v1/papers/save`,
                rel: "self",
                type: "POST" },
            { 
                href: `/api/v1/papers/saved?email=${email}`, 
                rel: "saved-papers", 
                type: "GET"  
            }
        ]
    });
};

export const getSavedPapers = (req, res) => {
    const { email } = req.query;
    const limit = +req.query.limit || 10;
    const offset = +req.query.offset || 0;
    const papers = getSavedPapersByEmail(email, limit, offset);

    if (papers.length === 0) {
        return res.status(404).json({ error: "No saved papers found" });
    }

    res.json({
        data: papers,
        links: [
            {
                href: `/api/v1/papers/saved?email=${email}`,
                rel: "self",
                type: "GET" 
            },
            { 
                href: `/api/v1/papers/save`,
                rel: "save-paper", 
                type: "POST" 
            }
        ]
    });
};
