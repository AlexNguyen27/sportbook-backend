const typeDef = `
  extend type Query {
    ordersByUserId(userId: String): [Order]
    ordersBySubGroundId(subGroundId: String): [Order]
  }

  extend type Mutation {
    createOrder(
      subGroundId: String!
      startDay: String!
      startTime: String!
      duration: Int!
      paymentType: String!
      price: Float!
      discount: Float
    ): Order

    updateOrder(
      id: String!
      subGroundId: String!
      startDay: String
      startTime: String,
      duration: Int
      paymentType: String,
      discount: Float
      price: Float
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
    duration: Int
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
