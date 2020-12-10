import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
  /** A field whose value is a UTC Offset: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones */
  UtcOffset: any;
  /**
   * 
   *     A string representing a duration conforming to the ISO8601 standard,
   *     such as: P1W1DT13H23M34S
   *     P is the duration designator (for period) placed at the start of the duration representation.
   *     Y is the year designator that follows the value for the number of years.
   *     M is the month designator that follows the value for the number of months.
   *     W is the week designator that follows the value for the number of weeks.
   *     D is the day designator that follows the value for the number of days.
   *     T is the time designator that precedes the time components of the representation.
   *     H is the hour designator that follows the value for the number of hours.
   *     M is the minute designator that follows the value for the number of minutes.
   *     S is the second designator that follows the value for the number of seconds.
   * 
   *     Note the time designator, T, that precedes the time value.
   * 
   *     Matches moment.js, Luxon and DateFns implementations
   *     ,/. is valid for decimal places and +/- is a valid prefix
   *   
   */
  ISO8601Duration: any;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any;
  /** Floats that will have a value less than 0. */
  NegativeFloat: any;
  /** Integers that will have a value less than 0. */
  NegativeInt: any;
  /** A string that cannot be passed as an empty value */
  NonEmptyString: any;
  /** Floats that will have a value of 0 or more. */
  NonNegativeFloat: any;
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: any;
  /** Floats that will have a value of 0 or less. */
  NonPositiveFloat: any;
  /** Integers that will have a value of 0 or less. */
  NonPositiveInt: any;
  /** A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234. */
  PhoneNumber: any;
  /** Floats that will have a value greater than 0. */
  PositiveFloat: any;
  /** Integers that will have a value greater than 0. */
  PositiveInt: any;
  /** A field whose value conforms to the standard postal code formats for United States, United Kingdom, Germany, Canada, France, Italy, Australia, Netherlands, Spain, Denmark, Sweden, Belgium, India, Austria, Portugal, Switzerland or Luxembourg. */
  PostalCode: any;
  /** Floats that will have a value of 0 or more. */
  UnsignedFloat: any;
  /** Integers that will have a value of 0 or more. */
  UnsignedInt: any;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: any;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: any;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  Long: any;
  /** The `Byte` scalar type represents byte value as a Buffer */
  Byte: any;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  UUID: any;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  GUID: any;
  /** A field whose value is a hexadecimal: https://en.wikipedia.org/wiki/Hexadecimal. */
  Hexadecimal: any;
  /** A field whose value is a hex color code: https://en.wikipedia.org/wiki/Web_colors. */
  HexColorCode: any;
  /** A field whose value is a CSS HSL color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSL: any;
  /** A field whose value is a CSS HSLA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSLA: any;
  /** A field whose value is a IPv4 address: https://en.wikipedia.org/wiki/IPv4. */
  IPv4: any;
  /** A field whose value is a IPv6 address: https://en.wikipedia.org/wiki/IPv6. */
  IPv6: any;
  /** A field whose value is a ISBN-10 or ISBN-13 number: https://en.wikipedia.org/wiki/International_Standard_Book_Number. */
  ISBN: any;
  /** A field whose value is a IEEE 802 48-bit MAC address: https://en.wikipedia.org/wiki/MAC_address. */
  MAC: any;
  /** A field whose value is a valid TCP port within the range of 0 to 65535: https://en.wikipedia.org/wiki/Transmission_Control_Protocol#TCP_ports */
  Port: any;
  /** A field whose value is a CSS RGB color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba(). */
  RGB: any;
  /** A field whose value is a CSS RGBA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba(). */
  RGBA: any;
  /** The `SafeInt` scalar type represents non-fractional signed whole numeric values that are considered safe as defined by the ECMAScript specification. */
  SafeInt: any;
  /** A currency string, such as $21.25 */
  USCurrency: any;
  /** A field whose value is a Currency: https://en.wikipedia.org/wiki/ISO_4217. */
  Currency: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** A field whose value is an International Bank Account Number (IBAN): https://en.wikipedia.org/wiki/International_Bank_Account_Number. */
  IBAN: any;
  /** A field whose value conforms with the standard mongodb object ID as described here: https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId. Example: 5e5677d71bdc2ae76344968c */
  ObjectID: any;
  /** Represents NULL values */
  Void: any;
};














































export type Benefit = {
  __typename?: 'Benefit';
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
};

export type Category = {
  __typename?: 'Category';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  grounds?: Maybe<Array<Maybe<Ground>>>;
  createdAt?: Maybe<Scalars['DateTime']>;
};

export type Comment = {
  __typename?: 'Comment';
  id?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  user?: Maybe<UserComment>;
  groundId?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserComment = {
  __typename?: 'UserComment';
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
};

export type SuccessMessage = {
  __typename?: 'SuccessMessage';
  status?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
};

export type Ground = {
  __typename?: 'Ground';
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  benefit?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  isAvailable?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
  category?: Maybe<Category>;
  subGrounds?: Maybe<Array<Maybe<SubGround>>>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  categoryId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  totalAmount?: Maybe<Scalars['Float']>;
  orderCount?: Maybe<Scalars['Int']>;
};

export type History = {
  __typename?: 'History';
  id?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  orderStatus?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  order?: Maybe<Order>;
};

export type Order = {
  __typename?: 'Order';
  id?: Maybe<Scalars['String']>;
  subGroundId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  startDay?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['String']>;
  paymentType?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  discount?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  subGround?: Maybe<SubGround>;
  user?: Maybe<User>;
  histories?: Maybe<Array<Maybe<History>>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Price = {
  __typename?: 'Price';
  id?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  discount?: Maybe<Scalars['Float']>;
  startTime?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  subGroundId?: Maybe<Scalars['String']>;
  subGround?: Maybe<SubGround>;
  createdAt?: Maybe<Scalars['DateTime']>;
};

export type Rating = {
  __typename?: 'Rating';
  userId?: Maybe<Scalars['String']>;
  point: Scalars['Float'];
  groundId?: Maybe<Scalars['String']>;
};

export type SubGround = {
  __typename?: 'SubGround';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  numberOfPlayers?: Maybe<Scalars['Int']>;
  groundId?: Maybe<Scalars['String']>;
  ground?: Maybe<Ground>;
  createdAt?: Maybe<Scalars['DateTime']>;
  prices?: Maybe<Array<Maybe<Price>>>;
};

export type Query = {
  __typename?: 'Query';
  users?: Maybe<Array<Maybe<User>>>;
  login?: Maybe<LoginOutput>;
  getUserById?: Maybe<User>;
  loyalCustomers?: Maybe<Array<Maybe<LoyalUser>>>;
  checkExitsEmail?: Maybe<Exit>;
  benefits?: Maybe<Array<Maybe<Benefit>>>;
  categories?: Maybe<Array<Maybe<Category>>>;
  getCommentsbyGroundId?: Maybe<Array<Maybe<Comment>>>;
  grounds?: Maybe<Array<Maybe<Ground>>>;
  getGroundById?: Maybe<Ground>;
  getAllGrounds?: Maybe<Array<Maybe<Ground>>>;
  searchGrounds?: Maybe<Array<Maybe<Ground>>>;
  histories?: Maybe<Array<Maybe<History>>>;
  orders?: Maybe<Array<Maybe<Order>>>;
  getOrderById?: Maybe<Order>;
  prices?: Maybe<Array<Maybe<Price>>>;
  ratings?: Maybe<Array<Maybe<Rating>>>;
  subGrounds?: Maybe<Array<Maybe<SubGround>>>;
};


export type QueryUsersArgs = {
  role?: Maybe<Scalars['String']>;
};


export type QueryLoginArgs = {
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  hashPassword?: Maybe<Scalars['String']>;
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String'];
};


export type QueryLoyalCustomersArgs = {
  weekday?: Maybe<Scalars['String']>;
};


export type QueryCheckExitsEmailArgs = {
  email: Scalars['String'];
};


export type QueryGetCommentsbyGroundIdArgs = {
  groundId: Scalars['String'];
};


export type QueryGroundsArgs = {
  date?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['String']>;
};


export type QueryGetGroundByIdArgs = {
  id: Scalars['String'];
  startDay?: Maybe<Scalars['String']>;
};


export type QueryGetAllGroundsArgs = {
  isAvailable?: Maybe<Scalars['Boolean']>;
};


export type QuerySearchGroundsArgs = {
  search?: Maybe<Scalars['String']>;
};


export type QueryHistoriesArgs = {
  orderId?: Maybe<Scalars['String']>;
};


export type QueryOrdersArgs = {
  userId?: Maybe<Scalars['String']>;
  subGroundId?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  fromDate?: Maybe<Scalars['String']>;
  toDate?: Maybe<Scalars['String']>;
};


export type QueryGetOrderByIdArgs = {
  id: Scalars['String'];
};


export type QueryPricesArgs = {
  subGroundId?: Maybe<Scalars['String']>;
};


export type QueryRatingsArgs = {
  groundId: Scalars['String'];
};


export type QuerySubGroundsArgs = {
  groundId?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
  updateUser?: Maybe<User>;
  deleteUser?: Maybe<SuccessMessage>;
  changePassword?: Maybe<SuccessMessage>;
  uploadAvatar?: Maybe<User>;
  uploadMomoQRCode?: Maybe<User>;
  createBenefit?: Maybe<Benefit>;
  updateBenefit?: Maybe<Benefit>;
  deleteBenefit?: Maybe<SuccessMessage>;
  createCategory?: Maybe<Category>;
  updateCategory?: Maybe<Category>;
  deleteCategory?: Maybe<SuccessMessage>;
  createComment?: Maybe<Comment>;
  updateComment?: Maybe<Comment>;
  deleteComment?: Maybe<SuccessMessage>;
  createGround?: Maybe<Ground>;
  updateGround?: Maybe<Ground>;
  deleteGround?: Maybe<SuccessMessage>;
  createOrder?: Maybe<Order>;
  updateOrder?: Maybe<Order>;
  updateOrderStatus?: Maybe<SuccessMessage>;
  createPrice?: Maybe<Price>;
  updatePrice?: Maybe<Price>;
  deletePrice?: Maybe<SuccessMessage>;
  createOrUpdateRating?: Maybe<SuccessMessage>;
  updateRating?: Maybe<Rating>;
  createSubGround?: Maybe<SubGround>;
  updateSubGround?: Maybe<SubGround>;
  deleteSubGround?: Maybe<SuccessMessage>;
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
};


export type MutationUpdateUserArgs = {
  id: Scalars['String'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  regionCode?: Maybe<Scalars['String']>;
  districtCode?: Maybe<Scalars['String']>;
  wardCode?: Maybe<Scalars['String']>;
  extraInfo?: Maybe<ExtraInfoInput>;
  socialNetwork?: Maybe<SocialNetworkInput>;
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  id?: Maybe<Scalars['String']>;
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
  confirmPassword: Scalars['String'];
};


export type MutationUploadAvatarArgs = {
  avatar?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};


export type MutationUploadMomoQrCodeArgs = {
  momoQRCode?: Maybe<Scalars['String']>;
};


export type MutationCreateBenefitArgs = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};


export type MutationUpdateBenefitArgs = {
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};


export type MutationDeleteBenefitArgs = {
  id: Scalars['Int'];
};


export type MutationCreateCategoryArgs = {
  name: Scalars['String'];
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  comment: Scalars['String'];
  userId: Scalars['String'];
  groundId: Scalars['String'];
  parentId?: Maybe<Scalars['String']>;
};


export type MutationUpdateCommentArgs = {
  id: Scalars['String'];
  comment: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['String'];
};


export type MutationCreateGroundArgs = {
  title: Scalars['String'];
  description: Scalars['String'];
  phone: Scalars['String'];
  address: Scalars['String'];
  benefit?: Maybe<Scalars['String']>;
  categoryId: Scalars['String'];
  regionCode: Scalars['String'];
  districtCode: Scalars['String'];
  wardCode: Scalars['String'];
  image?: Maybe<Scalars['String']>;
};


export type MutationUpdateGroundArgs = {
  id: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  phone: Scalars['String'];
  address: Scalars['String'];
  benefit?: Maybe<Scalars['String']>;
  categoryId: Scalars['String'];
  regionCode: Scalars['String'];
  districtCode: Scalars['String'];
  wardCode: Scalars['String'];
  image?: Maybe<Scalars['String']>;
};


export type MutationDeleteGroundArgs = {
  id: Scalars['String'];
};


export type MutationCreateOrderArgs = {
  subGroundId: Scalars['String'];
  startDay: Scalars['String'];
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  paymentType: Scalars['String'];
  price: Scalars['Float'];
  discount?: Maybe<Scalars['Float']>;
};


export type MutationUpdateOrderArgs = {
  id: Scalars['String'];
  subGroundId: Scalars['String'];
  startDay: Scalars['String'];
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  paymentType: Scalars['String'];
  price: Scalars['Float'];
  discount?: Maybe<Scalars['Float']>;
};


export type MutationUpdateOrderStatusArgs = {
  id: Scalars['String'];
  status: Scalars['String'];
};


export type MutationCreatePriceArgs = {
  price: Scalars['Float'];
  discount?: Maybe<Scalars['Float']>;
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  subGroundId: Scalars['String'];
};


export type MutationUpdatePriceArgs = {
  id: Scalars['String'];
  price: Scalars['Float'];
  discount?: Maybe<Scalars['Float']>;
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  subGroundId: Scalars['String'];
};


export type MutationDeletePriceArgs = {
  id: Scalars['String'];
};


export type MutationCreateOrUpdateRatingArgs = {
  userId: Scalars['String'];
  groundId: Scalars['String'];
  point: Scalars['Float'];
};


export type MutationUpdateRatingArgs = {
  userId: Scalars['String'];
  groundId: Scalars['String'];
  point: Scalars['Float'];
};


export type MutationCreateSubGroundArgs = {
  name: Scalars['String'];
  numberOfPlayers?: Maybe<Scalars['Int']>;
  groundId?: Maybe<Scalars['String']>;
};


export type MutationUpdateSubGroundArgs = {
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  numberOfPlayers?: Maybe<Scalars['Int']>;
  groundId?: Maybe<Scalars['String']>;
};


export type MutationDeleteSubGroundArgs = {
  id: Scalars['String'];
};

export type ExtraInfoInput = {
  favoriteFoot?: Maybe<Scalars['String']>;
  playRole?: Maybe<Scalars['String']>;
  shirtNumber?: Maybe<Scalars['String']>;
  teamName?: Maybe<Scalars['String']>;
  favoritePlayTime?: Maybe<Scalars['String']>;
};

export type SocialNetworkInput = {
  facebook?: Maybe<Scalars['String']>;
  zalo?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
};

export type Exit = {
  __typename?: 'Exit';
  status?: Maybe<Scalars['Boolean']>;
  hashPassword?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  extraInfo?: Maybe<Scalars['String']>;
  socialNetwork?: Maybe<Scalars['String']>;
  momoQRCode?: Maybe<Scalars['String']>;
};

export type LoyalUser = {
  __typename?: 'LoyalUser';
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  orders?: Maybe<Array<Maybe<Order>>>;
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  id?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  momoQRCode?: Maybe<Scalars['String']>;
  socialNetwork?: Maybe<Scalars['String']>;
  extraInfo?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Time: ResolverTypeWrapper<Scalars['Time']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']>;
  UtcOffset: ResolverTypeWrapper<Scalars['UtcOffset']>;
  ISO8601Duration: ResolverTypeWrapper<Scalars['ISO8601Duration']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
  NegativeFloat: ResolverTypeWrapper<Scalars['NegativeFloat']>;
  NegativeInt: ResolverTypeWrapper<Scalars['NegativeInt']>;
  NonEmptyString: ResolverTypeWrapper<Scalars['NonEmptyString']>;
  NonNegativeFloat: ResolverTypeWrapper<Scalars['NonNegativeFloat']>;
  NonNegativeInt: ResolverTypeWrapper<Scalars['NonNegativeInt']>;
  NonPositiveFloat: ResolverTypeWrapper<Scalars['NonPositiveFloat']>;
  NonPositiveInt: ResolverTypeWrapper<Scalars['NonPositiveInt']>;
  PhoneNumber: ResolverTypeWrapper<Scalars['PhoneNumber']>;
  PositiveFloat: ResolverTypeWrapper<Scalars['PositiveFloat']>;
  PositiveInt: ResolverTypeWrapper<Scalars['PositiveInt']>;
  PostalCode: ResolverTypeWrapper<Scalars['PostalCode']>;
  UnsignedFloat: ResolverTypeWrapper<Scalars['UnsignedFloat']>;
  UnsignedInt: ResolverTypeWrapper<Scalars['UnsignedInt']>;
  URL: ResolverTypeWrapper<Scalars['URL']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  Long: ResolverTypeWrapper<Scalars['Long']>;
  Byte: ResolverTypeWrapper<Scalars['Byte']>;
  UUID: ResolverTypeWrapper<Scalars['UUID']>;
  GUID: ResolverTypeWrapper<Scalars['GUID']>;
  Hexadecimal: ResolverTypeWrapper<Scalars['Hexadecimal']>;
  HexColorCode: ResolverTypeWrapper<Scalars['HexColorCode']>;
  HSL: ResolverTypeWrapper<Scalars['HSL']>;
  HSLA: ResolverTypeWrapper<Scalars['HSLA']>;
  IPv4: ResolverTypeWrapper<Scalars['IPv4']>;
  IPv6: ResolverTypeWrapper<Scalars['IPv6']>;
  ISBN: ResolverTypeWrapper<Scalars['ISBN']>;
  MAC: ResolverTypeWrapper<Scalars['MAC']>;
  Port: ResolverTypeWrapper<Scalars['Port']>;
  RGB: ResolverTypeWrapper<Scalars['RGB']>;
  RGBA: ResolverTypeWrapper<Scalars['RGBA']>;
  SafeInt: ResolverTypeWrapper<Scalars['SafeInt']>;
  USCurrency: ResolverTypeWrapper<Scalars['USCurrency']>;
  Currency: ResolverTypeWrapper<Scalars['Currency']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  IBAN: ResolverTypeWrapper<Scalars['IBAN']>;
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']>;
  Void: ResolverTypeWrapper<Scalars['Void']>;
  Benefit: ResolverTypeWrapper<Benefit>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Category: ResolverTypeWrapper<Category>;
  Comment: ResolverTypeWrapper<Comment>;
  UserComment: ResolverTypeWrapper<UserComment>;
  SuccessMessage: ResolverTypeWrapper<SuccessMessage>;
  Ground: ResolverTypeWrapper<Ground>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  History: ResolverTypeWrapper<History>;
  Order: ResolverTypeWrapper<Order>;
  Price: ResolverTypeWrapper<Price>;
  Rating: ResolverTypeWrapper<Rating>;
  SubGround: ResolverTypeWrapper<SubGround>;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  ExtraInfoInput: ExtraInfoInput;
  SocialNetworkInput: SocialNetworkInput;
  Exit: ResolverTypeWrapper<Exit>;
  User: ResolverTypeWrapper<User>;
  LoyalUser: ResolverTypeWrapper<LoyalUser>;
  LoginOutput: ResolverTypeWrapper<LoginOutput>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Date: Scalars['Date'];
  Time: Scalars['Time'];
  DateTime: Scalars['DateTime'];
  Timestamp: Scalars['Timestamp'];
  UtcOffset: Scalars['UtcOffset'];
  ISO8601Duration: Scalars['ISO8601Duration'];
  EmailAddress: Scalars['EmailAddress'];
  NegativeFloat: Scalars['NegativeFloat'];
  NegativeInt: Scalars['NegativeInt'];
  NonEmptyString: Scalars['NonEmptyString'];
  NonNegativeFloat: Scalars['NonNegativeFloat'];
  NonNegativeInt: Scalars['NonNegativeInt'];
  NonPositiveFloat: Scalars['NonPositiveFloat'];
  NonPositiveInt: Scalars['NonPositiveInt'];
  PhoneNumber: Scalars['PhoneNumber'];
  PositiveFloat: Scalars['PositiveFloat'];
  PositiveInt: Scalars['PositiveInt'];
  PostalCode: Scalars['PostalCode'];
  UnsignedFloat: Scalars['UnsignedFloat'];
  UnsignedInt: Scalars['UnsignedInt'];
  URL: Scalars['URL'];
  BigInt: Scalars['BigInt'];
  Long: Scalars['Long'];
  Byte: Scalars['Byte'];
  UUID: Scalars['UUID'];
  GUID: Scalars['GUID'];
  Hexadecimal: Scalars['Hexadecimal'];
  HexColorCode: Scalars['HexColorCode'];
  HSL: Scalars['HSL'];
  HSLA: Scalars['HSLA'];
  IPv4: Scalars['IPv4'];
  IPv6: Scalars['IPv6'];
  ISBN: Scalars['ISBN'];
  MAC: Scalars['MAC'];
  Port: Scalars['Port'];
  RGB: Scalars['RGB'];
  RGBA: Scalars['RGBA'];
  SafeInt: Scalars['SafeInt'];
  USCurrency: Scalars['USCurrency'];
  Currency: Scalars['Currency'];
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  IBAN: Scalars['IBAN'];
  ObjectID: Scalars['ObjectID'];
  Void: Scalars['Void'];
  Benefit: Benefit;
  Int: Scalars['Int'];
  String: Scalars['String'];
  Category: Category;
  Comment: Comment;
  UserComment: UserComment;
  SuccessMessage: SuccessMessage;
  Ground: Ground;
  Boolean: Scalars['Boolean'];
  Float: Scalars['Float'];
  History: History;
  Order: Order;
  Price: Price;
  Rating: Rating;
  SubGround: SubGround;
  Query: {};
  Mutation: {};
  ExtraInfoInput: ExtraInfoInput;
  SocialNetworkInput: SocialNetworkInput;
  Exit: Exit;
  User: User;
  LoyalUser: LoyalUser;
  LoginOutput: LoginOutput;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export interface UtcOffsetScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UtcOffset'], any> {
  name: 'UtcOffset';
}

export interface Iso8601DurationScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ISO8601Duration'], any> {
  name: 'ISO8601Duration';
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export interface NegativeFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NegativeFloat'], any> {
  name: 'NegativeFloat';
}

export interface NegativeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NegativeInt'], any> {
  name: 'NegativeInt';
}

export interface NonEmptyStringScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonEmptyString'], any> {
  name: 'NonEmptyString';
}

export interface NonNegativeFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonNegativeFloat'], any> {
  name: 'NonNegativeFloat';
}

export interface NonNegativeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonNegativeInt'], any> {
  name: 'NonNegativeInt';
}

export interface NonPositiveFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonPositiveFloat'], any> {
  name: 'NonPositiveFloat';
}

export interface NonPositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonPositiveInt'], any> {
  name: 'NonPositiveInt';
}

export interface PhoneNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PhoneNumber'], any> {
  name: 'PhoneNumber';
}

export interface PositiveFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveFloat'], any> {
  name: 'PositiveFloat';
}

export interface PositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveInt'], any> {
  name: 'PositiveInt';
}

export interface PostalCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PostalCode'], any> {
  name: 'PostalCode';
}

export interface UnsignedFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UnsignedFloat'], any> {
  name: 'UnsignedFloat';
}

export interface UnsignedIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UnsignedInt'], any> {
  name: 'UnsignedInt';
}

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface LongScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Long'], any> {
  name: 'Long';
}

export interface ByteScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Byte'], any> {
  name: 'Byte';
}

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export interface GuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['GUID'], any> {
  name: 'GUID';
}

export interface HexadecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Hexadecimal'], any> {
  name: 'Hexadecimal';
}

export interface HexColorCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HexColorCode'], any> {
  name: 'HexColorCode';
}

export interface HslScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HSL'], any> {
  name: 'HSL';
}

export interface HslaScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HSLA'], any> {
  name: 'HSLA';
}

export interface IPv4ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IPv4'], any> {
  name: 'IPv4';
}

export interface IPv6ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IPv6'], any> {
  name: 'IPv6';
}

export interface IsbnScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ISBN'], any> {
  name: 'ISBN';
}

export interface MacScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['MAC'], any> {
  name: 'MAC';
}

export interface PortScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Port'], any> {
  name: 'Port';
}

export interface RgbScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RGB'], any> {
  name: 'RGB';
}

export interface RgbaScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RGBA'], any> {
  name: 'RGBA';
}

export interface SafeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['SafeInt'], any> {
  name: 'SafeInt';
}

export interface UsCurrencyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['USCurrency'], any> {
  name: 'USCurrency';
}

export interface CurrencyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Currency'], any> {
  name: 'Currency';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export interface IbanScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IBAN'], any> {
  name: 'IBAN';
}

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectID'], any> {
  name: 'ObjectID';
}

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Void'], any> {
  name: 'Void';
}

export type BenefitResolvers<ContextType = any, ParentType extends ResolversParentTypes['Benefit'] = ResolversParentTypes['Benefit']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  grounds?: Resolver<Maybe<Array<Maybe<ResolversTypes['Ground']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['UserComment']>, ParentType, ContextType>;
  groundId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserCommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserComment'] = ResolversParentTypes['UserComment']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SuccessMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['SuccessMessage'] = ResolversParentTypes['SuccessMessage']> = ResolversObject<{
  status?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GroundResolvers<ContextType = any, ParentType extends ResolversParentTypes['Ground'] = ResolversParentTypes['Ground']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  benefit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isAvailable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  subGrounds?: Resolver<Maybe<Array<Maybe<ResolversTypes['SubGround']>>>, ParentType, ContextType>;
  comments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Comment']>>>, ParentType, ContextType>;
  categoryId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  totalAmount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  orderCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type HistoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['History'] = ResolversParentTypes['History']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  orderId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  orderStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subGroundId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  startDay?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  startTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  paymentType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  discount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  subGround?: Resolver<Maybe<ResolversTypes['SubGround']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  histories?: Resolver<Maybe<Array<Maybe<ResolversTypes['History']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PriceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Price'] = ResolversParentTypes['Price']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  discount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  startTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subGroundId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subGround?: Resolver<Maybe<ResolversTypes['SubGround']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RatingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Rating'] = ResolversParentTypes['Rating']> = ResolversObject<{
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  point?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  groundId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubGroundResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubGround'] = ResolversParentTypes['SubGround']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  numberOfPlayers?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  groundId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ground?: Resolver<Maybe<ResolversTypes['Ground']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  prices?: Resolver<Maybe<Array<Maybe<ResolversTypes['Price']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, RequireFields<QueryUsersArgs, never>>;
  login?: Resolver<Maybe<ResolversTypes['LoginOutput']>, ParentType, ContextType, RequireFields<QueryLoginArgs, 'email'>>;
  getUserById?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'id'>>;
  loyalCustomers?: Resolver<Maybe<Array<Maybe<ResolversTypes['LoyalUser']>>>, ParentType, ContextType, RequireFields<QueryLoyalCustomersArgs, never>>;
  checkExitsEmail?: Resolver<Maybe<ResolversTypes['Exit']>, ParentType, ContextType, RequireFields<QueryCheckExitsEmailArgs, 'email'>>;
  benefits?: Resolver<Maybe<Array<Maybe<ResolversTypes['Benefit']>>>, ParentType, ContextType>;
  categories?: Resolver<Maybe<Array<Maybe<ResolversTypes['Category']>>>, ParentType, ContextType>;
  getCommentsbyGroundId?: Resolver<Maybe<Array<Maybe<ResolversTypes['Comment']>>>, ParentType, ContextType, RequireFields<QueryGetCommentsbyGroundIdArgs, 'groundId'>>;
  grounds?: Resolver<Maybe<Array<Maybe<ResolversTypes['Ground']>>>, ParentType, ContextType, RequireFields<QueryGroundsArgs, never>>;
  getGroundById?: Resolver<Maybe<ResolversTypes['Ground']>, ParentType, ContextType, RequireFields<QueryGetGroundByIdArgs, 'id'>>;
  getAllGrounds?: Resolver<Maybe<Array<Maybe<ResolversTypes['Ground']>>>, ParentType, ContextType, RequireFields<QueryGetAllGroundsArgs, never>>;
  searchGrounds?: Resolver<Maybe<Array<Maybe<ResolversTypes['Ground']>>>, ParentType, ContextType, RequireFields<QuerySearchGroundsArgs, never>>;
  histories?: Resolver<Maybe<Array<Maybe<ResolversTypes['History']>>>, ParentType, ContextType, RequireFields<QueryHistoriesArgs, never>>;
  orders?: Resolver<Maybe<Array<Maybe<ResolversTypes['Order']>>>, ParentType, ContextType, RequireFields<QueryOrdersArgs, never>>;
  getOrderById?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<QueryGetOrderByIdArgs, 'id'>>;
  prices?: Resolver<Maybe<Array<Maybe<ResolversTypes['Price']>>>, ParentType, ContextType, RequireFields<QueryPricesArgs, never>>;
  ratings?: Resolver<Maybe<Array<Maybe<ResolversTypes['Rating']>>>, ParentType, ContextType, RequireFields<QueryRatingsArgs, 'groundId'>>;
  subGrounds?: Resolver<Maybe<Array<Maybe<ResolversTypes['SubGround']>>>, ParentType, ContextType, RequireFields<QuerySubGroundsArgs, never>>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'email' | 'password' | 'role'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id' | 'email'>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['SuccessMessage']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  changePassword?: Resolver<Maybe<ResolversTypes['SuccessMessage']>, ParentType, ContextType, RequireFields<MutationChangePasswordArgs, 'currentPassword' | 'newPassword' | 'confirmPassword'>>;
  uploadAvatar?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUploadAvatarArgs, never>>;
  uploadMomoQRCode?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUploadMomoQrCodeArgs, never>>;
  createBenefit?: Resolver<Maybe<ResolversTypes['Benefit']>, ParentType, ContextType, RequireFields<MutationCreateBenefitArgs, 'title'>>;
  updateBenefit?: Resolver<Maybe<ResolversTypes['Benefit']>, ParentType, ContextType, RequireFields<MutationUpdateBenefitArgs, 'id'>>;
  deleteBenefit?: Resolver<Maybe<ResolversTypes['SuccessMessage']>, ParentType, ContextType, RequireFields<MutationDeleteBenefitArgs, 'id'>>;
  createCategory?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<MutationCreateCategoryArgs, 'name'>>;
  updateCategory?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<MutationUpdateCategoryArgs, 'id'>>;
  deleteCategory?: Resolver<Maybe<ResolversTypes['SuccessMessage']>, ParentType, ContextType, RequireFields<MutationDeleteCategoryArgs, 'id'>>;
  createComment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'comment' | 'userId' | 'groundId'>>;
  updateComment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<MutationUpdateCommentArgs, 'id' | 'comment'>>;
  deleteComment?: Resolver<Maybe<ResolversTypes['SuccessMessage']>, ParentType, ContextType, RequireFields<MutationDeleteCommentArgs, 'id'>>;
  createGround?: Resolver<Maybe<ResolversTypes['Ground']>, ParentType, ContextType, RequireFields<MutationCreateGroundArgs, 'title' | 'description' | 'phone' | 'address' | 'categoryId' | 'regionCode' | 'districtCode' | 'wardCode'>>;
  updateGround?: Resolver<Maybe<ResolversTypes['Ground']>, ParentType, ContextType, RequireFields<MutationUpdateGroundArgs, 'id' | 'title' | 'description' | 'phone' | 'address' | 'categoryId' | 'regionCode' | 'districtCode' | 'wardCode'>>;
  deleteGround?: Resolver<Maybe<ResolversTypes['SuccessMessage']>, ParentType, ContextType, RequireFields<MutationDeleteGroundArgs, 'id'>>;
  createOrder?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationCreateOrderArgs, 'subGroundId' | 'startDay' | 'startTime' | 'endTime' | 'paymentType' | 'price'>>;
  updateOrder?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationUpdateOrderArgs, 'id' | 'subGroundId' | 'startDay' | 'startTime' | 'endTime' | 'paymentType' | 'price'>>;
  updateOrderStatus?: Resolver<Maybe<ResolversTypes['SuccessMessage']>, ParentType, ContextType, RequireFields<MutationUpdateOrderStatusArgs, 'id' | 'status'>>;
  createPrice?: Resolver<Maybe<ResolversTypes['Price']>, ParentType, ContextType, RequireFields<MutationCreatePriceArgs, 'price' | 'startTime' | 'endTime' | 'subGroundId'>>;
  updatePrice?: Resolver<Maybe<ResolversTypes['Price']>, ParentType, ContextType, RequireFields<MutationUpdatePriceArgs, 'id' | 'price' | 'startTime' | 'endTime' | 'subGroundId'>>;
  deletePrice?: Resolver<Maybe<ResolversTypes['SuccessMessage']>, ParentType, ContextType, RequireFields<MutationDeletePriceArgs, 'id'>>;
  createOrUpdateRating?: Resolver<Maybe<ResolversTypes['SuccessMessage']>, ParentType, ContextType, RequireFields<MutationCreateOrUpdateRatingArgs, 'userId' | 'groundId' | 'point'>>;
  updateRating?: Resolver<Maybe<ResolversTypes['Rating']>, ParentType, ContextType, RequireFields<MutationUpdateRatingArgs, 'userId' | 'groundId' | 'point'>>;
  createSubGround?: Resolver<Maybe<ResolversTypes['SubGround']>, ParentType, ContextType, RequireFields<MutationCreateSubGroundArgs, 'name'>>;
  updateSubGround?: Resolver<Maybe<ResolversTypes['SubGround']>, ParentType, ContextType, RequireFields<MutationUpdateSubGroundArgs, 'name'>>;
  deleteSubGround?: Resolver<Maybe<ResolversTypes['SuccessMessage']>, ParentType, ContextType, RequireFields<MutationDeleteSubGroundArgs, 'id'>>;
}>;

export type ExitResolvers<ContextType = any, ParentType extends ResolversParentTypes['Exit'] = ResolversParentTypes['Exit']> = ResolversObject<{
  status?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  hashPassword?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dob?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  extraInfo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  socialNetwork?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  momoQRCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LoyalUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoyalUser'] = ResolversParentTypes['LoyalUser']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  orders?: Resolver<Maybe<Array<Maybe<ResolversTypes['Order']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LoginOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginOutput'] = ResolversParentTypes['LoginOutput']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dob?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  momoQRCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  socialNetwork?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  extraInfo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Date?: GraphQLScalarType;
  Time?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Timestamp?: GraphQLScalarType;
  UtcOffset?: GraphQLScalarType;
  ISO8601Duration?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  NegativeFloat?: GraphQLScalarType;
  NegativeInt?: GraphQLScalarType;
  NonEmptyString?: GraphQLScalarType;
  NonNegativeFloat?: GraphQLScalarType;
  NonNegativeInt?: GraphQLScalarType;
  NonPositiveFloat?: GraphQLScalarType;
  NonPositiveInt?: GraphQLScalarType;
  PhoneNumber?: GraphQLScalarType;
  PositiveFloat?: GraphQLScalarType;
  PositiveInt?: GraphQLScalarType;
  PostalCode?: GraphQLScalarType;
  UnsignedFloat?: GraphQLScalarType;
  UnsignedInt?: GraphQLScalarType;
  URL?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Long?: GraphQLScalarType;
  Byte?: GraphQLScalarType;
  UUID?: GraphQLScalarType;
  GUID?: GraphQLScalarType;
  Hexadecimal?: GraphQLScalarType;
  HexColorCode?: GraphQLScalarType;
  HSL?: GraphQLScalarType;
  HSLA?: GraphQLScalarType;
  IPv4?: GraphQLScalarType;
  IPv6?: GraphQLScalarType;
  ISBN?: GraphQLScalarType;
  MAC?: GraphQLScalarType;
  Port?: GraphQLScalarType;
  RGB?: GraphQLScalarType;
  RGBA?: GraphQLScalarType;
  SafeInt?: GraphQLScalarType;
  USCurrency?: GraphQLScalarType;
  Currency?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  IBAN?: GraphQLScalarType;
  ObjectID?: GraphQLScalarType;
  Void?: GraphQLScalarType;
  Benefit?: BenefitResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  UserComment?: UserCommentResolvers<ContextType>;
  SuccessMessage?: SuccessMessageResolvers<ContextType>;
  Ground?: GroundResolvers<ContextType>;
  History?: HistoryResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  Price?: PriceResolvers<ContextType>;
  Rating?: RatingResolvers<ContextType>;
  SubGround?: SubGroundResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Exit?: ExitResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  LoyalUser?: LoyalUserResolvers<ContextType>;
  LoginOutput?: LoginOutputResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
