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

  let count: number = 0;
  let backgroundColor: string = "#282c34";

  //* Demonstration of Traditional string eval-based ExtendScript Interaction
  const jsxTest = () => {
    console.log(evalES(`helloWorld("${csi.getApplicationID()}")`));
  };

  //* Demonstration of End-to-End Type-safe ExtendScript Interaction
  const jsxTestTS = () => {
    evalTS("helloStr", "test").then((res) => {
      console.log(res);
    });
    evalTS("helloNum", 1000).then((res) => {
      console.log(typeof res, res);
    });
    evalTS("helloArrayStr", ["ddddd", "aaaaaa", "zzzzzzz"]).then((res) => {
      console.log(typeof res, res);
    });
    evalTS("helloObj", { height: 90, width: 100 }).then((res) => {
      console.log(typeof res, res);
      console.log(res.x);
      console.log(res.y);
    });
    evalTS("helloVoid").then(() => {
      console.log("function returning void complete");
    });
    evalTS("helloError", "test").catch((e) => {
      console.log("there was an error", e);
    });
  };

  const nodeTest = () => {
    alert(
      `Node.js ${process.version}\nPlatform: ${
        os.platform
      }\nFolder: ${path.basename(window.cep_node.global.__dirname)}`
    );
  };

  onMount(() => {
    if (window.cep) {
      subscribeBackgroundColor((c: string) => (backgroundColor = c));
    }
  });
</script>

<script lang='ts' context="module">

  
  enum TabNames {
    Cleanup = "Cleanup",
    GenerativeAudio = "Generative",
    TTS = "TTS",
    STT = 'STT',
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
    
  }

  export const handleTabs = (tab : string) => {
    // evalTS("helloStr", tab).then((res) => {
    //   console.log(res);
    // });
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
      default:
        console.log("default");
    }
  }

</script>


<Sidebar />
<div class="app" >
  <Header />
  <main class="app-main">

    <AudioCleanup />
    
    <div class = "generative-main hidden">
      <h1>Generative Audio</h1>
      <GenerativeAudio/>
    </div>
    
      <Tts />

      <Stt />
  </main>
</div>

<style>
</style>
