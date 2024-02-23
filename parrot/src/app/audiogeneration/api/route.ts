export async function POST(request: Request) {
    const requestBody = await request.json();

    console.log(request);
    
    return Response.json({message: "hi"});
}