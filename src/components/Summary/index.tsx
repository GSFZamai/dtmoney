import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';
import { Container } from './styles';


export function Summary() {
    
    const { transactions } = useTransactions();

    const summary = transactions.reduce((acc, transaction) => {
        if (transaction.type === "deposit") {
            acc.deposits += transaction.amount;
            acc.total += transaction.amount;
        }else {
            acc.withdraws += transaction.amount;
            acc.total -= transaction.amount;
        }

        return acc;
    }, {
        deposits: 0,
        withdraws: 0,
        total: 0
    });

    const formatedCurrency = (value: number) => (new Intl.NumberFormat('pt-br',{
        style: 'currency',
        currency: 'BRL'
    }).format(value));

    
    
    return (
        <Container>

            <div>
                <header>
                    <p>Entradas</p>
                    <img src={income} alt="teste"></img>
                </header>
                <strong>{formatedCurrency(summary.deposits)}</strong>
            </div>

            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcome} alt="teste"></img>
                </header>
                <strong>- {formatedCurrency(summary.withdraws)}</strong>
            </div>

            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={total} alt="teste"></img>
                </header>
                <strong>{formatedCurrency(summary.total)}</strong>
            </div>

        </Container>
    )   
}