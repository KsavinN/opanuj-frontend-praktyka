<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  let input: string = '';

  const dispatch = createEventDispatcher();

  $: {
    dispatch('input', input);
  }
</script>

<input bind:value={input} placeholder="Put name of country" />
