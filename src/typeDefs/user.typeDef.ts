const typeDef = `
  type Query {
    users: [User]
    login(email: String!, password: String!): LoginOutput
  }

  type Mutation {
    createUser(
      email: String!,
      password: String!,
      role: String!,
    ): User

    updateUser(
      id: String
      email: String,
      firstName: String,
      lastName: String,
      phone: String,
      gender: String,
      address: String,
      dob: String,
      avatar: String,
      favoriteFoot: String
      playRole: String
      role: String
    ): User,

    deleteUser(id: String!): SuccessMessage,

    changePassword(
      id: String,
      currentPassword: String!,
      newPassword: String!,
      confirmPassword: String!,
    ): SuccessMessage
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
    favoriteFoot: String
    playRole: String
    role: String
    createdAt: DateTime
    updatedAt: DateTime
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
    favoriteFoot: String
    playRole: String
    role: String
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

export default typeDef;
