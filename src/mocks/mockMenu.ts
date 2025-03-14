import { menuAdmin } from '@/@types/menu'

export const mockMenu: menuAdmin[] = [
  {
    id: 1,
    name: 'Dashboard',
    link: '/admin/dashboard',
  },
  {
    id: 2,
    name: 'Criar um projeto',
    link: '/admin/projeto/criar',
  },
  {
    id: 3,
    name: 'Listar e criar status',
    link: '/admin/status',
  },
]
