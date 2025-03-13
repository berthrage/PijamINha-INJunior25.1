import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Esta é uma API mock existente que você pode estar usando
const mock = new MockAdapter(axios);

// Armazenar pedidos
let orders = [];

// Endpoint para criar um novo pedido
mock.onPost('/api/orders').reply((config) => {
  try {
    const orderData = JSON.parse(config.data);
    const newOrder = {
      id: Date.now(),
      ...orderData,
      status: 'confirmado'
    };
    
    orders.push(newOrder);
    console.log('Novo pedido criado:', newOrder);
    
    return [201, newOrder];
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    return [500, { error: 'Erro ao processar pedido' }];
  }
});

// Endpoint para limpar o carrinho
mock.onDelete('/api/cart/clear').reply(() => {
  console.log('Carrinho limpo');
  return [200, { message: 'Carrinho limpo com sucesso' }];
});

// Adicionar ao seu mock API existente
export default mock;