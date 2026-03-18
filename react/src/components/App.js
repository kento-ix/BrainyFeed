import SearchForm from "./SearchForm";
import PaperList from "./PaperList";
import { useState } from "react";

const App = props => {
    const [query, setQuery] = useState();
    

    return <>
        <h1>Find paper</h1>
        <SearchForm setQuery={setQuery}/>
        <PaperList query={query}/>
    </>;
}

export default App;