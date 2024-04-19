<script lang="ts">
  import CountriesList from './lib/CountriesList.svelte';
  import CountryInputField from './lib/CountryInputField.svelte';
  import CountrySortOption from './lib/CountrySortOption.svelte';
  import CountrySwitchFilter from './lib/CountrySwitchFilter.svelte';
  import { SelectedFilter, SelectedSortOption } from './types';

  type CountryItem = { name: string; flag: string; population: number };

  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let selectedSortOption: SelectedSortOption = 'alpha-asc';
  let selectedFilter: SelectedFilter = 'name';
  let input = '';
  let data: CountryItem[] = [];
  let isLoading = false;
  let error = '';

  function debounceSearch() {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fetchData();
    }, 500); // Delay in ms
  }

  async function fetchData() {
    error = '';
    if (!input) {
      data = [];
      return;
    }

    isLoading = true;
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/${selectedFilter}/${input}`,
      );
      const responseData = await response.json();
      if (responseData.status === 404) {
        data = [];
        error = 'Country not found';
      } else {
        data = responseData.map((item: any) => ({
          name: item.name.common,
          flag: item.flag,
          population: item.population,
        }));
      }
    } catch (error) {
      data = [];
      error = 'Error fetching data';
    } finally {
      isLoading = false;
      sortCountryList();
    }
  }

  const sortCountryList = () => {
    data = data.sort((a, b) => {
      switch (selectedSortOption) {
        case 'alpha-asc':
          return a.name.localeCompare(b.name);
        case 'alpha-desc':
          return b.name.localeCompare(a.name);
        case 'population-asc':
          return a.population - b.population;
        case 'population-desc':
          return b.population - a.population;
        default:
          return 0;
      }
    });
  };

  const handleChangeFilter = async (event: CustomEvent<SelectedFilter>) => {
    selectedFilter = event.detail;
    await fetchData();
  };

  const handleChangeInput = async (event: CustomEvent<string>) => {
    input = event.detail;
    console.log(input);
    await debounceSearch();
  };

  const handleChangeSortOption = async (
    event: CustomEvent<SelectedSortOption>,
  ) => {
    selectedSortOption = event.detail;
    sortCountryList();
  };
</script>

<main>
  <h1>Countries Searcher</h1>

  <div class="card">
    <CountrySortOption on:selectedSortOption={handleChangeSortOption} />
    <CountrySwitchFilter on:selectedFilter={handleChangeFilter} />
    <CountryInputField on:input={handleChangeInput} />
    <CountriesList {data} {isLoading} />
    {#if error}
      <p>{error}</p>
    {/if}
  </div>
</main>
