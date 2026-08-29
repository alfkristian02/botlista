<script lang="ts">
    import { database } from "$lib/utils/firestore";
    import { collection, getDocs, deleteDoc, updateDoc, doc, Timestamp } from "firebase/firestore/lite";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/state";

    type RegisteredFine = {
        id: string;
        date: Timestamp;
        name: string;
        explanation: string;
    };

    let registeredFines: RegisteredFine[] = $state([]);

    async function getAllRegisteredFines() {
        const db_collection = collection(database, "prikk_melding");
        const sb_snapshot = await getDocs(db_collection);

        registeredFines = sb_snapshot.docs.map((doc) => ({
            id: doc.id,
            date: doc.data().date ?? new Timestamp(0, 0),
            name: doc.data().name ?? "",
            explanation: doc.data().explanation ?? ""
        })).sort((a, b) => b.date.toMillis() - a.date.toMillis());
    }

    async function deleteRegisteredFine(id: string) {
        if (!confirm("Er du sikker på at du vil slette denne meldte boten?")) {
            return;
        }

        await deleteDoc(doc(database, "prikk_melding", id));
        alert("Boten ble slettet.");
        await getAllRegisteredFines();
    }

    async function updateRegisteredFine(fine: RegisteredFine) {
        await updateDoc(doc(database, "prikk_melding", fine.id), {
            date: fine.date,
            name: fine.name.trim(),
            explanation: fine.explanation.trim()
        });

        alert("Boten ble lagret.");
        await getAllRegisteredFines();
    }

    onMount(async () => {
        await getAllRegisteredFines();
    });

    function goBack() {
        const path = page.url.pathname.split("/").slice(0, -1).join("/") || "/";
        goto(path);
    }

    async function deleteAllRegisteredFines() {
    if (!confirm("Er du sikker på at du vil slette alle meldte bøter?")) {
        return;
    }

    if (!confirm("Er du HELT sikker sikker? Dette kan ikke angres.")) {
        return;
    }

    for (const fine of registeredFines) {
        await deleteDoc(doc(database, "prikk_melding", fine.id));
    }

    alert("Alle meldte bøter ble slettet.");
    await getAllRegisteredFines();
}
</script>

<button class="Back" onclick={goBack}>&lt;</button>

<h1>Endre meldte bøter</h1>

<hr>

<div class="FineList">

<div class="Fine Header">
    <span>Dato</span>
    <span>Navn</span>
    <span>Forklaring</span>
    <button onclick={deleteAllRegisteredFines}>
        Slett alle
    </button>
</div>

    {#each registeredFines as fine}
        <div class="Fine">
            <input class="FineDateField" type="text" value={fine.date.toDate().toLocaleDateString("nb-NO")} readonly>
            <input type="text" bind:value={fine.name}>
            <input type="text" bind:value={fine.explanation}>

            <button onclick={() => updateRegisteredFine(fine)}>
                Lagre
            </button>

            <button onclick={() => deleteRegisteredFine(fine.id)}>
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

h1 {
    text-align: center;
}

.FineList {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.Fine {
    display: grid;
    grid-template-columns: 90px 90px 1fr auto auto;
    gap: 5px;
    height: 44px;
}

.Fine input {
    min-width: 0;
}

.Fine button,
.Header button {
    height: 44px;
}

.Header {
    height: auto;
    font-weight: bold;
}

.FineDateField {
    text-align: center;
}
</style>