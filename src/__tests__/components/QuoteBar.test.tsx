import { render, cleanup, waitFor } from "@testing-library/react";
import { QuoteBar } from "~/components/QuoteBar";
global.fetch = require("cross-fetch");
jest.spyOn(global, "fetch");

const QUOTES_API_URL = `${
  process.env.NEXT_PUBLIC_QUOTES_API_URL || "http://localhost:3001"
}/quote`;

describe("QuoteBar", () => {
  afterEach(() => {
    fetch.mockClear();
    cleanup();
  });

  test("fetches quote from API", async () => {
    const URL = QUOTES_API_URL;

    render(<QuoteBar />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(URL);
    });
  });

  test("fetches quote from API", async () => {
    const URL = QUOTES_API_URL;
    const response = await fetch(URL);
    const json = await response.json();

    expect(response.status).toEqual(200);
    expect(json).toHaveProperty("quote");
  });
});
