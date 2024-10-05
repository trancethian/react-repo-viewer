import { IGitRepo } from '../../common/interfaces';

interface RepoListItemProps {
  repo: IGitRepo;
}
export default function RepoListItem({ repo }: RepoListItemProps) {
  return (
    <div className="my-2 flex cursor-pointer items-center rounded-md p-2 text-gray-700 hover:bg-blue-100 hover:text-blue-400">
      <span className="size-2 min-w-2 rounded-full bg-green-400"></span>
      <a
        className="grow px-2 font-medium"
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {repo.name}
      </a>
      <div className="text-sm font-normal tracking-wide text-gray-500 min-w-16">
        {repo.language}
      </div>
    </div>
  );
}
