import React from 'react'
import makeLoadable from 'rmw-shell/lib/containers/MyLoadable'
import RestrictedRoute from 'rmw-shell/lib/containers/RestrictedRoute'


const MyLoadable = (opts, preloadComponents) => makeLoadable({ ...opts, firebase: () => import('./firebase') }, preloadComponents)

const AsyncDashboard = MyLoadable({ loader: () => import('./containers/Dashboard/Dashboard') });
const AsyncDocument = MyLoadable({ loader: () => import('./containers/Document/Document') });
const AsyncCollection = MyLoadable({ loader: () => import('./containers/Collection/Collection') });
const AsyncAbout = MyLoadable({ loader: () => import('./containers/About/About') });
const AsyncTask = MyLoadable({ loader: () => import('./containers/Tasks/Task') });
const AsyncTasks = MyLoadable({ loader: () => import('./containers/Tasks/Tasks') }, [AsyncTask]);
const AsyncCompany = MyLoadable({ loader: () => import('./containers/Companies/Company') });
const AsyncCompanies = MyLoadable({ loader: () => import('./containers/Companies/Companies') }, [AsyncCompany]);
const AsyncTest = MyLoadable({ loader: () => import('./containers/Tests/Test') });
const AsyncPool = MyLoadable({ loader: () => import('./containers/Pools/Pool') });
const AsyncPools = MyLoadable({ loader: () => import('./containers/Pools/Pools') }, [AsyncPool]);
const AsyncMatches = MyLoadable({ loader: () => import('./containers/Matches/WelcomeBuilder') }, [AsyncPool]);


const Routes = [
    <RestrictedRoute type='private' path="/" exact component={AsyncDashboard} />,
    <RestrictedRoute type='private' path="/dashboard" exact component={AsyncDashboard} />,
    <RestrictedRoute type='private' path="/tasks" exact component={AsyncTasks} />,
    <RestrictedRoute type='private' path="/tasks/edit/:uid" exact component={AsyncTask} />,
    <RestrictedRoute type='private' path="/tasks/create" exact component={AsyncTask} />,
    <RestrictedRoute type='private' path="/companies" exact component={AsyncCompanies} />,
    <RestrictedRoute type='private' path="/companies/edit/:uid" exact component={AsyncCompany} />,
    <RestrictedRoute type='private' path="/companies/create" exact component={AsyncCompany} />,
    <RestrictedRoute type='private' path="/about" exact component={AsyncAbout} />,
    <RestrictedRoute type='private' path="/document" exact component={AsyncDocument} />,
    <RestrictedRoute type='private' path="/collection" exact component={AsyncCollection} />,
    <RestrictedRoute type='private' path="/test" exact component={AsyncTest} />,
    <RestrictedRoute type='private' path="/pools" exact component={AsyncPools} />,
    <RestrictedRoute type='private' path="/pools/edit/:uid" exact component={AsyncPool} />,
    <RestrictedRoute type='private' path="/pools/create" exact component={AsyncPool} />,
    <RestrictedRoute type='private' path="/matches" exact component={AsyncMatches} />
]

export default Routes;