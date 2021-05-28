import { createContext, useEffect, useState, ReactNode, useContext } from 'react'
import { api } from '../services/api';

interface TransactionProps {
  id: number;
  title: string;
  category: string;
  amount: number;
  type: string;
  createdAt: string;
}

type TransactionInput = Omit<TransactionProps, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: TransactionProps[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions))
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transaction } = response.data;

    setTransactions([...transactions, transaction])
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransaction() {
  const contex = useContext(TransactionsContext)

  return contex;
}