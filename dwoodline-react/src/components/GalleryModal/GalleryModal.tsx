import { useState } from 'react';
import { getProjectGallery } from '@/services/projectsService';

interface GalleryModalProps {
  /** Project name to show, or null when the modal is closed. */
  projectName: string | null;
  onClose: () => void;
}

/**
 * Project gallery modal (ported from 04-portfolio.html). Shows a grid of the
 * project's images; clicking one opens a full-size overlay.
 */
export function GalleryModal({ projectName, onClose }: GalleryModalProps) {
  const [fullSrc, setFullSrc] = useState<string | null>(null);

  if (!projectName) return null;
  const { images } = getProjectGallery(projectName);

  return (
    <>
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white p-8 border-b border-on-background/10 flex justify-between items-center">
            <h2 className="font-headline-md text-headline-md">{projectName}</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-2xl text-on-background/60 hover:text-on-background"
              aria-label="Close gallery"
            >
              ✕
            </button>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-3 gap-4">
              {images.map((image) => (
                <img
                  key={image}
                  src={image}
                  alt=""
                  className="w-full h-48 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setFullSrc(image)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {fullSrc && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setFullSrc(null)}
        >
          <img
            src={fullSrc}
            alt=""
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
