import { useState, useEffect } from "react"

const useSlider = (width, question) => {

    const [widthTranslate, setWidthTranslate] = useState(10000);
    const [translateX, setTranslateX] = useState(0);

    // Скролл к следующему вопросу
    const numberProcessing = (num) => {
        setTranslateX(num * width.current.offsetWidth - width.current.offsetWidth);
    }

    useEffect(() => {
        setWidthTranslate(question * 100 + 100);
    })

    return {widthTranslate, translateX, numberProcessing}
}

export default useSlider;