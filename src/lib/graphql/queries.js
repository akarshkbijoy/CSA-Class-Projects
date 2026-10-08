import { gql } from '@apollo/client/core';

// ── Auth ─────────────────────────────────────────────────────────────────────

export const GET_ME = gql`
  query GetMe {
    me {
      _id
      name
      email
      createdAt
    }
  }
`;

// ── Projects ──────────────────────────────────────────────────────────────────

export const GET_PROJECTS = gql`
  query GetProjects($category: String, $search: String) {
    getProjects(category: $category, search: $search) {
      _id
      title
      description
      impact
      studentName
      teamName
      category
      techStack
      coverImage
      likes
      demoUrl
      githubUrl
      youtubeUrl
      createdAt
      comments {
        _id
        userName
        text
        createdAt
      }
      contributors {
        name
        role
      }
    }
  }
`;

export const GET_PROJECT_BY_ID = gql`
  query GetProjectById($id: ID!) {
    getProjectById(id: $id) {
      _id
      title
      description
      impact
      studentName
      teamName
      userId
      category
      techStack
      coverImage
      screenshots
      likes
      demoUrl
      githubUrl
      youtubeUrl
      createdAt
      comments {
        _id
        user
        userName
        text
        createdAt
      }
      contributors {
        name
        role
      }
    }
  }
`;

export const GET_MY_PROJECTS = gql`
  query GetMyProjects {
    getMyProjects {
      _id
      title
      description
      category
      coverImage
      techStack
      likes
      createdAt
    }
  }
`;
