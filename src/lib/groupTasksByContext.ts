import { ITask, IContext } from 'src/types';
import { queryCache } from 'react-query';
import { flow, groupBy, map } from 'lodash/fp';
import { toPairs } from 'lodash';

export function groupTasksByContext(tasks: ITask[]) {
  const pipeline = flow(
    groupBy((task: ITask) => {
      const contexts = queryCache.getQueryData<IContext[]>('context') || [];
      const cxt = contexts.find(context => context.id === task.context);
      return cxt ? cxt.name : 'None';
    }),
    toPairs,
    map(([name, _tasks]: [string, ITask[]]) => ({
      name,
      tasks: _tasks || []
    }))
  );
  return pipeline(tasks);
}
