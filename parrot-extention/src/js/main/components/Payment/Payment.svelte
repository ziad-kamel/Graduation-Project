<script>

const secretApiKey = import.meta.env.VITE_PAYMOB_PUBLICKEY;

const { exec } = require('child_process');

let res = ''
let resraw = ''

const createOrder = async () => {
    try{
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Token ${secretApiKey}`);
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
        "amount": 10,
        "currency": "EGP",
        "payment_methods": [
            12,
            "card",
            "hi"
        ],
        "items": [
            {
            "name": "Item name 1",
            "amount": 10,
            "description": "Watch",
            "quantity": 1
            }
        ],
        "billing_data": {
            "apartment": "6",
            "first_name": "Ammar",
            "last_name": "Sadek",
            "street": "938, Al-Jadeed Bldg",
            "building": "939",
            "phone_number": "+96824480228",
            "country": "OMN",
            "email": "AmmarSadek@gmail.com",
            "floor": "1",
            "state": "Alkhuwair"
        },
        "customer": {
            "first_name": "Ammar",
            "last_name": "Sadek",
            "email": "AmmarSadek@gmail.com",
            "extras": {
            "re": "22"
            }
        },
        "extras": {
            "ee": 22
        }
        });
    
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        const response = await fetch("https://accept.paymob.com/v1/intention/", requestOptions)
        .then(response => {
            return response.json()
        })

        createIframeLink(response)
    } catch(e){
        res = e.message
    }
};

let iFrameLink = "";

const createIframeLink = (res) => {
    let key = res.payment_keys[0].key
    
    iFrameLink = `https://accept.paymob.com/api/acceptance/iframes/844924?payment_token=${key}`

    openInBrowser(iFrameLink);

    return iFrameLink
}

const openInBrowser = (link) => {
    try{
        let command;
    if (process.platform === 'win32') {
        // Windows
        command = `start ${link}`;
    } else if (process.platform === 'darwin') {
        // macOS
        command = `open "${link}"`;
    } else {
        // Linux or other Unix-like systems
        command = `xdg-open "${link}"`;
    }

    // Execute the command
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });

    }catch (e){
        alert(e.message)
    }
}



</script>

<div class = "pay-main" id = "container">
    <button id="payButton" on:click={createOrder}>Pay Now</button>
</div>


