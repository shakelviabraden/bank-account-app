import "./transactionHistory.scss";
import { selectHistory } from "./transactionsSlice";
import { useSelector } from "react-redux";

/** Displays a table row with transaction information  */
const TransactionRow = ({ transaction }) => (
  <tr>
    <th scope="row">{transaction.type}</th>
    <td>{transaction.amount}</td>
    <td>{transaction.balance}</td>
  </tr>
);

/** Displays a table of the user's transaction history. */
export default function TransactionHistory() {
  // TODO: Get the transaction history from the Redux store using the useSelector hook
  const history = useSelector(selectHistory);

  return (
    <section className="transactions-history container">
      <h2>Transaction History</h2>
      <table>
        <thead> {/*t head= table head. the spacing is big and represents what each column of your table contains*/}
          <tr> {/*tr= table row. these are contained in the head of your table*/}
            <th scope="col">Type</th> {/*table header*/}
            <th scope="col">Amount</th>
            <th scope="col">Balance</th>
          </tr>
        </thead>
        <tbody> 
          {/*t body= this is where your data is*/}
          {/* TODO
          Map over the transactions in `history`
          to render the appropriate `TransactionRow`
          */}
          {/*tr inside the body. it usually contains td elements (table cells)*/}
          {history.map((transaction, index) => {
            return <TransactionRow transaction={transaction} key={index} />
          })}
        </tbody>
      </table>
    </section>
  );
}
