export class UserQueries {
  static readonly CREATE_NEW_USER = `
    INSERT INTO "Users" (id, email, name, password) 
    VALUES ($1, $2, $3, $4)
    RETURNING *`;
  static readonly DELETE_USER_BY_ID = `
    DELETE FROM "Users" 
    WHERE "id" = $1`;
  static readonly SELECT_ALL_USERS = `
    SELECT * FROM "Users"`;
  static readonly SELECT_USER_BY_EMAIL = `
    SELECT * FROM "Users"
    WHERE email = $1`;
  static readonly SELECT_USER_BY_ID = `
    SELECT * FROM "Users"
    WHERE id = $1`;
}
