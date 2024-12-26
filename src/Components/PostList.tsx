import { useQuery, useLazyQuery } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_USER_POSTS, GET_POST_COMMENTS } from "../Queries/Queries";
import { Container, Card, Row, Button, Col, Modal, ListGroup } from "react-bootstrap";

const PostList: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState<any>(null);
    const [postComments, setPostComments] = useState<any[]>([]);
    const { data, loading, error } = useQuery(GET_USER_POSTS, {
        variables: { id: Number(userId) },
    });

    const handleClose = () => {
        setShowModal(false);
        setSelectedPost(null);
        setPostComments([]);
    };

    //Use 'uselazyquery' to manually call queries when user clicks post
    const [fetchPostComments] = useLazyQuery(GET_POST_COMMENTS, {
        onCompleted: (data) => {
            setPostComments(data.post.comments.data);
            setShowModal(true);
        },
        onError: (error) => {
            console.error('Error fetching comments', error);
        }
    });

    const handleShowModal = (post: any) => {
        setSelectedPost(post);
        fetchPostComments({ variables: { id: post.id } });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const filteredPosts = data.user.posts.data.filter((post: any) => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.body.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Container>
            <Row>
                {filteredPosts.map((post: any) => (
                    <Col key={post.id} sm={12} md={6} lg={4} className="mb-4">
                        <Card onClick={() => handleShowModal(post)}>
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text>{post.body}</Card.Text>
                                <Button variant="primary" onClick={() => navigate(`/edit-post/${post.id}/${userId}`)}>Edit</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal show={showModal} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Post Title: {selectedPost?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{selectedPost?.body}</p>
                    <h4>Comments</h4>
                    <ListGroup>
                        {postComments.map((comment) => (
                            <ListGroup.Item key={comment.id}>
                                <h6>{comment.name} ({comment.email})</h6>
                                <p>{comment.body}</p>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default PostList;