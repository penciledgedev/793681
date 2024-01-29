const mongoClient = require('mongoose');
mongoClient.connect(process.env.db,{
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  
 })
.then(()=>{
 console.log("db connected...")
}).catch(err=>{
  console.log(err)
  console.log("could not connect")
})

module.exports.mongoClient = mongoClient