import { useState } from "react";

const EmailForm = props => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.setEmail(inputValue);
    };

    return (
        <form className="email-form" onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Enter your email"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
            />
            <button type="submit">Get Saved Papers</button>
        </form>
    );
};

export default EmailForm;
