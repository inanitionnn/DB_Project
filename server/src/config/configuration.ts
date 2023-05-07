export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  apiUrl: process.env.API_URL,
  saltRounds: parseInt(process.env.SALT_ROUNDS, 10),
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    user: process.env.DATABASE_USER,
  },
});
