export class ProductQueries {
  static readonly CREATE_NEW_PRODUCT = `
    INSERT INTO "Products" (id, name, price, photo) 
    VALUES ($1, $2, $3, $4)
    RETURNING *`;
  static readonly SELECT_ALL_PRODUCTS = `
    SELECT * FROM "Products"`;
  static readonly SELECT_PRODUCT_BY_ID = `
    SELECT * FROM "Products"
    WHERE id = $1`;
}
