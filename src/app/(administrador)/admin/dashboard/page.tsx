'use client'

import { Button } from '@/components/Button'
import { ModalGeneric } from '@/components/Modal'
import { HiOutlineRefresh } from 'react-icons/hi'
import { useDashboardHook } from './useDashboardHook'
import toast from 'react-hot-toast'
import { MdOutlineCopyAll } from 'react-icons/md'

export default function Dashboard() {
  const {
    handleSearch,
    handleDeleteProject,
    getSortIcon,
    refetchListProjects,
    // requestSort,
    search,
    router,
    isFetchingListProjects,
    isLoadingListProjects,
    isPendingDeleteProject,
    errorListProjects,
    sortedProjects,
    variablesDeleteProject,
    handleCopy,
    isCopied,
  } = useDashboardHook()

  return (
    <section className="w-full flex justify-center">
      <div className="w-full max-w-screen-xl flex-col px-4 xl:px-0 py-4 lg:py-20 flex gap-4">
        <div className="flex w-full justify-end items-center gap-8">
          <HiOutlineRefresh
            size={25}
            title="Atualizar Projetos"
            className={`cursor-pointer ${isFetchingListProjects || isLoadingListProjects ? 'animate-spin' : ''}`}
            onClick={() => refetchListProjects()}
          />
          <input
            type="text"
            placeholder="Pesquisar..."
            value={search}
            onChange={handleSearch}
            className="p-2 border border-gray-300 rounded-md font-bold outline-none w-fit"
          />
        </div>

        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white border border-black">
            <thead>
              <tr className="bg-[#D9D9D9]">
                <th
                  // onClick={() => requestSort('name')}
                  className="py-2 px-4 text-left cursor-pointer"
                >
                  Projeto {getSortIcon('name')}
                </th>
                <th
                  // onClick={() => requestSort('name')}
                  className="py-2 px-4 text-left cursor-pointer"
                >
                  Cliente {getSortIcon('name')}
                </th>
                <th
                  // onClick={() => requestSort('email')}
                  className="py-2 px-4 text-left cursor-pointer"
                >
                  Email {getSortIcon('email')}
                </th>
                <th
                  // onClick={() => requestSort('email')}
                  className="py-2 px-4 text-left cursor-pointer"
                >
                  Etapa {getSortIcon('email')}
                </th>
                <th
                  // onClick={() => requestSort('key')}
                  className="py-2 px-4 text-left cursor-pointer"
                >
                  Chave de Acesso {getSortIcon('key')}
                </th>
                <th className="py-2 px-4 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingListProjects ? (
                Array.from({ length: 7 }).map((_, index) => (
                  <tr key={index} className="animate-pulse py-2">
                    <td colSpan={6}>
                      <div className="py-2 px-4 h-14 w-full bg-slate-300" />
                    </td>
                  </tr>
                ))
              ) : errorListProjects ? (
                <tr>
                  <td colSpan={6} className="py-2 px-4 text-center">
                    Erro ao carregar os projetos
                  </td>
                </tr>
              ) : sortedProjects.length > 0 ? (
                sortedProjects.map((project) => (
                  <tr
                    key={project.project.id}
                    className="border-t border-black"
                  >
                    <td className="py-2 px-4 font-semibold">
                      {project?.project.name}
                    </td>
                    <td className="py-2 px-4">{project.client.name}</td>
                    <td className="py-2 px-4">{project.client.email}</td>
                    <td className="py-2 px-4">
                      {project?.timeline.find(
                        (step) => step.ranking.note === 'in progress',
                      )?.ranking.condition.name || 'Não iniciado'}
                    </td>
                    <td className="py-2 px-4 gap-4">
                      {project?.project.key}
                      {isCopied.status && isCopied.id === project.project.id ? (
                        <span className="block text-green-600 font-medium ">
                          Copiada!
                        </span>
                      ) : (
                        <MdOutlineCopyAll
                          size={25}
                          title="Copiar chave de acesso"
                          className="cursor-pointer"
                          onClick={() =>
                            project.project.key
                              ? handleCopy(
                                  project.project.id,
                                  project.project.key,
                                )
                              : toast.error('Chave de acesso não encontrada')
                          }
                        />
                      )}
                    </td>
                    <td className="py-2 px-4 flex flex-wrap gap-4">
                      {/* <Button title="Enviar Email" /> */}
                      <Button
                        title="Visualizar"
                        onClick={() =>
                          router.push(`/pedido/${project.project.key}`)
                        }
                      />
                      <Button
                        title="Editar"
                        onClick={() =>
                          router.push(
                            `/admin/projeto/editar/${project.project.id}`,
                          )
                        }
                      />
                      <ModalGeneric
                        title="Excluir Projeto"
                        button={
                          <Button
                            title="Excluir"
                            variant="error"
                            isLoading={
                              isPendingDeleteProject &&
                              variablesDeleteProject === project.project.id
                            }
                          />
                        }
                        description="Tem certeza que deseja excluir o projeto? Essa ação não poderá ser desfeita."
                        onConfirm={() =>
                          handleDeleteProject(project.project.id)
                        }
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-2 px-4 text-center">
                    Nenhum projeto encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex gap-4 w-full justify-center">
          <Button
            title="Criar Projeto"
            variant="primary"
            onClick={() => router.push('/admin/projeto/criar')}
          />
          <Button
            title="Criar status"
            onClick={() => router.push('/admin/status')}
          />
        </div>
      </div>
    </section>
  )
}
