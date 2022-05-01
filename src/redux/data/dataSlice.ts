import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store'
import axios from 'axios'

let repo: CountryType[];

export const fetchData = createAsyncThunk(
  'data/fetchDataStatus',
  async () => {
    const response = await axios.get('https://restcountries.com/v2/all');

    repo = response.data.map((country: {
      name: string,
      nativeName: string,
      population: number,
      region: string,
      subregion: string,
      capital: string,
      topLevelDomain: string[],
      currencies: any[],
      languages: any[],
      flag: string,
      alpha3Code: string,
      borders: string[]
    }) => {
      return {
        name: country.name,
        nativeName: country.nativeName,
        population: country.population,
        region: country.region,
        subregion: country.subregion,
        capital: country.capital ? country.capital : "None",
        topLevelDomain: country.topLevelDomain,
        currencies: country.currencies ? country.currencies.map((c: any) => c.name) : ["None"],
        languages: country.languages.map((l: any) => l.name),
        flag: country.flag,
        alpha3Code: country.alpha3Code.toLowerCase(),
        borders: country.borders ? country.borders.map((b: string) => b.toLowerCase()) : [],
        borderNames: [] as BorderNameType[]
      }
    })
    return repo;
  }
)

/**
 * Types
 */

export type CountryType = {
  name: string,
  nativeName: string,
  population: number,
  region: string,
  subregion: string,
  capital: string,
  topLevelDomain: string[],
  currencies: string[],
  languages: string[],
  flag: string,
  alpha3Code: string,
  borders: string[],
  borderNames: BorderNameType[]
}

interface DataState {
  countries: CountryType[],
  filters: FilterType,
  status: DataStatusType,
}

export const regions: RegionType[] = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];
export type RegionType = "Africa" | "Americas" | "Asia" | "Europe" | "Oceania" | "All";
export type DataStatusType = "loading" | "ready" | "error";
export type FilterType = { region: RegionType, search: string }
export type BorderNameType = { alpha3Code: string, name: string }

/**
 * Actions
 */

interface CountryAction {
  type: string,
  payload: CountryType[]
}

interface FilterAction {
  type: string,
  payload: FilterType
}

/**
 * Functions
 */

function getBorderNames(country: CountryType) {
  let borderNames: BorderNameType[] = [];

  let i;
  for (i = 0; i < repo.length; i++) {
    if (country.borders.includes(repo[i].alpha3Code)) {
      borderNames.push({
        alpha3Code: repo[i].alpha3Code,
        name: repo[i].name
      })
    }

    if (borderNames.length === country.borders.length)
      break;
  }

  return borderNames;
}

export function getCountryData(alpha3Code: string) {
  const country = repo.find(c => c.alpha3Code === alpha3Code)

  if (country === undefined) {
    return undefined
  }

  const borderNames = getBorderNames(country)
  return { ...country, borderNames: borderNames }
}

function getFilteredCountries(filters: FilterType) {

  //Case: No filters
  if (filters.search === '' && filters.region === 'All') {
    return repo;
  }

  //Case: With filters
  let countries = repo.filter(country => {
    if (filters.search !== '' && !country.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false
    }

    if (filters.region !== 'All' && filters.region !== country.region) {
      return false
    }

    return true
  })

  return countries;
}

/**
 * Slice
 */

export const dataSlice = createSlice({
  name: 'data',

  initialState: {
    countries: [],
    filters: {
      search: '',
      region: 'All'
    },
    status: 'loading',
  } as DataState,

  reducers: {
    setCountries: (state, action: CountryAction) => {
      return {
        ...state,
        countries: action.payload
      }
    },
    setFilters: (state, action: FilterAction) => {
      return { ...state, countries: getFilteredCountries(action.payload), filters: action.payload }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      return { ...state, countries: action.payload, status: 'ready' }
    })
    builder.addCase(fetchData.pending, (state) => {
      return { ...state, status: 'loading' }
    })
    builder.addCase(fetchData.rejected, (state) => {
      return { ...state, status: 'error' }
    })
  }
}
);

export const { setFilters } = dataSlice.actions;
export const selectData = (state: RootState) => state.data;
export default dataSlice.reducer;
