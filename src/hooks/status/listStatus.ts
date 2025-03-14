'use client'

import { IResponseListStatus } from '@/@types/status'
import { api } from '@/services/apiClient'
import { useQuery } from '@tanstack/react-query'

const fetchListStatus = async (): Promise<IResponseListStatus[]> => {
  const { data } = await api.get<IResponseListStatus[]>(
    '/engsol/list_condition',
  )

  return data
}

export const useListStatus = () => {
  return useQuery({
    queryKey: ['list-status'],
    queryFn: fetchListStatus,
  })
}
