import {
  getFollowedOpportunities,
  getOpportunities,
  toggleFollow,
} from "@/api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { filterOpportunities } from "@/lib/utils";

import type { OpportunitiesState } from "@/types";

const initialState: OpportunitiesState = {
  list: [],
  filteredList: [],
  followedList: [],
  filteredFollowedList: [],
  filters: {
    startDate: null,
    endDate: null,
    type: null,
  },
  loading: false,
  error: null,
};

const opportunitiesSlice = createSlice({
  name: "opportunities",
  initialState,
  reducers: {
    setFilters: (
      state,
      action: PayloadAction<Partial<OpportunitiesState["filters"]>>
    ) => {
      // Update partial filters (only the needed)
      state.filters = { ...state.filters, ...action.payload };

      // Filter the list based on the filters (update the filteredList)
      state.filteredList = filterOpportunities(state.list, state.filters);
      // Filter the followed list based on the filters (update the filteredFollowedList)
      state.filteredFollowedList = filterOpportunities(
        state.followedList,
        state.filters
      );
    },
    clearFilters: (state) => {
      // Clear the filters
      state.filters = initialState.filters;

      // Filter the list based on the filters (update the filteredList)
      state.filteredList = state.list;
      state.filteredFollowedList = state.followedList;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOpportunities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOpportunities.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.filteredList = filterOpportunities(action.payload, state.filters);
      })
      .addCase(getOpportunities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch";
      })
      .addCase(getFollowedOpportunities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFollowedOpportunities.fulfilled, (state, action) => {
        state.loading = false;
        state.followedList = action.payload;
        state.filteredFollowedList = filterOpportunities(
          action.payload,
          state.filters
        );
      })
      .addCase(getFollowedOpportunities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch";
      })
      .addCase(toggleFollow.fulfilled, (state, action) => {
        const updatedOpp = action.payload;
        // Update the list
        const index = state.list.findIndex((opp) => opp.id === updatedOpp.id);
        if (index !== -1) {
          state.list[index] = updatedOpp;
        }
        // Update the filtered list
        const filteredIndex = state.filteredList.findIndex(
          (opp) => opp.id === updatedOpp.id
        );
        if (filteredIndex !== -1) {
          state.filteredList[filteredIndex] = updatedOpp;
        }
        // Update the followed list
        if (updatedOpp.is_followed) {
          if (!state.followedList.some((opp) => opp.id === updatedOpp.id)) {
            state.followedList.push(updatedOpp);
          }
        } else {
          state.followedList = state.followedList.filter(
            (opp) => opp.id !== updatedOpp.id
          );
        }
        // Update the filtered followed list
        state.filteredFollowedList = filterOpportunities(
          state.followedList,
          state.filters
        );
      });
  },
});

export const { setFilters, clearFilters } = opportunitiesSlice.actions;
export default opportunitiesSlice.reducer;
