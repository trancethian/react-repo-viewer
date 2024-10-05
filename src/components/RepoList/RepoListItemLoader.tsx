import { Spinner } from '@material-tailwind/react';

export default function RepoListItemLoader() {
  return (
    <div className="my-2 flex justify-center rounded-md p-2 text-gray-700">
      <Spinner />
    </div>
  );
}
