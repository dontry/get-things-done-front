import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import FieldInput, { FieldState } from "./FieldInput";

const setup = () => {
  const fieldState = new FieldState();
  const utils = render(<FieldInput fieldState={fieldState} />);
  const input = utils.getByLabelText("field-input") as HTMLInputElement;
  return {
    fieldState,
    input,
    ...utils
  };
};

afterEach(cleanup);

describe("FieldInput", () => {
  it("should render ''", () => {
    const { container, input, fieldState } = setup();
    expect(container).toMatchSnapshot();
    expect(input.value).toBe("");
    expect(fieldState.value).toBe("");
  });
  it("should render '23'", () => {
    const { container, input, fieldState } = setup();
    fireEvent.change(input, { target: { value: "23" } });
    expect(container).toMatchSnapshot();
    expect(input.value).toBe("23");
    expect(fieldState.value).toBe("23");
  });
});
