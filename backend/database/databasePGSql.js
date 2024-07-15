const { HostAddress } = require('mongodb')
const {Client}=require('pg')

require('dotenv').config()
const connectionString =`postgresql://postgres1:wtmlHswUdAp1LVWEAkPLyWsRkjAkZCT6@dpg-cqad3ftds78s739pou20-a/exchangerecipes`
const client=new Client({
    connectionString:connectionString

})

module.exports=client

