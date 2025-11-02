import { useState } from 'react';
import UserDetailsModal from '../UserDetailsModal';
import { Button } from '@/components/ui/button';
import type { UserBooked } from '@/lib/api';

export default function UserDetailsModalExample() {
  const [open, setOpen] = useState(false);

  const mockUser: UserBooked = {
    id: 'af46d334-226c-42c3-90b5-4b92fc79f62e',
    full_name: 'Piyush Kumar',
    email: 'pk2155584@gmail.com',
    phone: '8409705446',
    city_name: 'Patna',
    profile_picture: 'https://avatar.iran.liara.run/public/77.png',
    documents: [
      {
        id: 1,
        original_name: 'Aadhar_Card_Front.jpg',
        imghippo_url: 'https://avatar.iran.liara.run/public/45.png',
      },
      {
        id: 2,
        original_name: 'Aadhar_Card_Back.jpg',
        imghippo_url: 'https://avatar.iran.liara.run/public/46.png',
      },
    ],
  };

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)} data-testid="button-open-user-modal">
        View User Details
      </Button>
      <UserDetailsModal user={mockUser} open={open} onOpenChange={setOpen} />
    </div>
  );
}
