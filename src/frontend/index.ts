console.log('front end')
fetch('http://localhost:3000')
.then(r => {
    console.log(r)
    return r.json()
})
.then(json => console.log(json))