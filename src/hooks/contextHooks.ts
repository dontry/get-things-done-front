import { isNil } from 'lodash';
import { queryCache, useMutation, useQuery } from 'react-query';
import { IContext } from 'src/types';

import { apiService } from '../api';

export function useFetchContext() {
  const { status, error, data } = useQuery('context', () =>
    apiService.get('/context').then(res => res.data)
  );

  return { status, error, context: data };
}

interface IContextMutationVariable {
  context: IContext;
}

export function useUpdateContext() {
  const [updateContext, { data, error, status }] = useMutation<IContext, IContextMutationVariable>(
    ({ context }) => apiService.put(`/context/${context.id}`, context).then(res => res.data),
    {
      onSuccess: context => {
        queryCache.setQueryData('context', (oldContext?: IContext[]) => {
          if (isNil(oldContext)) {
            return;
          }
          return oldContext.map(_oldContext => {
            if (_oldContext.id === context.id) {
              return context;
            } else {
              return _oldContext;
            }
          });
        });
      }
    }
  );

  return { updateContext, status, data, error };
}

export function useCreateContext() {
  const [createContext, { data, error, status, isSuccess }] = useMutation<
    IContext,
    IContextMutationVariable
  >(({ context }) => apiService.post('/context', context).then(res => res.data), {
    onSuccess: () => {
      queryCache.invalidateQueries('context');
    }
  });

  return { createContext, status, data, error, isSuccess };
}

export function useDeleteContextById() {
  const [deleteContext, { data, error, status }] = useMutation<IContext, string>(
    contextId => apiService.delete(`/context/${contextId}`).then(res => res.data),
    {
      onSuccess: () => {
        queryCache.invalidateQueries('context');
      }
    }
  );

  return { createContext: deleteContext, status, data, error };
}
