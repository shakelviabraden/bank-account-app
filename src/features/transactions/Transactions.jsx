import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./transactions.scss";
import { deposit, withdrawal, transfer, selectBalance } from './transactionsSlice';

/**
 * Allows users to deposit to, withdraw from, and transfer money from their account.
 */
export default function Transactions() {
  // TODO: Get the balance from the Redux store using the useSelector hook
  //we are just using the variable selectBalance here because the export is a FUNCTION named that. the useSelector hook requires a function, so the value of selectBalance s the function we need

  //i had to place both of these here. it did not working putting it under onTransaction because these are hooks
  const balance = useSelector(selectBalance);
  const dispatch = useDispatch()

  const [amountStr, setAmountStr] = useState("0.00");

  /** Dispatches a transaction action based on the form submission. */
  const onTransaction = (e) => {

    e.preventDefault();
    // This changes depending on which button the user clicked to submit the form.
    // It will be either "deposit", "withdraw", or "transfer".

    // this will be plugged into our if else statement... if the "action" is ____ then dispatch this function from the store
    const action = e.nativeEvent.submitter.name;

    //we are changing this to a number. the type of input is text. i guess because this allows the user to type a string then get an error
    // ways to change to a number:

    //const str = '5';
    // Number(str);
    // parseInt(str); // this is slightly different ill elaborate later
    // str * 1; 
    // +str;
    const amount = +amountStr;

    // TODO: Dispatch the appropriate transaction action based on `action`

    switch (action) {
      case 'deposit':
      dispatch(deposit({amount}))
      break;

      case 'withdraw':
      dispatch(withdrawal({amount}))
      break;

      case 'transfer': 
      dispatch(transfer({amount}))
    }
  };

  return (
    <section className="transactions container">
      <h2>Transactions</h2>
      <figure>
        <figcaption>Current Balance &nbsp;</figcaption>
        <strong>${balance.toFixed(2)}</strong>
      </figure>
      <form onSubmit={onTransaction}>
        <div className="form-row">
          <label>
            Amount
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step="0.01"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
            />
          </label>
          <div>
            <button default name="deposit">
              Deposit
            </button>
            <button name="withdraw">Withdraw</button>
          </div>
        </div>
        <div className="form-row">
          <label>
            Transfer to
            <input type="text" placeholder="Recipient Name" name="recipient" />
          </label>
          <button name="transfer">Transfer</button>
        </div>
      </form>
    </section>
  );
}