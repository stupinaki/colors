
export function updateColorsHash(colors = []) {
    const arr = colors.map(obj => obj.color);

    document.location.hash = arr
        .map((col) => {
            return col.toString().substring(1)
        })
        .join('-');
}
