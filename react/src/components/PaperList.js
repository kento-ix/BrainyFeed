import { useState, useEffect } from "react";
import { searchPapers } from "../services/paperService";

const PaperList = props => {
    const [loading, setLoading] = useState(false);
    const [papers, setPapers] = useState([]);

    useEffect(function fetchSearch() {
        if (!props.query) return

        setLoading(true);
        searchPapers(props.query)
            .then(data => {
                // console.log("Received data:", data);
                setPapers(data.papers || []);
            })
    }, [props.query]);

    useEffect(() => {
        if(papers) {
            setLoading(false);
        }
    }, [papers]);

    return <>
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
                        </li>
                    ))}
                </ul>
            </>
        )}
    </>
};

export default PaperList;