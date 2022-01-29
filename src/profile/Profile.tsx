import React from 'react';
import { Box } from '@mui/material';
import LoadingIndicator from '@/common/LoadingIndicator';

interface ProfileProps {
  introduction: React.ReactNode;
  main: React.ReactNode;
  leftSide?: React.ReactNode;
  rightSide?: React.ReactNode;
  loading: boolean;
}

// TODO: Rename props
function Profile({
  introduction,
  main,
  leftSide,
  rightSide,
  loading,
}: ProfileProps) {
  return (
    <LoadingIndicator loading={loading}>
      <Box margin={-1}>
        <Box padding={1}>{introduction}</Box>
        <Box>
          {leftSide && (
            <Box flex={1} flexBasis={240} padding={1}>
              {leftSide}
            </Box>
          )}
          <Box flex={10} flexBasis={500} padding={1}>
            {main}
          </Box>
          {rightSide && (
            <Box flex={1} flexBasis={260} padding={1}>
              {rightSide}
            </Box>
          )}
        </Box>
      </Box>
    </LoadingIndicator>
  );
}

export default Profile;
