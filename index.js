const express = require('express')
const jwt = require('jsonwebtoken')
const { expressjwt: expressjwt } = require('express-jwt')
const cors = require('cors')

const app = express()

const PORT = 8888

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

const jwtCheck = expressjwt({
    secret: 'mySuperSecretKey',
    algorithms: ['HS256'],
})

const users = [
    { id: 1, username: 'admin', password: 'admin' },
    { id: 2, username: 'guest', password: 'guest' },
]

app.post('/login', (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).send('You need a username and password')
        return
    }

    const user = users.find((u) => {
        return (
            u.username === req.body.username && u.password === req.body.password
        )
    })

    if (!user) {
        res.status(401).send('User not found')
    }

    const token = jwt.sign(
        {
            sub: user.id,
            username: user.username,
        },
        'mySuperSecretKey',
        { expiresIn: '3 hours' }
    )

    res.status(200).send({ access_token: token })
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/html/index.html')
})

app.get('/resource', (req, res) => {
    res.status(200).send('Public resource , you can see this')
})

app.get('/resource/secret', jwtCheck, (req, res) => {
    res.status(200).send('Secret resource , you should be logged in to se this')
})

app.get('*', (req, res) => {
    res.sendStatus(404)
})

app.listen(PORT, () => {
    console.log('Server is running at port ' + PORT)
})
