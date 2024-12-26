import { gql } from '@apollo/client';

export const GET_USER_INFO = gql`
    query GetUserInfo($id: ID!) {
      user(id: $id) {
        id
        name
        email
        address {
            street
            suite
            city
            zipcode
        }
        phone
        website
        company {
            name
            catchPhrase
            bs
         }
        }
    }
`;

export const GET_ONE_POST = gql`
    query GetOnePost($id: ID!){
        post(id: $id) {
            title
            body
        }
    }
`;

export const GET_USER_POSTS = gql`
    query GetUserPosts($id: ID!) {
      user(id: $id) {
        posts {
          data {
            id
            title
            body
          }
        }
      }
    }
`;

export const GET_USER_ALBUMS = gql`
    query GetUserAlbums($id: ID!) {
      user(id: $id) {
        albums {
          data {
            id
            title
          }
        }
      }
    }
`;

export const GET_ALBUM_PHOTOS = gql`
  query GetAlbumPhotos($id: ID!) {
    album(id: $id) {
        photos {
          data {
            id
            title
            url
            thumbnailUrl
          }
        }
    }
  }
`;

export const GET_USER_TODOS = gql`
    query GetUserTodos($id: ID!) {
      user(id: $id) {
        todos {
          data {
            id
            title
            completed
            }
        }
      }
    }
`;

export const GET_POST_COMMENTS = gql`
    query GetPostComments($id: ID!) {
      post(id: $id) {
        comments {
          data {
            id
            name
            email
            body
          }
        }
      }
    }
`;