import React, { useState} from "react";
import { Form, Button } from "react-bootstrap";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <Form className="d-flex mb-4" onSubmit={handleSubmit}>
            <Form.Control
                type="search"
                placeholder="Search keywords"
                className="me-2"
                value={query}
                onChange={(e) => setQuery(e.target.value)} />
                <Button variant="outline-success" type="submit">Search</Button>
        </Form>
    );
};

export default SearchBar