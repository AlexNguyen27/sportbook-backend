const typeDef = `
  extend type Query {
    ratings(groundId: String!): [Rating]
  }

  extend type Mutation {
    createOrUpdateRating(userId: String!, groundId: String!, point: Float!): SuccessMessage,
    updateRating(userId: String!, groundId: String!, point: Float!): Rating,
  }

  type Rating {
    userId: String
    point: Float!
    groundId: String
  }
`;

export default typeDef;
