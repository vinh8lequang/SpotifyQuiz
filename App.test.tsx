import React from "react";
import renderer, { create } from "react-test-renderer";
import App from "./App";
import Login from "./screens/Login";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve()),
}));

// const login = create(<Login />);

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

// describe("<Login />", () => {
//   test("snapshot", () => {
//     expect(<Login />).toMatchSnapshot();
//   });
// });
