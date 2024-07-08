import { gql } from "@apollo/client";

export const GET_REQUEST_HAULS = gql`
  query GetRequestHauls {
    getRequestHauls {
      id
      origin
      destination
      date
      time
      driverName
      driverId
      vehicleCapacity
      vehicleDimension
      vehicleType
      shared
      seat
      budget
      vehiclePlateNumber
      created
    }
  }
`;

export const GET_REQUEST_HAUL_BY_ID = gql`
  query GetRequestHaulById($id: Int!) {
    getRequestHaulById(id: $id) {
      id
      origin
      destination
      date
      time
      driverName
      driverId
      vehicleCapacity
      vehicleDimension
      vehicleType
      shared
      seat
      budget
      vehiclePlateNumber
      created
    }
  }
`;

export const CREATE_REQUEST_HAUL = gql`
  mutation CreateRequestHaul($haul: CreateRequestHaulInput!) {
    createRequestHaul(haul: $haul) {
      id
      origin
      destination
      date
      vehicleType
      time
      driverName
      driverId
      vehicleCapacity
      vehicleDimension
      shared
      seat
      budget
      vehiclePlateNumber
      created
    }
  }
`;

export const DELETE_REQUEST_HAUL = gql`
  mutation DeleteRequestHaul($id: Int!) {
    deleteRequestHaul(id: $id) {
      id
      origin
      destination
      date
      time
      driverName
      driverId
      vehicleCapacity
      vehicleDimension
      vehicleType
      shared
      seat
      budget
      vehiclePlateNumber
      created
    }
  }
`;
