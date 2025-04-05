import { useState, useEffect } from "react";
import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export const Dashboard = () => {
    const [balance, setBalance] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch balance from the backend
        const fetchBalance = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/user/balance", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                setBalance(response.data.balance);  // Assuming balance is returned in the response
            } catch (err) {
                setError("Error fetching balance");
                console.error(err);
            }
        };

        fetchBalance();
    }, []);  //Empty dependency array means this effect runs only once when the component mounts

    return (
        <div>
            <Appbar />
            <div className="m-8">
                {error ? (
                    <div className="error">{error}</div>
                ) : (
                    <Balance value={balance} />
                )}
                <Users />
            </div>
        </div>
    );
};

