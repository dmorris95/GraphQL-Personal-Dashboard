import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER_INFO } from "../Queries/Queries";
import { Container, Card } from "react-bootstrap";

const Profile: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const { data, loading, error } = useQuery(GET_USER_INFO, {
        variables: { id: Number(userId) },
    });

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    // Make data easier to manipulate
    const { name, email, address, phone, website, company } = data.user;
    
    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        <p>Email: {email}</p>
                        <p>Address: {address.street}, {address.city} {address.zipcode}</p>
                        <p>Phone: {phone}</p>
                        <p>Website: {website}</p>
                        <p>Company: {company.name} --- {company.catchPhrase}</p>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Profile;