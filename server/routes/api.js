const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken') // eller bare jwt?

const mongoose = require('mongoose')
const db = "mongodb+srv://lasse:hamborg@mystartercluster.nmsq3.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(db, err => {
    if (err) {
        console.log('Der var selvfølgeligt en fejl... ' + err)
        console.log('Tjek internetforbindelse. Der skal være adgang til MongoDB online!')
    } else {
        console.log('Hvad satans?! Det virkede sgu!!!')
    }
})

// Funktion til udførelse inden user defined 'handler' bliver udført
function verifyToken(req, res, next) {
    // Først tjekker vi, om der findes en autherization key i headers af request
    // console.log(req.headers) // 'req' alene er MEGET lang og uoverskuelig
    if (!req.headers.autherization){
        console.log('Ingen autherization i headers')
        return res.status(401).send('Unautherized requset (fordi der mangler auth. i headers)')
        // Denne viser sig i api'en, fordi 'autherization' kommer fra events.
    }
    // ellers, hvis autherization findes, så hent token:
    let token = req.headers.autherization.split(' ')[1] // vi henter token og splitter den (det er en string) efter 'Bearer', som er [0] i den nye array.
    if (token ==='null') {
        console.log('Ingen token fundet')
        return res.status(401).send('Unautherized requset (fordi der mangler token efter bearer)')
    }
    // Der sker en status 500, hvis man fifler med token i browserens console med 'localStorage.setItem('token','blabla')
    // Jeg kan ikke gennemskue, hvordan man 'fanger' den fejl her.
    // ved if(!!res.status(500)) får man hele tiden true.
    // try-catch virker dog:
    try {
        let payload = jwt.verify(token, 'mySecretKey')
        // 'mySecretKey' skrevet længere nede!
        
        // til sidst verificers token
    
        if (!payload) {
            console.log('tredje problem; endnu ikke oplevet')
            return res.status(401).send('Unautherized requset (fordi der ikke er payload)')
        }
        // Hvis alt er fint, sender vi userId (subject) til payload og sender den til requestet
        req.payload = payload.subject
        
    } catch (error) {
        console.log(error.message)
        return res.status(401).send('Unautherized requset (fordi DU HACKER!)')
    }

    next() // mit gæt er, at 'next()' bruges, når funktion skal bruges til at 'gå videre' til andre argumenter...

    // funktionen sættes nu ind som 2. argument i router for vores specielle side, 'restuarants'
}



router.get('/', (req, res) => {
    res.send('From API route')
})

router.post('/register', (req, res) => {
    let userData = req.body
        // console.log(userData)
    let user = new User(userData)
        // console.log(user)
    user.save((err, registeredUser) => {
        if (err) {
            console.log(err)
        } else {
            let payload = { subject: registeredUser._id}
            let token = jwt.sign(payload, "mySecretKey") // secret key kan være alting
            res.status(200).send({token})
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne({email: userData.email}, (err, user) => {
        if (err) {
            console.log('der skete en fejl')
            console.log(err)
        } else {
            console.log('userData (indtastet) er: ')
            console.log(userData)
            console.log('user (fundet bruger) er: ')
            console.log(user)
            if (!user) {
                console.log('Ingen bruger med det navn!')
                res.status(401).send('Forkert Email') // 401 er "unautherized"
            } else
            if (!userData.password) {
                console.log('Password ikke skrevet!')
                res.status(401).send('Intet password')
            } else
            if (user.password !== userData.password) {
                console.log('Forkert password!')
                console.log('PSST! Det rigtige er: ' + user.password)
                res.status(401).send('Invalid password')
            } else {
                let payload = { subject: user._id }
                let token = jwt.sign(payload, "mySecretKey")
                console.log('DET LYKKEDES! Velkommen!') // 200 er "OK"
                res.status(200).send({token})
            }
        }
    })
})

router.get('/events', (req, res) => {
    let events = [
        {
            "_id" : "1",
            "name": "Roskilde",
            "date": "2022-07-01"
        },
        {
            "_id" : "2",
            "name": "Tinderbox",
            "date": "2022-07-08"
        },
        {
            "_id" : "3",
            "name": "Langeland",
            "date": "2022-07-25"
        },
        {
            "_id" : "4",
            "name": "Smukfest",
            "date": "2022-08-20"
        }
    ]
    res.json(events)
    // NOTE: Disse skal kunne hentes fra DB
    // NOTE: Bruger skal kunne tilføje event
    // NOTE: Dertil skal man kunne se sine egne events.
})

router.get('/restaurants', verifyToken, (req, res) => { // Hvis token ikke bliver verificeret, bliver hele denne funktion ikke udført
    let rests = [
        {
            "_id" : "1",
            "name": "Noma",
            "date": "2022-07-01",
            "rate": "5 ud af 7"
        },
        {
            "_id" : "2",
            "name": "Geranium",
            "date": "2022-07-08",
            "rate": "8 ud af 7"
        },
        {
            "_id" : "3",
            "name": "Scarmoza",
            "date": "2022-07-25",
            "rate": "7 ud af 9"
        },
        {
            "_id" : "4",
            "name": "Jensens fiskehus",
            "date": "2022-08-20",
            "rate": "3 ud af 19"
        }
    ]
    res.json(rests)

    // På sigt, kan vi f.eks. hente restauranter fra dummy-db
})

module.exports = router