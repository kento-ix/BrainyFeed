import { useState, useEffect } from "react";
import { searchPapers, savePaper } from "../services/paperService";

const PaperList = props => {
    const [loading, setLoading] = useState(false);
    const [papers, setPapers] = useState([]);
    const [email, setEmail] = useState('');
    const [, setSavingId] = useState(null);

    const [saveError, setSaveError] = useState('');
    const [fetchError, setFetchError] = useState('');

    useEffect(function fetchSearch() {
        if (!props.query) return

        setLoading(true);
        setFetchError('')
        searchPapers(props.query)
            .then(data => {
                setPapers(data.data || []);
                setLoading(false);
            })
            .catch(e => {
                setFetchError(e.message);
                setLoading(false);
            })
    }, [props.query]);

    const handleSave = (paper) => {
        if (!email) {
            setSaveError("Please enter your email to save.");
            return;
        }

        setSavingId(paper.id);
        setSaveError('');
        savePaper(email, paper)
            .then(() => {
                setPapers(papers.map(p => p.id === paper.id ? { ...p, saved: true } : p));
                setSavingId(null);
            })
            .catch(e => {
                setSaveError(e.message)
                setSavingId(null);
            });
    };

    return <>
        {fetchError && <p className="error">{fetchError}</p>}
        {loading ? (
            <p className="loading">Loading...</p>
        ) : (
            <>
                <ul className="paper-list">
                    {papers.map((paper, index) => (
                        <li key={index} className="paper-item">
                            <h3>{paper.title}</h3>
                            <p>Year {paper.year}</p>
                            <p>Author {paper.authors}</p>
                            <p>Abstract {paper.abstract || "No data"}</p>
                            <a href={paper.url} target="_blank" rel="noreferrer">Original Paper Link</a>
                            <p>To save this paper, enter your email below and click Save.</p>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <button
                                onClick={() => handleSave(paper)}
                            >
                                {paper.saved ? "Saved!" : "Save"}
                            </button>
                            {saveError && <p className="error">{saveError}</p>}
                        </li>
                    ))}
                </ul>
            </>
        )}
    </>
};

export default PaperList;