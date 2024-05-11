
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const {payment_keys} = await fetch(`${process.env.PAYMOB_CREATE_ORDER_LINK}`, {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${process.env.PAYMOB_SECREAT_KEY}`
            },
            body: JSON.stringify(body.PaymentBody)
        })
        .then((res)=>{return res.json()})

        return Response.json({iframeKey: payment_keys[0].key})
    } catch (error) {
        //@ts-ignore
        return Response.json({error: error.message}, {status: 500})
    }
}