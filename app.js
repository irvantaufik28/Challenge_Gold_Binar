const express = require('express')
const morgan = require('morgan')
const app = express()

const host = 'localhost'
const port = 3000

const authRouter = require('./router/auth_router')
const adminRouter = require('./router/admin_router')
const customerRouter = require('./router/customer_router')


app.use(express.json())
app.use(morgan('combined'))


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