'use client'
import { useQuery } from '@tanstack/react-query'

import { IResponseListProjectsDelivered } from '@/@types/graph'
import { api } from '@/services/apiClient'

const fetchGetDeliveredProjectsByYear = async (
  year: number,
): Promise<IResponseListProjectsDelivered> => {
  const { data } = await api.get<IResponseListProjectsDelivered>(
    `/engsol/graph/delivered-projects?filter_year=${year}`,
  )

  return data
}

export const useGetDeliveredProjectsByYear = (year: number) => {
  return useQuery({
    queryKey: ['get-delivered-projects', year],
    queryFn: () => fetchGetDeliveredProjectsByYear(year),
  })
}
