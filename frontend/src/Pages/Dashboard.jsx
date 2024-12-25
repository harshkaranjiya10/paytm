import React, { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";

const Dashboard = () => {
  const [balance, setBalance] = useState(0); 
  const label = localStorage.getItem("firstname")
  console.log(label);
  
  useEffect(() => {
    const fetchBalance = async () => {
      const res = await axios.get("http://localhost:5000/api/v1/account/balance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBalance(res.data.balance); 
    };

    fetchBalance();
  }, []);

  return (
    <div>
      <Appbar label={label} />
      <div className="m-8">
        <Balance value={balance} /> {/* Pass the balance state to Balance component */}
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
