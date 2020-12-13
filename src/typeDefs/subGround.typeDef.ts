const typeDef = `
  extend type Query {
    subGrounds(groundId: String): [SubGround]
  }

  extend type Mutation {
    createSubGround(
      name: String!
      numberOfPlayers: Int
      groundId: String,
      status: String
    ): SubGround

    updateSubGround(
      id: String
      name: String!
      numberOfPlayers: Int
      status: String
      groundId: String,
    ): SubGround

    deleteSubGround(id: String!): SuccessMessage
  }

  type SubGround {
    id: String
    name: String
    numberOfPlayers: Int
    status: String
    groundId: String
    ground: Ground
    createdAt: DateTime
    prices: [Price]
    orders: [Order]
  }
`;

export default typeDef;
