import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InstagramPostData } from 'gql/types/InstagramPostData';
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Typography,
  Button,
  Divider,
} from '@material-ui/core';

export interface PostDescriptionProps {
  post: InstagramPostData;
}

export const PostDescription: FC<PostDescriptionProps> = ({
  post: { displayUrl, ownerUsername, description },
}) => {
  const c = useStyles();
  const { t } = useTranslation();

  const descriptionShort = description?.slice(0, 70);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  function handleDescriptionExpandedChange() {
    setDescriptionExpanded(!descriptionExpanded);
  }

  return (
    <Box className={c.root}>
      <img className={c.preview} src={displayUrl} style={{ marginBottom: 14 }} />

      {description && (
        <>
          <Typography
            variant='caption'
            color='textSecondary'
            display='block'
            style={{ fontFamily: 'monospace', position: 'relative' }}
          >
            {descriptionShort?.length !== description.length ? (
              <>
                {descriptionExpanded ? description : descriptionShort + '...'}
                <Button
                  className={c.expandButton}
                  onClick={handleDescriptionExpandedChange}
                  variant='text'
                  size='small'
                >
                  {!descriptionExpanded ? t('more') : t('less')}
                </Button>
              </>
            ) : (
              description
            )}
          </Typography>
          <Box mt={1.25}>
            <Divider />
          </Box>
        </>
      )}
    </Box>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    preview: {
      maxWidth: '100%',
      display: 'block',
    },
    expandButton: {
      fontSize: '0.8rem',
      position: 'absolute',
      right: -5,
      bottom: -5,
      opacity: 0.5,
    },
  }),
);
