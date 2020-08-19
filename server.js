const express=require('express')
const app = express()
const UsersRoutes=require('./api/routes/users')
const ContactsRoutes=require('./api/routes/contacts')
const AuthRoutes = require('./api/routes/auth')

const DBconnection = require('./config/DB')

app.use(express.json())
DBconnection()


app.use('/api/users',UsersRoutes)
app.use('/api/contacts',ContactsRoutes)
app.use('/api/auth',AuthRoutes)


const PORT=process.env.PORT || 5000

app.listen(PORT, () => {
     console.log(`Server is up & running on port ${PORT}`)
})