import React, { FC, useState } from 'react';
import { GetAccountTasks_accountTasks } from 'gql/types/GetAccountTasks';
import { useAccountTasks } from 'gql/tasks';
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
import { Modal } from 'components/modal';
import { AccountTask } from './account-task';

export interface AccountTasksProps {
  accountId: number;
}

export const AccountTasks: FC<AccountTasksProps> = ({ accountId }) => {
  const c = useStyles();

  const { accountTasks, loading, error } = useAccountTasks({ accountId });

  const [
    selectedTask,
    setSelectedTask,
  ] = useState<GetAccountTasks_accountTasks | null>();

  function handleTaskClick(task: GetAccountTasks_accountTasks) {
    setSelectedTask(task);
  }

  function handleSelectedTaskDetailsClose() {
    setSelectedTask(null);
  }

  if (loading) {
    return <Loading />;
  }

  if (!accountTasks || error) {
    return (
      <Error header={'Ошибка загрузки заданий в работе'} error={error?.message} />
    );
  }

  return (
    <Box className={c.root}>
      <Typography variant='h4' gutterBottom={accountTasks.length > 0}>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <span>Задания в работе</span>
          <Box color='text.hint'>{accountTasks.length || ''}</Box>
        </Box>
      </Typography>

      {accountTasks.length > 0 ? (
        <Box mt={1}>
          <Divider className={c.divider} />
          <Box className={c.tasks}>
            {accountTasks.map((task) => (
              <Box
                key={task.id}
                className={c.task}
                onClick={() => handleTaskClick(task)}
              >
                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Typography variant='h6'>
                    <Currency value={task.reward + Math.round(task.bonus)} />
                  </Typography>
                  <Typography className={c.taskType}>
                    {task.taskType?.name}
                  </Typography>
                </Box>

                <Box
                  mt={0.75}
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Typography variant='body2'>Выплата: сразу</Typography>
                  <Typography variant='body2'>Статус: {task.status}</Typography>
                </Box>

                {task.description && (
                  <Typography
                    color='textSecondary'
                    variant='body2'
                    style={{ marginTop: 7 }}
                  >
                    {task.description}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
        <Box fontWeight='fontWeightMedium' color='text.hint' mt={1}>
          <Typography>Нет заданий в работе</Typography>
        </Box>
      )}

      <Modal open={!!selectedTask} onClose={handleSelectedTaskDetailsClose}>
        {selectedTask && (
          <AccountTask
            accountId={accountId}
            taskId={selectedTask.id}
            // onTake={handleSelectedTaskDetailsClose}
          />
        )}
      </Modal>
    </Box>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'initial',
    },
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
      // minHeight: 130, // required for chrome scroll position bug fix on container below
      background: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(2.5, 2, 1.6),
      cursor: 'pointer',
      '&:hover': {
        background: theme.palette.grey['100'],
      },
      marginTop: theme.spacing(1),
    },
    taskType: {
      fontWeight: theme.typography.fontWeightMedium,
    },
  }),
);
