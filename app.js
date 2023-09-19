const express = require('express')
const fs = require('fs')
const randomstring = require('randomstring')

const app = express()
const path = `${__dirname}/data/data.json`;

app.use(express.json())

const port = process.env.port || 8000

const cars = JSON.parse(fs.readFileSync(path))

app.get('/', (req, res)=>{
    res.send('ping successfully')
})

app.get('/cars', (req, res)=>{
    res.status(200).json({
        status: "success",
        data: cars
    })
})

app.get('/cars/:id', (req, res)=>{
    const id = req.params.id
    const car = cars.find(el => el.id === id)

    if(!car){
        res.status(404).json({
            status: 'failed',
            message:`car with id ${id} not found`
        })
    }

    res.status(200).json({
        status: "success",
        data: car
    })
})

app.post('/cars', (req, res)=>{
    const id = randomstring.generate()
    const data = Object.assign({id: id}, req.body)

    cars.push(data)
    fs.writeFile(path, JSON.stringify(cars), err => {
        res.status(201).json({
            status: 'success',
            data:{
                car: data
            }
        })
    })
})

app.put('/cars/:id', (req, res)=>{
    const id = req.params.id
    const carIndex = cars.findIndex(el => el.id === id)

    if(carIndex === -1) {
        return res.status(404).json({
            status: 'failed',
            message: `car with id ${id} not found`
        })
    }

    cars[carIndex] = {...cars[carIndex], ...req.body}

    fs.writeFile(path, JSON.stringify(cars), err => {
        res.status(200).json({
            status: 'success',
            message: `car with id ${id} has been edited successfully`,
            data:{
                car: cars[carIndex]
            }
        })
    })
})

app.delete('/cars/:id', (req, res)=>{
    const id = req.params.id
    const carIndex = cars.findIndex(el => el.id === id)

    if(carIndex === -1) {
        return res.status(404).json({
            status: 'failed',
            message: `car with id ${id} not found`
        })
    }

    cars.splice(carIndex, 1)

    fs.writeFile(path, JSON.stringify(cars), err => {
        res.status(200).json({
            status: 'success',
            message: `car with id ${id} has been deleted successfully`,
            data:null
        })
    })
})

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
})