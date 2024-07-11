const { HostAddress } = require('mongodb')
const {Client}=require('pg')

const client=new Client({
    host:'localhost',
    user:'postgres',
    port:5432,
    password:'@Eswar158',
    database:'ExchangeRecipes'
})



module.exports=client

