import { gql } from "@apollo/client";

export const CREATE_POST = gql`
    mutation CreatePost($title: String!, $body: String!) {
        createPost(input: { title: $title, body: $body}) {
            id
            title
            body
        }
    }
`;

export const UPDATE_POST = gql`
    mutation UpdatePost($id: ID!, $title: String!, $body: String!) {
      updatePost(id: $id, input: { title: $title, body: $body}) {
        id
        title
        body
        }
    }
`;

export const DELETE_POST = gql`
    mutation DeletePost($id: ID!) {
      deletePost(id: $id)
    }
`;

export const MARK_TODO_COMPLETE = gql`
    mutation MarkTodoComplete($id: ID!, $completed: Boolean!) {
        updateTodo(id: $id, input: { completed: $completed }) {
            id
            completed
        }
    }
`;

export const DELETE_TODO = gql`
    mutation DeleteTodo($id: ID!) {
        deleteTodo(id: $id)
    }
`;