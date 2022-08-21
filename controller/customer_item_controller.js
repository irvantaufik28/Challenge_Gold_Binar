const product_uc = require("../usecase/product");
const category_uc = require("../usecase/category");

exports.getlistProduct = async (req, res) => {
  let product = await product_uc.getAllProduct();
  if (product.length > 0) {
    res.status(200).json({
      status: "ok",
      message: "succes",
      data: product,
    });
  } else {
    res.status(404).json({
      code: 404,
      message: "product belum di tambahkan",
    });
  }
};

exports.getOneProduct = async (req, res) => {
  let id = req.params.id;
  let res_data = {
    status: "ok",
    message: "success",
    data: null,
  };
  let product = await product_uc.getProudctByID(id);
  if (!product) {
    res_data.status = "failed";
    res_data.message = "product not found";
    res.status(400);
  }
  res_data.data = product;
  res.status(200).json({
    status: "ok",
    message: "succes",
    data: product,
  });
};

// Get Category

exports.getlistCategory = async (req, res) => {
  let option = null;
  let category = await category_uc.getAllcategory(option);
  if (category.length > 0) {
    res.status(200).json({
      status: "ok",
      message: "succes",
      data: category,
    });
  } else {
    res.status(404).json({
      code: 404,
      message: "category belum di tambahkan",
    });
  }
};

exports.getOneCategory = async (req, res) => {
  let id = req.params.id;
  let res_data = {
    status: "ok",
    message: "success",
    data: null,
  };
  let category = await category_uc.getCategoryByID(id);
  if (!category) {
    res_data.status = "failed";
    res_data.message = "product not found";
    res.status(400);
  }
  res_data.data = category;
  res.status(200).json({
    status: "ok",
    message: "succes",
    data: category,
  });
};

exports.getOneProductByCategory = async (req, res) => {
  let id = req.params.id;
  let res_data = {
    status: "ok",
    message: "success",
    data: null,
  };
  let category = await category_uc.getProductByCategory(id);
  if (!category) {
    res_data.status = "failed";
    res_data.message = "product not found";
    res.status(400);
  }
  res_data.data = category;
  res.status(200).json({
    status: "ok",
    message: "succes",
    data: category,
  });
};
