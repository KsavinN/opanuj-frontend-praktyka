import SearchFormGenderField from './SearchFormGenderField';
import SearchFormNameField from './SearchFormNameField';
import SearchFormSortOptionField from './SearchFormSortOptionField';

export type SearchFormProps = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  gender: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  sortOption: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
};

function SearchForm({
  name,
  setName,
  gender,
  setGender,
  sortOption,
  setSortOption,
}: SearchFormProps) {
  return (
    <form className="space-x-4 flex items-end justify-center">
      <SearchFormNameField name={name} setName={setName} />
      <SearchFormGenderField gender={gender} setGender={setGender} />
      <SearchFormSortOptionField
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
    </form>
  );
}

export default SearchForm;
