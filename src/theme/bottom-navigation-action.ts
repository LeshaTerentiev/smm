import { Theme } from '@material-ui/core';

export const MuiBottomNavigationAction = (t: Theme) => ({
  root: {
    '&.MuiBottomNavigationAction-iconOnly': {
      paddingTop: 11,
    },
    '&$selected': {
      paddingTop: 11,
    },
  },
  wrapper: {
    fontSize: '1.73em',
    '& svg': {
      width: '1em',
      height: '1em',
    },
  },
});
