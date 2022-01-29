import React from 'react';
import MovieCastGridListItem from './MovieCastGridListItem';
import { ID } from '@/common/CommonTypes';
import { MovieCast } from './MovieProfileTypes';
import { useQuery } from 'react-query';
import { apiQueries } from '@/http-client/apiQueries';
import { Avatar, Box, Typography } from '@mui/material';
import useApiConfiguration from '@/api-configuration/useApiConfiguration';
import NextLink from '@/routing/NextLink';
import BaseSlider from '@/common/BaseSlider';

interface MovieCastGridListProps {
  movieId: ID;
}

// TODO: Rename gridlists
function MovieCastGridList({ movieId }: MovieCastGridListProps) {
  const { data, isLoading } = useQuery(apiQueries.movies.movieCast(movieId));
  const castCredits = data?.cast;

  const { getImageUrl } = useApiConfiguration();

  const avatarSize = 82;

  return (
    <BaseSlider
      // To reset the slider as user redirects from movie to another movie
      key={movieId}
      items={castCredits}
      loading={isLoading}
      slidesToShow={{ default: 7, md: 4, sm: 2 }}
      keyExtractor={(castCredit) => castCredit.id}
      renderItem={(castCredit) => {
        return (
          <NextLink key={castCredit.id} href={`/person/${castCredit.id}`}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
            >
              <Avatar
                src={getImageUrl(castCredit.profile_path)}
                alt={castCredit.name}
                sx={{ height: avatarSize, width: avatarSize }}
              />
              <Box textAlign="center">
                <Typography
                  variant="subtitle1"
                  sx={{ color: (theme) => theme.palette.text.primary }}
                >
                  {castCredit.name}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: (theme) => theme.palette.text.secondary }}
                >
                  {castCredit.character}
                </Typography>
              </Box>
            </Box>
          </NextLink>
        );
      }}
    />
    // <BaseGridList
    //   items={castCredits}
    //   loading={isLoading}
    //   minItemWidth={230}
    //   renderItem={renderItem}
    //   listEmptyMessage="No cast has been found"
    // />
  );
}

export default MovieCastGridList;
