import { PostHaul } from "../../models/PostHaul.js";
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
    getHaulPost: async (id) => {
      const postHaul = await PostHaul.findOne({ id });
      return postHaul;
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
  },
};
