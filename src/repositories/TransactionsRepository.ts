import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = {
      income: this.transactions.reduce(
        (income, transaction) =>
          transaction.type === 'income' ? income + transaction.value : income,
        0,
      ),
      outcome: this.transactions.reduce(
        (outcome, transaction) =>
          transaction.type === 'outcome'
            ? outcome + transaction.value
            : outcome,
        0,
      ),
      total: 0,
    };

    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
