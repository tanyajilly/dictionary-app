import { render, screen } from "@testing-library/react-native";

import AllWords from "../screens/AllWords";
import words from "./testData";

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

test("FlatList is used", async () => {
  const message = "FlatList is used, length of data:";
  jest.mock("react-native/Libraries/Lists/FlatList", () => {
    const { Text } = require("react-native");
    return ({ data }) => (
      <Text>
        {message} {data.length}
      </Text>
    );
  });
  render(<AllWords words={words} switchScreen={jest.fn()} />);
  flatListSubstitution = screen.getByText(`${message} 4`);

  expect(flatListSubstitution).toBeOnTheScreen();
});

test("FlatList uses ListEmptyComponent", async () => {
  jest.unmock("react-native/Libraries/Lists/FlatList");

  render(<AllWords words={[]} switchScreen={jest.fn()} />);
  flatListSubstitution = screen.getByText(`No words yet`);

  expect(flatListSubstitution).toBeOnTheScreen();
});

test("`No words yet` is not produced by a component other than FlatList", async () => {
  const message = "FlatList is used, length of data:";
  jest.mock("react-native/Libraries/Lists/FlatList", () => {
    const { Text } = require("react-native");
    return ({ data }) => (
      <Text>
        {message} {data.length}
      </Text>
    );
  });
  render(<AllWords words={[]} switchScreen={jest.fn()} />);
  flatListSubstitution = screen.queryByText(`No words yet`);

  expect(flatListSubstitution).not.toBeOnTheScreen();
});
