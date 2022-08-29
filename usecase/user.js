let db = require("../models/index")

module.exports ={

getUserByUsername: async (username) =>{
    let user = null
    try {
        user = await db.user.findOne({
            where : {username: username} 
              
        })
    } catch (error) {
        console.log(error)
    }
    return user
},
getUserByID : async (id) =>{
    let user = null
    try {
        user = await db.user.findOne({
            where : {id:id}
        })
    } catch (error) {
        console.log(error)
    }
    return user
},
createUser : async (user) =>{
    let is_success = false
    try {
        user = await db.user.create(user)
        is_success = true
    } catch (error) {
        console.log(error)
    }
    return {
        is_success : is_success,
        user : user
    }
},
updateUser : async (user, id) =>{
    let is_success = false
    try {
        user = await db.user.update(user ,{
            where : {id :id}
        })
        is_success = true
    } catch (error) {
        console.log(error)
    }
    return {
        is_success : is_success,
        user : user
    }
},


}