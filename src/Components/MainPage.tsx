import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

interface MainPageProps {
    onUserIdChange: (id: string) => void;
}

const MainPage: React.FC<MainPageProps> = ({ onUserIdChange }) => {
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userId) {
            onUserIdChange(userId);
            navigate(`/profile/${userId}`);
        }
    };

    return (
        <Container>
            <h1 className="text-center my-3">Enter User ID</h1>
            <Form onSubmit={handleSubmit} className="d-flex justify-content-center">
                <Form.Control
                    type="number"
                    placeholder="User ID"
                    className="me-3"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required />
                <Button variant="primary">Search</Button>
            </Form>
        </Container>
    );
};

export default MainPage;