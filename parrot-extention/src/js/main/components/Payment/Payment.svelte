<script>

const secretApiKey = import.meta.env.VITE_PAYMOB_PUBLICKEY;

const { exec } = require('child_process');


const openInBrowser = () => {
    let link = 'https://parrot-sepia.vercel.app/payment'
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
    <button id="payButton" on:click={openInBrowser}>Pay Now</button>
</div>


