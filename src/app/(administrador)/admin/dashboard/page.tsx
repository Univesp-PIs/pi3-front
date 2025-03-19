'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useContext, useEffect, useMemo, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import { HiOutlineRefresh } from 'react-icons/hi'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import {
  IProjectsFormatted,
  IResponseListProjectsDelivered,
} from '@/@types/graph'
import { Button } from '@/components/Button'
import { AdminContext } from '@/contexts/AdminContext'

export default function Dashboard() {
  const { setTitleHeader } = useContext(AdminContext)
  const yearNow = new Date().getFullYear()

  const [projectsYear, setProjectsYear] = useState(yearNow.toString())
  const [projects, setProjects] = useState<IProjectsFormatted[]>([])

  const router = useRouter()

  useEffect(() => {
    setTitleHeader('Dashboard')
  }, [setTitleHeader])

  const dataProjects = useMemo(
    () => ({
      title: 'Projetos entregues',
      data: [
        { count: 10, date: '01/01/2025' },
        { count: 20, date: '02/01/2024' },
        { count: 25, date: '03/01/2022' },
        { count: 15, date: '04/01/2026' },
        { count: 18, date: '05/01/2023' },
        { count: 23, date: '06/01/2022' },
        { count: 34, date: '07/01/2021' },
        { count: 34, date: '08/01/2020' },
        { count: 34, date: '09/01/2025' },
        { count: 34, date: '10/01/2025' },
        { count: 34, date: '11/01/2025' },
        { count: 34, date: '12/01/2025' },
      ],
    }),
    [],
  )

  const data = [
    { name: 'Jan', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Fev', uv: 300, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 200, pv: 9800, amt: 2290 },
    { name: 'Abr', uv: 278, pv: 3908, amt: 2000 },
    { name: 'Mai', uv: 189, pv: 4800, amt: 2181 },
    { name: 'Jun', uv: 239, pv: 3800, amt: 2500 },
    { name: 'Jul', uv: 349, pv: 4300, amt: 2100 },
    { name: 'Ago', uv: 349, pv: 4300, amt: 2100 },
    { name: 'Set', uv: 349, pv: 4300, amt: 2100 },
    { name: 'Out', uv: 349, pv: 4300, amt: 2100 },
    { name: 'Nov', uv: 349, pv: 4300, amt: 2100 },
    { name: 'Dez', uv: 349, pv: 4300, amt: 2100 },
  ]

  useEffect(() => {
    function formatProjects(
      data: IResponseListProjectsDelivered,
    ): IProjectsFormatted[] {
      const projectsFormatted = data.data
        .filter((item) => item.date.split('/')[2] === projectsYear)
        .sort(
          (a, b) => Number(a.date.split('/')[1]) - Number(b.date.split('/')[1]),
        )
        .map((item) => ({
          mes: format(new Date(item.date), 'MMM', { locale: ptBR }),
          projetos: item.count,
          data: data.title,
        }))
      return projectsFormatted
    }

    const response = formatProjects(dataProjects)
    setProjects(response)
  }, [projectsYear, dataProjects])

  // criar array com os anos do dataProjects sem repetir
  const yearsProject = dataProjects.data
    .map((item) => item.date.split('/')[2])
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort((a, b) => Number(b) - Number(a))

  function handleChangeYear(event: ChangeEvent<HTMLSelectElement>) {
    setProjectsYear(event.target.value)
  }

  return (
    <section className="w-full flex justify-center">
      <div className="w-full max-w-screen-xl px-4 xl:px-0 py-4 lg:py-20 flex flex-col gap-4">
        <div className="w-full h-full flex gap-4">
          <div className="w-full h-full flex flex-col gap-4 items-start">
            <div className="flex gap-4 items-center">
              <h3 className="text-lg font-semibold">Projetos entregues</h3>
              <select
                className="p-2 border border-gray-300 rounded-md font-bold outline-none w-fit"
                value={projectsYear}
                onChange={handleChangeYear}
              >
                {yearsProject.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <ResponsiveContainer height={400}>
              <LineChart width={800} height={400} data={projects}>
                <Line
                  type="monotone"
                  name="Projetos"
                  dataKey="projetos"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <CartesianGrid stroke="#ccc" />
                {/* começar com a primeira letra maiuscula */}
                <XAxis
                  dataKey="mes"
                  tickFormatter={(value) =>
                    value.charAt(0).toUpperCase() + value.slice(1)
                  }
                />
                <XAxis dataKey="mes" />
                <YAxis dataKey="projetos" />
                {/* começar com a primeira letra maiuscula */}
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full h-full flex flex-col gap-4 items-start">
            <h3 className="text-lg font-semibold">Estimado x Custo</h3>
            <ResponsiveContainer height={400}>
              <BarChart width={600} height={300} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Legend />
                <Bar dataKey="uv" barSize={30} fill="#8884d8" />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center">
          <div className="flex items-start gap-4 h-full justify-center shadow-xl hover:shadow-2xl duration-300 p-4 rounded-md">
            <CircularProgressbar
              strokeWidth={10}
              value={25}
              styles={{
                root: { width: 100 },
              }}
            />
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-3xl">65%</h3>
              <p>Projetos entregues no prazo</p>
            </div>
          </div>
          <div className="flex items-start gap-4 h-full justify-center shadow-xl hover:shadow-2xl duration-300 p-4 rounded-md flex-col">
            <h3 className="font-bold text-3xl">30 (dias)</h3>
            <p>Tempo médio para finalizar um projeto</p>
          </div>
          <div className="w-full flex justify-center">
            <HiOutlineRefresh
              size={100}
              title="Atualizar Projetos"
              // className={`cursor-pointer ${isFetchingListProjects || isLoadingListProjects ? 'animate-spin' : ''}`}
              // onClick={() => refetchListProjects()}
            />
          </div>
          <div className="flex items-start gap-4 h-full justify-center shadow-xl hover:shadow-2xl duration-300 p-4 rounded-md flex-col">
            <h3 className="font-bold text-3xl">
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(2000)}
            </h3>
            <p>Custo médio de um projeto</p>
          </div>
          <div className="flex items-start gap-4 h-full justify-center shadow-xl hover:shadow-2xl duration-300 p-4 rounded-md">
            <CircularProgressbar
              strokeWidth={10}
              value={98}
              styles={{
                root: { width: 100 },
              }}
            />
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-3xl">98%</h3>
              <p>Projetos dentro do custo</p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center pt-8">
          <Button
            type="button"
            variant="primary"
            onClick={() => router.push('/admin/projetos')}
            title="Ver projetos"
          />
        </div>
      </div>
    </section>
  )
}
