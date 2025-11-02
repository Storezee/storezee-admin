import {
  Dialog,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Download, ExternalLink } from 'lucide-react';

interface ImageViewerModalProps {
  imageUrl: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ImageViewerModal({ imageUrl, open, onOpenChange }: ImageViewerModalProps) {
  if (!imageUrl) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 bg-black/95" data-testid="modal-image-viewer">
        <DialogDescription className="sr-only">
          Luggage image preview
        </DialogDescription>
        <div className="relative">
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <Button
              size="icon"
              variant="secondary"
              onClick={() => window.open(imageUrl, '_blank')}
              data-testid="button-open-image-new-tab"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              onClick={() => {
                const link = document.createElement('a');
                link.href = imageUrl;
                link.download = 'luggage-image.jpg';
                link.click();
              }}
              data-testid="button-download-image"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              onClick={() => onOpenChange(false)}
              data-testid="button-close-image-modal"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <img
            src={imageUrl}
            alt="Luggage"
            className="w-full max-h-[80vh] object-contain rounded-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
