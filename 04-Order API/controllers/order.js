
const getAllOrders = (req, res)=> {
    res.send('getAllOrder');
}

const placeNewOrder = (req, res)=> {
    res.send('place New Order')
}

const updateOrder = (req, res)=> {
    res.send('Update Order by ID')
}

const deleteOrder = (req, res)=> {
    res.send('delete Order')
}

module.exports = {
    getAllOrders,
    placeNewOrder,
    updateOrder,
    deleteOrder,
}