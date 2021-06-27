require('dotenv').config()

module.exports = {
  blogdbURI:"mongodb+srv://admin-harshi:"+process.env.MONGO_PASSWORD+ "@harshithah.bgaus.mongodb.net/blogDB?retryWrites=true&w=majority",
}
