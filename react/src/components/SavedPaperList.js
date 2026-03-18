import { useState, useEffect } from "react";
import { getSavedPapers } from "../services/paperService";

const SavedPaperList = props => {
    const [loading, setLoading] = useState(false);
    const [papers, setPapers] = useState([]);

    useEffect(function fetchSavesPaper() {
        if (!props.email) return;

        setLoading(true);
        getSavedPapers(props.email)
            .then(data => {
                setPapers(data.data || []);
                setLoading(false);
            })
    }, [props.email]);

    if (!props.email) return <p>Please enter your email to see your saved papers.</p>;
    if (papers.length === 0) return <p>No saved papers yet.</p>;

    return <>
        {loading ? (
            <p className="loading">Loading...</p>
        ) : (
            <>
                <ul className="paper-list">
                    {papers.map((paper, index) => (
                        <li key={index} className="paper-item">
                            <h3>{paper.Title}</h3>
                            <p>Year: {paper.Year}</p>
                            <p>Authors: {paper.Authors}</p>
                            <p>Abstract: {paper.Abstract || "No data"}</p>
                            <a href={paper.SourceURL} target="_blank" rel="noreferrer">Original Paper Link</a>
                        </li>
                    ))}
                </ul>
            </>
        )}
    </>
};

export default SavedPaperList;
