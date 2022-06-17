const Product =  require('../models/products')

const getAllProductsStatic = (req,res)=> {

    res.status(200).json({msg: 'products testing route'})
}

const getAllProducts = async (req,res)=> {
    /*new in mongoose v6, find method will ignore
    all the properties that not in schema so we can directly put query as arg */
    if(req.query.name){
        //case user not finding item fullname but part of it
        const temp = req.query.name.slice()
        req.query.name = {$regex: temp, $options: 'i'}
    }
    
    //older approach when unregconized properties result in 0 match
    //we create a new propsObject and modify all the match schema props
    /*
    const objProperties = {}
    const {name, featured, company}=  req.query

    //look for matched with schema properties 
    if(featured){
        objProperties.featured = featured === true ? true : false
    }
    if(company){
        objProperties.company = company
    }

    //objProperties instead of direct query as arg
    const product = await Product.find(objProperties)
    */

    //numeric filter
    if(req.query.numericFilter){
        const operatorMap = {
            '<': '$lt',
            '<=': '$lte',
            '=': '$eq',
            '>': '$gt',
            '>=': '$gte',
        }
        //replace human readable operator to mongoose operator
        const regEx = /\b(<|>|=|<=|>=)\b/ //regular expression = regEx
        let filter = req.query.numericFilter.replace(regEx, (match)=>`-${operatorMap[match]}-`)
        
        //change nummericFilter to exac match props in Schema
        const options = ['price', 'rating']; // nummeric props needs to filter out
        filter = filter.split(',').forEach((item)=>{
            const [Field, Operator, Value] = item.split("-")//split to 3 part
            if(options.includes(Field)){//reunite in properly prop
                req.query[Field]={[Operator]: Number(Value)}
            }
            console.log(req.query)
        })
    }
    let product =  Product.find(req.query);

    //sorting products
    if(req.query.sort){
        const sortList = req.query.sort.split(",").join(" ");
        product = product.sort(sortList);
    }else{ //default sort by created time
        product = product.sort("createdAt");
    }

    //limited display properties
    if(req.query.display){
        const displayList = req.query.display.split(",").join(" ");
        product = product.select(displayList)
    }

    //pagination
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1
    const skip =  (page-1)*limit

    product= product.limit(limit).skip(skip)
    const result = await product
    res.status(200).json({nbHits: result.length, result})
}

module.exports= {
    getAllProducts,
    getAllProductsStatic,
}