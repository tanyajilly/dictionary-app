import { render, screen } from "@testing-library/react-native";
import App from "../App";

jest.mock("../screens/AddWord", () => {
  const { Text } = require("react-native");
  return () => <Text>AddWord</Text>;
});
jest.mock("../screens/AllWords", () => {
  const { Text } = require("react-native");
  return () => <Text>AllWords</Text>;
});
test("AllWords component is shown on the start", () => {
  render(<App />);
  const allWords = screen.getByText("AllWords");
  const addWord = screen.queryByText("AddWord");
  expect(allWords).toBeOnTheScreen();
  expect(addWord).not.toBeOnTheScreen();
});
