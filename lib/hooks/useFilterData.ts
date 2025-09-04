import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import {
  fetchManufacturers,
  fetchModels,
} from "@/lib/features/filterDataSlice";

export const useFilterData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filterData = useSelector((state: RootState) => state.filterData);
  const filter = useSelector((state: RootState) => state.filter);

  // Initialize filter data on mount
  useEffect(() => {
    // Fetch manufacturers if not already loaded
    if (
      filterData.manufacturers.length === 0 &&
      !filterData.loading.manufacturers
    ) {
      dispatch(fetchManufacturers());
    }

    // Fetch initial models (all models) if not already loaded
    if (filterData.models.length === 0 && !filterData.loading.models) {
      dispatch(fetchModels([]));
    }
  }, [
    dispatch,
    filterData.manufacturers.length,
    filterData.models.length,
    filterData.loading,
  ]);

  // Fetch models when manufacturer selection changes
  useEffect(() => {
    // Always fetch models based on current manufacturer selection
    // If no manufacturers selected, fetch all models
    dispatch(fetchModels(filter.manufacturer_id));
  }, [dispatch, filter.manufacturer_id]);

  return {
    manufacturers: filterData.manufacturers,
    models: filterData.models,
    loading: filterData.loading,
    error: filterData.error,
  };
};
