import { useState } from "react";



const usePostPayment = () => {
    const [isloading , setIsLoading] = useState(false);
    const payment = async (PaymentBody: Object) => {
        setIsLoading(true);

        return await fetch('/payment/api', {
            method: 'POST',
            body: JSON.stringify({ PaymentBody }),
            headers: {"Content-Type": "application/json"},
        })
        .then(async (res) => {
            setIsLoading(false);
            return await res.json();
        })
        .catch((error) => {
            setIsLoading(false);
            alert(`Error in Payment : ${error.message}`)
        })
    };
    return {isloading, payment}
}

export default usePostPayment;