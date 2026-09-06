<script lang="ts">
  import { onMount } from "svelte";
  import { collection, getDocs } from "firebase/firestore/lite";

  let { database } = $props();

  let history: {
    date: Date;
    name: string;
    explanation: string;
  }[] = $state([]);

  let currentPage: number = $state(1);
  const itemsPerPage: number = 5;

  const totalPages = $derived(
    Math.max(1, Math.ceil(history.length / itemsPerPage))
  );

  const pagedHistory = $derived(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;

    return history.slice(start, end);
  });

  function prevPage() {
    if (currentPage > 1) {
      currentPage--;
    }
  }

  function nextPage() {
    if (currentPage < totalPages) {
      currentPage++;
    }
  }

  async function getFines() {
    const db_collection = collection(database, "prikk_melding");
    const db_snapshot = await getDocs(db_collection);

    const fine_list: {
      date: Date;
      name: string;
      explanation: string;
    }[] = db_snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        date: data.date?.toDate
          ? data.date.toDate()
          : data.date
            ? new Date(data.date)
            : null,
        name: data.name ?? "",
        explanation: data.explanation ?? data.forklaring ?? ""
      };
    });

    fine_list.sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;

      return b.date.getTime() - a.date.getTime();
    });

    return fine_list;
  }

  function formatDate(date?: Date | null): string {
    if (!date || isNaN(date.getTime())) {
      return "Dato utilgjengelig";
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  onMount(async () => {
    history = await getFines();
  });
</script>

{#if pagedHistory().length > 0}
  <ul class="history-list">
    {#each pagedHistory() as entry}
      <li class="history-item">
        <div class="item-header">
          <strong class="name">{entry.name}</strong>
          <span class="date">{formatDate(entry.date)}</span>
        </div>

        {#if entry.explanation}
          <p class="explanation">{entry.explanation}</p>
        {/if}
      </li>
    {/each}
  </ul>
{:else}
  <p class="empty">Ingen bøter registrert ennå.</p>
{/if}

{#if history.length > itemsPerPage}
  <div class="pagination">
    <button
      class="page-button"
      onclick={prevPage}
      disabled={currentPage === 1}
      aria-label="Forrige side"
    >
      ←
    </button>

    <span class="page-number">
      {currentPage} / {totalPages}
    </span>

    <button
      class="page-button"
      onclick={nextPage}
      disabled={currentPage === totalPages}
      aria-label="Neste side"
    >
      →
    </button>
  </div>
{/if}

<style>
  .history-list {
    display: flex;
    flex-direction: column;
    gap: 10px;

    padding: 0;
    margin: 0;

    list-style: none;
  }

  .history-item {
    padding: 14px 16px;

    border: 1px solid #e5e5e5;
    border-radius: 12px;

    background: white;
  }

  .item-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
  }

  .name {
    min-width: 0;

    color: #414141;
    font-size: 15px;

    overflow-wrap: anywhere;
  }

  .date {
    flex-shrink: 0;

    color: #888;
    font-size: 12px;
  }

  .explanation {
    margin: 5px 0 0;

    color: #666;
    font-size: 14px;
    line-height: 1.4;

    overflow-wrap: anywhere;
  }

  .empty {
    margin: 24px 0;

    text-align: center;
    color: #777;
    font-size: 14px;
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;

    margin-top: 18px;
  }

  .page-button {
    width: 42px;
    height: 42px;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid #ddd;
    border-radius: 10px;

    background: white;
    color: #414141;

    font-size: 20px;

    cursor: pointer;
  }

  .page-button:disabled {
    opacity: 0.35;
    cursor: default;
  }

  .page-number {
    min-width: 45px;

    text-align: center;

    color: #666;
    font-size: 14px;
  }

  @media (max-width: 400px) {
    .history-item {
      padding: 12px;
    }

    .item-header {
      align-items: flex-start;
      flex-direction: column;
      gap: 2px;
    }

    .date {
      font-size: 11px;
    }
  }
</style>