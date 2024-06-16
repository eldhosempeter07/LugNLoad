import { gql } from "@apollo/client";

// GraphQL Queries and Mutations
export const GET_POSTHAULS = gql`
  query GetHaulPosts {
    getHaulPosts {
      id
      origin
      destination
      date
      time
      vehicleType
      shared
      seat
      message
      created
    }
  }
`;

export const GET_POSTHAUL_BY_ID = gql`
  query GetHaulPostByID($id: Int!) {
    getHaulPostByID(id: $id) {
      id
      origin
      destination
      date
      time
      vehicleType
      shared
      seat
      message
      created
      items {
        name
        number
        length
        width
        height
      }
    }
  }
`;

export const CREATE_HAUL_POST = gql`
  mutation CreateHaulPost($haulPost: InputHaulPost!) {
    createHaulPost(haulPost: $haulPost) {
      id
      origin
      destination
      date
      time
      vehicleType
      shared
      seat
      message
      created
    }
  }
`;

export const DELETE_POSTHAUL = gql`
  mutation removeHaulPost($id: Int!) {
    removeHaulPost(id: $id) {
      id
    }
  }
`;
