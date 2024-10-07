import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

export default function ErrorMessage() {
  const { error } = useAppSelector((state: RootState) => state.gitRepo);

  return (
    error && (
      <div className="my-2 flex justify-start rounded-md p-2 text-red-700">
        <span className="grow px-2 font-medium">
          {error.message ?? 'Oops! Something went wrong, please try again later!'}
        </span>
      </div>
    )
  );
}
