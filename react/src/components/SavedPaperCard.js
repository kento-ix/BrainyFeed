import { useState } from "react";

const SavedPaperCard = props => {
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState('');
    const [showFullAbstract, setShowFullAbstract] = useState(false);

    const abstract = props.paper.Abstract || "No data";
    const words = abstract.split(' ');
    const isTruncated = words.length > 100;
    const displayAbstract = isTruncated && !showFullAbstract
        ? words.slice(0, 100).join(' ') + '...'
        : abstract;

    const handleDelete = () => {
        setDeleting(true);
        setDeleteError('');
        fetch('/api/v1/papers/saved', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: props.email, paperId: props.paper.PaperID })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(err => { throw new Error(err.error); });
        })
        .then(() => {
            props.onDelete(props.paper.PaperID);
        })
        .catch(error => {
            setDeleteError(error.message);
            setDeleting(false);
        });
    };

    return (
        <li className="paper-item">
            <h3>{props.paper.Title}</h3>
            <p>Year: {props.paper.Year}</p>
            <p>Authors: {props.paper.Authors}</p>
            <p>Abstract: {displayAbstract}</p>
            {isTruncated && (
                <button onClick={() => setShowFullAbstract(!showFullAbstract)}>
                    {showFullAbstract ? 'Show less' : 'Show more'}
                </button>
            )}
            <a href={props.paper.SourceURL} target="_blank" rel="noreferrer">Original Paper Link</a>
            <button onClick={handleDelete} disabled={deleting}>Delete</button>
            {deleteError && <p className="error">{deleteError}</p>}
        </li>
    );
};

export default SavedPaperCard;
