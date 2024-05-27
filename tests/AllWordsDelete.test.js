import React from "react";
import { render, screen, userEvent, act } from "@testing-library/react-native";
import App from "../App";

import testData from "./testData";

jest.mock("@expo/vector-icons/Ionicons", () => {
  const { Text } = require("react-native");
  return ({ name }) => <Text>{name}</Text>; //jest.fn(),
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
  jest.useRealTimers();
});

const originalState = React.useState;
jest
  .spyOn(React, "useState")
  .mockImplementation((originalArgs) => {
    return originalState(
      Array.isArray(originalArgs) && originalArgs.length === 0
        ? testData
        : originalArgs
    );
  });

test("Press on 'delete' deletes the word", async () => {
  const user = userEvent.setup();
  jest.useFakeTimers();

  render(<App />);

  let playButtons = screen.getAllByText("trash-outline");

  await user.press(playButtons[2]);
  act(() => {
    jest.runAllTimers();
  });
  const deletedWordText = screen.queryByText(testData[2].word);
  const deletedWordExplanation = screen.queryByText(testData[2].word);
  expect(deletedWordText).not.toBeOnTheScreen();
  expect(deletedWordExplanation).not.toBeOnTheScreen();

  playButtons = screen.getAllByText("trash-outline");
  expect(playButtons).toHaveLength(3);
});
