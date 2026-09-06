<script lang="ts">
  import FineHistory from "$lib/components/FineHistory.svelte";
  import InputBox from "$lib/components/InputBox.svelte";
  import { database } from "$lib/utils/firestore";
</script>

<section class="page">
  <header class="heading">
    <h2>Legg inn ny bot <span class="plus">+</span></h2>
    <p>Registrer en ny bot og se de siste bøtene.</p>
  </header>

  <InputBox {database} />

  <section class="history">
    <div class="section-heading">
      <h3>Siste bøter</h3>
      <p>De nyeste registrerte bøtene.</p>
    </div>

    <FineHistory {database} />
  </section>

  <img src="/img/cover.png" alt="cool stuff" />
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

  .heading p,
  .section-heading p {
    margin: 4px 0 0;

    font-size: 14px;
    color: #777;
  }

  .plus {
    font-size: 35px;
    font-weight: 100;
    font-style: italic;
  }

  .history {
    margin-top: 40px;
  }

  .section-heading {
    margin-bottom: 16px;
  }

  h3 {
    margin: 0;

    font-size: 20px;
    font-weight: 700;
    color: #414141;
  }

  img {
    width: 70%;
    max-width: 400px;

    display: block;
    margin: 40px auto 20px;

    border-radius: 5px;
  }

  @media (max-width: 600px) {
    .page {
      box-sizing: border-box;
      padding: 0 16px;
    }

    .history {
      margin-top: 32px;
    }

    img {
      width: 80%;
    }
  }
</style>