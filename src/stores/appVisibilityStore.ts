import { create } from "zustand";

type AppVisibilityState = {
	showApp: boolean;
	setVisibility: (boolean: boolean) => void;
	show: () => void;
	hide: () => void;
	toggle: () => void;
	// Additional properties can be added here if needed 
};

const useAppVisibilityStore = create<AppVisibilityState>((set) => ({
	showApp: false,
	setVisibility: (boolean: boolean) => set({ showApp: boolean }),
	show: () => set({ showApp: true }),
	hide: () => set({ showApp: false }),
	toggle: () => set((state) => ({ showApp: !state.showApp })),
}));


type AppVisibilityStateSkin = {
	showApp: boolean;
	setVisibility: (boolean: boolean) => void;
	show: () => void;
	hide: () => void;
	toggle: () => void;
	// Additional properties can be added here if needed 
	gender: string;
	setGender: (string: string) => void;

	withSkin: boolean;
	setWithSkin: (boolean: boolean) => void;
};

const useAppVisibilitySkinMenu = create<AppVisibilityStateSkin>((set) => ({
	showApp: false,
	setVisibility: (boolean: boolean) => set({ showApp: boolean }),
	show: () => set({ showApp: true }),
	hide: () => set({ showApp: false }),
	toggle: () => set((state) => ({ showApp: !state.showApp })),
	gender: 'Male',
	setGender: (string: string) => set({ gender: string }),
	withSkin: true,
	setWithSkin: (boolean: boolean) => set({ withSkin: boolean }),
}));

export { useAppVisibilitySkinMenu, useAppVisibilityStore };