import { gql } from "@apollo/client";

export const GET_REQUEST_HAULERS = gql`
  query GetRequestHaulers {
    getRequestHaulers {
      id
      origin
      destination
      date
      time
      message
      name
    }
  }
`;

export const GET_REQUEST_HAULER_BY_ID = gql`
  query GetRequestHaulerById($id: Int!) {
    getRequestHaulerById(id: $id) {
      id
      origin
      destination
      date
      time
      message
      name
    }
  }
`;

export const CREATE_REQUEST_HAULER = gql`
  mutation CreateRequestHauler($hauler: CreateRequestHaulerInput!) {
    createRequestHauler(hauler: $hauler) {
      id
      origin
      destination
      date
      time
      message
      name
    }
  }
`;

export const DELETE_REQUEST_HAULER = gql`
  mutation DeleteRequestHauler($id: Int!) {
    deleteRequestHauler(id: $id) {
      id
      origin
      destination
      date
      time
      message
      name
    }
  }
`;
