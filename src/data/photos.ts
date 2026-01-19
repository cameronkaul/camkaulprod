export interface Photo {
  id: string;
  url: string;
  title?: string;
}

export interface PhotoAlbum {
  id: string;
  title: string;
  coverPhoto: string;
  photos: Photo[];
}

export const photoAlbums: PhotoAlbum[] = [
  {
    id: 'tao-rocket',
    title: 'Tao Rocket',
    coverPhoto: '/photos/tao-rocket/P1023051.jpg',
    photos: [
      { id: 'tr-1', url: '/photos/tao-rocket/P1023051.jpg' },
      { id: 'tr-2', url: '/photos/tao-rocket/P1023052.jpg' },
      { id: 'tr-3', url: '/photos/tao-rocket/P1023062.jpg' },
    ],
  },
  {
    id: 'dr-pepper-mural',
    title: 'Dr. Pepper Mural',
    coverPhoto: '/photos/dr-pepper-mural/P1220744.jpg',
    photos: [
      { id: 'dpm-1', url: '/photos/dr-pepper-mural/P1220744.jpg' },
      { id: 'dpm-2', url: '/photos/dr-pepper-mural/P1220766.jpg' },
      { id: 'dpm-3', url: '/photos/dr-pepper-mural/P1230248.jpg' },
      { id: 'dpm-4', url: '/photos/dr-pepper-mural/P1220723.jpg' },
      { id: 'dpm-5', url: '/photos/dr-pepper-mural/P1230089.jpg' },
      { id: 'dpm-6', url: '/photos/dr-pepper-mural/P1220822_1.jpg' },
    ],
  },
  {
    id: 'matthew-concert',
    title: 'Matthew Concert',
    coverPhoto: '/photos/matthew-concert/P1022422.jpg',
    photos: [
      { id: 'mc-1', url: '/photos/matthew-concert/P1022422.jpg' },
      { id: 'mc-2', url: '/photos/matthew-concert/P1022500-2.jpg' },
      { id: 'mc-3', url: '/photos/matthew-concert/P1022513.jpg' },
      { id: 'mc-4', url: '/photos/matthew-concert/P1022566.jpg' },
      { id: 'mc-5', url: '/photos/matthew-concert/P1022626.jpg' },
    ],
  },
  {
    id: 'colton-climbing',
    title: 'Colton Climbing',
    coverPhoto: '/photos/colton-climbing/P1034579.jpg',
    photos: [
      { id: 'cc-1', url: '/photos/colton-climbing/P1034574.jpg' },
      { id: 'cc-2', url: '/photos/colton-climbing/P1034579.jpg' },
      { id: 'cc-3', url: '/photos/colton-climbing/P1034586.jpg' },
    ],
  },
];

// Get all photos across all albums
export const getAllPhotos = (): Photo[] => {
  return photoAlbums.flatMap(album => album.photos);
};
