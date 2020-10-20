const typeDef = `
  extend type Query {
    categories: [Category]
  }

  extend type Mutation {
    createCategory(name: String!): Category
    updateCategory(id: String!, name: String): Category,
    deleteCategory(id: String!): SuccessMessage
  }

  type Category {
    id: String
    name: String
    grounds: [Ground]
    createdAt: DateTime
  }
`;

export default typeDef;
