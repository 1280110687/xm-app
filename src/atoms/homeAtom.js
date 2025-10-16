import { getDefaultStore, atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';


export const NotesAtom = atomWithStorage(
    'NOTES',
    [],
    createJSONStorage(() => localStorage)
);

