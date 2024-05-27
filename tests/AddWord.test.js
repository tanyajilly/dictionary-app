import {
  render,
  screen,
  userEvent,
  act,
} from "@testing-library/react-native";
import * as playService from "../services/soundHandler";
import * as wordsService from "../services/wordsHandler";
import AddWord from "../screens/AddWord";

jest.mock("@expo/vector-icons/Ionicons", () => {
  const { Text } = require("react-native");
  return ({ name }) => <Text>{name}</Text>;
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
  jest.useRealTimers();
});

test("getWordInfo function is not called until 1 sec is not passed after finishing typing", async () => {
  const user = userEvent.setup();
  jest.useFakeTimers();
  jest.spyOn(wordsService, "getWordInfo");
  render(<AddWord setWords={jest.fn()} switchScreen={jest.fn()} />);

  const input = screen.getByPlaceholderText("type here..");
  const enteredWord = "hello";
  await act(async () => {
    await user.type(input, enteredWord);
    expect(wordsService.getWordInfo).not.toHaveBeenCalled();
    jest.advanceTimersByTime(950);
  });

  expect(wordsService.getWordInfo).not.toHaveBeenCalled();
});

test("getWordInfo function is called when 1 sec passed after finishing typing", async () => {
  const user = userEvent.setup();
  jest.useFakeTimers();
  jest.spyOn(wordsService, "getWordInfo");
  render(<AddWord setWords={jest.fn()} switchScreen={jest.fn()} />);

  const input = screen.getByPlaceholderText("type here..");
  const enteredWord = "hello";
  await act(async () => {
    await user.type(input, enteredWord);    
    jest.advanceTimersByTime(1050);
  });

  expect(wordsService.getWordInfo).toHaveBeenCalledTimes(1);
  expect(wordsService.getWordInfo).toHaveBeenCalledWith(enteredWord);
});

test("if the word is found, the info is shown correctly", async () => {
  jest.useFakeTimers();
  const user = userEvent.setup();
  const returnedWordData = {
    word: "investigate",
    phonetics: "[ɪn.ˈves.tɪ.ɡeɪ̯t]",
    partOfSpeech: "verb",
    audio:
      "https://api.dictionaryapi.dev/media/pronunciations/en/investigate-us.mp3",
    sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=2453554",

    meaning:
      "To inquire into or study in order to ascertain facts or information.",
  };
  jest.spyOn(wordsService, "getWordInfo").mockReturnValueOnce(returnedWordData);
  jest.spyOn(playService, "playSound").mockImplementationOnce((path) => path);
  render(<AddWord setWords={jest.fn()} switchScreen={jest.fn()} />);

  const input = screen.getByPlaceholderText("type here..");
  await act(async () => {
    await user.type(input, "hello");
    await act(() => jest.advanceTimersByTime(1050));
  });

  const wordText = screen.getByText(returnedWordData.word);
  const wordExplanation = screen.getByText(returnedWordData.meaning);
  const wordPhonetic = screen.getByText(returnedWordData.phonetics);
  const wordPartOfSpeech = screen.getByText(returnedWordData.partOfSpeech);
  const playButton = screen.getByText("volume-medium-outline");
  await user.press(playButton);

  expect(wordText).toBeOnTheScreen();
  expect(wordExplanation).toBeOnTheScreen();
  expect(wordPhonetic).toBeOnTheScreen();
  expect(wordPartOfSpeech).toBeOnTheScreen();
  expect(playService.playSound).toHaveBeenCalledWith(returnedWordData.audio);
});

test("if the audio is absent, the icon is not shown", async () => {
  const user = userEvent.setup();
  jest.useFakeTimers();
  const returnedWordData = {
    word: "investigate",
    phonetics: "[ɪn.ˈves.tɪ.ɡeɪ̯t]",
    partOfSpeech: "verb",
    meaning:
      "To inquire into or study in order to ascertain facts or information.",
  };
  jest.spyOn(wordsService, "getWordInfo").mockReturnValueOnce(returnedWordData);
  jest.spyOn(playService, "playSound").mockImplementationOnce((path) => path);
  render(<AddWord setWords={jest.fn()} switchScreen={jest.fn()} />);

  const input = screen.getByPlaceholderText("type here..");
  await act(async () => {
    await user.type(input, "hello");
    jest.advanceTimersByTime(1050);
  });

  const playButton = screen.queryByText("volume-medium-outline");
  const investigateText = screen.getByText("investigate");
  expect(playButton).not.toBeOnTheScreen();
  expect(investigateText).toBeOnTheScreen();
});
