import { render, screen, fireEvent } from "@testing-library/react-native";
import App from "../App";

jest.mock("@expo/vector-icons/Ionicons", () => {
  const { Text } = require("react-native");
  return ({name}) => <Text>{name}</Text>; 
});

jest.mock("../screens/AddWord", () => {
  const { Text } = require("react-native");
  return () => <Text>AddWord</Text>; 
});

test("AddWord screen is shown after click on '+' button", () => {
  render(<App />);
  const addButton = screen.getByText("add-outline");
  let addWord = screen.queryByText("AddWord");
  expect(addWord).not.toBeOnTheScreen();

  fireEvent.press(addButton);
  addWord = screen.getByText("AddWord");
  expect(addWord).toBeOnTheScreen();
});
