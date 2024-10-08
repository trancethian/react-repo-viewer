import countdownReducer from './countdown/slice';
import gitRepoReducer from './gitRepo/slice';
import gitSessionReducer from './gitSession/slice';

const rootReducer = {
  gitRepo: gitRepoReducer,
  gitSession: gitSessionReducer,
  countdown: countdownReducer,
};

export default rootReducer;
