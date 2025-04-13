import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { IResponseListProjects } from '@/@types/project'
import { AdminContext } from '@/contexts/AdminContext'
import { useDeleteProject } from '@/hooks/projects/deleteProject'
import { useListProjects } from '@/hooks/projects/listProjects'

export function useProjects() {
  const [search, setSearch] = useState('')
  const [ascOrDescTable, setAscOrDescTable] = useState({
    data: 'asc',
    project: 'asc',
  })
  const [sortedProjects, setSortedProjects] = useState<IResponseListProjects[]>(
    [],
  )

  const [isCopied, setIsCopied] = useState({
    id: 0,
    status: false,
    link: '',
  })

  function handleCopy(id: number, value: string) {
    navigator.clipboard.writeText(value)
    setIsCopied({
      id,
      status: true,
      link: value,
    })
    toast.success('Chave copiada!')
    setTimeout(() => {
      setIsCopied({
        id: 0,
        status: false,
        link: '',
      })
    }, 2000)
  }

  const {
    data: dataListProjects,
    isLoading: isLoadingListProjects,
    error: errorListProjects,
    isFetching: isFetchingListProjects,
    refetch: refetchListProjects,
  } = useListProjects()

  const {
    mutateAsync: mutateDeleteProject,
    isPending: isPendingDeleteProject,
    variables: variablesDeleteProject,
  } = useDeleteProject()

  async function handleDeleteProject(id: number) {
    await mutateDeleteProject(id)
  }

  const router = useRouter()

  const { setTitleHeader } = useContext(AdminContext)

  useEffect(() => {
    setTitleHeader('Painel do Administrador')
  }, [setTitleHeader])

  useEffect(() => {
    if (dataListProjects) {
      setSortedProjects(dataListProjects)
    }
  }, [dataListProjects])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  // função do filteredProjects
  useEffect(() => {
    if (dataListProjects) {
      const filtered = dataListProjects.filter(
        (project: IResponseListProjects) => {
          const searchLower = search.toLowerCase()
          return (
            project.client.name.toLowerCase().includes(searchLower) ||
            project.client.email.toLowerCase().includes(searchLower) ||
            project.project.name.toLowerCase().includes(searchLower) ||
            project.project.key?.toLowerCase().includes(searchLower)
          )
        },
      )

      if (ascOrDescTable.data === 'asc') {
        filtered.sort((a, b) => {
          return (
            new Date(a.project.delivered_date).getTime() -
            new Date(b.project.delivered_date).getTime()
          )
        })
      } else {
        filtered.sort((a, b) => {
          return (
            new Date(b.project.delivered_date).getTime() -
            new Date(a.project.delivered_date).getTime()
          )
        })
      }
      if (ascOrDescTable.project === 'asc') {
        filtered.sort((a, b) => {
          return a.project.name.localeCompare(b.project.name)
        })
      }
      if (ascOrDescTable.project === 'desc') {
        filtered.sort((a, b) => {
          return b.project.name.localeCompare(a.project.name)
        })
      }

      setSortedProjects(filtered)
    }
  }, [search, dataListProjects, ascOrDescTable])

  // Função para ordenar projetos
  function handleSort(option: 'data' | 'project') {
    setAscOrDescTable((prev) => ({
      ...prev,
      [option]: prev[option] === 'asc' ? 'desc' : 'asc',
    }))
  }

  return {
    search,
    ascOrDescTable,
    isPendingDeleteProject,
    variablesDeleteProject,
    isFetchingListProjects,
    isLoadingListProjects,
    errorListProjects,
    router,
    sortedProjects,
    isCopied,
    handleSearch,
    handleSort,
    handleCopy,
    refetchListProjects,
    handleDeleteProject,
  }
}
