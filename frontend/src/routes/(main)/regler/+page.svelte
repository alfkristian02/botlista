<script lang="ts">
    import { database } from "$lib/utils/firestore";
    import { onMount } from "svelte";
    import {
        type Firestore,
        collection,
        getDocs,
        query,
        orderBy
    } from "firebase/firestore/lite";

    type Rule = {
        description: string;
        fine: number;
    };

    let regler: Array<Rule> = $state([]);
    let loading = $state(true);

    async function getRules(db: Firestore) {
        const reglerCol = collection(db, "fine_rules");
        const reglerQuery = query(reglerCol, orderBy("sort_order", "asc"));
        const reglerSnapshot = await getDocs(reglerQuery);

        return reglerSnapshot.docs.map((doc) => {
            const data = doc.data();

            return {
                description: data.rule,
                fine: data.fine,
            };
            });
        }

        onMount(async () => {
            try {
            regler = await getRules(database);
            } finally {
            loading = false;
            }
    });
</script>

<section class="page">
    <header class="heading">
        <h2>Regler</h2>
        <p>Oversikt over bøter og regler.</p>
    </header>

    {#if loading}
        <p class="status">Laster regler...</p>
    {:else if regler.length === 0}
        <p class="status">Ingen regler funnet.</p>
    {:else}
        <div class="rules">
        {#each regler as regel, i}
            <article class="rule">
            <div class="rule-number">
                {i + 1}
            </div>

            <div class="rule-content">
                <p class="description">{regel.description}</p>
                <p class="fine">{regel.fine} kr</p>
            </div>
            </article>
        {/each}
        </div>
    {/if}
</section>

<style>
    .page {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
    }

    .heading {
        margin-bottom: 24px;
    }

    h2 {
        margin: 0;

        font-size: 26px;
        font-weight: 700;
        color: #414141;
    }

    .heading p {
        margin: 4px 0 0;

        font-size: 14px;
        color: #777;
    }

    .rules {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .rule {
        display: flex;
        align-items: center;
        gap: 14px;

        padding: 14px 16px;

        border: 1px solid #e5e5e5;
        border-radius: 12px;

        background: white;
    }

    .rule-number {
        flex: 0 0 32px;

        display: flex;
        align-items: center;
        justify-content: center;

        width: 32px;
        height: 32px;

        border-radius: 50%;

        background: #f1f1f1;
        color: #666;

        font-size: 13px;
        font-weight: 600;
    }

    .rule-content {
        min-width: 0;

        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;

        flex: 1;
    }

    .description {
        margin: 0;

        font-size: 15px;
        line-height: 1.4;
        color: #414141;
    }

    .fine {
        flex-shrink: 0;

        margin: 0;

        color: #006a3a;
        font-size: 15px;
        font-weight: 700;
    }

    .status {
        margin-top: 32px;

        text-align: center;
        color: #777;
        font-size: 14px;
    }

    @media (max-width: 400px) {
        .rule {
        padding: 12px;
        }

        .rule-content {
        align-items: flex-start;
        flex-direction: column;
        gap: 4px;
        }

        .fine {
        font-size: 14px;
        }
    }
</style>