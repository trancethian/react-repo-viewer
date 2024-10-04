import { IGitRepo } from '../../common/interfaces';
import RepoListItemPopover from './RepoListItemPopover';

interface RepoListItemProps {
  repo: IGitRepo;
}
export default function RepoListItem({ repo }: RepoListItemProps) {
  return (
    <RepoListItemPopover>
      <div className="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
        <span className="bg-green-400 h-2 w-2 m-2 rounded-full"></span>
        <a
          className="flex-grow font-medium px-2"
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {repo.name}
        </a>
        <div className="text-sm font-normal text-gray-500 tracking-wide">{repo.language}</div>
      </div>
    </RepoListItemPopover>
  );
}
