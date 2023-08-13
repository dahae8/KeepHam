import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface StoreState {
    id: number;
  category: string;
  store_id: number;
  name: string;
  address: string;
  estimated_delivery_time: string;
  min_order_amount: string;
  delivery_fee_to_display: string;
  logo_url: string;
  thumbnail_url: string;
  lat: number;
  lng: number;
}