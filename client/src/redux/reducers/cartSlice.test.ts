import cartSlice, { setCartState, setCartLogoutState } from "./cartSlice";

describe("Cart slice", () => {
  test("set cart state", () => {
    expect(
      cartSlice(
        { total: 0, products: [] },
        setCartState({ total: 10, products: [] })
      )
    ).toEqual({ total: 10, products: [] });
  });

  test("set cart logout state", () => {
    expect(
      cartSlice({ total: 10, products: [] }, setCartLogoutState())
    ).toEqual({ total: 0, products: [] });
  });
});
