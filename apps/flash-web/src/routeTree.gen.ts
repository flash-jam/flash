/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthenticatedImport } from './routes/_authenticated'

// Create Virtual Routes

const AuthenticatedIndexLazyImport = createFileRoute('/_authenticated/')()
const AuthenticatedStatsLazyImport = createFileRoute('/_authenticated/stats')()
const AuthenticatedFlashLazyImport = createFileRoute('/_authenticated/flash')()

// Create/Update Routes

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedIndexLazyRoute = AuthenticatedIndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthenticatedRoute,
} as any).lazy(() =>
  import('./routes/_authenticated/index.lazy').then((d) => d.Route),
)

const AuthenticatedStatsLazyRoute = AuthenticatedStatsLazyImport.update({
  id: '/stats',
  path: '/stats',
  getParentRoute: () => AuthenticatedRoute,
} as any).lazy(() =>
  import('./routes/_authenticated/stats.lazy').then((d) => d.Route),
)

const AuthenticatedFlashLazyRoute = AuthenticatedFlashLazyImport.update({
  id: '/flash',
  path: '/flash',
  getParentRoute: () => AuthenticatedRoute,
} as any).lazy(() =>
  import('./routes/_authenticated/flash.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/flash': {
      id: '/_authenticated/flash'
      path: '/flash'
      fullPath: '/flash'
      preLoaderRoute: typeof AuthenticatedFlashLazyImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/stats': {
      id: '/_authenticated/stats'
      path: '/stats'
      fullPath: '/stats'
      preLoaderRoute: typeof AuthenticatedStatsLazyImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/': {
      id: '/_authenticated/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthenticatedIndexLazyImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedRouteChildren {
  AuthenticatedFlashLazyRoute: typeof AuthenticatedFlashLazyRoute
  AuthenticatedStatsLazyRoute: typeof AuthenticatedStatsLazyRoute
  AuthenticatedIndexLazyRoute: typeof AuthenticatedIndexLazyRoute
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedFlashLazyRoute: AuthenticatedFlashLazyRoute,
  AuthenticatedStatsLazyRoute: AuthenticatedStatsLazyRoute,
  AuthenticatedIndexLazyRoute: AuthenticatedIndexLazyRoute,
}

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof AuthenticatedRouteWithChildren
  '/flash': typeof AuthenticatedFlashLazyRoute
  '/stats': typeof AuthenticatedStatsLazyRoute
  '/': typeof AuthenticatedIndexLazyRoute
}

export interface FileRoutesByTo {
  '/flash': typeof AuthenticatedFlashLazyRoute
  '/stats': typeof AuthenticatedStatsLazyRoute
  '/': typeof AuthenticatedIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/_authenticated/flash': typeof AuthenticatedFlashLazyRoute
  '/_authenticated/stats': typeof AuthenticatedStatsLazyRoute
  '/_authenticated/': typeof AuthenticatedIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '' | '/flash' | '/stats' | '/'
  fileRoutesByTo: FileRoutesByTo
  to: '/flash' | '/stats' | '/'
  id:
    | '__root__'
    | '/_authenticated'
    | '/_authenticated/flash'
    | '/_authenticated/stats'
    | '/_authenticated/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_authenticated"
      ]
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/flash",
        "/_authenticated/stats",
        "/_authenticated/"
      ]
    },
    "/_authenticated/flash": {
      "filePath": "_authenticated/flash.lazy.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/stats": {
      "filePath": "_authenticated/stats.lazy.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/": {
      "filePath": "_authenticated/index.lazy.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
