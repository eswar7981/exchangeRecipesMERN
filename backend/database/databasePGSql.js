const { HostAddress } = require('mongodb')
const {Client}=require('pg')

require('dotenv').config()

const client=new Client({
    host:process.env.LOCALHOST,
    user:process.env.USER,
    port:process.env.PORT,
    password:`@Eswar158`,
    database:process.env.DATABASE

})

module.exports=client

