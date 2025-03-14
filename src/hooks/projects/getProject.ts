'use client'
import { IResponseGetProject } from '@/@types/project'
import { api } from '@/services/apiClient'
import { useQuery } from '@tanstack/react-query'

const fetchGetProject = async (id: string): Promise<IResponseGetProject> => {
  const { data } = await api.get<IResponseGetProject>(
    `/engsol/info_project?id=${id}`,
  )

  return data
}

export const useGetProject = (id: string) => {
  return useQuery({
    queryKey: ['get-project', id],
    queryFn: () => fetchGetProject(id),
  })
}
