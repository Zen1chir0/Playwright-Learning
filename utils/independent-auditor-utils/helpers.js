export function charStripper(singleString) {
    return parseFloat(String(singleString).replace(/[^0-9.]/g, ''));
}
export function arrayAddition(float) {
    return float.reduce((total, p) => total + p, 0);
}