import Product from '../model/product.js'

export const addAllProducts = async (req, res) => {
  try {
    const data = req.body;
    const brands = data.brands;

   
    const products = Object.keys(brands).map(key => {
      const { name, description, status, reasons, countries, categories, logo_url, alternatives } = brands[key];
      
      
  
      return {
        name,
        description,
        status,
        reasons: reasons || [],
        countries: countries || [],
        categories: categories || [],
        logo: logo_url,  
        alternatives: alternatives || []
      };
    });

   
    const insertedProducts = await Product.insertMany(products);
    res.status(201).json({ message: "Products added successfully", data: insertedProducts });
  } catch (error) {
    res.status(500).json({ message: "Error adding products", error: error.message });
  }
};

export const getAllProducts=async(req,res)=>{


  let products;
try{
  products=await Product.find({});

  if(products.length===0){
    return res.status(404).json({msg:"No Products In data Base"})
  }
    return res.status(200).json(products)
  }catch(error){
    return res.status(500).json({msg:"Internal Server Error"})
  }


}

export const getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const getProductByName = async (req, res) => {
    try {
        const name = req.params.name;
        const products = await Product.find({ name: new RegExp(name, 'i') }); 
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found with that name' });
        }
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send(error);
    }
};



export const addProduct= async (req, res) => {
  const { name, status, description, reasons, countries, categories, logo, alternatives } = req.body;

 
  const newProduct = new Product({
    name,
    status,
    description,
    reasons,
    countries,
    categories,
    logo,
    alternatives
  });

  try {
    
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
}


export const updateProduct= async (req, res) => {
    const { name, status, description, reasons, countries, categories, logo, alternatives } = req.body;
    const productId = req.params.id;
  
    try {
     
      let product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      
      product.name = name;
      product.status = status;
      product.description = description;
      product.reasons = reasons;
      product.countries = countries;
      product.categories = categories;
      product.logo = logo;
      product.alternatives = alternatives;
  
      
      const updatedProduct = await product.save();
  
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error updating product', error });
    }
  }
  

export const deleteProduct= async (req, res) => {
    const productId = req.params.id;
  
    try {
      
      const deletedProduct = await Product.findByIdAndDelete(productId);
  
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting product', error });
    }
  }
  




