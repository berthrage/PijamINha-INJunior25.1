import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Cria uma instância do mock adapter
const mock = new MockAdapter(axios);

// Dados simulados para o carrinho
const mockCartItems: CartItem[] = [
    {
        id: 1,
        name: 'Pijama de Algodão',
        reference: 'REF123',
        size: 'M',
        price: 50,
        stockQuantity: 10,
        selectedQuantity: 1,
        image: 'https://via.placeholder.com/150'
    },
    {
        id: 2,
        name: 'Pijama de Seda',
        reference: 'REF456',
        size: 'G',
        price: 80,
        stockQuantity: 5,
        selectedQuantity: 2,
        image: 'https://via.placeholder.com/150'
    }
];

// Simula a resposta da API para GET /api/cart
mock.onGet('/api/cart').reply(200, mockCartItems);

// Simula a resposta da API para DELETE /api/cart/{id}
mock.onDelete(/\/api\/cart\/\d+/).reply(200, { success: true });

// Simula a resposta da API para PUT /api/cart/{id}
mock.onPut(/\/api\/cart\/\d+/).reply(200, { success: true });