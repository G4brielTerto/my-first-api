import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const app = express()
app.use(express.json())

// const users = []

app.post('/users', async (req, res) => {
    
    await prisma.user.create({
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    //  console.log(req.body)

    // users.push(req.body)

    //  res.send('run without problems2')
    res.status(201).json(req.body)
    // 201 significa que houve a criação conforme o cliente
})

app.get('/users', async (req, res) => {
    
    let users = []

    if(req.query){
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    }else{
        users = await prisma.user.findMany()
    }

    
    
    res.status(200).json(users)
})

app.put('/users/:id', async (req, res) => {
    
    // console.log(req)
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })


    res.status(201).json(req.body)
})

app.delete('/users/:id', async (req, res) =>{
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ message: 'user successfully deleted!!!'})
})


app.listen(3000)



// app.put('/users')

// app.delete('/users')

// gabriel
// UgXheEIRLSY69dpJ