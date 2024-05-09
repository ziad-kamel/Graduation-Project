<script lang="ts">
  import { clerkSignOut, handleTabs } from "../main.svelte";

  

</script>

<nav class = "sidebar hidden" >

  <button class="sidebar-button" on:click={()=>{handleTabs("Home")}}>Parrot</button>
  
  <div>
    <button class = "sidebar-button" on:click={()=>{handleTabs("Cleanup")}}> Cleanup </button>
    <button class = "sidebar-button" on:click={()=>{handleTabs("STT")}}> STT </button>
    <button class = "sidebar-button" on:click={()=>{handleTabs("Generative")}}> Generative Audio </button>
    <button class = "sidebar-button" on:click={()=>{handleTabs("TTS")}}> TTS </button>
  </div>
  <button on:click={clerkSignOut}>sign out</button>

    <!-- <div class = "sidebar-buttons">

      <button class = "sidebar-button" on:click={()=>{handleTabs("Home")}}> Parrot </button>
      <div>
        <button class = "sidebar-button" on:click={()=>{handleTabs("Cleanup")}}> Cleanup </button>
        <button class = "sidebar-button" on:click={()=>{handleTabs("STT")}}> STT </button>
        <button class = "sidebar-button" on:click={()=>{handleTabs("Generative")}}> Generative Audio </button>
        <button class = "sidebar-button" on:click={()=>{handleTabs("TTS")}}> TTS </button>
      </div>

    </div> -->

  </nav>