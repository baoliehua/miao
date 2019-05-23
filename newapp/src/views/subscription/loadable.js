import React from 'react'
import Loadable from 'react-loadable'
import Loading from '../../components/loading'

const LoadableSubscription = Loadable({
  loader: () => import('./'),
  loading: Loading,
})

export default () => <LoadableSubscription />