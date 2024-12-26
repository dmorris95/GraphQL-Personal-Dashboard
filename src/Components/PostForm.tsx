import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client"; 
import { CREATE_POST, DELETE_POST, UPDATE_POST } from "../Queries/Mutations";
import { useState, useEffect, FormEvent } from "react";
import { GET_ONE_POST } from "../Queries/Queries";

const PostForm: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const { postId } = useParams<{ postId: string }>();
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const { data, loading: queryLoading, error: queryError } = useQuery(GET_ONE_POST, { 
        variables: { id: Number(postId) },
        skip: !postId });
    const [createPost, { loading: createLoading, error: createError }] = useMutation(CREATE_POST); 
    const [updatePost, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_POST);
    const [deletePost] = useMutation(DELETE_POST, {
        onCompleted() {
            alert('Post deleted successfully');
            navigate(`/posts/${userId}`);
        },
        onError(err) {
            console.error(err);
            alert('Error deleting post');
        }
    });

    useEffect(() => {
        if (postId && data) {
            setBody(data.post.body);
            setTitle(data.post.title);
        }
    }, [postId, data])

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        if (postId) {
            updatePost({
                variables: {
                    id: postId,
                    title: title,
                    body: body,
                },
            });
            alert('Post successfully Updated')
        } else {
            createPost({
                variables: {
                    title: title,
                    body: body,
                },
            });
            alert('Post Successfully created.')
        }
        navigate(`/posts/${userId}`);
    };

    const handleDelete = () => {
        if (postId) {
            deletePost({ variables: { id: Number(postId) } });
        }
    }

    if (queryLoading || createLoading || updateLoading) return <p>Loading...</p>; 
    if (queryError) return <p>Error loading post: {queryError.message}</p>;
    if (createError) return <p>Error creating post: {createError.message}</p>; 
    if (updateError) return <p>Error updating post: {updateError.message}</p>;

    return (
        <Container> 
            <Row className="justify-content-md-center"> 
                <Col md={6}> 
                <h1 className="my-4 text-center">
                    {postId ? 'Edit Post' : 'Create Post'}
                </h1> 
                <Form onSubmit={handleSubmit}> 
                    <Form.Group controlId="formTitle"> 
                        <Form.Label>Title</Form.Label> 
                        <Form.Control 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            required /> 
                    </Form.Group> 
                    <Form.Group controlId="formBody"> 
                        <Form.Label>Body</Form.Label> 
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            value={body} 
                            onChange={(e) => setBody(e.target.value)} 
                            required /> 
                    </Form.Group> 
                    <Button variant="primary" type="submit" className="mt-3"> 
                        {postId ? 'Update Post' : 'Create Post'} 
                    </Button>
                    {postId && (
                        <Button variant="danger" className="mt-3 ms-2" onClick={handleDelete}>
                            Delete Post
                        </Button>
                    )} 
                </Form> 
                </Col> 
            </Row> 
        </Container>
    );
};

export default PostForm;