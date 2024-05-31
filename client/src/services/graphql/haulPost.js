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
  mutation DeleteHaulPost($id: String!) {
    deleteHaulPost(id: $id) {
      id
    }
  }
`;
