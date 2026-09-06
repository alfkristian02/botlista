<script lang="ts">
    import { page } from "$app/state";
    import { goto } from "$app/navigation";

    function goBack() {
        const path = page.url.pathname.split("/").slice(0, -1).join("/") || "/";
        goto(path);
    }
</script>

<button class="Back" onclick={goBack}>&lt;</button>

<h1>Admin (Prikkansvarlig)</h1>

<div>
    <a href={`${page.url.pathname}/EndreSpillere`}>Endre spillere</a>
    <a href={`${page.url.pathname}/EndreBøter`}>Endre bøter</a>
    <a href={`${page.url.pathname}/EndreMeldteBøter`}>Endre meldte bøter</a>
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

    a {
        text-align: center;
        font-size: 20px;
    }

    div {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
</style>