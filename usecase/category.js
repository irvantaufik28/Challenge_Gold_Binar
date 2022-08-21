let db =require("../models/index")


    getAllcategory = async (filters) =>{
        let option = {}
        if (typeof filters !== "undefined" || filters !== null){
            option.where = filters
        }
        let category=[]

        try {
            category = await db.category.findAll(option)
        } catch (error) {
            console.log(error)
        }
        return category
    }


    getCategoryByID = async(id)=>{
        let category = null
        try {
            category =await db.category.findOne({
                where: {id:id}
            })
        } catch (error) {
            console.log(error)
        }
        return category
    }
    getProductByCategory = async(id)=>{
        let category = null
        try {
            category =await db.category.findOne({
                where: {id:id},
                include :[
                    {model : db.product,
                    attributes: ['id', 'name', 'price', 'stock']
                    }
                  ]
            })
        } catch (error) {
            console.log(error)
        }
        return category
    }

    createCategory = async (category) =>{
        let is_success = false
        try {
            category = await db.category.create(category)
            is_success = true
        } catch (error) {
            console.log(error)
        }
        return {
            is_success : is_success,
            category : category
        }

}
let deleteCategory = async (id) =>{
    let is_success =false 
    try {
        category =await db.category.destroy({
            where: {id:id}
        })
        is_success = true
    } catch (error) {
        console.log(error)
    }
    return {
        is_success : is_success,
        category : category
    }
}        


module.exports ={getAllcategory, getCategoryByID, createCategory, getProductByCategory, deleteCategory }