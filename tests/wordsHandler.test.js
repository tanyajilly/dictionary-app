import axios from "axios";
import { getWordInfo } from "../services/wordsHandler";
import { BASE_URL } from "../constants";

jest.mock("axios");

test("calls axios.get with correct url as an argument", async () => {
  const word = "all";
  const response = {
    data: [
      {
        word: "all",
        phonetics: [
          {
            text: "/ɔːl/",
            audio: "",
          },
        ],
        meanings: [
          {
            partOfSpeech: "noun",
            definitions: [
              {
                definition:
                  "(with a possessive pronoun) Everything that one is capable of.",
                example: "She gave her all, and collapsed at the finish line.",
              },
            ],
          },
        ],
      },
    ],
  };
  axios.get.mockResolvedValueOnce(response);
  const result = await getWordInfo(word);

  expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/${word}`);
  expect(result).toEqual({
    audio: "",
    meaning: "(with a possessive pronoun) Everything that one is capable of.",
    partOfSpeech: "noun",
    phonetics: "/ɔːl/",
    word: "all",
  });
});

test("returns a promise that rejects if word is not found", async () => {
  axios.get.mockRejectedValueOnce({
    response: {
      data: {
        title: "No Definitions Found",
        message:
          "Sorry pal, we couldn't find definitions for the word you were looking for.",
        resolution:
          "You can try the search again at later time or head to the web instead.",
      },
    },
  });
  const result = await getWordInfo("whatewer");

  expect(result).toBeDefined();
});
