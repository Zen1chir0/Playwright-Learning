export function priceArray(strings) {
    return strings.map(str => parseFloat(str.replace('$', '')));
}

export function arrayAddition(float) {
    return float.reduce((total, p) => total + p, 0);
}