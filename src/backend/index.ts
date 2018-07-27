import express from 'express'
import cors from 'cors'
const app = express()

app.get('/', cors(), (req, res) => {
    res.send({ a: 1 });
})

app.listen(3000, () => console.log('Listening on port 3000'))