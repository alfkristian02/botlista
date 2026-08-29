<script lang="ts">
  import { addDoc, collection, getDocs } from "firebase/firestore/lite";
  import { onMount } from "svelte";

  let { database } = $props();

  let player: string = $state("");
  let comment: string = $state("");
  let players: string[] = $state([]);

  let error: boolean = $state(false);

  let matchingPlayers = $derived(
    players.filter((name) =>
      name.toLowerCase().includes(player.toLowerCase())
    )
  );

  async function getPlayers() {
    const snapshot = await getDocs(collection(database, "spillere"));

    players = snapshot.docs
      .map((doc) => doc.data().name as string)
      .sort((a, b) => a.localeCompare(b, "nb"));
  }

  async function handleWriteFine() {
    if (!players.includes(player) || comment.trim() === "") {
      error = true;
      return;
    }

    await addDoc(collection(database, "prikk_melding"), {
      name: player,
      explanation: comment.trim(),
      date: new Date()
    });

    player = "";
    comment = "";
    error = false;
  }

  function selectPlayer(name: string) {
    player = name;
  }

  onMount(async () => {
    await getPlayers();
  });
</script>

<div class="add_fine">
  <div class="component">
    <label for="player">Spiller <span class="asterisk">*</span></label>

    <div class="player_input">
      <input
        id="player"
        type="text"
        bind:value={player}
        autocomplete="off"
      >

      {#if player !== "" && matchingPlayers.length > 0 && !players.includes(player)}
        <div class="dropdown">
          {#each matchingPlayers as name}
            <button onclick={() => selectPlayer(name)}>
              {name}
            </button>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  <div class="component">
    <label for="comment">Kommentar <span class="asterisk">*</span></label>
    <input id="comment" type="text" bind:value={comment}>
  </div>

  <button onclick={handleWriteFine}>Send inn</button>
</div>

{#if error}
  <p>Mangler felt eller ugyldig spiller</p>
{/if}

<style>
  button {
    background-color: #006A3A;
    height: 43px;
    border-radius: 8px;
    padding: 10px;
    border: none;
    font-size: 14px;
    font-weight: 600;
    color: #FFFFFF;
  }

  p {
    color: #FF4D4DD6;
    bottom: 0;
  }

  .add_fine {
    display: flex;
    flex-direction: column;
    gap: 34px;
    font-size: 14px;
    font-weight: 500;
  }

  .component {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .player_input {
    position: relative;
  }

  input {
    width: 100%;
    box-sizing: border-box;
    border-radius: 8px;
    border-width: 1px;
    padding: 14px;
  }

  .dropdown {
    position: absolute;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-top: 4px;
    overflow: hidden;
    z-index: 10;
  }

  .dropdown button {
    display: block;
    width: 100%;
    height: 44px;
    background: white;
    color: #414141;
    text-align: left;
    border-radius: 0;
    border-bottom: 1px solid #eee;
  }

  .dropdown button:hover {
    background: #f1f1f1;
  }

  .asterisk {
    color: #FF4D4DD6;
  }
</style>