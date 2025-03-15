
export const API = {
    BASE_URL: 'http://localhost:3333',
    ENDPOINTS: {
        AUTHENTICATE: '/authenticate',
        FEEDBAKCS:'/feedbacks',
        PRODUCTS: '/products', 
        USERS: '/users',
        ORDERS: '/orders',
    },
    HEADERS: {
        CONTENT_TYPE: 'application/json',
        AUTHORIZATION: 'Bearer',
    },
    TIMEOUT: 10000,
};