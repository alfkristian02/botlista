<script lang="ts">
  let { toggleShowDialog, regler } = $props();
</script>

<div class="complete-overlay"></div>
<div class="dialog-box">
  <h2>Botregler</h2>
  <br />
  {#each regler as rule}
    <span>
      <p class="description">{rule.description}</p>
      <p class="fine">{rule.fine}kr</p>
    </span>
  {/each}

  <button class="dialog-button" onclick={toggleShowDialog}> Lukk </button>
</div>

<style>
  .complete-overlay {
    position: fixed;
    background-color: black;

    top: 0;
    left: 0;

    opacity: 0.3;

    width: 100vw;
    height: 100vh;
  }

  .dialog-box {
    position: fixed;
    background-color: white;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    border-radius: 10px;
    padding: 30px;

    max-height: 80vh;
    overflow: scroll;

    width: 70vw;
    max-width: 850px;
  }

  h2 {
    text-align: center;
  }

  span {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 2rem;
    align-items: center;
  }

  .fine {
    align-self: center;
  }

  .dialog-button {
    position: sticky;
    bottom: 0;
    float: right;

    background-color: white;
    border-radius: 15px;
    padding: 10px;
    font-size: 15px;
    
    color: black;

    border-style: solid;
    border-color: black;
  }
</style>
