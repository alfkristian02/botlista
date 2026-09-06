<script lang="ts">
    import { page } from "$app/state";
    import { goto } from "$app/navigation";

    function goBack() {
        const path = page.url.pathname.split("/").slice(0, -1).join("/") || "/";
        goto(path);
    }
</script>

<section class="page">
    <button class="back" onclick={goBack} aria-label="Tilbake">
        ←
    </button>

    <header>
        <p class="eyebrow">Administrasjon</p>
        <h1>Prikkansvarlig</h1>
        <p class="description">
            Administrer spillere, bøter og meldte bøter.
        </p>
    </header>

    <nav class="admin-links">
        <a href={`${page.url.pathname}/EndreSpillere`}>
            <span class="icon">♟</span>

            <span class="link-content">
                <strong>Endre spillere</strong>
                <small>Legg til, fjern eller rediger spillere</small>
            </span>

            <span class="arrow">→</span>
        </a>

        <a href={`${page.url.pathname}/EndreBøter`}>
            <span class="icon">⚙</span>

            <span class="link-content">
                <strong>Endre bøter</strong>
                <small>Administrer tilgjengelige bøter</small>
            </span>

            <span class="arrow">→</span>
        </a>

        <a href={`${page.url.pathname}/EndreMeldteBøter`}>
            <span class="icon">☷</span>

            <span class="link-content">
                <strong>Endre meldte bøter</strong>
                <small>Se og rediger registrerte bøter</small>
            </span>

            <span class="arrow">→</span>
        </a>
    </nav>
</section>

<style>
    .page {
        position: relative;

        width: 100%;
        max-width: 600px;

        box-sizing: border-box;
        margin: 0 auto;
        padding: 24px 16px;
    }

    .back {
        width: 44px;
        height: 44px;

        display: flex;
        align-items: center;
        justify-content: center;

        margin-bottom: 32px;

        border: 1px solid #e5e5e5;
        border-radius: 12px;

        background: white;
        color: #414141;

        font-size: 22px;
        line-height: 1;

        cursor: pointer;
    }

    .back:active {
        transform: scale(0.95);
    }

    header {
        margin-bottom: 28px;
    }

    .eyebrow {
        margin: 0 0 4px;

        color: #006a3a;
        font-size: 13px;
        font-weight: 600;
    }

    h1 {
        margin: 0;

        color: #414141;
        font-size: 28px;
        font-weight: 700;
    }

    .description {
        margin: 6px 0 0;

        color: #777;
        font-size: 14px;
        line-height: 1.4;
    }

    .admin-links {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .admin-links a {
        display: flex;
        align-items: center;
        gap: 14px;

        min-height: 72px;
        box-sizing: border-box;
        padding: 12px 14px;

        border: 1px solid #e5e5e5;
        border-radius: 14px;

        background: white;

        color: #414141;
        text-decoration: none;

        transition:
            transform 0.15s ease,
            border-color 0.15s ease,
            box-shadow 0.15s ease;
    }

    .admin-links a:active {
        transform: scale(0.98);
    }

    .admin-links a:hover {
        border-color: #006a3a;
        box-shadow: 0 3px 12px rgba(0, 0, 0, 0.06);
    }

    .icon {
        width: 42px;
        height: 42px;

        flex-shrink: 0;

        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 10px;

        background: #f1f5f3;
        color: #006a3a;

        font-size: 20px;
    }

    .link-content {
        min-width: 0;

        display: flex;
        flex-direction: column;
        gap: 3px;

        flex: 1;
    }

    .link-content strong {
        font-size: 15px;
        font-weight: 600;
    }

    .link-content small {
        color: #888;
        font-size: 12px;
        line-height: 1.3;
    }

    .arrow {
        flex-shrink: 0;

        color: #999;
        font-size: 20px;
    }

    @media (min-width: 600px) {
        .page {
            padding-top: 40px;
        }

        .back {
            margin-bottom: 40px;
        }
    }
</style>