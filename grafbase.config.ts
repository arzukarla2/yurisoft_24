import { graph, config, auth } from '@grafbase/sdk'

// Welcome to Grafbase!
//
// Configure authentication, data sources, resolvers and caching for your GraphQL API.

const g = graph.Standalone()

const user = g.type('User', {
  name: g.string().optional(),
  email: g.string().optional(),
  avatarUrl: g.url(),
  description: g.string().optional(),
  githubUrl: g.url().optional(),
  linkedinUrl: g.url().optional(), 
  projects: g.string().list().optional()
})//.auth((rules) => {
  //rules.public().read()
//})

const Project = g.type('Project', {
  title: g.string().optional(),
  description: g.string(), 
  image: g.url(),
  liveSiteUrl: g.url(), 
  githubUrl: g.url(), 
  category: g.string().optional(),
  createdBy: g.string().optional(),
})//.auth((rules) => {
  //rules.public().read()
  //  rules.private().create().delete().update()
 // })
const jwt=auth.JWT({
  issuer:'grafbase',
  secret: g.env('NEXTAUTH_SECRET')
})
//.auth((rules) => {
//rules.public().read()
 // rules.private().create().delete().update()
//})

export default config({
  graph: g,
  // Authentication - https://grafbase.com/docs/auth
  auth: {
     //providers: [jwt],
     // rules: (rules) => rules.private()
   // },
    // OpenID Connect
    // const oidc = auth.OpenIDConnect({ issuer: g.env('OIDC_ISSUER_URL') })
    // providers: [oidc],
    rules: (rules) => {
      rules.public()
    },
  },
  // Caching - https://grafbase.com/docs/graphql-edge-caching
  // cache: {
  //   rules: [
  //     {
  //       types: ['Query'], // Cache everything for 60 seconds
  //       maxAge: 60,
  //       staleWhileRevalidate: 60
  //     }
  //   ]
  // }
})
