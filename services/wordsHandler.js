import axios from "axios";

import { BASE_URL } from "../constants";

export async function getWordInfo(word, cancelToken) {
    return axios
        .get(`${BASE_URL}/${word}`, {
            cancelToken: cancelToken,
        })
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
            if (axios.isCancel(err)) {
                console.log("Request cancelled", err.message);
            } else {
                console.error(err);
            }
            return {};
        });
}
