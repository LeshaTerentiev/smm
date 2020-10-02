import { Theme /*, lighten*/ } from '@material-ui/core';

const none: 'none' = 'none';

export const MuiButton = (t: Theme) => ({
  root: {
    minWidth: 'initial',
    textTransform: none,
    boxShadow: 'none !important',
    '& img': {
      height: 16,
      marginRight: t.spacing(1),
    },
    [t.breakpoints.up('md')]: {
      '& img': {
        height: 18,
        marginRight: t.spacing(1.5),
      },
    },
  },
  textSizeSmall: {
    lineHeight: 1.4,
    fontSize: '0.9rem',
  },
  contained: {
    '&$disabled': {
      backgroundColor: t.palette.grey[300],
      color: 'white',
    },
  },
});
