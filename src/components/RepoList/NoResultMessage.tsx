import NoResultsSVG from '@/assets/NoResultsSVG';
import { Typography } from '@material-tailwind/react';

export default function NoResultMessage() {
  return (
    <div className="my-2 flex flex-1 flex-col items-center justify-center px-2 rounded-md h-18">
      <Typography className="mb-3" variant="small">
        {"Oops! We couldn't find any results for your search, please try a different keyword."}
      </Typography>
      <NoResultsSVG />
    </div>
  );
}
