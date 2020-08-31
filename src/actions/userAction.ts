import { userStore, requestStore } from '../stores';
import { IUser } from '../types';
import { apiService } from '../api';
import { useQuery, useMutation, queryCache } from 'react-query';
import { useEffect } from 'react';

export function useFetchProfile() {
  const { status, error, data } = useQuery(
    'profile',
    () => apiService.get('/users/profile').then(res => res.data)
  )
  useEffect(() => {
    if (status === 'success') {
      userStore.updateUser(data);
    }
  }, [status, data])

  return { status, error, user: data };
}

interface IUpdateUserMutationVariable {
  user: IUser;
}

export function useUpdateProfile() {
  const [updateProfile, { data, error, status }] = useMutation<IUser, IUpdateUserMutationVariable>(
    ({ user }) => apiService.put(`/users/profile`, user).then(res => res.data),
    {
      onSuccess: () => {
        queryCache.invalidateQueries(requestStore.currentQueryKey);
      }
    }
  );

  useEffect(() => {
    if (status === 'success') {
      userStore.updateUser(data)
    }
  }, [status, data]);

  return { updateProfile, status, data, error };
}
