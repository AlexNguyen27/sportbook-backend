const typeDef = `
  extend type Query {
    subGrounds(groundId: String): [SubGround]
  }

  extend type Mutation {
    createSubGround(
      type: Float
      name: String!
      price: Float
      discount: Float,
      status: String
      groundId: String,
    ): SubGround

    updateSubGround(
      id: String
      type: Float
      name: String
      price: Float
      discount: Float,
      status: String
      groundId: String,
    ): SubGround

    deleteSubGround(id: String!): SuccessMessage
  }

  type SubGround {
    id: String
    name: String
    price: Float
    discount: Float
    status: String
    groundId: String
    ground: Ground
    createdAt: DateTime
  }
`;

export default typeDef;
