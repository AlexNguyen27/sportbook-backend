const typeDef = `
  type SuccessMessage {
    status: Int,
    message: String
  }

  type SuccessMessageOrder {
    status: Int,
    message: String,
    cancelledIds: [String]
  }
`;

export default typeDef;
