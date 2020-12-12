const typeDef = `
  extend type Query {
    benefits: [Benefit]
  }

  extend type Mutation {
    createBenefit(title: String!, status: String): Benefit
    updateBenefit(id: Int!, title: String, status: String): Benefit,
    deleteBenefit(id: Int!): SuccessMessage
  }

  type Benefit {
    id: Int
    title: String
    status: String
    createdAt: DateTime
  }
`;

export default typeDef;
