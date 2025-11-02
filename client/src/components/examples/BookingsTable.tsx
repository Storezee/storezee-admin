import BookingsTable from '../BookingsTable';
import type { Booking } from '@/lib/api';

export default function BookingsTableExample() {
  const mockBookings: Booking[] = [
    {
      id: 'b0c4d420-49b9-4c93-b07a-c87275d1118c',
      booking_id: 'BAG012',
      status: 'luggage_Stored',
      booking_type: 'Hourly',
      booking_created_time: '2025-10-17T19:00:25.771000Z',
      booking_end_time: '2025-10-18T03:30:25.771000Z',
      amount: 500,
      storage_unit: 'Downtown Storage Hub',
      luggage_image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=400',
      user_booked: {
        id: 'af46d334-226c-42c3-90b5-4b92fc79f62e',
        full_name: 'Piyush Kumar',
        email: 'pk2155584@gmail.com',
        phone: '8409705446',
        city_name: 'Patna',
        profile_picture: 'https://avatar.iran.liara.run/public/77.png',
        documents: [
          {
            id: 6,
            original_name: 'IMG_20251018_001635_717.jpg',
            imghippo_url: 'https://avatar.iran.liara.run/public/45.png',
          },
        ],
      },
    },
    {
      id: 'a1b2c3d4-e5f6-4g7h-8i9j-0k1l2m3n4o5p',
      booking_id: 'BAG013',
      status: 'pending',
      booking_type: 'Daily',
      booking_created_time: '2025-10-18T10:15:00.000000Z',
      booking_end_time: '2025-10-19T10:15:00.000000Z',
      amount: null,
      storage_unit: 'Airport Storage Center',
      luggage_image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=400',
      user_booked: {
        id: 'user-123',
        full_name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        phone: '9876543210',
        city_name: 'Delhi',
        profile_picture: 'https://avatar.iran.liara.run/public/42.png',
        documents: [],
      },
    },
  ];

  return (
    <div className="p-6 space-y-4">
      <h3 className="text-lg font-semibold">Bookings Table</h3>
      <BookingsTable
        bookings={mockBookings}
        isLoading={false}
        onStatusUpdate={(id, status) => console.log('Update status:', id, status)}
        onAmountUpdate={(id, amount) => console.log('Update amount:', id, amount)}
      />
    </div>
  );
}
