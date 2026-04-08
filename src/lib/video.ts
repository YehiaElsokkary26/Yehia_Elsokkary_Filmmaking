export const getVideoPoster = (src: string) => {
  const fileName = src.split('/').pop()?.replace(/\.mp4$/i, '.jpg');
  return fileName ? `/video-posters/${fileName}` : undefined;
};