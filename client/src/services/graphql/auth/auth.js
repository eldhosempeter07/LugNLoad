import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($user: UserLoginInput!) {
    loginUser(user: $user) {
      user {
        name
        email
      }
      token
      message
      type
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($user: UserInput!) {
    registerUser(user: $user) {
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($user: UserProfileInput!) {
    updateUser(user: $user) {
      email
      phone
      name
      address
    }
  }
`;

export const GET_USER_INFO = gql`
  query GetUserInfo {
    getUserInfo {
      email
      phone
      name
      address
    }
  }
`;

export const HAULER_LOGIN = gql`
  mutation HaulerLogin($hauler: UserLoginInput!) {
    haulerLogin(hauler: $hauler) {
      user {
        name
        email
      }
      token
      message
      type
    }
  }
`;

export const CREATE_HAULER = gql`
  mutation CreateHauler($hauler: CreateHaulerInput!) {
    createHauler(hauler: $hauler) {
      id
      status
      name
      email
      image
      type
      phone
      address
      license
      vehicleDimension
      vehicleCapacity
      vehicleType
      vehiclePlateNumber
    }
  }
`;

export const UPDATE_HAULER = gql`
  mutation UpdateHauler($hauler: CreateHaulerInput!) {
    updateHauler(hauler: $hauler) {
      id
      status
      name
      email
      image
      type
      phone
      address
      license
      vehicleDimension
      vehicleCapacity
      vehicleType
      vehiclePlateNumber
    }
  }
`;

export const GET_HAULER_INFO = gql`
  query GetHaulerInfo {
    getHaulerInfo {
      id
      status
      name
      email
      image
      type
      phone
      address
      license
      vehicleDimension
      vehicleCapacity
      vehicleType
      vehiclePlateNumber
    }
  }
`;
