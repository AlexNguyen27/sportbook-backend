const typeDef = `
  extend type Query {
    grounds(date: String, startDate: String, endDate: String): [Ground],
    getGroundById(id: String!, startDay: String, userId: String): Ground,
    getAllGrounds(isAvailable: Boolean): [Ground],
    searchGrounds(
      search: String,
      districtName: String,
      startDay: String,
      startTime: String,
      regionName: String
      wardName: String,
      limit: Int
      isAvailable: Boolean
    ): [Ground]
  }

  extend type Mutation {
    createGround(
      title: String!
      description: String!
      phone: String!
      address: AddressInput,
      benefit: String
      categoryId: String!
      image: String,
    ): Ground

    updateGround(
      id: String!
      title: String!
      description: String!
      phone: String!
      address: AddressInput,
      benefit: String
      categoryId: String!
      image: String,
    ): Ground

    deleteGround(id: String!): SuccessMessage
  }

  type Address {
    regionCode: String,
    districtCode: String,
    wardCode: String
    address: String
  }

  input AddressInput {
    regionCode: String,
    districtCode: String,
    wardCode: String
    address: String
  }

  type Ground {
    id: String
    title: String
    description: String
    phone: String
    address: Address,
    benefit: String
    image: String,
    isAvailable: Boolean,
    status: String,
    user: User
    category: Category
    subGrounds: [SubGround]
    comments: [Comment]
    categoryId: String
    createdAt: DateTime
    updatedAt: DateTime
    totalAmount: Float
    orderCount: Int
  }
`;

export default typeDef;
