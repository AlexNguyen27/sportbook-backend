const typeDef = `
  extend type Query {
    grounds(search: String): [Ground]
  }

  extend type Mutation {
    createGround(
      title: String!
      description: String!
      phone: String!
      address: String!,
      benefit: String
      categoryId: String!
      regionCode: String!
      districtCode: String!
      wardCode: String!
      image: String,
    ): Ground

    updateGround(
      id: String
      title: String
      description: String
      phone: String
      address: String,
      benefit: String
      image: String,
      categoryId: String
    ): Ground

    deleteGround(id: String!): SuccessMessage
  }

  type Ground {
    id: String
    title: String
    description: String
    phone: String
    address: String,
    benefit: String
    image: String,
    user: User
    category: Category
    subGrounds: [SubGround]
    categoryId: String
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

export default typeDef;
