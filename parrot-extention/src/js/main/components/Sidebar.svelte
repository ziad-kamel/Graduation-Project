<script lang="ts">

  import Main, { handleTabs } from "../main.svelte";
  import { onMount } from "svelte";


</script>

<nav class = "sidebar hidden" >

    <div class = "sidebar-buttons">

      <button class = "sidebar-button" on:click={()=>{handleTabs("Home")}}> Parrot.AI </button>
      <div>
        <button class = "sidebar-button" on:click={()=>{handleTabs("Cleanup")}}> Cleanup </button>
        <button class = "sidebar-button" on:click={()=>{handleTabs("STT")}}> STT </button>
        <button class = "sidebar-button" on:click={()=>{handleTabs("Generative")}}> Generative Audio </button>
        <button class = "sidebar-button" on:click={()=>{handleTabs("TTS")}}> TTS </button>
      </div>

    </div>

  </nav>