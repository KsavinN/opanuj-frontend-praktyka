import { Character } from '../types/Character';

type useSortedCharactersProps = {
  characters: Character[];
  sortOption: string;
};

export const useSortedCharacters = ({
  characters,
  sortOption,
}: useSortedCharactersProps) => {
  return [...characters].sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'created') {
      return new Date(a.created).getTime() - new Date(b.created).getTime();
    }
    return 0;
  });
};
