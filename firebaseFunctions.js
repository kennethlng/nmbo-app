const { join } = require('path')
const { https } = require('firebase-functions')
const { default: next } = require('next')

const isDev = process.env.NODE_ENV !== 'production'
const nextjsDistDir = join('src', require('./src/next.config.js').distDir)

const nextjsServer = next({
  dev: isDev,
  conf: {
    distDir: nextjsDistDir,
  },
})
const nextjsHandle = nextjsServer.getRequestHandler()

// Next.js
exports.nextjsFunc = https.onRequest((req, res) => {
  return nextjsServer.prepare().then(() => nextjsHandle(req, res))
})

// Firestore triggers
exports.onCreateProject = require('./functions/lib/db/onCreateProject').onCreateProject; 
exports.onDeleteProject = require('./functions/lib/db/onDeleteProject').onDeleteProject;
exports.onUpdateProjectTitle = require('./functions/lib/db/onUpdateProjectTitle').onUpdateProjectTitle;
exports.onIncrementUserProjectVisitCounter = require('./functions/lib/db/onIncrementUserProjectVisitCounter').onIncrementUserProjectVisitCounter;