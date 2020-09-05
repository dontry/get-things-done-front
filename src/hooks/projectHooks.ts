import { useQuery, useMutation, queryCache } from 'react-query';
import { apiService } from '../api';
import { IProject } from 'src/types';
import { isNil } from 'lodash';

export function useFetchProjects() {
  const { status, error, data } = useQuery('projects', () =>
    apiService.get('/projects').then(res => res.data)
  );

  return { status, error, projects: data };
}

interface IProjectMutationVariable {
  project: IProject;
}

export function useUpdateProject() {
  const [updateProject, { data, error, status }] = useMutation<IProject, IProjectMutationVariable>(
    ({ project }) => apiService.put(`/project/${project.id}`, project).then(res => res.data),
    {
      onSuccess: project => {
        queryCache.setQueryData('projects', (oldProjects?: IProject[]) => {
          if (isNil(oldProjects)) {
            return;
          }
          return oldProjects.map(oldProject => {
            if (oldProject.id === project.id) {
              return project;
            } else {
              return oldProject;
            }
          });
        });
      }
    }
  );

  return { updateProject, status, data, error };
}

export function useCreateProject() {
  const [createProject, { data, error, status, isSuccess }] = useMutation<
    IProject,
    IProjectMutationVariable
  >(({ project }) => apiService.post(`/projects`, project).then(res => res.data), {
    onSuccess: () => {
      queryCache.invalidateQueries('projects');
    }
  });

  return { createProject, status, data, error, isSuccess };
}
