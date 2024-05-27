import { render, screen, userEvent, act } from "@testing-library/react-native";
import * as playService from "../services/soundHandler";
import AllWords from "../screens/AllWords";
import words from "./testData";

jest.mock("@expo/vector-icons/Ionicons", () => {
  const { Text } = require("react-native");
  return ({ name }) => <Text>{name}</Text>; 
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
  jest.useRealTimers();
});

test("Press on 'play' calls service playSound method with correct argument", async () => {
  const user = userEvent.setup();
  jest.useFakeTimers();
  render(<AllWords words={words} switchScreen={jest.fn()} />);
  jest.spyOn(playService, "playSound").mockImplementationOnce((path) => path);
  const playButtons = screen.getAllByText("play-outline");

  expect(playButtons).toHaveLength(4);

  await act(async () => {   
    await user.press(playButtons[2]);
    jest.runAllTimers();
  });
  expect(playService.playSound).toHaveBeenCalledWith(words[2].audio);
});

test("Press on 'play' does not call service playSound method if there is no sound info", async () => {
  const user = userEvent.setup();
  jest.useFakeTimers();
  render(<AllWords words={words} switchScreen={jest.fn()} />);
  jest.spyOn(playService, "playSound").mockImplementationOnce((path) => path);
  const playButtons = screen.getAllByText("play-outline");

  await user.press(playButtons[3]);
  act(() => {
    jest.runAllTimers();
  });
  expect(playService.playSound).not.toHaveBeenCalled();
});
