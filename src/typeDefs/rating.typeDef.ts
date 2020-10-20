const typeDef = `
  extend type Mutation {
    createRating(userId: String!, groundId: String!, point: Float!): SuccessMessage,
    updateRating(userId: String!, groundId: String!, point: Float!): Rating,
  }

  type Rating {
    userId: String
    point: Float!
    groundId: String
  }
`;

export default typeDef;
