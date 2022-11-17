import {generateRandomColor} from "@/helpers/generateRandomColor";
import {getColorsFromHash} from "@/helpers/getColorsFromHash";

export function initRandomColorsArray(colQwt) {
    const isHashColors = document.location.hash.length > 1;

    if(isHashColors) {
        return getColorsFromHash();
    }

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