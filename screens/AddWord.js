import {
    Image,
    View,
    StyleSheet,
    TextInput,
    Text,
    Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { getWordInfo } from "../services/wordsHandler";
import { playSound } from "../services/soundHandler";
import axios from "axios";

const useDebouncedValue = (inputValue, delay) => {
    const [debouncedText, setDebouncedText] = useState(inputValue);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedText(inputValue);
        }, delay);
        return () => clearTimeout(timeoutId);
    }, [inputValue, delay]);

    return debouncedText;
};

function AddWord({ switchScreen, setWords }) {
    const [info, setInfo] = useState({});
    const [inputValue, setInputValue] = useState("");
    const [cancelToken, setCancelToken] = useState(null);
    const debouncedInputValue = useDebouncedValue(inputValue, 1000);
    const { word, phonetics, audio, partOfSpeech, meaning } = info;

    const handleInputChange = (value) => {
        setInputValue(value);
    };

    const handleAddWord = () => {
        setWords((prevWords) => {
            if (!prevWords.some((item) => item.word === info.word))
                return [...prevWords, info];
        });
        switchScreen();
    };

    useEffect(() => {
        if (debouncedInputValue) {
            if (cancelToken) {
                cancelToken.cancel("Request cancelled because of a new input");
            }
            const source = axios.CancelToken.source();
            setCancelToken(source);
            getWordInfo(debouncedInputValue, source.token).then((info) => {
                setInfo(info);
            });
        }
    }, [debouncedInputValue]);

    return (
        <View style={styles.container}>
            <View style={styles.imageHolder}>
                <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={require("../assets/add.png")}
                />
                <Pressable style={styles.btnBack} onPress={switchScreen}>
                    <Ionicons
                        name="arrow-back-outline"
                        size={36}
                        color="#00156D"
                    />
                </Pressable>
            </View>
            <View style={styles.content}>
                <View>
                    <Text style={styles.label}>Your word to search:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleInputChange}
                        placeholder="type here.."
                        value={inputValue}
                    />
                </View>
                {word && (
                    <>
                        <View style={styles.wordInfo}>
                            <View style={styles.wordInfoRow}>
                                <Text style={styles.word}>{word}</Text>
                                {audio && (
                                    <Pressable
                                        style={styles.sound}
                                        onPress={() => playSound(audio)}
                                    >
                                        <Ionicons
                                            name="volume-medium-outline"
                                            size={30}
                                            color="#00156D"
                                        />
                                    </Pressable>
                                )}
                                {phonetics && (
                                    <Text style={styles.phonetics}>
                                        {phonetics}
                                    </Text>
                                )}
                            </View>
                            {partOfSpeech && (
                                <Text style={styles.partOfSpeech}>
                                    {partOfSpeech}
                                </Text>
                            )}
                            <Text>{meaning}</Text>
                        </View>
                        <Pressable style={styles.btn} onPress={handleAddWord}>
                            <Text style={styles.btnText}>Add</Text>
                        </Pressable>
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EAEAEA",
    },
    imageHolder: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "70%",
        height: "70%",
        resizeMode: "contain",
    },
    btnBack: {
        position: "absolute",
        top: 30,
        left: 20,
    },
    content: {
        flex: 2,
        padding: 10,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        height: 40,
        borderRadius: 4,
        fontSize: 16,
    },
    label: {
        color: "#999",
        marginBottom: 5,
    },
    wordInfo: {
        padding: 10,
    },
    wordInfoRow: {
        flexDirection: "row",
        columnGap: 20,
        alignItems: "flex-end",
    },
    sound: {
        padding: 5,
    },
    word: {
        fontSize: 40,
    },
    phonetics: {
        lineHeight: 40,
        fontSize: 18,
    },
    partOfSpeech: {
        fontSize: 18,
        marginBottom: 10,
    },
    btn: {
        backgroundColor: "#00156D",
        borderRadius: 6,
        padding: 5,
    },
    btnText: {
        color: "#fff",
        fontSize: 24,
        textAlign: "center",
    },
});

export default AddWord;
