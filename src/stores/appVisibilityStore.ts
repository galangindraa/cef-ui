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

type AppVisibilityStateDeath = {
	showApp: boolean;
	setVisibility: (boolean: boolean) => void;
	show: () => void;
	hide: () => void;
	toggle: () => void;
	health: number;
	setHealth: (number: number) => void;
	hunger: number;
	setHunger: (number: number) => void;
	thirst: number;
	setThirst: (number: number) => void;	
	mental: number;
	setMental: (number: number) => void;
	armor: number;
	setArmor: (number: number) => void;	
};

const useAppVisibilityHud = create<AppVisibilityStateDeath>((set) => ({
	showApp: false,
	setVisibility: (boolean: boolean) => set({ showApp: boolean }),
	show: () => set({ showApp: true }),
	hide: () => set({ showApp: false }),
	toggle: () => set((state) => ({ showApp: !state.showApp })),

	health: 100,
	setHealth: (number: number) => set({ health: number }),
	hunger: 100,
	setHunger: (number: number) => set({ hunger: number }),
	thirst: 100,
	setThirst: (number: number) => set({ thirst: number }),
	mental: 100,
	setMental: (number: number) => set({ mental: number }),
	armor: 100,
	setArmor: (number: number) => set({ armor: number }),
}));

type AppVisibilityStateSpeedometer = {
	showApp: boolean;
	setVisibility: (boolean: boolean) => void;
	show: () => void;
	hide: () => void;
	toggle: () => void;
};

const useAppVisibilitySpeedometer = create<AppVisibilityStateSpeedometer>((set) => ({	
	showApp: false,
	setVisibility: (boolean: boolean) => set({ showApp: boolean }),
	show: () => set({ showApp: true }),
	hide: () => set({ showApp: false }),
	toggle: () => set((state) => ({ showApp: !state.showApp })),
}));

type AppVisibilityStateInventory = {
	showApp: boolean;
	setVisibility: (boolean: boolean) => void;
	show: () => void;
	hide: () => void;
	toggle: () => void;
	showOtherComponents: () => void;
	hideOtherComponents: () => void;
};	

const useAppVisibilityInventory = create<AppVisibilityStateInventory>((set, get) => ({
	showApp: false,
	setVisibility: (boolean: boolean) => set({ showApp: boolean }),
	show: () => set({ showApp: true }),
	hide: () => set({ showApp: false }),
	toggle: () => set((state) => ({ showApp: !state.showApp })),
	showOtherComponents: () => {
		useAppVisibilityStore.getState().show();
		useAppVisibilitySkinMenu.getState().show();
		useAppVisibilitySkinMenuList.getState().show();
		useAppVisibilityHud.getState().show();
		useAppVisibilitySpeedometer.getState().show();
	},
	hideOtherComponents: () => {
		useAppVisibilityStore.getState().hide();
		useAppVisibilitySkinMenu.getState().hide();
		useAppVisibilitySkinMenuList.getState().hide();
		useAppVisibilityHud.getState().hide();
		useAppVisibilitySpeedometer.getState().hide();
	},
}));

export { useAppVisibilitySkinMenu, useAppVisibilitySkinMenuList, useAppVisibilityStore, useAppVisibilityHud, useAppVisibilitySpeedometer, useAppVisibilityInventory };
	