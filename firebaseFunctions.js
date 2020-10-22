const { join } = require('path')
const { https } = require('firebase-functions')
const { default: next } = require('next')
const { onCreateProject } = require('./src/lib/onCreateProject');
const { onCreateProjectTask } = require('./src/lib/onCreateProjectTask');
const { onDeleteProject } = require('./src/lib/onDeleteProject');
const { onIncrementUserProjectVisitCounter } = require('./src/lib/onIncrementUserProjectVisitCounter');
const { onUpdateProjectTitle } = require('./src/lib/onUpdateProjectTitle');
const { onWriteProjectTaskUpdateProjectModified } = require('./src/lib/onWriteProjectTaskUpdateProjectModified');

const isDev = process.env.NODE_ENV !== 'production'
const nextjsDistDir = join('src', require('./src/next.config.js').distDir)

const nextjsServer = next({
  dev: isDev,
  conf: {
    distDir: nextjsDistDir,
  },
})
const nextjsHandle = nextjsServer.getRequestHandler()

exports.nextjsFunc = https.onRequest((req, res) => {
  return nextjsServer.prepare().then(() => nextjsHandle(req, res))
})

exports.onCreateProject = onCreateProject;
exports.onUpdateProjectTitle = onUpdateProjectTitle;
exports.onCreateProjectTask = onCreateProjectTask; 
exports.onDeleteProject = onDeleteProject; 
exports.onWriteProjectTaskUpdateProjectModified = onWriteProjectTaskUpdateProjectModified;
exports.onIncrementUserProjectVisitCounter = onIncrementUserProjectVisitCounter; 