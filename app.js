const express = require('express')
const morgan = require('morgan')
const dotenv = require ('dotenv')
const cookieParser = require ('cookie-parser')
const app = express()
dotenv.config()

app.use(cookieParser())
app.use(express.json())
app.use(morgan('combined'))

const host = 'localhost'
const port = 3000

const authRouter = require('./router/auth_router')
const adminRouter = require('./router/admin_router')
const customerRouter = require('./router/customer_router')




app.get('/',(req, res)=>{
    res.json({
        host: host,
        port: port
    })
})

app.use('/', authRouter)
app.use('/admin', adminRouter)
app.use('/customer', customerRouter)



app.listen(port, host, () => {
    console.log(`server running on: http://${host}:${port}`)
})