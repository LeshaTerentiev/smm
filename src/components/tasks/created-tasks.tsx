import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useMe } from 'gql/user';
import { navigate } from '@reach/router';
import { createdTaskRoute } from 'routes';
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Typography,
  Divider,
} from '@material-ui/core';
import { Loading } from 'components/loading';
import { Error } from 'components/error';
import { Currency } from 'components/billing/currency';

export interface CreatedTasksProps {}

export const CreatedTasks: FC<CreatedTasksProps> = () => {
  const c = useStyles();
  const { t } = useTranslation();

  const { me, loading, error } = useMe();
  const createdTasks = me?.createdTasks || [];

  function handleTaskClick(taskId: number) {
    navigate(createdTaskRoute(taskId));
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error name={'Ошибка загрузки размещенных заданий'} error={error} />;
  }

  return (
    <Box className={c.root}>
      <Typography variant='h4' gutterBottom={createdTasks.length > 0}>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <span>Размещенные задания</span>
          <Box color='text.hint'>{createdTasks.length || ''}</Box>
        </Box>
      </Typography>

      {createdTasks.length > 0 ? (
        <Box mt={1}>
          <Divider className={c.divider} />
          <Box className={c.tasks}>
            {createdTasks.map((task) => (
              <Box
                key={task.id}
                className={c.task}
                onClick={() => handleTaskClick(task.id)}
              >
                <Typography variant='subtitle1'>
                  {t(task.taskType?.title || '')}
                </Typography>
                <Typography
                  variant='caption'
                  color='textSecondary'
                  display='block'
                  gutterBottom
                  noWrap
                >
                  {task.instagramCommentTask?.postUrl}
                </Typography>
                <Typography display='inline'>
                  <Currency value={Math.round(task.currentBudget)} /> /{' '}
                  <Currency value={task.totalBudget} sign={false} />
                </Typography>
                <Typography
                  display='inline'
                  variant='caption'
                  style={{ marginLeft: 16 }}
                >
                  Чай {task.bonusRate}%
                </Typography>
                <Typography
                  display='inline'
                  variant='caption'
                  style={{ marginLeft: 16 }}
                >
                  До {new Date(task.expiredAt).toLocaleDateString()}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
        <Box fontWeight='fontWeightMedium' color='text.hint' mt={1}>
          <Typography>Нет опубликованных заданий</Typography>
        </Box>
      )}
    </Box>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    divider: {
      display: 'none',
      [theme.breakpoints.up('lg')]: {
        marginBottom: theme.spacing(3),
        display: 'block',
      },
    },
    tasks: {
      [theme.breakpoints.up('lg')]: {
        maxHeight: 560,
        overflowY: 'scroll',
      },
    },
    task: {
      background: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(2.5, 2, 2),
      cursor: 'pointer',
      '&:hover': {
        background: theme.palette.grey['100'],
      },
      marginTop: theme.spacing(1),
    },
  }),
);