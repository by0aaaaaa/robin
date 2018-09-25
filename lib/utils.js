const download = require('download-git-repo');

/**
 * download git project
 * @param {string} url 
 * @param {string} target 
 * @param {object} options 
 */
async function downloadSync(url, target, options = { clone: false }) {
    return new Promise((resolve, reject) => {
        download(url, target, options, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        })
    })
}

exports.downloadSync = downloadSync;