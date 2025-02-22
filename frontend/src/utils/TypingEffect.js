import { memo, useEffect, useState } from "react";

function TypingEffect({ text, speed = 100 }) {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);
    const [isDelete, setDelete] = useState(false);

    useEffect(() => {
        let timeOut;
        if (index === text.length && !isDelete) {
            setDelete(true);
            timeOut = setTimeout(() => {
                setIndex(index - 1);
                clearTimeout(timeOut);
            }, speed * 30);
        }

        const interval = setInterval(() => {
            setIndex((prevIndex) => {
                if (prevIndex >= 0 && prevIndex < text.length) {
                    return isDelete ? index - 1 : index + 1;
                }

                return index;
            });

            setDisplayedText(text.substring(0, index));
        }, speed);

        return () => clearInterval(interval);
    }, [index, isDelete, speed, text]);

    useEffect(() => {
        setIndex(0);
        setDelete(false);
    }, [text]);

    return displayedText;
}

export default memo(TypingEffect);
