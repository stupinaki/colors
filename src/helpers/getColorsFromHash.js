
export function getColorsFromHash() {

    return document.location.hash
        .substring(1)
        .split('-')
        .map((color) => {
            return {
                color: '#' + color,
                "isBlocked": false,
            }
        });
}
