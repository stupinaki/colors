import {generateRandomColor} from "@/helpers/generateRandomColor";

export function initRandomColorsArray(colQwt) {
    const colors = [];
    for(let i = 0; i < colQwt; i++) {
        const color = generateRandomColor();
        const column = {
            color: color,
            isBlocked: false,
        }
        colors.push(column);
    }
    return colors;
}