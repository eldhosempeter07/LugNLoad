import { PostHaul } from "../../models/PostHaul.js";
import { RequestHaul } from "../../models/RequestHaul.js";
import { generateUniqueId } from "../../utils/utils.js";
import { GraphQLScalarType, Kind } from "graphql";

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
    getHaulPosts: async () => {
      const postHauls = await PostHaul.find();
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
  },
  Mutation: {
    createHaulPost: async (_, { haulPost }) => {
      haulPost.id = generateUniqueId();
      const postHauls = await PostHaul.create(haulPost);
      return postHauls;
    },

    removeHaulPost: async (_, { id }) => {
      const removedpostedHaul = await PostHaul.findOneAndDelete({ id });
      return removedpostedHaul;
    },

    createRequestHaul: async (_, { haul }) => {
      try {
        console.log(haul);
        haul.id = generateUniqueId();
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
  },
};
