export interface IResponseListProjectsDelivered {
  title: string
  data: {
    count: number
    date: string
  }[]
}

export interface IProjectsFormatted {
  mes: string
  projetos: number
  data: string
}
