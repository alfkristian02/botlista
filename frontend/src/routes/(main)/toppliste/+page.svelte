<script lang="ts">
    import Leaderboard from "$lib/components/Leaderboard.svelte";
    import { database } from "$lib/utils/firestore";
</script>

<section class="page">
    <div class="heading">
        <h2>Leaderboard</h2>
        <p>Hvem har fått flest bøter?</p>
    </div>

    <Leaderboard {database} />
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

    p {
        margin: 4px 0 0;

        font-size: 14px;
        color: #777;
    }
</style>