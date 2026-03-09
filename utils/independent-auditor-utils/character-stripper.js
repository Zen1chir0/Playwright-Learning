export function priceArray(strings) {
    return strings.map(str => parseFloat(str.replace('$', '')));
}