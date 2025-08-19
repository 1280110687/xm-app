import { getDefaultStore, atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';



export const homeMarketTabsAtom = atom([]);


// export const drawnNumbersAtom = atomWithStorage('bingo_drawn_numbers', []);
export const drawnNumbersAtom = atomWithStorage(
    'bingo_drawn_numbers',
    [],
    createJSONStorage(() => localStorage)
);
export const drawnConfigAtom = atomWithStorage(
    'bingo_drawn_config',
    {
        auto: false,
        second: 0
    },
    createJSONStorage(() => localStorage)
);
