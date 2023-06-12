import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PinInput from "./index";

describe("PinInput", () => {
  it("renders input fields with correct length", () => {
    const length = 9;
    render(
      <PinInput
        length={length}
        onComplete={() => {}}
        validatePattern={/^\d$/}
      />
    );

    const inputFields = screen.getAllByRole("textbox");
    expect(inputFields.length).toBe(length);
  });

  it("captures pin input correctly", () => {
    const length = 4;
    const onCompleteMock = jest.fn();
    render(
      <PinInput
        length={length}
        onComplete={onCompleteMock}
        validatePattern={/^\d$/}
      />
    );

    const inputFields = screen.getAllByRole("textbox");
    fireEvent.change(inputFields[0], { target: { value: "1" } });
    fireEvent.change(inputFields[1], { target: { value: "2" } });
    fireEvent.change(inputFields[2], { target: { value: "3" } });
    fireEvent.change(inputFields[3], { target: { value: "4" } });

    expect(onCompleteMock).toHaveBeenCalledWith("1234");
  });

  it("moves focus to the previous input field on backspace key press", () => {
    const length = 4;
    render(
      <PinInput
        length={length}
        onComplete={() => {}}
        validatePattern={/^\d$/}
      />
    );

    const inputFields = screen.getAllByRole("textbox");
    fireEvent.change(inputFields[0], { target: { value: "1" } });
    fireEvent.change(inputFields[1], { target: { value: "2" } });
    fireEvent.change(inputFields[2], { target: { value: "3" } });
    fireEvent.change(inputFields[3], { target: { value: "" } });
    fireEvent.keyDown(inputFields[3], { key: "Backspace" });

    expect(document.activeElement).toBe(inputFields[2]);
  });
});
