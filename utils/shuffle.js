module.exports = (arr) => {
    arr = [...arr];
    arr.sort(() => {
        return Math.random() - 0.5;
    });
    return arr;
};
