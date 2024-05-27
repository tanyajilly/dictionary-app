import {
  render,
  screen,
  userEvent,
  act,
} from "@testing-library/react-native";
import App from "../App";
import * as playService from "../services/soundHandler";
import * as wordsService from "../services/wordsHandler";

jest.mock("@expo/vector-icons/Ionicons", () => {
  const { Text } = require("react-native");
  return ({ name }) => <Text>{name}</Text>; //jest.fn(),
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
  jest.useRealTimers();
});

test("User can add a word", async () => {
  jest.spyOn(wordsService, "getWordInfo").mockImplementationOnce(() => ({
    word: "hello",
    phonetic: "həˈləʊ",
    audio:
      "https://ssl.gstatic.com/dictionary/static/sounds/20200429/hello--_gb_1.mp3",
    meaning: "used as a greeting or to begin a phone conversation.",
  }));
  const user = userEvent.setup();
  jest.useFakeTimers();
  render(<App />);
  const addButton = screen.getByText("add-outline");
  await act(async () => {
    await user.press(addButton);
    jest.runAllTimers();
  });
  const input = screen.getByPlaceholderText("type here..");
  await act(async () => {
    await user.type(input, "hello");
    jest.runAllTimers();
  });
  expect(wordsService.getWordInfo).toHaveBeenCalledWith("hello");

  const addWordButton = await screen.findByText("Add");
  await act(async () => await user.press(addWordButton));
  await act(() => {
    jest.runAllTimers();
  });
  const wordText = screen.getByText("hello");
  const explanationText = screen.getByText(
    "used as a greeting or to begin a phone conversation."
  );

  expect(wordText).toBeOnTheScreen();
  expect(explanationText).toBeOnTheScreen();
});

test("User can go back from 'Add word' screen without adding a word", async () => {
  const user = userEvent.setup();
  jest.useFakeTimers();
  render(<App />);
  let addButton = screen.getByText("add-outline");
  await act(async () => {
    await user.press(addButton);
    jest.runAllTimers();
  });
  const backButton = screen.getByText("arrow-back-outline");
  await user.press(backButton);
  await act(() => {
    jest.runAllTimers();
  });
  addButton = screen.getByText("add-outline");

  expect(addButton).toBeOnTheScreen();
});
