const typeDef = `
  type Query {
    users(role: String): [User]
    login(email: String!, password: String!): LoginOutput
    getUserById(id: String!): User
    loyalCustomers(weekday: String): [LoyalUser]
  }

  type Mutation {
    createUser(
      email: String!,
      password: String!,
      role: String!,
      firstName: String,
      lastName: String
      avatar: String
    ): User

    updateUser(
      id: String!
      email: String!,
      firstName: String,
      lastName: String,
      phone: String,
      gender: String,
      address: String,
      dob: String,
      avatar: String,
      role: String
      regionCode: String,
      districtCode: String
      wardCode: String
      extraInfo: ExtraInfoInput
      socialNetwork: SocialNetworkInput
    ): User,

    deleteUser(id: String!): SuccessMessage,

    changePassword(
      id: String,
      currentPassword: String!,
      newPassword: String!,
      confirmPassword: String!,
    ): SuccessMessage

    uploadAvatar(
      avatar: String
      userId: String
    ): User

    uploadMomoQRCode(
      momoQRCode: String
    ): User
  }

  input ExtraInfoInput {
    favoriteFoot: String
    playRole: String
    shirtNumber: String
    teamName: String
    favoritePlayTime: String
  }

  input SocialNetworkInput {
    facebook: String
    zalo: String
    twitter: String
  }

  type User {
    id: String
    email: String,
    firstName: String,
    lastName: String,
    phone: String,
    gender: String,
    address: String,
    dob: String,
    avatar: String,
    role: String
    createdAt: DateTime
    updatedAt: DateTime
    extraInfo: String,
    socialNetwork: String,
    momoQRCode: String,
  }

  type LoyalUser {
    id: String
    email: String
    firstName: String
    lastName: String
    phone: String
    orders: [Order]
  }


  type LoginOutput {
    id: String,
    token: String,
    email: String,
    firstName: String,
    lastName: String,
    phone: String,
    gender: String,
    address: String,
    dob: String,
    avatar: String,
    role: String
    momoQRCode: String,
    socialNetwork: String
    extraInfo: String
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

export default typeDef;
