import { useState } from "react";
import AllWords from "./screens/AllWords";
import AddWord from "./screens/AddWord";

export default function App() {
    const [activeScreen, setActiveScreen] = useState("AllWords");
    const [words, setWords] = useState([]);

    const switchScreen = () => {
        if (activeScreen === "AllWords") setActiveScreen("AddWord");
        else setActiveScreen("AllWords");
    };

    if (activeScreen === "AllWords") {
        return (
            <AllWords
                words={words}
                switchScreen={switchScreen}
                setWords={setWords}
            />
        );
    } else {
        return <AddWord switchScreen={switchScreen} setWords={setWords} />;
    }
}
