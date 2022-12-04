const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    email: String,
    password: String,
    navn: String
    // Disse keys er det eneste, der kan skrives i DB gennem /register via .post
    // Udelades nogle, skrives de simpelthen ikke ind i DB. Ingen fejl.
})

module.exports = mongoose.model('user', userSchema, 'brugere')
// 'brugere' er navnet på database-collection. I videoen er dette 'users'
// Hvis der ikke er defineret en database, gemmes det automatisk (fx. ved Postman) i 'test' database.
