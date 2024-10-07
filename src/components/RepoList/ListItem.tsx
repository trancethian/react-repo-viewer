import GithubForkSVG from '@/assets/GHForkSVG';
import GithubStarSVG from '@/assets/GHStarSVG';
import GithubWatchSVG from '@/assets/GHWatchSVG';
import { Tooltip, Typography } from '@material-tailwind/react';

import { IGitRepo } from '../../common/interfaces';

interface ListItemProps {
  repo: IGitRepo;
}

type TRepoActionType = 'watchers' | 'stargazers' | 'forks';
interface IRepoActionItemProps {
  repo: IGitRepo;
  type: TRepoActionType;
  icon: () => JSX.Element;
}

const RepoActionItem = ({ repo, type, icon }: IRepoActionItemProps) => {
  const actionCount = repo[`${type}_count`];
  let title = 'Number of ';

  switch (type) {
    case 'stargazers':
      title += 'Stars';
      break;

    case 'forks':
      title += 'Forks';
      break;
    case 'watchers':
      title += 'Watchers';
      break;
    default:
      break;
  }

  return (
    <Tooltip content={title}>
      <div className="flex">
        <a
          href={`https://github.com/reactjs/${repo.name}/${type}`}
          className="flex items-center gap-1 text-gray-500 hover:fill-current hover:text-[#646cff]"
          target="_blank"
          rel="noreferrer"
        >
          {icon()}
          <span>{actionCount}</span>
        </a>
      </div>
    </Tooltip>
  );
};

export default function ListItem({ repo }: ListItemProps) {
  return (
    <div className="bg-none [&:not(:last-child)]:border-b-2 flex flex-1 items-center justify-between gap-1 p-2 text-gray-700">
      <div className="flex flex-col items-start text-left">
        <Typography variant="h6" className="font-bold">
          <a
            href={repo.html_url}
            className="flex items-center group"
            target="_blank"
            rel="noopener noreferrer"
          >
            {repo.name}
          </a>
        </Typography>
        {repo.description && <Typography variant="small">{repo.description}</Typography>}
        <div className="flex flex-wrap gap-x-3">
          <RepoActionItem repo={repo} type="stargazers" icon={GithubStarSVG} />
          <RepoActionItem repo={repo} type="forks" icon={GithubForkSVG} />
          <RepoActionItem repo={repo} type="watchers" icon={GithubWatchSVG} />
          <div className="flex">
            <span className="flex sm:hidden items-center gap-1 text-gray-500">
              <span className="size-2 min-w-2 rounded-full bg-green-400"></span>
              <span>{repo.language}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="hidden sm:flex text-sm font-normal tracking-wide text-gray-500 min-w-16">
        {repo.language}
      </div>
    </div>
  );
}
