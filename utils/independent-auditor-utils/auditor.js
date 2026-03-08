export function calculateSubtotal(priceArray) {
    return priceArray
        .map(str => parseFloat(str.replace('$', ''))) // remove the "$" character here
        .reduce((sum, val) => sum + val, 0);          // Add all this items
}