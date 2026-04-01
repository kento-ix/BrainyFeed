import { useState, useEffect } from "react";
import { PaperCard } from "./PaperCard";

const PaperList = props => {
    const [loading, setLoading] = useState(false);
    const [papers, setPapers] = useState([]);
    const [fetchError, setFetchError] = useState('');

    useEffect(function fetchSearch() {
        if (!props.query) return

        setLoading(true);
        setFetchError('')
        fetch(`/api/v1/papers/search?topic=${props.query}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error occurred while searching');
                }
                return response.json();
            })
            .then(data => {
                setPapers(data.data || []);
                setLoading(false);
            })
            .catch(e => {
                setFetchError(e.message);
                setLoading(false);
            })
    }, [props.query]);

    return <>
        {fetchError && <p className="error">{fetchError}</p>}
        {loading ? (
            <p className="loading">Loading...</p>
        ) : (
            <ul className="paper-list">
                {papers.map((paper) => (
                    <PaperCard paper={paper} />
                ))}
            </ul>
        )}
    </>
};

export default PaperList;
