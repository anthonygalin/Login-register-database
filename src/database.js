import mongoose from 'mongoose'

mongoose.connect("mongodb://localhost/vueappdb")
  .then(() => console.log('Db is connected'))
  .catch(error => console.log('cant run db',error))
