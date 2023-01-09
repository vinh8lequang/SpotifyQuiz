import useCachedResources from "./hooks/useCachedResources";
import React from "react";
import renderer from "react-test-renderer";
import App from "./App";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve()),
}));

describe("<App />", () => {
  try {
    it("has 1 child", () => {
      const tree = renderer.create(<App />).toJSON();
      // @ts-ignore
      expect(tree.children.length).toBe(1);
    });
  } catch (error) {
    console.error(error);
  }
});
