"use client";

import { check_token } from "@/redux/slice/authSlice/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function TokenChecker() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(check_token());
  }, [dispatch]);

  return null; 
}

