const SavedPaperCard = props => {
    return (
        <li className="paper-item">
            <h3>{props.paper.Title}</h3>
            <p>Year: {props.paper.Year}</p>
            <p>Authors: {props.paper.Authors}</p>
            <p>Abstract: {props.paper.Abstract || "No data"}</p>
            <a href={props.paper.SourceURL} target="_blank" rel="noreferrer">Original Paper Link</a>
        </li>
    );
};

export default SavedPaperCard;
