import { useState, useEffect } from "react";
import { searchPapers, savePaper } from "../services/paperService";

const PaperList = props => {
    const [loading, setLoading] = useState(false);
    const [papers, setPapers] = useState([]);
    const [email, setEmail] = useState('');
    const [savingId, setSavingId] = useState(null);
    const [saveError, setSaveError] = useState('');

    useEffect(function fetchSearch() {
        if (!props.query) return

        setLoading(true);
        searchPapers(props.query)
            .then(data => {
                setPapers(data.data || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
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
            .catch(() => {
                setSaveError("Failed to save.");
                setSavingId(null);
            });
    };

    return <>
        {loading ? (
            <p className="loading">Loading...</p>
        ) : (
            <>
                <ul className="paper-list">
                    {papers.map((paper) => (
                        <li key={paper.id} className="paper-item">
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
                                disabled={savingId === paper.id || paper.saved}
                            >
                                {savingId === paper.id ? "Saving..." : paper.saved ? "Saved!" : "Save"}
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