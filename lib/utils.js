const download = require('download-git-repo');
const fs = require('fs');
const path = require('path');

/**
 * download git project
 * @param {string} url
 * @param {string} target
 * @param {object} options
 */
async function downloadSync(url, target, options = { clone: false }) {
  return new Promise((resolve, reject) => {
    download(url, target, options, err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

/*
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param dist {String} 复制到目标目录
 */
function copyDir(src, dist) {
  if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist);
  }

  const files = fs.readdirSync(src);

  files.forEach(function(file) {
    let _src = path.join(src, file);
    let _dist = path.join(dist, file);

    let srcStat = fs.statSync(_src);
    // 判断是文件还是目录
    if (srcStat.isFile()) {
      if (!fs.existsSync(_dist)) fs.writeFileSync(_dist, fs.readFileSync(_src));
    } else if (srcStat.isDirectory()) {
      // 当是目录是，递归复制
      copyDir(_src, _dist);
    }
  });
}

function rmDir(dir) {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      if (fs.statSync(path.join(dir, file)).isDirectory()) {
        rmDir(path.join(dir, file));
      } else {
        fs.unlinkSync(path.join(dir, file));
      }
    });
    fs.rmdirSync(dir);
  }
}

module.exports = { downloadSync, copyDir, rmDir };
