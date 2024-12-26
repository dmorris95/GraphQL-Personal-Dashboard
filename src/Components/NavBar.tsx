import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

interface NavBarProps {
    userId: string | null;
}

const NavBar: React.FC<NavBarProps> = ({ userId}) => {

    return (
        <Navbar bg="dark" variant="dark" expand='lg'>
            <Navbar.Brand as={Link} to='/'>Personal Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to={userId ? `/profile/${userId}` : '/'}>Profile</Nav.Link>
                    {userId && (
                        <>
                            <Nav.Link as={Link} to={`/posts/${userId}`}>Posts</Nav.Link>
                            <Nav.Link as={Link} to={`/create-post/${userId}`}>Create Post</Nav.Link>
                            <Nav.Link as={Link} to={`/albums/${userId}`}>Albums</Nav.Link>
                            <Nav.Link as={Link} to={`/todos/${userId}`}>To-Dos</Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;