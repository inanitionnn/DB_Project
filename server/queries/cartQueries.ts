export class CartQueries {
  static readonly CREATE_NEW_CART = `
    INSERT INTO "Carts" (id, "userId")
    VALUES ($1, $2)
    RETURNING *`;
  static readonly SELECT_CART_BY_USER_ID = `
    SELECT * FROM "Carts"
    WHERE "userId" = $1`;
  static readonly SELECT_ALL_CARTPRODUCTS_WITH_COUNT = `
    SELECT p.*,  cp.count
    FROM "CartProducts" cp
    JOIN "Products" p ON cp."productId" = p."id"
    WHERE cp."cartId" = $1`;
  static readonly SELECT_CARTPRODUCT = `
    SELECT * FROM "CartProducts"
    WHERE "cartId" = $1 and "productId" = $2`;
  static readonly CREATE_NEW_CARTPRODUCT = `
    INSERT INTO "CartProducts" ("cartId", "productId", "count")
    VALUES ($1, $2, 1)
    RETURNING *`;
  static readonly DELETE_CARTPRODUCT = `
    DELETE FROM "CartProducts"
    WHERE "cartId" = $1 and "productId" = $2
    RETURNING *`;
  static readonly DELETE_ALL_CARTPRODUCT = `
    DELETE FROM "CartProducts"
    WHERE "cartId" = $1
    RETURNING *`;
  static readonly ADD_CARTPRODUCT_COUNT = `
    Update "CartProducts"
    Set count = count + 1
    WHERE "cartId" = $1 and "productId" = $2`;
  static readonly SUBTRACT_CARTPRODUCT_COUNT = `
    Update "CartProducts"
    Set count = count - 1
    WHERE "cartId" = $1 and "productId" = $2`;
  static readonly PRISE_SUM_CARTPRODUCTS = `
    SELECT COALESCE(ROUND(SUM(p.price * cp.count)::numeric, 2),0) AS total
    FROM "CartProducts" cp
    JOIN "Products" p ON cp."productId" = p."id"
    WHERE cp."cartId" = $1;`;
}
