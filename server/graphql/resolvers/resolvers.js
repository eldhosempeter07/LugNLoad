import { PostHaul } from "../../models/PostHaul.js";
import { PostHauler } from "../../models/PostHauler.js";
import { RequestHauler } from "../../models/RequestHauler.js";
import { RequestHaul } from "../../models/RequestHaul.js";
import {
  generateUniqueId,
  hashPassword,
  verifyPassword,
} from "../../utils/utils.js";
import { GraphQLScalarType, Kind } from "graphql";
import { Hauler, User } from "../../models/User.js";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-express";

const GQLDate = new GraphQLScalarType({
  name: "GQLDateTime",
  description: "DateTime type",

  // Date -> String
  serialize(value) {
    const isoString = value.toISOString();
    if (isoString.endsWith("T00:00:00.000Z")) {
      return isoString.slice(0, 10);
    } else {
      // Format the date

      const date = isoString.slice(0, 10);
      // Convert to 12-hour format with AM/PM
      let hours = value.getUTCHours();
      const minutes = value.getUTCMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // The hour '0' should be '12'
      const minutesStr = minutes < 10 ? "0" + minutes : minutes;
      const time = `${hours}:${minutesStr} ${ampm}`;
      return `${date} : ${time}`;
    }
  },

  // String -> Date
  // When using variables (params)
  parseValue(value) {
    return new Date(value); // This expects a full ISO string with date and time
  },

  // When using literal (params)
  parseLiteral(ast) {
    return ast.kind === Kind.STRING ? new Date(ast.value) : undefined; // This expects a full ISO string with date and time
  },
});

export const resolvers = {
  GQLDate,
  Query: {
    getUserInfo: async (_, __, { user }) => {
      try {
        console.log(user);
        const userInfo = await User.findOne({ email: user?.email });
        return userInfo;
      } catch (error) {
        return { message: error };
      }
    },

    getHaulPosts: async (_, __) => {
      const postHauls = await PostHaul.find();
      return postHauls;
    },

    getUserHaulPosts: async (_, __, { user }) => {
      const postHauls = await PostHaul.find({ email: user.email });
      return postHauls;
    },
    getHaulPostByID: async (_, { id }) => {
      const postHaul = await PostHaul.findOne({ id });
      return postHaul;
    },

    getRequestHauls: async () => {
      try {
        const requestHauls = await RequestHaul.find();
        return requestHauls;
      } catch (error) {
        throw new Error(error);
      }
    },
    getRequestHaulById: async (_, { id }) => {
      try {
        const requestHaul = await RequestHaul.findOne({ id });
        if (!requestHaul) {
          throw new Error("Request haul not found");
        }
        return requestHaul;
      } catch (error) {
        throw new Error(error);
      }
    },
    getRequestHaulByFilter: async (
      _,
      { origin, destination, date, vehicleType }
    ) => {
      try {
        // const query = {};
        // if (origin) query.origin = origin;
        // if (destination) query.destination = destination;
        // if (date) query.date = date;
        // if (vehicleType) query.vehicleType = vehicleType;

        // const requestHauls = await RequestHaul.find(query);

        return requestHauls;
      } catch (error) {
        throw new Error(error);
      }
    },

    getUserHaulerPosts: async (_, __, { user }) => {
      const postHauls = await PostHauler.find({ email: user.email });
      return postHauls;
    },

    getHaulerPosts: async () => {
      const postHauls = await PostHauler.find();
      return postHauls;
    },
    getHaulerPostByID: async (_, { id }) => {
      const postHaul = await PostHauler.findOne({ id });
      return postHaul;
    },

    getRequestHaulers: async (_, __, { user }) => {
      try {
        const requestHaulers = await RequestHauler.find({ email: user.email });
        return requestHaulers;
      } catch (error) {
        throw new Error(error);
      }
    },
    getRequestHaulerById: async (_, { id }) => {
      try {
        const requestHauler = await RequestHauler.findOne({ id });
        if (!requestHauler) {
          throw new Error("Request haul not found");
        }
        return requestHauler;
      } catch (error) {
        throw new Error(error);
      }
    },

    getHaulerInfo: async (_, __, { user }) => {
      try {
        console.log(user);
        const haulerInfo = await Hauler.findOne({ email: user?.email });
        console.log("haulerInfo", haulerInfo);
        return haulerInfo;
      } catch (error) {
        return { message: error };
      }
    },
  },
  Mutation: {
    createHaulPost: async (_, { haulPost }, { user }) => {
      haulPost.id = generateUniqueId();
      haulPost.email = user.email;
      const postHauls = await PostHaul.create(haulPost);
      return postHauls;
    },

    removeHaulPost: async (_, { id }) => {
      const removedpostedHaul = await PostHaul.findOneAndDelete({ id });
      return removedpostedHaul;
    },

    createRequestHaul: async (_, { haul }, { user }) => {
      try {
        haul.id = generateUniqueId();
        haul.email = user.email;
        const newRequestHaul = await RequestHaul.create(haul);
        return newRequestHaul;
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteRequestHaul: async (_, { id }) => {
      try {
        const deletedRequestHaul = await RequestHaul.findOneAndDelete({ id });
        if (!deletedRequestHaul) {
          throw new Error("Request haul not found");
        }
        return deletedRequestHaul;
      } catch (error) {
        throw new Error(error);
      }
    },

    createHaulerPost: async (_, { haulerPost }, { user }) => {
      haulerPost.id = generateUniqueId();
      haulerPost.email = user.email;
      const postHauls = await PostHauler.create(haulerPost);
      return postHauls;
    },

    removeHaulerPost: async (_, { id }) => {
      const removedpostedHaul = await PostHauler.findOneAndDelete({ id });
      return removedpostedHaul;
    },

    createRequestHauler: async (_, { hauler }, { user }) => {
      try {
        hauler.email = user.email;
        hauler.id = generateUniqueId();
        const newRequestHaul = await RequestHauler.create(hauler);
        return newRequestHaul;
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteRequestHauler: async (_, { id }) => {
      try {
        const deletedRequestHaul = await RequestHauler.findOneAndDelete({ id });
        if (!deletedRequestHaul) {
          throw new Error("Request haul not found");
        }
        return deletedRequestHaul;
      } catch (error) {
        throw new Error(error);
      }
    },

    createHauler: async (_, { hauler }) => {
      const HaulerData = await Hauler.findOne({ email: hauler?.email });
      if (HaulerData) {
        return { message: "Already registered with this email" };
      }
      const haulerInfo = new Hauler(hauler);
      const password = await hashPassword(hauler.password);
      haulerInfo.password = password;
      await haulerInfo.save();
      return haulerInfo;
    },

    haulerLogin: async (_, { hauler }) => {
      try {
        const loginHauler = await Hauler.findOne({
          email: hauler?.email,
        });

        if (loginHauler != null) {
          const password = await verifyPassword(
            hauler.password,
            loginHauler.password
          );
          if (password) {
            const token = jwt.sign(
              { email: hauler?.email },
              process.env.JWT_SECRET,
              { expiresIn: "10h" }
            );
            return {
              user: loginHauler,
              token,
              type: "Hauler",
              message: "Sucessfully logged in",
            };
          } else {
            throw new AuthenticationError("Incorrect Password");
          }
        } else {
          throw new AuthenticationError("Incorrect Username");
        }
      } catch (error) {
        return { message: error };
      }
    },

    updateHauler: async (_, { hauler }) => {
      try {
        const updatedUser = await Hauler.findOneAndUpdate(
          { email: hauler?.email },
          hauler
        );
        return updatedUser;
      } catch (error) {
        return { message: error };
      }
    },

    // User
    registerUser: async (_, { user }) => {
      try {
        const UserInfo = await User.findOne({ email: user?.email });
        if (UserInfo) {
          return { message: "Already registered with this email" };
        }
        const password = await hashPassword(user.password);
        user.password = password;
        const newUser = await User.create(user);
        return newUser;
      } catch (error) {
        return { message: error };
      }
    },

    loginUser: async (_, { user }) => {
      try {
        const loginUser = await User.findOne({ email: user?.email });
        if (loginUser != null) {
          const password = await verifyPassword(
            user.password,
            loginUser.password
          );
          if (password) {
            const token = jwt.sign(
              { email: user?.email },
              process.env.JWT_SECRET,
              { expiresIn: "10h" }
            );
            return {
              user: loginUser,
              token,
              type: "User",
              message: "Sucessfully logged in",
            };
          } else {
            throw new AuthenticationError("Incorrect Password");
          }
        } else {
          throw new AuthenticationError("Incorrect Username");
        }
      } catch (error) {
        return { message: error };
      }
    },

    updateUser: async (_, { user }) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { email: user?.email },
          user
        );
        return updatedUser;
      } catch (error) {
        return { message: error };
      }
    },
  },
};
