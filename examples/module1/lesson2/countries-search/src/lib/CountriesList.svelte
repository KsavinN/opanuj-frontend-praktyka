

<script>
  export let data = [];
  export let isLoading = false;

</script>

<main>
  {#if !isLoading}
    <ul>
      {#each data as item}
        <li>{item.name} - {item.flag}</li>
      {/each}
    </ul>
  {:else}
    <p>Loading...</p>
  {/if}
</main>
