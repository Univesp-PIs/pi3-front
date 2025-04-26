import axios, { AxiosError } from 'axios'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { destroyCookie, parseCookies } from 'nookies'

import { AuthTokenError } from '../errors/AuthTokenError'

interface AxiosErrorResponse {
  error?: string
}

type Context = undefined | GetServerSidePropsContext

type FailedRequestQueue = {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

const failedRequestsQueue = Array<FailedRequestQueue>()

export function setupAPIClient(ctx: Context = undefined) {
  let cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'https://engsol-django-render.onrender.com',
    headers: {
      Authorization: `Bearer ${cookies['engsol.token']}`,
    },
  })

  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${cookies['engsol.token']}`
    return config
  })

  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error: AxiosError<AxiosErrorResponse>) => {
      // const router = useRouter()
      // const navigation = useNavigation()
      if (error.response?.status === 401) {
        const router = useRouter()
        router.reload()
        if (error.response.data.error === 'Token inválido') {
          router.reload()
          const originalConfig = error.config
          // renovar token
          cookies = parseCookies()

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                if (!originalConfig?.headers) {
                  return // Eu coloquei um return mas pode colocar algum erro ou um reject
                }

                originalConfig.headers.Authorization = `Bearer ${token}`
                resolve(api(originalConfig))
              },
              onFailure: (err: AxiosError) => {
                reject(err)
              },
            })
          })
        } else {
          axios.defaults.headers.common.Authorization = false
          destroyCookie(null, 'engsol.data', {
            path: '/',
          })
          destroyCookie(null, 'engsol.token', {
            path: '/',
          })
          // deslogar o usuário
          if (process.browser) {
            destroyCookie(null, 'engsol.data', {
              path: '/',
            })
            destroyCookie(null, 'engsol.token', {
              path: '/',
            })
          } else {
            return Promise.reject(new AuthTokenError())
          }
        }
      }

      return Promise.reject(error)
    },
  )

  return api
}
