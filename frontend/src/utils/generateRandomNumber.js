export const getRandomNumber = (digit) => {
    return (
        Math
            .random()
            .toFixed(digit)
            .split('.')[1]
    )
}
