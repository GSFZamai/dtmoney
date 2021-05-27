import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({

  models: {
    transaction: Model,
  },

    seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Dia 1',
          type: 'deposit',
          amount: 40,
          category: 'Estágio',
          createdAt: new Date("2021-05-24 14:39")
        },
        {
          id: 2,
          title: 'Dia 2',
          type: 'deposit',
          amount: 40,
          category: 'Estágio',
          createdAt: new Date("2021-05-25 14:39")
        },
        {
          id: 3,
          title: 'Dia 3',
          type: 'deposit',
          amount: 40,
          category: 'Estágio',
          createdAt: new Date("2021-05-26 14:39")
        },
        {
          id: 4,
          title: 'Almoço',
          type: 'withdraw',
          amount: 17,
          category: 'Alimentação',
          createdAt: new Date("2021-05-26 11:00")
        }
      ]
    })
  },
  
  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    })

    this.post('/transactions', (schema, request) =>{
      const data = JSON.parse(request.requestBody);
      return schema.create('transaction', data);
    })

  }
  
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
