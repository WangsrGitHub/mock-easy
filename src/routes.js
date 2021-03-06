import MeProject from './pages/project'
import MeApiList from './pages/api'
import MeServer from './pages/server'
import MeEditor from './pages/editor'
import MeCreateProject from './pages/project/create'

export default [
  { name: 'project', component: MeProject },
  { name: 'api', component: MeApiList },
  { name: 'server', component: MeServer },
  { name: 'editor', component: MeEditor },
  { name: 'create', component: MeCreateProject }
]
