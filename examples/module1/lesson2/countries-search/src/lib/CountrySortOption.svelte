<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { SelectedSortOption } from '../types';
  const dispatch = createEventDispatcher();

  let selectedSortOption: SelectedSortOption = 'alpha-asc';

  $: {
    dispatch('selectedSortOption', selectedSortOption);
  }
</script>

<select bind:value={selectedSortOption}>
  <option value="alpha-asc">Name (A-Z)</option>
  <option value="alpha-desc">Name (Z-A)</option>
  <option value="population-asc">Population (Low to High)</option>
  <option value="population-desc">Population (High to Low)</option>
</select>
