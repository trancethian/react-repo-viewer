import { useEffect, useState } from 'react';

import { parseToDate } from '@/common/helpers';
import { fetchGitSessionRequest } from '@/redux/gitSession/slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { Button, Typography } from '@material-tailwind/react';

import CustomAlert from '../common/CustomAlert';
import CountdownSpinner from '../CountdownSpinner/CountdownSpinner';

export default function RateLimitAlert() {
  const dispatch = useAppDispatch();
  const { countdown, isRefreshDisabled } = useAppSelector((state: RootState) => state.countdown);
  const { rateResetTimestamp, rateLimitReached } = useAppSelector(
    (state: RootState) => state.gitSession,
  );
  const [rateResetDateTime, setRateResetDateTime] = useState<Date>();

  useEffect(() => {
    if (rateResetTimestamp) {
      setRateResetDateTime(parseToDate(rateResetTimestamp));
    }
  }, [rateResetTimestamp]);

  return (
    <CustomAlert
      open={rateLimitReached}
      title={<Typography className="font-medium">{"Uh oh! You've hit the Rate Limit."}</Typography>}
    >
      <ul className="my-2 ml-2 list-inside list-disc">
        {rateResetDateTime && (
          <li>You can refresh your limit on {rateResetDateTime.toLocaleString()}</li>
        )}
      </ul>
      <div className="flex">
        <Button disabled={isRefreshDisabled} onClick={() => dispatch(fetchGitSessionRequest())}>
          Refresh Limit
        </Button>
        {countdown > 0 && <CountdownSpinner value={countdown} />}
      </div>
    </CustomAlert>
  );
}
