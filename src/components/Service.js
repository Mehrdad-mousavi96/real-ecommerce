
export const OrdersService = {
     getPreviousOrders: (orders) => {
        return orders.filter((ord) => ord.isPaymentCompleted === true)
    },
     getCart: (orders) => {
        return orders.filter((ord) => ord.isPaymentCompleted === false)
    }
}

export const ProductService = {
    fetchProducts: () => {
        return fetch(`http://localhost:5001/products`, {
            method: 'get'
        })
    },
    getProductByProductId: (products, productId) => {
        return products.find(prd => prd.id === productId)
    }
}

