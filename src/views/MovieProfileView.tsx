import React from 'react';
import { useRouter } from 'next/router';
import BaseSeo from '@/seo/BaseSeo';
import { withGetServerSideError } from '@/error-handling/withGetServerSideError';
import MovieProfile from '@/movies-profile/MovieProfile';
import { dehydrate, useQuery } from 'react-query';
import { createQueryClient } from '@/http-client/queryClient';
import { apiQueries } from '@/http-client/apiQueries';
import useApiConfiguration from '@/api-configuration/useApiConfiguration';

function MovieProfileView() {
  const router = useRouter();
  const movieId = Number(router.query.movieId);
  const { data, isLoading } = useQuery(apiQueries.movies.movie(movieId));

  const { getImageUrl } = useApiConfiguration();

  return (
    <>
      {data && (
        <BaseSeo
          title={data.title}
          description={data.overview}
          openGraph={{ images: [{ url: getImageUrl(data.poster_path) }] }}
        />
      )}
      <MovieProfile movie={data} loading={isLoading} />
    </>
  );
}

export const getServerSideProps = withGetServerSideError(async (context) => {
  const movieId = Number(context.params.movieId);

  const queryClient = createQueryClient();
  // Any query with an error is automatically excluded from dehydration.
  // This means that the default behavior is to pretend these queries were never loaded on the server,
  // usually showing a loading state instead, and retrying the queries on the queryClient.
  // This happens regardless of error.
  // Sometimes this behavior is not desirable, maybe you want to render an error page with a
  // correct status code instead on certain errors or queries.
  // In those cases, use fetchQuery and catch any errors to handle those manually.
  // https://react-query.tanstack.com/guides/ssr#only-successful-queries-are-included-in-dehydration
  await Promise.all([
    queryClient.fetchQuery(apiQueries.common.configuration()),
    queryClient.fetchQuery(apiQueries.movies.movie(movieId)),
    queryClient.fetchQuery(apiQueries.movies.movieVideos(movieId)),
    queryClient.fetchQuery(apiQueries.movies.movieImages(movieId)),
    queryClient.fetchQuery(apiQueries.movies.movieCast(movieId)),
    queryClient.fetchInfiniteQuery(
      apiQueries.movies.movieRecommendations(movieId),
    ),
  ]);

  return {
    props: {
      // There is an issue when we use infinite query while SSR.
      // So, we use this workaround.
      // https://github.com/tannerlinsley/react-query/issues/1458
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
});

export default MovieProfileView;
