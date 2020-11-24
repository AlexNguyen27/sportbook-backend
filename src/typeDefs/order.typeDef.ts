const typeDef = `
  extend type Query {
    orders(userId: String, subGroundId: String): [Order]
  }

  extend type Mutation {
    createOrder(
      subGroundId: String!
      startDay: String!
      startTime: String!
      endTime: String!
      paymentType: String!
      price: Float!
      discount: Float
    ): Order

    updateOrder(
      id: String!
      subGroundId: String!
      startDay: String!
      startTime: String!
      endTime: String!
      paymentType: String!
      price: Float!
      discount: Float
    ): Order

    updateOrderStatus(
      id: String!
      status: String!
    ): SuccessMessage
  }

  type Order {
    id: String
    subGroundId: String
    userId: String
    startDay: String
    startTime: String,
    endTime: String
    paymentType: String,
    status: String
    discount: Float
    price: Float
    subGround: SubGround
    user: User
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

export default typeDef;
