import {
    Image,
    View,
    StyleSheet,
    FlatList,
    Text,
    Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { playSound } from "../services/soundHandler";

function AllWords({ words, switchScreen, setWords }) {
    const deleteWord = (word) => {
        setWords((prevWords) => prevWords.filter((item) => item.word !== word));
    };
    return (
        <View style={styles.container}>
            <View style={styles.imageHolder}>
                <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={require("../assets/title-reading-side.png")}
                />
            </View>

            <View style={styles.words}>
                <FlatList
                    data={words}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <Pressable
                                style={styles.listItemBtn}
                                onPress={() =>
                                    item.audio ? playSound(item.audio) : null
                                }
                            >
                                <Ionicons
                                    name="play-outline"
                                    size={30}
                                    color="#00156D"
                                />
                            </Pressable>
                            <View style={styles.listItemContent}>
                                <Text style={styles.wordName}>{item.word}</Text>
                                <Text style={styles.wordMeaning}>
                                    {item.meaning}
                                </Text>
                            </View>
                            <Pressable
                                style={styles.listItemBtn}
                                onPress={() => deleteWord(item.word)}
                            >
                                <Ionicons
                                    name="trash-outline"
                                    size={24}
                                    color="red"
                                />
                            </Pressable>
                        </View>
                    )}
                    keyExtractor={(item) => item.word}
                    ListEmptyComponent={
                        <View style={styles.empty}>
                            <Text style={styles.emptyText}>No words yet</Text>
                        </View>
                    }
                />
                <Pressable style={styles.addBtn} onPress={switchScreen}>
                    <Ionicons name="add-outline" size={36} color="white" />
                </Pressable>
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
    words: {
        flex: 2,
    },
    empty: {
        flexGrow: 1,
        minHeight: 300,
        backgroundColor: "#fff",
        padding: 20,
        justifyContent: "center",
    },
    emptyText: {
        fontSize: 36,
        textAlign: "center",
        color: "#aaa",
    },
    addBtn: {
        backgroundColor: "#00156D",
        width: 50,
        height: 50,
        position: "absolute",
        right: 30,
        top: -30,
        borderRadius: 25,
        padding: 7,
        elevation: 1,
    },
    listItem: {
        margin: 5,
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 10,
        // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // Shadow for Android
        elevation: 5,
        alignItems: "center",
    },
    listItemContent: {
        flex: 1,
        paddingVertical: 5,
    },
    listItemBtn: {
        padding: 15,
    },
    wordName: {
        fontSize: 20,
        fontWeight: "bold",
    },
    wordMeaning: {
        fontSize: 16,
    },
});

export default AllWords;
