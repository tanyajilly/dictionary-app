import axios from "axios";

import { BASE_URL } from "../constants";

export async function getWordInfo(word) {
    return axios
        .get(`${BASE_URL}/${word}`)
        .then((response) => {
            const wordInfo = response.data[0];
            return {
                word: wordInfo.word,
                phonetics: wordInfo.phonetics[0]?.text,
                audio: wordInfo.phonetics[0]?.audio,
                partOfSpeech: wordInfo.meanings[0]?.partOfSpeech,
                meaning: wordInfo.meanings[0]?.definitions[0].definition,
            };
        })
        .catch((err) => {
            console.error(err);
            return {};
        });
}
