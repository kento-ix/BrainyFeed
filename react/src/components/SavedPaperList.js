import { useState, useEffect } from "react";
import SavedPaperCard from "./SavedPaperCard";

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
        fetch(`/api/v1/papers/saved?email=${props.email}&limit=${LIMIT}&offset=${(page - 1) * LIMIT}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    throw new Error("something went wrong!")
                }
            })
            .then(response => {
                // console.log(response);
                setPapers(response.data || []);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setFetchError(error.message);
                setLoading(false);
            });
    }, [props.email, page]);

    const handleDelete = (deletedPaperId) => {
        setPapers(prev => prev.filter(p => p.PaperID !== deletedPaperId));
    };

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
                            <SavedPaperCard key={paper.PaperID} paper={paper} email={props.email} onDelete={handleDelete} />
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
