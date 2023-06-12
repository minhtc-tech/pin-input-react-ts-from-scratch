import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./api", () => ({
  postData: jest.fn(),
}));

describe("App", () => {
  it("renders the Pin Input component", () => {
    render(<App />);
    const pinInput = screen.getByTestId("pin-input");
    expect(pinInput).toBeInTheDocument();
  });
});
