import React, { FC, useState, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from '@reach/router';
import { useAvailableTasks } from 'gql/tasks';
import { useTakeInstagramCommentTask } from 'gql/tasks';
import { navigate } from '@reach/router';
import { accountTaskRoute } from 'routes';
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from '@material-ui/core';
import { Modal } from 'components/common/modal';
import { Loading } from 'components/common/loading';
import { Error } from 'components/common/error';
import { Currency } from 'components/billing/currency';
import { PostDescription } from 'components/common/post-description';

export interface AvailableTaskProps extends RouteComponentProps {
  accountId?: string;
  taskId?: string;
  onClose: () => void;
}

export const AvailableTask: FC<AvailableTaskProps> = ({
  accountId,
  taskId,
  onClose,
}) => {
  const c = useStyles();
  const { t } = useTranslation();

  const { availableTasks, loading, error } = useAvailableTasks({
    accountId: Number(accountId),
  });

  const [
    takeInstagramCommentTask,
    { loading: taking, error: takingError },
  ] = useTakeInstagramCommentTask(Number(accountId));

  const [customerWishesAgreed, setCustomerWishesAgreed] = useState(false);
  const handleCustomerWishesAgreedChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomerWishesAgreed(e.target.checked);
  };

  const handleTakeTask = async () => {
    const takenTask = await takeInstagramCommentTask({
      variables: {
        accountId: Number(accountId),
        taskId: Number(taskId),
      },
    });

    const takenTaskId = takenTask.data?.takeInstagramCommentTask?.accountTaskId;
    if (takenTaskId) {
      navigate(accountTaskRoute(Number(accountId), takenTaskId));
    }
  };

  const task = availableTasks?.find((task) => task.taskId === Number(taskId));
  const tip = task ? Math.round((task.reward * task.bonusRate) / 100) : 0;

  return (
    <Modal open={true} maxWidth='sm' onClose={onClose}>
      {!accountId || !taskId ? (
        <Error name='Bad request' />
      ) : loading ? (
        <Loading />
      ) : error ? (
        <Error name={t('Loading error')} error={error} />
      ) : !task ? (
        <Error name={t('Task not found')} />
      ) : (
        <>
          {task.instagramCommentTask?.post && (
            <PostDescription post={task.instagramCommentTask.post} />
          )}

          <Box mt={2.5} display='flex' justifyContent='space-between'>
            <Box>
              <Currency className={c.reward} value={task.reward + tip} />
              <Typography color='textSecondary'>
                <Currency value={task.reward} /> + {t('tip')}{' '}
                <Currency value={tip} />
              </Typography>
            </Box>
            <Box mt={0.5} textAlign='right'>
              <Typography className={c.taskType}>
                {t(task.taskType?.name || '')} #{task.taskId}
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                {t('Payout')}: {t('immediately')}
              </Typography>
            </Box>
          </Box>

          <Box mt={2}>
            <Typography className={c.label}>{t('Requirements')}:</Typography>

            {task.description ? (
              <FormGroup className={c.requirements}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={true}
                      className={c.checkbox}
                      name='defaultRequirementAgreed'
                      color='primary'
                    />
                  }
                  label={`${t('Join discussion')} (${t('minimum 4 words')})`}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleCustomerWishesAgreedChange}
                      className={c.checkbox}
                      name='customerWishesAgreed'
                      color='primary'
                    />
                  }
                  label={task.description}
                />
              </FormGroup>
            ) : (
              <Typography>
                {t('Join discussion')} ({t('minimum 4 words')})
              </Typography>
            )}
          </Box>

          {takingError && <Error error={takingError} />}

          <Box mt={2.5} display='flex'>
            <Button
              target='_blank'
              href={task.instagramCommentTask?.postUrl || ''}
              color='primary'
              variant='outlined'
              fullWidth
            >
              {t('Open post')}
            </Button>

            <Button
              color='primary'
              variant='contained'
              fullWidth
              style={{ marginLeft: 8 }}
              disabled={(task.description && !customerWishesAgreed) || taking}
              onClick={handleTakeTask}
            >
              {t('Accept')}
            </Button>
          </Box>
        </>
      )}
    </Modal>
  );
};

export const useStyles = makeStyles((t: Theme) =>
  createStyles({
    root: {},
    reward: {
      fontSize: 28,
      fontWeight: t.typography.fontWeightMedium,
    },
    taskType: {
      fontSize: t.typography.fontSize,
      color: t.palette.text.secondary,
      letterSpacing: 0.5,
      marginBottom: t.spacing(0.4),
    },
    label: {
      fontSize: t.typography.fontSize + 1,
      fontWeight: t.typography.fontWeightMedium,
      marginBottom: 3,
    },
    requirements: {
      fontSize: t.typography.body2.fontSize,
    },
    checkbox: {
      '& .MuiSvgIcon-root': {
        width: '0.92em',
        height: '0.92em',
      },
    },
  }),
);
