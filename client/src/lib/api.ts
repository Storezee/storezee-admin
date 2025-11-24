import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = 'https://api-dev.thestorezee.com/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const handleApiError = (error: any) => {
  const message = error.response?.data?.message || error.message || 'Something went wrong';
  toast.error(message);
  console.error('API Error:', error);
};

export const handleApiSuccess = (message: string) => {
  toast.success(message);
};

export interface SaathiData {
  saathi_id: string;
  full_name: string;
  phone: string;
  email: string;
  is_verified: boolean;
  profile_verified: boolean;
  document_verified: boolean;
}

export interface LoginResponse {
  message: string;
  data: SaathiData;
  is_register: boolean;
}

export interface OTPVerifyResponse {
  success: string;
  message: string;
  data: SaathiData;
}

export interface Document {
  id: number;
  original_name: string;
  imghippo_url: string;
}

export interface UserBooked {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  city_name: string;
  profile_picture: string;
  documents: Document[];
}

export interface Booking {
  id: string;
  booking_id: string;
  status: string;
  updated_by: string;
  booking_type: string;
  booking_created_time: string;
  booking_end_time: string;
  amount: number | null;
  amount_updated_by: string;
  storage_unit: string;
  luggage_image: string;
  user_booked: UserBooked;
  payment_status: string;
}

export interface BookingsResponse {
  success: boolean;
  message: string;
  data: Booking[];
}

export interface StatusUpdateResponse {
  success: boolean;
  message: string;
}

export interface AmountUpdateResponse {
  success: boolean;
  message: string;
}

export const authApi = {
  login: async (phone: string): Promise<LoginResponse> => {
    const response = await api.post('/saathi/saathi_login', { phone });
    return response.data;
  },
  
  verifyOTP: async (saathi_id: string, otp: string): Promise<OTPVerifyResponse> => {
    const response = await api.post('/saathi/verify_saathi_otp', { saathi_id, otp });
    return response.data;
  },
};

export const bookingApi = {
  getAllBookings: async (booking_id?: string): Promise<BookingsResponse> => {
    const params = booking_id ? { booking_id } : {};
    const response = await api.get('/stroage_booking/get_all_bookings', { params });
    return response.data;
  },
  
  updateStatus: async (storage_id: string, status: string, updatedby: string): Promise<StatusUpdateResponse> => {
    const response = await api.patch('/stroage_booking/change_status', {
      storage_id,
      status,
      updatedby,
    });
    return response.data;
  },
  
  updateAmount: async (storage_id: string, amount: string, updatedby: string): Promise<AmountUpdateResponse> => {
    const response = await api.patch('/stroage_booking/change_amount', {
      storage_id,
      amount,
      updatedby,
    });
    return response.data;
  },
};
