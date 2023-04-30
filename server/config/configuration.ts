export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  api_url: process.env.API_URL,
  salt_rounds: process.env.SALT_ROUNDS,
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    user: process.env.DATABASE_USER,
  },
});
