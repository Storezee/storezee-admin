import { useState, useEffect } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import BookingsTable from '@/components/BookingsTable';
import { bookingApi, handleApiError, handleApiSuccess, type Booking } from '@/lib/api';
import { auth } from '@/lib/auth';

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchBookings = async (booking_id?: string) => {
    setIsLoading(true);
    try {
      const response = await bookingApi.getAllBookings(booking_id);
      setBookings(response.data);
    } catch (error) {
      handleApiError(error);
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      fetchBookings(query.trim());
    } else {
      fetchBookings();
    }
  };

  const handleStatusUpdate = async (bookingId: string, newStatus: string) => {
    const saathiId = auth.getSaathiId();
    if (!saathiId) {
      handleApiError({ message: 'Session expired. Please login again.' });
      return;
    }

    try {
      const response = await bookingApi.updateStatus(bookingId, newStatus, saathiId);
      handleApiSuccess(response.message);
      setBookings(prev =>
        prev.map(booking =>
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );
      await fetchBookings(searchQuery || undefined);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleAmountUpdate = async (bookingId: string, newAmount: string) => {
    const saathiId = auth.getSaathiId();
    if (!saathiId) {
      handleApiError({ message: 'Session expired. Please login again.' });
      return;
    }

    try {
      const response = await bookingApi.updateAmount(bookingId, newAmount, saathiId);
      handleApiSuccess(response.message);
      setBookings(prev =>
        prev.map(booking =>
          booking.id === bookingId ? { ...booking, amount: parseFloat(newAmount) } : booking
        )
      );
      await fetchBookings(searchQuery || undefined);
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader onSearch={handleSearch} />
      
      <main className="container mx-auto px-4 md:px-6 py-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold">Booking Management</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Manage and track all luggage storage bookings
            </p>
          </div>

          <BookingsTable
            bookings={bookings}
            isLoading={isLoading}
            onStatusUpdate={handleStatusUpdate}
            onAmountUpdate={handleAmountUpdate}
          />
        </div>
      </main>
    </div>
  );
}
