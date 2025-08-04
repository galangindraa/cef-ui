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
};

const useAppVisibilitySkinMenu = create<AppVisibilityStateSkin>((set) => ({
	showApp: false,
	setVisibility: (boolean: boolean) => set({ showApp: boolean }),
	show: () => set({ showApp: true }),
	hide: () => set({ showApp: false }),
	toggle: () => set((state) => ({ showApp: !state.showApp })),
	gender: 'Male',
	setGender: (string: string) => set({ gender: string }),
}));

type AppVisibilityStateSkinMenu = {
	showApp: boolean;
	setVisibility: (boolean: boolean) => void;
	show: () => void;
	hide: () => void;
	toggle: () => void;
};

const useAppVisibilitySkinMenuList = create<AppVisibilityStateSkinMenu>((set) => ({
	showApp: false,
	setVisibility: (boolean: boolean) => set({ showApp: boolean }),
	show: () => set({ showApp: true }),
	hide: () => set({ showApp: false }),
	toggle: () => set((state) => ({ showApp: !state.showApp })),
}));

export { useAppVisibilitySkinMenu, useAppVisibilitySkinMenuList, useAppVisibilityStore };
