import React from "react";
import { appState } from "./AppState";

describe("", () => {
  it("initiates an current item with empty string", () => {
    expect(appState.currentItem.value).toEqual("");
  });
});
