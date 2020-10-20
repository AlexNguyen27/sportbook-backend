const typeDef = `
  extend type Query {
    benefits: [Benefit]
  }

  extend type Mutation {
    createBenefit(title: String!, description: String): Benefit
    updateBenefit(id: String!, title: String, description: String): Benefit,
    deleteBenefit(id: String!): SuccessMessage
  }

  type Benefit {
    id: String
    title: String
    description: String
    createdAt: DateTime
  }
`;

export default typeDef;
