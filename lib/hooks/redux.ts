import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useUser = () => {
  const userData = useAppSelector((state) => state.user.userData);
  const isUserLoggedin = useAppSelector((state) => state.user.isUserLoggedin);
  return { userData, isUserLoggedin };
};
