import SearchForm from "./SearchForm";
import PaperList from "./PaperList";
import { useState } from "react";
import EmailForm from "./EmailForm";
import SavedPaperList from "./SavedPaperList"

const App = () => {
    const [query, setQuery] = useState();
    const [email, setEmail] = useState();

    return <>
        <nav className="navbar">
            <span className="navbar-brand">BrainyFeed</span>
        </nav>

        <main className="main-content">
            <section className="section">
                <h2 className="section-title">Find Papers</h2>
                <p className="section-subtitle">Search academic review papers by topic</p>
                <SearchForm setQuery={setQuery}/>
                <PaperList query={query}/>
            </section>

            <section className="section">
                <h2 className="section-title">Your Saved Papers</h2>
                <p className="section-subtitle">Enter your email to view papers you have saved</p>
                <EmailForm setEmail={setEmail}/>
                <SavedPaperList email={email}/>
            </section>
        </main>
    </>;
}

export default App;