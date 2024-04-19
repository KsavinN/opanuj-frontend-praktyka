<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { SelectedFilter } from '../types';
  const dispatch = createEventDispatcher();

  let selectedFilter: SelectedFilter = 'name';

  $: {
    dispatch('selectedFilter', selectedFilter);
  }
</script>

<select bind:value={selectedFilter}>
  <option value="name">Name</option>
  <option value="capital">Capital</option>
  <option value="currency">Currency</option>
  <option value="lang">Language</option>
</select>
