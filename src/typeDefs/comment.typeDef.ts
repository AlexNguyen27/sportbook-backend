const typeDef = `
  extend type Query {
    getCommentsbyGroundId(groundId: String!): [Comment]
  }

  extend type Mutation {
    createComment(
      comment: String!,
      userId: String!,
      groundId: String!,
      parentId: String,
    ): Comment,

    updateComment(
      id: String!,
      comment: String!
    ): Comment,

    deleteComment(
      id: String!
    ): SuccessMessage
  }

  type Comment {
    id: String
    comment: String
    userId: String
    user: UserComment
    groundId: String
    parentId: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  type UserComment {
    email: String,
    firstName: String,
    lastName: String,
    avatar: String,
  }
`;

export default typeDef;
