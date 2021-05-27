import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { useTransactions } from '../../hooks/useTransactions';

import { Container, RadioBox, TransactionTypeContainer } from './styles';


interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
    const { createTransaction } = useTransactions();
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState("deposit");


    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type
        })

        setTitle('');
        setAmount(0);
        setType('deposit')
        setCategory('');
        onRequestClose();

    }

    return(
    <Modal 
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
    >

        <button 
            type="button" 
            onClick={onRequestClose}
            className="react-modal-close"
        >
            <img src={closeImg} alt="Fechar modal"/>
        </button>

        <Container onSubmit={handleCreateNewTransaction}>
            <h2>Cadastrar transação</h2>

            <input 
                type="text" 
                placeholder="Título"
                value={title}
                onChange={event => setTitle(event.target.value)}
            >
            </input>

            <input 
                type="number" 
                placeholder="Valor"
                value={amount}
                onChange={event => setAmount(Number(event.target.value))}
            >                
            </input>

            <TransactionTypeContainer>
                <RadioBox
                    isActive={type === "deposit"}
                    activeColor="green"
                    onClick={() => setType("deposit")}
                    type="button"
                >
                    <img src={incomeImg} alt="Entrada"></img>
                    <span>Entrada</span>                   
                </RadioBox>

                <RadioBox 
                    isActive={type === "withdraw"}
                    activeColor="red"
                    onClick={() => setType("withdraw")}
                    type="button"
                >
                    <img src={outcomeImg} alt="Saída"></img>
                    <span>Saída</span>                   
                </RadioBox>

            </TransactionTypeContainer>

            <input 
                type="text" 
                placeholder="Categoria"
                value={category}
                onChange={event => setCategory(event.target.value)}
            >
            </input>

            <button type="submit">
                Cadastrar
            </button>
        </Container>

    </Modal>
    )
}