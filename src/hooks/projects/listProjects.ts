'use client'

import { IResponseListProjects } from '@/@types/project'
import { api } from '@/services/apiClient'
import { useQuery } from '@tanstack/react-query'

const fetchListProjects = async (): Promise<IResponseListProjects[]> => {
  const { data } = await api.get<IResponseListProjects[]>(
    '/engsol/list_project',
  )

  return data
}

export const useListProjects = () => {
  return useQuery({
    queryKey: ['list-projects'],
    queryFn: fetchListProjects,
  })
}
