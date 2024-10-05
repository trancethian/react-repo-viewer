import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';

import { IGitSession } from '@/common/interfaces';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { Progress, Typography } from '@material-tailwind/react';

import GitSessionInfoPopover from './GitSessionInfoPopover';

export interface ISessionInfo extends IGitSession {
  rateResetsOn: Date | null;
}

export function ProgressWithLabel() {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between gap-4">
        <Typography color="blue-gray" variant="h6">
          Completed
        </Typography>
        <Typography color="blue-gray" variant="h6">
          50%
        </Typography>
      </div>
      <Progress value={50} />
    </div>
  );
}

const GitSessionInfo = () => {
  const { session } = useAppSelector((state: RootState) => state.gitRepo);
  const [sessionInfo, setSessionInfo] = useState<ISessionInfo | null>();

  const parseToDate = useCallback((timestamp: number | null) => {
    let date = null;

    if (timestamp) {
      const parsed = moment(timestamp);

      if (parsed.isValid()) {
        date = parsed.toDate();
      }
    }
    return date;
  }, []);

  useEffect(() => {
    if (session) {
      setSessionInfo({
        ...session,
        rateResetsOn: session.rateResetTime ? parseToDate(session.rateResetTime * 1000) : null,
      });
    } else {
      setSessionInfo(null);
    }
  }, [parseToDate, session]);

  return (
    sessionInfo && (
      <div className="w-full text-white">
        <div className="mb-2 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <GitSessionInfoPopover {...sessionInfo}>
            <div className="flex flex-row">
              <Typography variant="h6">Rate Limit</Typography>
              <svg viewBox="0 0 1024 1024" fill="currentColor" height="1rem" width="1rem">
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
                <path d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z" />
              </svg>
            </div>
          </GitSessionInfoPopover>
          {sessionInfo.rateLimit && sessionInfo.rateRemaining && (
            <div>
              <Typography variant="h6">
                {sessionInfo.rateLimit - sessionInfo.rateRemaining} / {sessionInfo.rateLimit}
              </Typography>
            </div>
          )}
        </div>
        {sessionInfo.rateLimit && sessionInfo.rateRemaining && (
          <Progress
            value={
              ((sessionInfo.rateLimit - sessionInfo.rateRemaining) / sessionInfo.rateLimit) * 100
            }
          />
        )}
      </div>
    )
  );
};

export default GitSessionInfo;
