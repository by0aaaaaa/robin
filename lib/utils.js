const download = require('download-git-repo');

async function downloadSync(url,target,options={clone:true}){
    return new Promise((resolve,reject)=>{
        download(url,target,options,(err)=>{
            if(err){
                reject(err);
                return;
            }
            resolve();
        })
    })
}

exports.downloadSync = downloadSync;