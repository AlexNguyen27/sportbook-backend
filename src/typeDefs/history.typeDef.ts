const typeDef = `
  extend type Query {
    histories(orderId: String): [History]
  }

  type History {
    id: String
    orderId: String
    orderStatus: String,
    createdAt: DateTime
    order: Order
  }

  `;

export default typeDef;
