const fs = require('fs');
const http = require('http');
const execSync = require('child_process').execSync;
const path = require('path');

const watchFileName = 'TiddlyWiki.html';
const watchDir = path.resolve(process.env.HOME, 'Downloads');
const watchFilepath = path.resolve(watchDir, watchFileName);
const root = path.dirname(__filename);
const serverPort = 8848;
const rootWikiPath = path.resolve(root, watchFileName);
const commitScriptPath = path.resolve(root, 'script', 'commit.sh');

const config = {
  watchFileName,
  watchDir,
  watchFilepath,
  root,
  serverPort,
  rootWikiPath,
  commitScriptPath,
};

console.log(`current config \n ${JSON.stringify(config, null, '\t')}\n`);

http
  .createServer(function(req, res) {
    if (req.url !== `/${watchFileName}`) {
      res.writeHead(302, { Location: `http://127.0.0.1:${serverPort}/${watchFileName}` });
      res.end();
      return;
    }
    fs.readFile(rootWikiPath, function(_, data) {
      res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
      res.write(data);
      res.end();
    });
  })
  .listen(serverPort);

console.log(`wiki start at http://127.0.0.1:${serverPort}/${watchFileName}`);

fs.watch(watchDir, function(_, filename) {
  if (filename !== watchFileName) {
    return;
  }
  fs.exists(watchFilepath, function(exise) {
    if (!exise) {
      return;
    }
    fs.rename(watchFilepath, rootWikiPath, err => {
      if (!err) {
        execSync(`/bin/sh ${commitScriptPath}`, () => {});
      }
    });
  });
});

console.log(`wiki watch ${watchDir} now`);
