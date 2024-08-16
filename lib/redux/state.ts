import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateTypes {
  isDesktopSidebarCollapsed: boolean;
  isDarkMode: boolean;
}

const initialState: InitialStateTypes = {
  isDesktopSidebarCollapsed: false,
  isDarkMode: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleSidebarCollapsed: (state) => {
      state.isDesktopSidebarCollapsed = !state.isDesktopSidebarCollapsed;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { toggleSidebarCollapsed, setIsDarkMode } = globalSlice.actions;

export default globalSlice.reducer;
