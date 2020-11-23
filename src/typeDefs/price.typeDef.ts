const typeDef = `
  extend type Query {
    prices(subGroundId: String): [Price]
  }

  extend type Mutation {
    createPrice(
      price: Float!
      discount: Float
      startTime: String!
      endTime: String!
      subGroundId: String!
    ): Price

    updatePrice(
      id: String!
      price: Float!
      discount: Float
      startTime: String!
      endTime: String!
      subGroundId: String!
    ): Price

    deletePrice(id: String!): SuccessMessage
  }

  type Price {
    id: String
    price: Float
    discount: Float
    startTime: String
    endTime: String
    status: String
    subGroundId: String
    subGround: SubGround
    createdAt: DateTime
  }
`;

export default typeDef;
