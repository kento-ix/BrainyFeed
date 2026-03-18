import { useState } from "react";

const SearchForm = props => {
    const [query, setQuery] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        props.setQuery(query);
    };

    return<>
        <form className="search-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter keyword"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    </>
};

export default SearchForm;