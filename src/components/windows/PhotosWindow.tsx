import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronLeft, X, Grid } from 'lucide-react';
import { useWindows } from '@/contexts/WindowContext';
import { photoAlbums, Photo, PhotoAlbum } from '@/data/photos';
import { HeaderIcon } from '@/components/icons/AppIcon';
import { Input } from '@/components/ui/input';

export function PhotosWindow() {
  const { isMobile, closeWindow } = useWindows();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState<PhotoAlbum | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // All photos for the main view
  const allPhotos = useMemo(() => {
    return photoAlbums.flatMap(album => 
      album.photos.map(photo => ({ ...photo, albumTitle: album.title }))
    );
  }, []);

  const handleAlbumClick = (album: PhotoAlbum) => {
    setSelectedAlbum(album);
  };

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handleBackToAlbums = () => {
    setSelectedAlbum(null);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="h-full flex flex-col bg-background">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/30 bg-background/80 backdrop-blur-xl sticky top-0 z-10">
          {selectedAlbum ? (
            <>
              <button 
                onClick={handleBackToAlbums}
                className="flex items-center gap-1 text-primary"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>
              <span className="font-semibold text-sm">{selectedAlbum.title}</span>
              <div className="w-16" />
            </>
          ) : (
            <>
              <HeaderIcon type="photos" size={24} />
              <span className="font-semibold text-sm">Photos</span>
              <button onClick={() => closeWindow('photos')}>
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </>
          )}
        </div>

        {/* Search */}
        <div className="px-4 py-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-0 rounded-lg h-9"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {selectedAlbum ? (
            // Album Photo Grid
            <div className="grid grid-cols-3 gap-1">
              {selectedAlbum.photos.map((photo) => (
                <motion.button
                  key={photo.id}
                  className="aspect-square overflow-hidden rounded-sm"
                  onClick={() => handlePhotoClick(photo)}
                  whileTap={{ scale: 0.98 }}
                >
                  <img
                    src={photo.url}
                    alt={photo.title || ''}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.button>
              ))}
            </div>
          ) : (
            // All Photos + Albums below
            <div className="space-y-6">
              {/* All Photos Section */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">All Photos</h3>
                <div className="grid grid-cols-3 gap-1">
                  {allPhotos.map((photo) => (
                    <motion.button
                      key={photo.id}
                      className="aspect-square overflow-hidden rounded-sm"
                      onClick={() => handlePhotoClick(photo)}
                      whileTap={{ scale: 0.98 }}
                    >
                      <img
                        src={photo.url}
                        alt={photo.title || ''}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Albums Section */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">Albums</h3>
                <div className="grid grid-cols-2 gap-4">
                  {photoAlbums.map((album) => (
                    <motion.button
                      key={album.id}
                      className="flex flex-col items-start"
                      onClick={() => handleAlbumClick(album)}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-full aspect-square overflow-hidden rounded-xl shadow-lg">
                        <img
                          src={album.coverPhoto}
                          alt={album.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <span className="mt-2 text-sm font-medium">{album.title}</span>
                      <span className="text-xs text-muted-foreground">{album.photos.length}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Lightbox */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 text-white"
                onClick={closeLightbox}
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title || ''}
                className="max-w-full max-h-full object-contain"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Desktop Layout - Photos.app style
  return (
    <div className="h-full flex bg-background/95">
      {/* Sidebar */}
      <div className="w-52 border-r border-border/30 flex flex-col py-3 px-2 bg-muted/30">
        <div className="px-2 mb-4">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Library</span>
        </div>
        
        <button
          onClick={() => setSelectedAlbum(null)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm ${
            !selectedAlbum ? 'bg-primary/15 text-primary' : 'text-foreground hover:bg-muted'
          }`}
        >
          <Grid className="w-4 h-4" />
          All Photos
        </button>

        <div className="px-2 mt-6 mb-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Albums</span>
        </div>

        {photoAlbums.map((album) => (
          <button
            key={album.id}
            onClick={() => setSelectedAlbum(album)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm ${
              selectedAlbum?.id === album.id ? 'bg-primary/15 text-primary' : 'text-foreground hover:bg-muted'
            }`}
          >
            <div className="w-5 h-5 rounded overflow-hidden">
              <img src={album.coverPhoto} alt="" className="w-full h-full object-cover" />
            </div>
            <span className="truncate">{album.title}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-12 border-b border-border/30 flex items-center justify-between px-4 bg-muted/20">
          <div className="flex items-center gap-2">
            {selectedAlbum && (
              <button
                onClick={handleBackToAlbums}
                className="flex items-center gap-1 text-primary text-sm hover:underline"
              >
                <ChevronLeft className="w-4 h-4" />
                All Photos
              </button>
            )}
            <span className="font-medium text-sm">
              {selectedAlbum?.title || 'All Photos'}
            </span>
            <span className="text-xs text-muted-foreground">
              ({selectedAlbum ? selectedAlbum.photos.length : allPhotos.length} photos)
            </span>
          </div>
          
          <div className="relative w-48">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-7 text-xs bg-muted/50 border-border/30"
            />
          </div>
        </div>

        {/* Content Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {selectedAlbum ? (
            // Photo Grid
            <div className="grid grid-cols-4 gap-2">
              {(selectedAlbum?.photos || allPhotos).map((photo) => (
                <motion.button
                  key={photo.id}
                  className="aspect-square overflow-hidden rounded-md group relative"
                  onClick={() => handlePhotoClick(photo)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img
                    src={photo.url}
                    alt={photo.title || ''}
                    className="w-full h-full object-cover transition-transform group-hover:brightness-110"
                    loading="lazy"
                  />
                </motion.button>
              ))}
            </div>
          ) : (
            // All Photos Grid with Albums section below
            <div className="space-y-8">
              {/* All Photos */}
              <div className="grid grid-cols-5 gap-2">
                {allPhotos.map((photo) => (
                  <motion.button
                    key={photo.id}
                    className="aspect-square overflow-hidden rounded-md group relative"
                    onClick={() => handlePhotoClick(photo)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <img
                      src={photo.url}
                      alt={photo.title || ''}
                      className="w-full h-full object-cover transition-transform group-hover:brightness-110"
                      loading="lazy"
                    />
                  </motion.button>
                ))}
              </div>

              {/* Albums Section */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-4">Albums</h3>
                <div className="grid grid-cols-4 gap-4">
                  {photoAlbums.map((album) => (
                    <motion.button
                      key={album.id}
                      className="flex flex-col items-start text-left"
                      onClick={() => handleAlbumClick(album)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-full aspect-square overflow-hidden rounded-xl shadow-lg">
                        <img
                          src={album.coverPhoto}
                          alt={album.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <span className="mt-2 text-sm font-semibold">{album.title}</span>
                      <span className="text-xs text-muted-foreground">{album.photos.length} photos</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="absolute inset-0 z-50 bg-black/95 flex items-center justify-center rounded-lg overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={closeLightbox}
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title || ''}
              className="max-w-[90%] max-h-[90%] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
