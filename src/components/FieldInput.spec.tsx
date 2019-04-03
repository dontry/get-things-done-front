import React from "react";
import { render } from "react-testing-library";
import FieldInput, { FieldState } from "./FieldInput";

describe("FieldInput", () => {
  const fieldState: FieldState = {
    value: "",
    onChange: jest.fn()
  };
  it("should render", () => {
    const { container } = render(<FieldInput fieldState={fieldState} />);
    expect(container).toMatchSnapshot();
  });
});
