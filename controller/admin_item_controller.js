const product_uc = require('../usecase/product')
const category_uc = require('../usecase/category')


exports.addProduct= async(req, res)=>{
    let product= req.body
    let res_data = {
        status: 'failed',
        message: '',
        data: null
    }
    let create_res = await product_uc.createProduct (product)
    let category = await category_uc.getCategoryByID(product.category_id)
    if(category===null){
        res_data.message = 'category tidak ditemukan'
        return res.status(400).json(res_data)
    }
    if(create_res.is_success !== true) {
        res_data.message = 'something went wrong'
        return res.status(400).json(res_data)
    }
    res.status(200).json({
        status : "ok",
        message : "Berhasil menanbahkan product",
        data : create_res.product
    })
}

exports.editProduct =async (req, res)=>{
    let id = req.params.id
    let product= req.body
   
    let res_data = {
        status: 'failed',
        message: '',
        data: null
    }
    let category = await category_uc.getCategoryByID(product.category_id)
    if(category===null){
        res_data.message = 'category tidak ditemukan'
        return res.status(400).json(res_data)
    }
    let update_res = await product_uc.updateProduct(product ,id)
    if(update_res.is_success !== true) {
        res_data.message = 'something went wrong'
        return res.status(400).json(res_data)
    }
    res.status(200).json({
        status : "ok",
        message : "Berhasil mengUpdate product",
        data : update_res.product
    })
}

exports.delete = async (req, res)=>{
    let id = req.params.id
    let res_data = {
        status: 'failed',
        message: '',
        data: null
    }
    let delete_res = await product_uc.deleteProduct(id)
    if(delete_res.is_success !== true) {
        res.status(400).json({
            message : "Gagal retive data",
            data :res_data
        })     
    }
    res.status(200).json({
        status : "ok",
        message : "Berhasil menghapus product",
        data :delete_res
    })
}



exports.addCategory= async(req, res)=>{
    let category = {
    name: req.body.name,
    }
    let res_data = {
        status: 'failed',
        message: '',
        data: null
    }
    let create_res = await category_uc.createCategory(category)
    if(create_res.is_success !== true) {
        res_data.message = 'something went wrong'
        return res.status(400).json(res_data)
    }

    res.status(200).json({
        status : "ok",
        message : "Berhasil menanbahkan Category",
        data : create_res.category
    })
}


exports.destroyCategory = async (req, res)=>{
    let id = req.params.id
    let res_data = {
        status: 'failed',
        message: '',
        data: null
    }
    let delete_res = await category_uc.deleteCategory(id)
    if(delete_res.is_success !== true) {
        res_data.message = 'something went wrong'
        return res.status(400).json(res_data)
    }
    res.status(200).json({
        status : "ok",
        message : "Berhasil menghapus category",
        data :delete_res
    })
}
