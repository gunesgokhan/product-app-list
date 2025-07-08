// backend/utils/productUtils.js
/*function calculateProductPrice(popularityScore, weight, goldPrice) {
    // popularityScore yüzdesel (örneğin 80), formül için 0.80'e çevir
    const scoreNormalized = popularityScore / 100;
    const price = (scoreNormalized + 1) * weight * goldPrice;
    return parseFloat(price.toFixed(2)); // Fiyatı 2 ondalık basamağa yuvarla
}

// Popülerlik skorunu 5 üzerinden çevirme
function convertPopularityToOutOf5(popularityScore) {
    const scoreOutOf5 = (popularityScore / 100) * 5;
    return parseFloat(scoreOutOf5.toFixed(1)); // 1 ondalık basamağa yuvarla
}

module.exports = {
    calculateProductPrice,
    convertPopularityToOutOf5
};*/

function calculateProductPrice(popularityScore, weight, goldPrice) {
    const price = (popularityScore + 1) * weight * goldPrice;
    return parseFloat(price.toFixed(2));
}

function convertPopularityToOutOf5(popularityScore) {
    const scoreOutOf5 = popularityScore * 5;
    return parseFloat(scoreOutOf5.toFixed(1));
}

module.exports = {
    calculateProductPrice,
    convertPopularityToOutOf5
};
