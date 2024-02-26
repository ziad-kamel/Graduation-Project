<script lang="ts">
  import { onMount } from "svelte";
  import { os, path } from "../lib/cep/node";
  import {
    csi,
    evalES,
    evalTS,
    subscribeBackgroundColor
  } from "../lib/utils/bolt";

  import Header from "./components/Header.svelte";
  import Sidebar from "./components/Sidebar.svelte";

  import "../index.scss";
  import GenerativeAudio from "./components/GenerativeAudio/GenerativeAudio.svelte";
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
    MotionSFX = "Motion",
    GenerativeAudio = "Generative",
    TTS = "TTS"
  }

  function hideAllTabs(){
    const cleanup = document.querySelector('.cleanup-main') as HTMLElement;
    cleanup.classList.add('hidden');
    const motion = document.querySelector('.motion-main') as HTMLElement;
    motion.classList.add('hidden');
    const generative = document.querySelector('.generative-main') as HTMLElement;
    generative.classList.add('hidden');
    const tts = document.querySelector('.tts-main') as HTMLElement;
    tts.classList.add('hidden');
    
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
    // create a switch statement to handle the tabs
    switch(tab){
      case TabNames.Cleanup:
        hideAllTabs();
        const cleanup = document.querySelector('.cleanup-main') as HTMLElement;
        cleanup.classList.remove('hidden');
        break;
      case TabNames.MotionSFX:
        hideAllTabs();
        const motion = document.querySelector('.motion-main') as HTMLElement;
        motion.classList.remove('hidden');
        break;
      case TabNames.GenerativeAudio:
        hideAllTabs();
        const generative = document.querySelector('.generative-main') as HTMLElement;
        generative.classList.remove('hidden');
        break;
      case TabNames.TTS:
        hideAllTabs();
        const tts = document.querySelector('.tts-main') as HTMLElement;
        tts.classList.remove('hidden');
        break;
      default:
        console.log("default");
    }
  }


</script>

<link rel="stylesheet" href="GenerativeAudio.scss">


<div class="app" >
  <Header />
  <Sidebar />
  <main class="app-main">
    <div class = "cleanup-main hidden">
      <h1>Audio Cleanup</h1>
      <button on:click={jsxTest}>Import Audio</button>
      <textarea></textarea>
      <button on:click={nodeTest}>CLEAN</button>
    </div>
    <div class = "motion-main hidden">
      <h1>Motion SFX</h1>
    </div>
    <div class = "generative-main hidden">
      <h1>Generative Audio</h1>
      <GenerativeAudio/>
    </div>

    <div class = "tts-main hidden">
      <h1>TTS</h1>
    </div>
  </main>
</div>

<style>
</style>
