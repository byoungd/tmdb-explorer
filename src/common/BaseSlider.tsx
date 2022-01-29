import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider, { Settings } from 'react-slick';
import { Box, styled, useTheme } from '@mui/material';
import { Maybe } from './CommonTypes';
import LoadingIndicator from './LoadingIndicator';

// TODO: Bu next ve prev buttonlarını bozuyor bi bakmak lazım.
const sliderItemGap = 0.4;

const StyledSlider = styled(Slider)(({ theme }) => ({
  margin: theme.spacing(-sliderItemGap),
  marginBottom: theme.spacing(1.5),
  '.slick-arrow': {
    zIndex: theme.zIndex.tooltip,
    height: '100%',
    width: '2rem',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus': {
      background: theme.palette.action.focus,
    },
    '&.slick-prev': {
      left: 0,
    },
    '&.slick-next': {
      right: 0,
    },
  },
  '.slick-dots': {
    bottom: theme.spacing(-1.5),
    li: {
      margin: theme.spacing(0, 0.1),
      width: theme.spacing(1),
      height: 'auto',
      button: {
        width: '100%',
        height: theme.spacing(0.5),
        padding: 0,
        background: theme.palette.text.disabled,
        '&:before': {
          content: 'none',
        },
      },
      '&.slick-active': {
        button: {
          background: theme.palette.text.secondary,
        },
      },
    },
  },
}));

type BaseSliderProps<Item> = Pick<Settings, 'className'> & {
  items: Maybe<Item[]>;
  loading: boolean;
  slidesToShow: { default: number; md?: number; sm?: number };
  keyExtractor: (item: Item) => React.Key;
  renderItem: (item: Item) => React.ReactNode;
};

// TODO: Empty message
function BaseSlider<Item>({
  className,
  items,
  loading,
  renderItem,
  keyExtractor,
  slidesToShow,
}: BaseSliderProps<Item>) {
  const theme = useTheme();

  let responsive: Settings['responsive'] = [];
  if (slidesToShow.md) {
    responsive = [
      ...responsive,
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: slidesToShow.md,
          slidesToScroll: slidesToShow.md,
        },
      },
    ];
  }

  if (slidesToShow.sm) {
    responsive = [
      ...responsive,
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: slidesToShow.sm,
          slidesToScroll: slidesToShow.sm,
        },
      },
    ];
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow.default,
    slidesToScroll: slidesToShow.default,
    responsive,
  };

  return (
    <LoadingIndicator loading={loading}>
      <StyledSlider {...settings} className={className}>
        {items?.map((item) => {
          return (
            <Box key={keyExtractor(item)}>
              <Box m={sliderItemGap}>{renderItem(item)}</Box>
            </Box>
          );
        })}
      </StyledSlider>
    </LoadingIndicator>
  );
}

export default BaseSlider;
