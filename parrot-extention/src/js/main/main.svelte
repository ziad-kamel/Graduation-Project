<script lang="ts">
  import { onMount } from "svelte";
  import { os, path } from "../lib/cep/node";
  import {
    csi,
    evalES,
    evalTS,
    subscribeBackgroundColor
  } from "../lib/utils/bolt";

  import GenerativeAudio from "./components/GenerativeAudio/GenerativeAudio.svelte";
  import Header from "./components/Header.svelte";
  import Sidebar from "./components/Sidebar.svelte";

  import "../index.scss";
  import AudioCleanup from "./components/AudioCleanup/AudioCleanup.svelte";
  import Stt from "./components/STT/STT.svelte";
  import Tts from "./components/TTS/TTS.svelte";
  import "./main.scss";
  import Payment from "./components/Payment/Payment.svelte";

  onMount(() => {

  });
</script>

<script lang='ts' context="module">

import { Clerk } from "@clerk/clerk-js";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const clerk = new Clerk(clerkPubKey);
const clerkAuth = async (option: string) =>{ 

  document.getElementById('signIn-btn')!.style.display = 'none'
  document.getElementById('signUp-btn')!.style.display = 'none'
  
  try {
    const signInDiv = document.getElementById('signInDiv') as HTMLDivElement;
    await clerk.load({
      afterSignUpUrl: path.join(__dirname, 'main',`index.html`)
    });
    if (clerk.user) {
      // clerk.session?.getToken().then((res)=>{alert(res)})
      signInDiv.style.display = 'none';
      document.getElementById('app')!.style.display = 'block';
      clerk.closeSignIn()
    } else {
        if (option.match("in")) {
          clerk.mountSignIn(signInDiv, { redirectUrl: path.join(__dirname, 'main',`index.html`) });
        } else {
          clerk.mountSignUp(signInDiv, { redirectUrl: path.join(__dirname, 'main',`index.html`) });
        }
      }
    }
    catch (error) {
    //@ts-ignore
    alert(error.message)
  }
}



export const clerkSignOut = () => {
  // alert(`signing out token id: ${clerk.session?.id}`)
  clerk.signOut({sessionId:clerk.session?.id, redirectUrl: path.join(__dirname, 'main',`index.html`)})
}
  
  enum TabNames {
    Cleanup = "Cleanup",
    GenerativeAudio = "Generative",
    TTS = "TTS",
    STT = 'STT',
    Pay = 'Pay',
  }

  function hideAllTabs(){
    // change display style of the cleanup tab to none
    const cleanup = document.querySelector('.cleanup-main') as HTMLElement;
    cleanup.style.display = "none";
    const generative = document.querySelector('.generative-main') as HTMLElement;
    generative.style.display = "none";
    const tts = document.querySelector('.tts-main') as HTMLElement;
    tts.style.display = "none";
    const stt = document.querySelector('.stt-main') as HTMLElement;
    stt.style.display = "none";
    const pay = document.querySelector('.pay-main') as HTMLElement;
    pay.style.display = "none";
  }

  export const handleTabs = (tab : string) => {

    hideAllTabs()
    if (tab === "Home"){
      const nav = document.querySelector('.sidebar') as HTMLElement;
      //remove the :hidden" class from the nav
      nav.classList.add('hidden');
      // get the heafer with class app-header
      const header = document.querySelector('.app-header') as HTMLElement;
      //add the "hidden" class to the header
      header.classList.remove('hidden');
      const app = document.querySelector('.app') as HTMLElement;
      app.style.display = "block";

      const appMain = document.querySelector('.app-main') as HTMLElement;
      appMain.style.width = "auto";
      return;
    }
    // get the nav with class sidebar
    const nav = document.querySelector('.sidebar') as HTMLElement;
    //remove the :hidden" class from the nav
    nav.classList.remove('hidden');
    // get the heafer with class app-header
    const header = document.querySelector('.app-header') as HTMLElement;
    //add the "hidden" class to the header
    header.classList.add('hidden');
    const app = document.querySelector('.app') as HTMLElement;
    app.style.display = "flex";

    const appMain = document.querySelector('.app-main') as HTMLElement;
      appMain.style.width = "100%";
    // create a switch statement to handle the tabs
    switch(tab){
      case TabNames.Cleanup:
        hideAllTabs();
        const cleanup = document.querySelector('.cleanup-main') as HTMLElement;
        cleanup.classList.remove('hidden');
        cleanup.style.display = "flex";
        break;
      case TabNames.GenerativeAudio:
        hideAllTabs();
        const generative = document.querySelector('.generative-main') as HTMLElement;
        generative.style.display = "flex";
        break;
      case TabNames.TTS:
        hideAllTabs();
        const tts = document.querySelector('.tts-main') as HTMLElement;
        tts.style.display = "flex";
        break;
      case TabNames.STT:
        hideAllTabs();
        const stt = document.querySelector('.stt-main') as HTMLElement;
        stt.style.display = "flex";
        break;
      case TabNames.Pay:
        hideAllTabs();
        const pay = document.querySelector('.pay-main') as HTMLElement;
        pay.style.display = "flex";
        break;
      default:
        console.log("default");
    }
  }

</script>
{#if !clerk.user}
<div id="signInDiv">
  <button on:click={()=>{ clerkAuth('in')} } id="signIn-btn">Sign In</button>
  <button on:click={()=>{ clerkAuth('up')} } id="signUp-btn">Sign Up</button>
</div>
{/if}

  
<Sidebar />
<div class="app" id="app" style="display: none;">
<Header />

<main class="app-main">

  <AudioCleanup />
  
  <div class = "generative-main hidden">
    <h1>Generative Audio</h1>
    <GenerativeAudio/>
  </div>
  
    <Tts />

    <Stt />

    <Payment />
</main>
</div>


<style>
</style>

