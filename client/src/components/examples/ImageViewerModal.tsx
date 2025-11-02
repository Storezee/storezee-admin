import { useState } from 'react';
import ImageViewerModal from '../ImageViewerModal';
import { Button } from '@/components/ui/button';

export default function ImageViewerModalExample() {
  const [open, setOpen] = useState(false);
  const imageUrl = 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800';

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)} data-testid="button-open-image-viewer">
        View Luggage Image
      </Button>
      <ImageViewerModal imageUrl={imageUrl} open={open} onOpenChange={setOpen} />
    </div>
  );
}
