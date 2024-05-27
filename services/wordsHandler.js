import axios from "axios";

import { BASE_URL } from "../constants";

export async function getWordInfo(word) {

    const wordInfo = //receive it from response that axios provides
    // the code below is help for you 
    // how to receive an object with word information 
    return {
      word: wordInfo.word,
      phonetics: wordInfo.phonetics[0]?.text,
      audio: wordInfo.phonetics[0]?.audio,
      partOfSpeech: wordInfo.meanings[0]?.partOfSpeech,
      meaning: wordInfo.meanings[0]?.definitions[0].definition,
    };
  
}
