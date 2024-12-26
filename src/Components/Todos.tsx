import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_TODOS } from "../Queries/Queries";
import { Container, ListGroup, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { DELETE_TODO, MARK_TODO_COMPLETE } from "../Queries/Mutations";

const Todos: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
    const { userId } = useParams<{ userId: string }>();

    const { data, loading, error } = useQuery(GET_USER_TODOS, {
        variables: { id: Number(userId) },
    });

    const [markTodoComplete] = useMutation(MARK_TODO_COMPLETE, {
        // NOTE -- GraphQLZero does not actually change values
        //refetchQueries: [{ query: GET_USER_TODOS, variables: {id: Number(userId)}}],
        onError: (err) => {
            console.error(err);
            alert('Error marking todo as complete');
        }
    });

    const [deleteTodo] = useMutation(DELETE_TODO, {
        refetchQueries: [{ query: GET_USER_TODOS, variables: {id: Number(userId)}}],
        onError: (err) => {
            console.error(err);
            alert('Error deleting todo');
        }
    });

    const handleComplete = (id: number, completed: boolean) => {
        markTodoComplete({ variables: { id, completed: !completed}})
    };

    const handleDelete = (id: number) => {
        deleteTodo({variables: { id }})
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    //Filter Todos based on keywords
    const filteredTodos = data.user.todos.data.filter((todo: any) =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const incompleteTodos = filteredTodos.filter((todo: any) => !todo.completed);
    const completedTodos = filteredTodos.filter((todo: any) => todo.completed);

    return (
        <Container>
            <Row>
                <h2 className="text-center">Incomplete Todos</h2>
                {incompleteTodos.map((todo: any) => (
                    <Col key={todo.id} sm={12} md={6} lg={4} className="mb-4">
                        <ListGroup>
                            <ListGroup.Item>
                                <div className="d-flex justify-content-center align-items-center">
                                    <span>{todo.title}</span>
                                    <div>
                                        <Button size="sm" variant="success" className="m-2" onClick={() => handleComplete(todo.id, todo.completed)}>Mark as {todo.completed ? 'Incomplete' : ' Complete'}</Button>
                                        <Button variant="danger" size="sm" className="ms-2" onClick={() => handleDelete(todo.id)}>Delete</Button>
                                    </div>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                ))}
            </Row>
            <Row>
            <h2 className="text-center">Completed Todos</h2>
                {completedTodos.map((todo: any) => (
                    <Col key={todo.id} sm={12} md={6} lg={4} className="mb-4">
                        <ListGroup>
                            <ListGroup.Item>
                                <div className="d-flex justify-content-center align-items-center">
                                    <span>{todo.title}</span>
                                    <div>
                                        <Button size="sm" variant="warning" className="m-2" onClick={() => handleComplete(todo.id, todo.completed)}>Mark as {todo.completed ? 'Incomplete' : ' Complete'}</Button>
                                        <Button variant="danger" size="sm" className="ms-2" onClick={() => handleDelete(todo.id)}>Delete</Button>
                                    </div>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                ))}
            </Row>
        </Container>
    )
};

export default Todos;