const typeDef = `
  extend type Query {
    categories: [Category]
  }

  extend type Mutation {
    createCategory(name: String!): Category
  }

  type Category {
    id: String
    name: String
    grounds: [Ground]
    createdAt: DateTime
  }
`;

export default typeDef;
