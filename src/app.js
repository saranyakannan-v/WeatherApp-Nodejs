const path = require('path') // core node module (no need to install it. because it is buildin)
const express = require('express') // npm module
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname) // it gives the directory name
console.log(path.join(__dirname, '../public'))

// console.log(__filename) // it gives the file name

const app = express()
const port = process.env.PORT || 3000 // Heroku port

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') // Handle bar for the expressjs
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)) // customise the server

// Route Handler
app.get('', (req, res) => {
    res.render('index', {
            title: 'Weather',
            name: 'Saranya Kannan'
        }) // render allows us to render our views using view engine hbs
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Saranya Kannan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Saranya Kannan'
    })
})

// Used "query string" to get a request from the user and respond back
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Saranya Kannan',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Saranya Kannan',
        errorMessage: 'Page not found'
    })
})

// // Listen to the port 3000
// app.listen(3000, () => {
//     console.log('Server is up on port 3000.')
// })

// Heroku port and local port setting
app.listen(port, () => {
    console.log('Server is up on port' + port)
})