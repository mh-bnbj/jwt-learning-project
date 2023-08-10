const API_URL = 'http://127.0.0.1:8888'

var ACCESS_TOKEN = undefined

const logout = () => {
    ACCESS_TOKEN = undefined
    document.getElementById('btn-logout').classList.add('d-none')
    document.getElementById('btn-login').classList.remove('d-none')
}
const login = () => {
    fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            accept: 'application/json',
        },
        body: JSON.stringify({
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
        }),
    })
        .then((resp) => {
            document.querySelector(
                '.image-container img'
            ).src = `https://http.cat/images/${resp.status}.jpg`

            if (resp.status == 200) {
                return resp.json()
            } else {
                return resp.text()
            }
        })
        .then((data) => {
            if (data.access_token) {
                ACCESS_TOKEN = data.access_token
                data = `Access Token : ${ACCESS_TOKEN}`
                document.getElementById('btn-login').classList.add('d-none')
                document.getElementById('btn-logout').classList.remove('d-none')
            }
            document.querySelector('.alert .response').innerHTML = data
        })
}

const publicRequest = () => {
    fetch(`${API_URL}/resource`)
        .then((resp) => {
            document.querySelector(
                '.image-container img'
            ).src = `https://http.cat/images/${resp.status}.jpg`
            return resp.text()
        })
        .then((data) => {
            document.querySelector('.alert .response').innerHTML = data
        })
}

const privateRequest = () => {
    let headers = {}

    if (ACCESS_TOKEN) {
        headers = {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
        }
    }

    fetch(`${API_URL}/resource/secret`, { headers })
        .then((resp) => {
            document.querySelector(
                '.image-container img'
            ).src = `https://http.cat/images/${resp.status}.jpg`
            return resp.text()
        })
        .then((data) => {
            document.querySelector('.alert .response').innerHTML = data
        })
}
