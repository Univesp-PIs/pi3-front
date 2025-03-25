type IProject = {
  id: number
  name: string
  cost_estimate: number
  delivered_date: string
  key?: string
}

type IClient = {
  id?: number
  name: string
  email: string
}

type ITimeline = {
  ranking: {
    id: number
    rank: string
    last_update: string
    note: 'waiting' | 'in progress' | 'done'
    description: string
    condition: {
      id: number
      name?: string
    }
  }
}

export interface IResponseListProjects {
  project: IProject
  client: IClient
  timeline: ITimeline[]
}

export type IResponseGetProject = IResponseListProjects

export interface ICreateProjectParams {
  project: IProject
  client: IClient
  timeline: ITimeline[]
}

export type IUpdateProjectParams = IResponseGetProject
