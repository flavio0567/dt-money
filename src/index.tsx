import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createServer, Model } from 'miragejs';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freela 1',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-02-12 09:00:00'),
          updatedAt: new Date('2021-02-12 09:00:00')
        },
        {
          id: 2,
          title: 'Renting',
          type: 'deposit',
          category: 'Home',
          amount: 3000,
          createdAt: new Date('2021-05-13 09:00:00'),
          updatedAt: new Date('2021-05-14 09:00:00')
        },
                {
          id: 3,
          title: 'Restaurant',
          type: 'withdraw',
          category: 'Home',
          amount: 800,
          createdAt: new Date('2021-04-09 09:00:00'),
          updatedAt: new Date('2021-04-11 09:00:00')
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api';
  
    this.get('transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data)
    })
  }
})


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
