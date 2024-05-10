<script>

const apiKey = import.meta.env.VITE_PAYMOB_PUBLICKEY;
const integrationId = '4571217';

const createOrder = async () => {
    const response = await fetch('https://accept.paymob.com/api/ecommerce/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            "delivery_needed": false,
            "amount_cents": 10000, // Amount in cents
            "currency": "EGP",
            "merchant_order_id": "123456",
            "items": ["Subscription"]
        })
    });

    const data = await response.json();
    return data;
};

const initializeCheckout = async () => {
    const order = await createOrder();

    const response = await fetch('https://accept.paymob.com/api/acceptance/payment_keys', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            "amount_cents": 10000, // Amount in cents
            "currency": "EGP",
            "order_id": order.id,
            "billing_data": {
                "email": "customer@example.com"
            }
        })
    });

    const data = await response.json();
    return data;
};

const redirectToCheckout = async () => {
    const paymentKey = (await initializeCheckout()).token;
    window.location.href = `https://accept.paymob.com/api/acceptance/iframes/${integrationId}/${paymentKey}`;
};


</script>

<div class = "pay-main">
    <button id="payButton" on:click={redirectToCheckout}>Pay Now</button>
</div>

