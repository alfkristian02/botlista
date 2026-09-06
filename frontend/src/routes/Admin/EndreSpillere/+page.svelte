<script lang="ts">
    import { database } from "$lib/utils/firestore";
    import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore/lite'
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/state";

    type Player = {
        id: string;
        name: string;
    };

    let players: Player[] = $state([]);
    let selectedPlayers: string[] = $state([]);

    let name: string = $state("");
    let error: boolean = $state(false);

    async function getAllPlayers() {
        const db_collection = collection(database, "spillere")
        const sb_snapshot = await getDocs(db_collection);

        players = sb_snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name
        }))
        .sort((a, b) => a.name.localeCompare(b.name, "nb"));
    }

    async function addPlayer() {
        if (name.trim() === ""){
            error = true;
            return;
        }

        const db_collection = collection(database, "spillere");

        await addDoc(db_collection, {
            name: name.trim()
        });

        name = "";
        error = false;

        await getAllPlayers()
    }

    async function deletePlayers() {        
        for (const playerId of selectedPlayers) {
            await deleteDoc(doc(database, "spillere", playerId));
        }

        selectedPlayers = [];
        await getAllPlayers();
    }

    onMount(async () => {
        await getAllPlayers();
    })

    function goBack() {
        const path = page.url.pathname.split("/").slice(0, -1).join("/") || "/";
        goto(path);
    }
</script>

<button class="Back" onclick={goBack}>&lt;</button>

<h1>Endre spillere</h1>

<hr>

<h2>Legg til spiller</h2>
<div class="AddPerson">
    <input type="text" bind:value={name}>
    <button onclick={addPlayer} disabled={name===""}>Legg til person</button>
</div>
{#if error}
    <strong>Bro?</strong>
{/if}

<hr>

<h2>Fjern spillere</h2>
<div class="PlayerList">
    {#each players as player}
        <label class="PlayerCheckbox">
            <input type="checkbox" value={player.id} bind:group={selectedPlayers}>
            <span>{player.name}</span>
        </label>
    {/each}
</div>

<button class="DeletePlayersButton" onclick={deletePlayers} disabled={selectedPlayers.length === 0}>
    Fjern valgte spillere
</button>

<hr>

<style>
    .Back {
        position: absolute;
        width: 44px;
        height: 44px;
        left: 5px;
        top: 5px;
        font-size: 20px;
    }

    h1, h2 {
        text-align: center;
    }

    button {
        height: 44px;
    }

    .AddPerson {
        display: flex;
        justify-content: center;
        gap: 10px;
        height: 44px;
    }

    strong {
        color: #FF4D4DD6;
        display: block;
        text-align: center;
        margin-top: 10px;
    }

    .PlayerList {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
    }

    .PlayerCheckbox {
        border: 1px solid #aaa;
        padding: 10px;
        min-height: 44px;
        box-sizing: border-box;
        cursor: pointer;
    }

    .PlayerCheckbox input {
        width: 18px;
        height: 18px;
    }

    .DeletePlayersButton {
        display: block;
        margin: 20px auto 0;
    }

    @media (max-width: 600px) {
        .PlayerList {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>