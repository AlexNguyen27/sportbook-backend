const typeDef = `
  extend type Query {
    benefits: [Benefit]
  }

  extend type Mutation {
    createBenefit(title: String!, description: String): Benefit
    updateBenefit(id: Int!, title: String, description: String): Benefit,
    deleteBenefit(id: Int!): SuccessMessage
  }

  type Benefit {
    id: Int
    title: String
    description: String
    createdAt: DateTime
  }
`;

export default typeDef;
