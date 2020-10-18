const typeDef = `
  extend type Query {
    ground(id: String): [Ground]
  }

  extend type Mutation {
    createGround(
      title: String!
      description: String!
      phone: String
      address: String,
      benefit: String
      image: String,
      categoryId: String
    ): Ground
  }

  type Ground {
    id: String
    title: String
    description: String
    phone: String
    address: String,
    benefit: String
    image: String,
    categoryId: String
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

export default typeDef;
