import gitRepoReducer from './gitRepo/slice';
import gitSessionReducer from './gitSession/slice';

const rootReducer = {
  gitRepo: gitRepoReducer,
  gitSession: gitSessionReducer,
};

export default rootReducer;
