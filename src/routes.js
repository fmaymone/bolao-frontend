import React from 'react'
import makeLoadable from 'rmw-shell/lib/containers/MyLoadable'
import RestrictedRoute from 'rmw-shell/lib/containers/RestrictedRoute'


const MyLoadable = (opts, preloadComponents) => makeLoadable({ ...opts, firebase: () => import('./firebase') }, preloadComponents)

const AsyncDashboard = MyLoadable({ loader: () => import('./containers/Dashboard/Dashboard') });
const AsyncAbout = MyLoadable({ loader: () => import('./containers/About/About') });
const AsyncTest = MyLoadable({ loader: () => import('./containers/Tests/Test') });
const AsyncPool = MyLoadable({ loader: () => import('./containers/Pools/Pool') });
const AsyncPoolDetails = MyLoadable({ loader: () => import('./containers/Pools/PoolDetails') });
const AsyncPools = MyLoadable({ loader: () => import('./containers/Pools/Pools') }, [AsyncPool]);
const AsyncMatches = MyLoadable({ loader: () => import('./containers/Matches/WelcomeBuilder') }, [AsyncPool]);
const AsyncMyPools = MyLoadable({ loader: () => import('./containers/Pools/MyPools') }, [AsyncPool]);


const Routes = [
    <RestrictedRoute type='private' path="/" exact component={AsyncDashboard} />,
    <RestrictedRoute type='private' path="/dashboard" exact component={AsyncDashboard} />,
    <RestrictedRoute type='private' path="/about" exact component={AsyncAbout} />,
    <RestrictedRoute type='private' path="/test" exact component={AsyncTest} />,
    <RestrictedRoute type='private' path="/pools" exact component={AsyncPools} />,
    <RestrictedRoute type='private' path="/pools/edit/:uid" exact component={AsyncPool} />,
    <RestrictedRoute type='private' path="/pools/show/:uid" exact component={AsyncPoolDetails} />,
    <RestrictedRoute type='private' path="/pools/create" exact component={AsyncPool} />,
    <RestrictedRoute type='private' path="/matches" exact component={AsyncMatches} />,
    <RestrictedRoute type='private' path="/mypools" exact component={AsyncMyPools} />
]

export default Routes;