<script lang="ts">
    import { page } from "$app/state";
</script>

<nav class="bottom-nav">
    <a
        href="/toppliste"
        class:active={page.url.pathname === "/toppliste"}
        class="nav-item"
        aria-label="Topplise"
    >
        <span class="icon">🏆</span>
        <span>Toppliste</span>
    </a>

    <a
        href="/"
        class:active={page.url.pathname === "/"}
        class="nav-item primary"
        aria-label="Meld bot"
    >
        <span class="plus">+</span>
        <span>Meld bot</span>
    </a>

    <a
        href="/regler"
        class:active={page.url.pathname === "/regler"}
        class="nav-item"
        aria-label="Regler"
    >
        <span class="icon">📖</span>
        <span>Regler</span>
    </a>
</nav>

<style>
    .bottom-nav {
        position: fixed;
        z-index: 100;

        bottom: 0;
        left: 0;
        right: 0;

        height: 72px;

        display: flex;
        align-items: flex-end;
        justify-content: space-around;

        background: white;
        border-top: 1px solid #e5e5e5;
        box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.08);

        padding: 0 12px env(safe-area-inset-bottom);
    }

    .nav-item {
        flex: 1;

        height: 64px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;

        color: #777;
        text-decoration: none;

        font-size: 11px;
        font-weight: 500;

        -webkit-tap-highlight-color: transparent;
    }

    .nav-item.active {
        color: #006a3a;
        font-weight: 600;
    }

    .icon {
        font-size: 20px;
        line-height: 1;

        filter: grayscale(1);
        opacity: 0.65;
    }

    .active .icon {
        filter: none;
        opacity: 1;
    }

    .primary {
        height: 88px;

        justify-content: flex-end;
        padding-bottom: 7px;

        color: #006a3a;
        font-weight: 700;
    }

    .plus {
        width: 56px;
        height: 56px;

        display: flex;
        align-items: center;
        justify-content: center;

        margin-bottom: 4px;

        border-radius: 50%;

        background: #006a3a;
        color: white;

        font-size: 34px;
        font-weight: 300;
        line-height: 1;

        box-shadow: 0 4px 12px rgba(0, 106, 58, 0.3);

        transition: transform 0.15s ease;
    }

    .primary:active .plus {
        transform: scale(0.94);
    }

    @media (min-width: 600px) {
        .bottom-nav {
        left: 50%;
        right: auto;

        width: 420px;

        transform: translateX(-50%);

        border-radius: 18px 18px 0 0;
        }
    }
</style>