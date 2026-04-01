import { useState } from "react";

const SavedPaperCard = props => {
    // const [deleted, setDeleted] = useState(false);
    // const [deleteError, setDeleteError] = useState('');

    // const handleDelete = () => {
    //     fetch(`/api/v1/papers/saved?email=${props.email}&paperId=${props.paper.PaperID}`, {
    //         method: 'DELETE'
    //     })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Error occurred while deleting');
    //         }
    //         return response.json();
    //     })
    //     .then(() => {
    //         setDeleted(true);
    //     })
    //     .catch(e => {
    //         setDeleteError(e.message);
    //     });
    // };

    // if (deleted) return null;

    return (
        <li className="paper-item">
            <h3>{props.paper.Title}</h3>
            <p>Year: {props.paper.Year}</p>
            <p>Authors: {props.paper.Authors}</p>
            <p>Abstract: {props.paper.Abstract || "No data"}</p>
            <a href={props.paper.SourceURL} target="_blank" rel="noreferrer">Original Paper Link</a>
            {/* <button className="delete" onClick={handleDelete}>Delete</button> */}
            {deleteError && <p className="error">{deleteError}</p>}
        </li>
    );
};

export default SavedPaperCard;
