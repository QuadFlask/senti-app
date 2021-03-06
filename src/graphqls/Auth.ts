import gql from 'graphql-tag';

export const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      profile {
        id
        email
        name
        photoUrl
        gender
        tags
        badgeCount
        coin
        canUseFreeCoinAt
      }
    }
  }
`;

export const CREATE_FCM_TOKEN = gql`
  mutation createFcmToken($fcmToken: String!) {
    createFcmToken(fcmToken: $fcmToken)
  }
`;

export const REMOVE_FCM_TOKEN = gql`
  mutation removeFcmToken($fcmToken: String!) {
    removeFcmToken(fcmToken: $fcmToken)
  }
`;

export const FETCH_PROFILE = gql`
  query fetchProfile {
    profile {
      id
      email
      name
      photoUrl
      gender
      tags
      badgeCount
      coin
      canUseFreeCoinAt
    }
  }
`;

export const FETCH_CANDIDATE = gql`
  query fetchCandidate {
    candidate @client {
      name
      gender
    }
  }
`;

export const UPDATE_CANDIDATE = gql`
  mutation updateCandidate($name: String, $gender: String) {
    updateCandidate(name: $name, gender: $gender) @client
  }
`;

export const CLEAR_CANDIDATE = gql`
  mutation clearCandidate {
    clearCandidate @client
  }
`;

export const UPDATE_PROFILE = gql`
  mutation updateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      profile {
        id
        name
        gender
        photoUrl
      }
    }
  }
`;

export const CLEAR_BADGE_COUNT = gql`
  mutation clearBadgeCount {
    clearBadgeCount {
      profile {
        id
        badgeCount
      }
    }
  }
`;

export const REPORT_USER = gql`
  mutation reportUser($id: ID!, $storyId: ID!, $audioUrl: String) {
    reportUser(id: $id, storyId: $storyId, audioUrl: $audioUrl)
  }
`;
