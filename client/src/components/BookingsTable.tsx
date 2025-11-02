import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StatusBadge from './StatusBadge';
import AmountEditor from './AmountEditor';
import UserDetailsModal from './UserDetailsModal';
import ImageViewerModal from './ImageViewerModal';
import { Eye, User, Loader2 } from 'lucide-react';
import type { Booking, UserBooked } from '@/lib/api';
import { format } from 'date-fns';

interface BookingsTableProps {
  bookings: Booking[];
  isLoading: boolean;
  onStatusUpdate: (bookingId: string, newStatus: string) => void;
  onAmountUpdate: (bookingId: string, newAmount: string) => void;
}

export default function BookingsTable({
  bookings,
  isLoading,
  onStatusUpdate,
  onAmountUpdate,
}: BookingsTableProps) {
  const [selectedUser, setSelectedUser] = useState<UserBooked | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const formatDateTime = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
    } catch {
      return dateString;
    }
  };

  const handleUserClick = (user: UserBooked) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsImageModalOpen(true);
  };

  if (isLoading) {
    return (
      <Card className="p-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading bookings...</p>
        </div>
      </Card>
    );
  }

  if (bookings.length === 0) {
    return (
      <Card className="p-8">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">No bookings found</p>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Booking ID</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Status Updated By</TableHead>
                <TableHead className="font-semibold">Type</TableHead>
                <TableHead className="font-semibold">Created</TableHead>
                <TableHead className="font-semibold">End Time</TableHead>
                <TableHead className="font-semibold">Amount</TableHead>
                <TableHead className="font-semibold">Amount Updated By</TableHead>
                <TableHead className="font-semibold">Storage Unit</TableHead>
                <TableHead className="font-semibold">User</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id} data-testid={`row-booking-${booking.booking_id}`}>
                  <TableCell>
                    <span className="font-mono font-medium text-sm" data-testid={`text-booking-id-${booking.booking_id}`}>
                      {booking.booking_id}
                    </span>
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      status={booking.status}
                      onStatusChange={(newStatus) => onStatusUpdate(booking.id, newStatus)}
                      editable
                    />
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{booking.updated_by}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{booking.booking_type}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-muted-foreground">
                      {formatDateTime(booking.booking_created_time)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-muted-foreground">
                      {formatDateTime(booking.booking_end_time)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <AmountEditor
                      amount={booking.amount}
                      onSave={(newAmount) => onAmountUpdate(booking.id, newAmount)}
                    />
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{booking.amount_updated_by}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{booking.storage_unit}</span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2"
                      onClick={() => handleUserClick(booking.user_booked)}
                      data-testid={`button-view-user-${booking.booking_id}`}
                    >
                      <User className="h-4 w-4" />
                      <span className="max-w-[120px] truncate">
                        {booking.user_booked.full_name}
                      </span>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => handleImageClick(booking.luggage_image)}
                      data-testid={`button-view-image-${booking.booking_id}`}
                    >
                      <Eye className="h-4 w-4" />
                      View Image
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <UserDetailsModal
        user={selectedUser}
        open={isUserModalOpen}
        onOpenChange={setIsUserModalOpen}
      />

      <ImageViewerModal
        imageUrl={selectedImage}
        open={isImageModalOpen}
        onOpenChange={setIsImageModalOpen}
      />
    </>
  );
}
