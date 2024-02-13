export default async function handler(req:Request) {
    console.log("webhook")
    console.log(req.body)
    return new Response(JSON.stringify(req.body));
}