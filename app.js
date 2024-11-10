import express from 'express'
import usersRoutes from './routes/users.js';
import { initializeDatabase } from './database.js';
import reviewRoutes from './routes/reviews.js'
import cors from 'cors'

const app = express();

app.use(cors())
app.use(express.json())



app.use('/users', usersRoutes)
app.use('/reviews', reviewRoutes)

app.listen(3000, () => {
    console.log('Server is running')
    try{
        initializeDatabase();
        console.log('Database Initialized')
    }catch(err){
        console.error('Failed to initialize db', err)
    process.exit(1)
    }

})