import React from 'react';
import BaseList from '@/common/BaseList';
import LoadingIndicator from '@/common/LoadingIndicator';
import MovieVideoListItem from './MovieVideoListItem';
import MovieVideoPlayerModal from '@/media-gallery/VideoPlayerModal';
import { ID } from '@/common/CommonTypes';
import { MovieVideo } from '../media-gallery/MediaGalleryTypes';
import { useQuery } from 'react-query';
import { apiQueries } from '@/http-client/apiQueries';
import BaseSlider from '@/common/BaseSlider';
import { Box } from '@mui/material';

interface MovieVideoListProps {
  movieId: ID;
}

// TODO: Şunda sorun var: http://localhost:3000/movie/646380
function MovieVideoList({ movieId }: MovieVideoListProps) {
  const { data, isLoading } = useQuery(apiQueries.movies.movieVideos(movieId));
  const videos = data?.results || [];
  console.log(videos);
  return (
    <>
      <BaseSlider
        // To reset the slider as user redirects from movie to another movie
        key={movieId}
        items={videos}
        loading={isLoading}
        slidesToShow={{ default: 5, md: 4, sm: 2 }}
        keyExtractor={(video) => video.id}
        renderItem={(video) => {
          return (
            <Box
              sx={{
                border: 1,
                borderColor: (theme) => theme.palette.text.secondary,
                borderRadius: 0.5,
              }}
            >
              <MovieVideoListItem key={video.id} video={video} />
            </Box>
          );
        }}
      />
      {/* <BaseList
        data={videos}
        renderItem={renderItem}
        listEmptyMessage="No video has been found"
      /> */}
      <MovieVideoPlayerModal videos={videos} />
    </>
  );
}

export default MovieVideoList;
