import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { postData } from "./api";

jest.mock("./api", () => ({
  postData: jest.fn(),
}));

describe("App", () => {
  it("should render the App component correctly", () => {
    render(<App />);
    // Add your assertions here
  });

  it("should handle pin input completion and make API request", async () => {
    const { getByTestId } = render(<App />);
    const pinInput = getByTestId("pin-input");
    const mockResponse = { data: { message: "Success" } };
    postData.mockResolvedValue(mockResponse);

    fireEvent.complete(pinInput, "ABCDEF");

    expect(postData).toHaveBeenCalledWith(
      "https://your-firebase-db-url.com/pin-endpoint",
      "ABCDEF"
    );

    await waitFor(() => {
      // Add your assertions here for the success message
    });
  });

  it("should handle pin input completion and display error message on API request failure", async () => {
    const { getByTestId } = render(<App />);
    const pinInput = getByTestId("pin-input");
    const mockError = { message: "API Error" };
    postData.mockRejectedValue(mockError);

    fireEvent.complete(pinInput, "ABCDEF");

    expect(postData).toHaveBeenCalledWith(
      "https://your-firebase-db-url.com/pin-endpoint",
      "ABCDEF"
    );

    await waitFor(() => {
      // Add your assertions here for the error message
    });
  });

  // Add more test cases here...
});
