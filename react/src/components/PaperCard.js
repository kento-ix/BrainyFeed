import { useState } from "react";
export const PaperCard = props => {
    const [email, setEmail] = useState('');
    const [saveError, setSaveError] = useState('');
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        if (!email) {
            setSaveError("Please enter your email to save.");
            return;
        }

        setSaveError('');
        fetch('/api/v1/papers/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                paperId: props.paper.id,
                title: props.paper.title,
                authors: props.paper.authors,
                year: props.paper.year,
                abstract: props.paper.abstract,
                url: props.paper.url,
                isReview: props.paper.isReview
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error occurred while saving');
            }
            return response.json();
        })
        .then(() => {
            setSaved(true);
        })
        .catch(e => {
            setSaveError(e.message);
        });
    };

    return (
        <li className="paper-item">
            <h3>{props.paper.title}</h3>
            <p>Year {props.paper.year}</p>
            <p>Author {props.paper.authors}</p>
            <p>Abstract {props.paper.abstract || "No data"}</p>
            <a href={props.paper.url} target="_blank" rel="noreferrer">Original Paper Link</a>
            <p>To save this paper, enter your email below and click Save.</p>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <button
                onClick={handleSave}
                disabled={saved}
            >
                Save
            </button>
            {saved && <p className="success">Paper saved successfully!!</p>}
            {saveError && <p className="error">{saveError}</p>}
        </li>
    );
};