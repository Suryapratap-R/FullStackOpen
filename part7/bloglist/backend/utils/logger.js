info = (...args) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(...args);
    }
}

error = (...args) => {
    console.error(...args);
}

module.exports = {
    info,
    error
}