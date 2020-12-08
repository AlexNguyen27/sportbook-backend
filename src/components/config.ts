const config = {
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY || 'd73dhwybb',
    algorithm: process.env.JWT_ALGORITHM || 'HS256',
    expiresIn: process.env.JWT_EXPIRES_IN || '30m',
  },
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 9000,
  pgHost: process.env.PG_HOST || '127.0.0.1',
  pgPort: (process.env.PG_PORT as number | undefined) || 5432,
  pgDB: process.env.PG_DB || 'sport_booking',
  pgUser: process.env.PG_USER || 'postgres',
  pgPassword: process.env.PG_PASSWORD || 'postgres',
  redisHost: process.env.REDIS_HOST || 'redis',
  redisPort: (process.env.REDIS_PORT as number | undefined) || 6379,
};

export default config;
