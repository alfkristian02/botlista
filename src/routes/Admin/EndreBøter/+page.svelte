<script lang="ts">
    import { database } from "$lib/utils/firestore";
    import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore/lite";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/state";

    type Fine = {
        id: string;
        rule: string;
        fine: number;
        sort_order: number;
    };

    let fines: Fine[] = $state([]);

    let rule: string = $state("");
    let fine: number = $state(-1);
    let error: boolean = $state(false);

    async function getAllFines() {
        const db_collection = collection(database, "fine_rules");
        const sb_snapshot = await getDocs(db_collection);

        fines = sb_snapshot.docs.map((doc) => ({
            id: doc.id,
            rule: doc.data().rule,
            fine: doc.data().fine as number,
            sort_order: doc.data().sort_order as number
        }))
        .sort((a, b) => a.sort_order - b.sort_order);
    }

    async function addFine() {
        if (rule.trim() === "") {
            error = true;
            return;
        }

        const db_collection = collection(database, "fine_rules");

        await addDoc(db_collection, {
            rule: rule.trim(),
            fine: fine,
            sort_order: fines.length + 1
        });

        rule = "";
        fine = -1;
        error = false;

        await getAllFines();
    }

    async function deleteFine(id: string) {
        if (!confirm("Er du sikker på at du vil slette denne boten?")) {
            return;
        }

        await deleteDoc(doc(database, "fine_rules", id));
        await getAllFines();
    }

    async function updateFine(fine: Fine) {
        await updateDoc(doc(database, "fine_rules", fine.id), {
            rule: fine.rule.trim(),
            fine: fine.fine
        });

        alert("Boten ble lagret.");
        await getAllFines();
    }

    onMount(async () => {
        await getAllFines();
    });

    function goBack() {
        const path = page.url.pathname.split("/").slice(0, -1).join("/") || "/";
        goto(path);
    }
</script>

<button class="Back" onclick={goBack}>&lt;</button>

<h1>Endre bøter</h1>

<hr>

<h2>Legg til bøter</h2>

<div class="AddFine">
    <input
        type="text"
        bind:value={rule}
        placeholder="Regel"
    >

    <input
        type="number"
        bind:value={fine}
        placeholder="Bot"
    >

    <button onclick={addFine} disabled={rule.trim() === ""}>
        Legg til bot
    </button>
</div>

{#if error}
    <strong>Bro?</strong>
{/if}

<hr>

<div class="FineList">
    {#each fines as fine}
        <div class="Fine">
            <input type="text" bind:value={fine.rule}>
            <input type="number" bind:value={fine.fine}>

            <button onclick={() => updateFine(fine)}>
                Lagre
            </button>

            <button onclick={() => deleteFine(fine.id)}>
                Slett
            </button>
        </div>
    {/each}
</div>

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

    .AddFine {
        display: flex;
        justify-content: center;
        gap: 10px;
        height: 44px;
    }

    .FineList {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .Fine {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 80px auto auto;
        gap: 5px;
        height: 44px;
    }

    .Fine input {
        min-width: 0;
    }

    strong {
        color: #FF4D4DD6;
        display: block;
        text-align: center;
        margin-top: 10px;
    }
</style>