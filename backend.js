const express = require('express')
const cors = require('cors')
const app = express()
const fs = require('node:fs');

app.use(cors({origin: '*'}))
app.use(express.json())

const allUserData = () => {
    const data = fs.readFileSync('./data.json');
    let json
    try {
        json = JSON.parse(data);
    } catch (err) {
        json = []
    }
    return json;
}

const findUserData = (roll_no) => {
    const json = allUserData();
    let found = false
    for (let user of json) {
        if (user.roll_no === roll_no) {
            found = true
            return { user_data: user, found }
        }
    }
    if (!found) {
        return { found }
    }
}

const addUserData = (roll_no, email, password) => {
    const json = allUserData();
    json.push({ roll_no, email, password });
    fs.writeFileSync('./data.json', JSON.stringify(json, undefined, 2));
}

app.post('/signup', (req, res) => {
    try{
        console.log(typeof req.body)
        // console.log(req)
        addUserData(req.body.roll_no, req.body.email, req.body.password);
        return res.status(200).end();
    } catch (err) {
        console.error(err);
        return res.status(500).end();
    }
})

app.post('/signin', (req, res) => {
    try{
        const user = findUserData(req.body.roll_no);
        if (!user.found) return res.status(404).end()
        if (user.user_data.password === req.body.password) return res.status(200).end();
        return res.status(401).end();
    } catch (err) {
        console.error(err);
        return res.status(500).end();
    }
})

app.get('/list', (req, res) => {
    res.json(allUserData());
})

app.listen(3001);