import React from 'react'
import Loadable from 'react-loadable'
import Loading from '../../components/loading'

const LoadableLogin = Loadable({
  loader: () => import('./'),
  loading: Loading,
})

export default () => <LoadableLogin />