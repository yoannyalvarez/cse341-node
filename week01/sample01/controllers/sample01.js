const emilyRoute = (req, res) => {
    res.send('Hello Emily!');
}

const johnRoute = (req, res) => {
    res.send('Hello John!');
}   

module.exports = { emilyRoute, johnRoute };