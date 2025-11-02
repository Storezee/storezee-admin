import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { UserBooked } from '@/lib/api';
import { Mail, Phone, MapPin, FileText } from 'lucide-react';

interface UserDetailsModalProps {
  user: UserBooked | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UserDetailsModal({ user, open, onOpenChange }: UserDetailsModalProps) {
  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl" data-testid="modal-user-details">
        <DialogHeader>
          <DialogTitle className="text-xl">User Details</DialogTitle>
          <DialogDescription>
            View complete user profile information and documents
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.profile_picture} alt={user.full_name} />
              <AvatarFallback className="text-lg">
                {getInitials(user.full_name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold" data-testid="text-user-name">
                {user.full_name}
              </h3>
              <p className="text-sm text-muted-foreground">User ID: {user.id}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </div>
              <p className="text-sm font-medium" data-testid="text-user-email">
                {user.email}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>Phone</span>
              </div>
              <p className="text-sm font-medium font-mono" data-testid="text-user-phone">
                {user.phone}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>City</span>
              </div>
              <p className="text-sm font-medium" data-testid="text-user-city">
                {user.city_name}
              </p>
            </div>
          </div>

          {user.documents && user.documents.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <FileText className="h-4 w-4" />
                <span>Documents</span>
                <Badge variant="secondary" className="ml-auto">
                  {user.documents.length}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {user.documents.map((doc) => (
                  <a
                    key={doc.id}
                    href={doc.imghippo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative aspect-square rounded-md overflow-hidden bg-muted hover-elevate active-elevate-2 border"
                    data-testid={`link-document-${doc.id}`}
                  >
                    <img
                      src={doc.imghippo_url}
                      alt={doc.original_name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white text-xs text-center px-2 line-clamp-2">
                        {doc.original_name}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
