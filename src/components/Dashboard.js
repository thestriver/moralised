import { useState } from "react";
import moralis from "moralis";

export default function Dashboard(user) {
  const [tokens, setTokens] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [showTokens, setShowTokens] = useState(false);
  const [showT, setShowT] = useState(false);

  const onLogout = () => {
    moralis.User.logOut();
    // window.location.href = "/";
  };

  const getBalance = async () => {
    setShowT(false);
    setShowTokens(true);
    const balances = await moralis.Web3.getAllERC20();
    setTokens((tokens) => [...tokens, ...balances]);
  };
  async function getTransactions() {
    setShowTokens(false);
    setShowT(true);
    // get mainnet transactions for the current user
    const userTrans = await moralis.Web3.getTransactions();
    console.log("transactions:", userTrans);
    const lastTen = userTrans.slice(0, 15);
    setTransactions((transactions) => [...transactions, ...lastTen]);
    console.log("lastTen", lastTen);
    // renderTransactions(lastTen)
  }

  return (
    <div className="mx-auto">
      <nav
        id="navbarExample"
        class="navbar navbar-expand-lg fixed-top navbar-light"
        aria-label="Main navigation"
      >
        <div class="container">
          <a class="navbar-brand logo-text" href="#!">
            Moralised
          </a>
          <span class="nav-item">
            <a  href="/" className="btn-outline-lg" onClick={onLogout}>
              Logout
            </a>
          </span>
        </div>
      </nav>

      <div className="mt-5 pt-5 px-5 text-start ">
        <h1 className="text-success">Welcome To Moralised</h1>
        <p>
          Click the buttons below to get latest token balances, gas stats and
          the most recent of your transactions
        </p>
      </div>

      <div className="text-start mx-5 my-3">
        <button type="button" class="btn btn-primary me-2" onClick={getBalance}>
          Token Balances
        </button>
        <button
          type="button"
          class="btn btn-secondary me-2"
          onClick={getTransactions}
        >
          Recent Transactions
        </button>
        {/* <button type="button" class="btn btn-success">
          Gas Stats
        </button> */}
      </div>

      <div className="mx-5">
        {showTokens ? (
          <ul className="list-group text-start">
            {tokens.map((bal) => (
              <li key={bal.id} className="list-group-item">
                {bal.name} :{" "}
                <span>
                  {(bal.balance / Math.pow(10, bal.decimals)).toFixed(6)}{" "}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="mx-5">
        {showT ? (
          <ul className="list-group text-start">
            {transactions.map((item) => (
              <li className="list-group-item" key={item.id}>
                <span className="text-success">Block Number:</span>
                {item.block_number}{" "}
                <span className="text-success px-5">
                  {" "}
                  Time: {item.block_timestamp.toDateString()}{" "}
                </span>{" "}
                <span className="text-danger px-2">Outgoing address:</span>
                {item.to_address}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
