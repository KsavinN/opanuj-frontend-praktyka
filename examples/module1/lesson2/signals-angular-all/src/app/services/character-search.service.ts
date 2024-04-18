import { HttpClient } from '@angular/common/http';
import { computed, Injectable, Signal, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  BehaviorSubject,
  Observable,
  catchError,
  combineLatest,
  map,
  of,
  switchMap,
} from 'rxjs';
import { Character } from '../types/Character';

@Injectable({
  providedIn: 'root',
})
export class CharacterSearchService {
  private charactersSource: Signal<Character[]> = signal([]);
  charactersSignal: Signal<Character[]> = signal([]);
  nameSignal = signal('');
  genderSignal = signal('');
  sortOptionSignal = signal('');
  private apiBaseUrl = 'https://rickandmortyapi.com/api/character/';

  getCharacters(name: string, gender: string) {
    if (name === '' && gender === '') {
      return of([]);
    }
    return this.http
      .get<{ results: Character[] }>(
        `${this.apiBaseUrl}?name=${name}&gender=${gender}`
      )
      .pipe(
        catchError((error) => {
          console.error('Error fetching characters', error);
          return of({ results: [] });
        }),
        map((response) => {
          console.log('response', response);
          return response.results || [];
        })
      );
  }

  constructor(private http: HttpClient) {
    this.charactersSource = toSignal(
      combineLatest([
        toObservable(this.nameSignal),
        toObservable(this.genderSignal),
      ]).pipe(
        switchMap(([name, gender]) => {
          return this.getCharacters(name, gender);
        })
      ),
      { initialValue: [] }
    );
    this.charactersSignal = computed(() => {
      const newCharacters = this.charactersSource();
      const sortOption = this.sortOptionSignal();
      return this.sortCharacters(newCharacters, sortOption);
    });
  }

  setSortOption(sortOption: string) {
    this.sortOptionSignal.set(sortOption);
  }

  setGender(gender: string) {
    this.genderSignal.set(gender);
  }

  setName(name: string) {
    this.nameSignal.set(name);
  }

  get sortOption(): string {
    return this.sortOptionSignal();
  }

  get name(): string {
    return this.nameSignal();
  }

  get gender(): string {
    return this.genderSignal();
  }

  get characters(): Character[] {
    return this.charactersSignal();
  }

  sortCharacters(characters: Character[], sortOption: string): Character[] {
    return [...characters].sort((a, b) => {
      if (sortOption === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'created') {
        return new Date(a.created).getTime() - new Date(b.created).getTime();
      }
      return 0;
    });
  }
}
