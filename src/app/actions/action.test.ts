import { cookies } from "next/headers";

import { getFavorites, getHouse, setFavorites, setHouse } from "./action"; // ou o caminho do seu arquivo de funções

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

describe("Cookie Utility Functions", () => {
  const mockCookieStore = {
    set: jest.fn(),
    get: jest.fn(),
  };

  beforeEach(() => {
    (cookies as jest.Mock).mockReturnValue(mockCookieStore);
    mockCookieStore.set.mockReset();
    mockCookieStore.get.mockReset();
  });

  it("should set the 'my-house' cookie with correct value and expiration", async () => {
    const houseValue = "Gryffindor";
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + 2); // 2 days expiration

    await setHouse(houseValue);

    expect(mockCookieStore.set).toHaveBeenCalledWith("my-house", houseValue, {
      expires: expiresIn,
    });
  });

  it("should get the 'my-house' cookie", async () => {
    const mockHouse = { value: "Gryffindor" };
    mockCookieStore.get.mockReturnValue(mockHouse);

    const house = await getHouse();

    expect(house).toEqual(mockHouse);
    expect(mockCookieStore.get).toHaveBeenCalledWith("my-house");
  });

  it("should set the 'favorites' cookie with correct value and expiration", async () => {
    const favorites = ["Harry Potter", "Hermione Granger"];
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + 2); // 2 days expiration

    await setFavorites(favorites);

    expect(mockCookieStore.set).toHaveBeenCalledWith(
      "favorites",
      favorites.join(),
      {
        expires: expiresIn,
      },
    );
  });

  it("should get the 'favorites' cookie", async () => {
    const mockFavorites = { value: "Harry Potter,Hermione Granger" };
    mockCookieStore.get.mockReturnValue(mockFavorites);

    const favorites = await getFavorites();

    expect(favorites).toEqual(mockFavorites);
    expect(mockCookieStore.get).toHaveBeenCalledWith("favorites");
  });
});
