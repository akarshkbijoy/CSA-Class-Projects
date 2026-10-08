import { gql } from '@apollo/client/core';

// ── Auth Mutations ────────────────────────────────────────────────────────────

export const REGISTER_MUTATION = gql`
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      token
      user {
        _id
        name
        email
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      token
      user {
        _id
        name
        email
      }
    }
  }
`;

export const SEND_OTP_MUTATION = gql`
  mutation SendOtp($email: String!) {
    sendOtp(email: $email) {
      message
    }
  }
`;

// ── Project Mutations ─────────────────────────────────────────────────────────

export const CREATE_PROJECT_MUTATION = gql`
  mutation CreateProject($createProjectInput: CreateProjectInput!) {
    createProject(createProjectInput: $createProjectInput) {
      _id
      title
      description
      category
      coverImage
      createdAt
    }
  }
`;

export const UPDATE_PROJECT_MUTATION = gql`
  mutation UpdateProject($updateProjectInput: UpdateProjectInput!) {
    updateProject(updateProjectInput: $updateProjectInput) {
      _id
      title
      description
      category
      coverImage
    }
  }
`;

export const DELETE_PROJECT_MUTATION = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id)
  }
`;

export const TOGGLE_LIKE_MUTATION = gql`
  mutation ToggleLike($projectId: ID!) {
    toggleLike(projectId: $projectId) {
      _id
      likes
    }
  }
`;

export const ADD_COMMENT_MUTATION = gql`
  mutation AddComment($projectId: ID!, $text: String!) {
    addComment(projectId: $projectId, text: $text) {
      _id
      comments {
        _id
        user
        userName
        text
        createdAt
      }
    }
  }
`;

export const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteComment($projectId: ID!, $commentId: ID!) {
    deleteComment(projectId: $projectId, commentId: $commentId) {
      _id
      comments {
        _id
        userName
        text
        createdAt
      }
    }
  }
`;
