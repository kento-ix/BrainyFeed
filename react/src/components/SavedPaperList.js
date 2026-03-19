import { useState, useEffect } from "react";
import { getSavedPapers } from "../services/paperService";

const LIMIT = 3;

const SavedPaperList = props => {
    const [loading, setLoading] = useState(false);
    const [papers, setPapers] = useState([]);
    const [fetchError, setFetchError] = useState('');
    const [page, setPage] = useState(1);


    useEffect(function fetchSavedPapers() {
        if (!props.email) return;

        setLoading(true);
        setFetchError('');
        getSavedPapers(props.email, LIMIT, (page - 1) * LIMIT)
            .then(data => {
                setPapers(data.data || []);
                setLoading(false);
            })
            .catch(e => {
                setFetchError(e.message);
                setLoading(false);
            });
    }, [props.email, page]);

    if (!props.email) return <p>Please enter your email to see your saved papers.</p>;

    return <>
        {fetchError && <p className="error">{fetchError}</p>}
        {loading ? (
            <p className="loading">Loading...</p>
        ) : (
            <>
                {papers.length === 0
                    ? <p>No saved papers found for this email.</p>
                    : <ul className="paper-list">
                        {papers.map((paper) => (
                            <li key={paper.PaperID} className="paper-item">
                                <h3>{paper.Title}</h3>
                                <p>Year: {paper.Year}</p>
                                <p>Authors: {paper.Authors}</p>
                                <p>Abstract: {paper.Abstract || "No data"}</p>
                                <a href={paper.SourceURL} target="_blank" rel="noreferrer">Original Paper Link</a>
                            </li>
                        ))}
                    </ul>
                }
                <div className="pagination">
                    <button onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
                    <span>Page {page}</span>
                    <button onClick={() => setPage(page + 1)} disabled={papers.length < LIMIT}>Next</button>
                </div>
            </>
        )}
    </>
};

export default SavedPaperList;
