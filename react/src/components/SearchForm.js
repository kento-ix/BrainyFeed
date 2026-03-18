import { useState } from "react";

const SearchForm = props => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        props.setQuery(inputValue);
    };

    return<>
        <form className="search-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter keyword"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    </>
};

export default SearchForm;