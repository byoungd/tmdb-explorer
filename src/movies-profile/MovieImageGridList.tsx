import React from 'react';
import ImageGridList from '@/common/ImageGridList';
import ImageGalleryModal from '@/media-gallery/ImageGalleryModal';
import { Movie } from '@/common/CommonTypes';
import { useQuery } from 'react-query';
import { apiQueries } from '@/http-client/apiQueries';

import NextLink from '@/routing/NextLink';
import useApiConfiguration from '@/api-configuration/useApiConfiguration';
import useRouterPath from '@/routing/useRouterPath';
import BaseImage from '@/common/BaseImage';
import { styled } from '@mui/material';
import BaseSlider from '@/common/BaseSlider';

const ImageThumbnail = styled(BaseImage)({
  borderRadius: 1,
});

interface MovieImageGridListProps {
  movie: Movie;
}

function MovieImageGridList({ movie }: MovieImageGridListProps) {
  const movieId = movie.id;
  const { data, isLoading } = useQuery(apiQueries.movies.movieImages(movieId));

  const filePaths = data?.backdrops.map((backdrop) => backdrop.file_path);

  const { getImageUrl } = useApiConfiguration();
  const { asHref } = useRouterPath();

  return (
    <>
      {/* TODO: Drag & drop'lar routing yapıyor. */}
      <BaseSlider
        // To reset the slider as user redirects from movie to another movie
        key={movieId}
        items={filePaths}
        loading={isLoading}
        slidesToShow={{ default: 4, md: 3, sm: 2 }}
        keyExtractor={(filePath) => filePath}
        renderItem={(filePath) => {
          return (
            <NextLink href={{ pathname: asHref, query: { view: filePath } }}>
              <ImageThumbnail
                src={getImageUrl(filePath)}
                width={16}
                height={9}
                layout="responsive"
                objectFit="contain"
              />
            </NextLink>
          );
        }}
      />
      {/* <ImageGridList
        filePaths={filePaths}
        isFetching={isLoading}
        imgSize={{
          width: 16,
          height: 9,
        }}
      /> */}
      <ImageGalleryModal title={movie.title} filePaths={filePaths} />
    </>
  );
}

export default MovieImageGridList;
