import { useState } from 'react';
import Modal from 'react-modal';
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header"
import { NewTransactionModal } from './components/NewTransactionModal';
import { TransactionsTable } from "./components/TransactionsTable";
import { GlobalStyle } from "./styles/global"
import { TransactionsProvider } from './hooks/useTransactions';

Modal.setAppElement('#root');

export function App() {

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
    
  function handleOpenNewTransactionModal() {
      setIsNewTransactionModalOpen(true);
  }
  
  function handleCloseNewTransactionModal() {
      setIsNewTransactionModalOpen(false);
  }

  return (
    <TransactionsProvider>
      
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />

      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />

      <Dashboard />

      <TransactionsTable />

      <GlobalStyle />

    </TransactionsProvider>
  );
}

