import { gql } from "@apollo/client";

// GraphQL Queries and Mutations
export const GET_USER_HAULERS_POSTS = gql`
  query GetUserHaulerPosts {
    getUserHaulerPosts {
      id
      origin
      destination
      driverName
      driverId
      vehicleCapacity
      vehicleDimension
      vehicleType
      budget
      vehiclePlateNumber
      date
    }
  }
`;

export const GET_HAULERS_POSTS = gql`
  query GetHaulerPosts {
    getHaulerPosts {
      id
      origin
      destination
      driverName
      driverId
      vehicleCapacity
      vehicleDimension
      vehicleType
      budget
      vehiclePlateNumber
      date
    }
  }
`;

export const GET_POSTHAULER_BY_ID = gql`
  query GetHaulerPostByID($id: Int!) {
    getHaulerPostByID(id: $id) {
      id
      origin
      destination
      driverName
      driverId
      vehicleCapacity
      vehicleDimension
      vehicleType
      budget
      vehiclePlateNumber
      date
    }
  }
`;

export const CREATE_HAULER_POST = gql`
  mutation CreateHaulerPost($haulerPost: HaulerPostInput!) {
    createHaulerPost(haulerPost: $haulerPost) {
      id
      origin
      destination
      driverName
      driverId
      vehicleCapacity
      vehicleDimension
      vehicleType
      budget
      vehiclePlateNumber
      date
    }
  }
`;

export const DELETE_POSTHAULER = gql`
  mutation removeHaulerPost($id: Int!) {
    removeHaulerPost(id: $id) {
      id
    }
  }
`;
