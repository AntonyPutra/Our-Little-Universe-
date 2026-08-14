import type { NextConfig } from "next";
import fs from "fs";

// Patch fs.readlink to fix EISDIR on Windows exFAT volumes
const originalReadlink = fs.readlink;
(fs as any).readlink = function(path: any, options: any, callback: any) {
  if (typeof options === 'function') {
    callback = options;
    options = undefined;
  }
  originalReadlink(path, options, (err, linkString) => {
    if (err && err.code === 'EISDIR') {
      const newErr = new Error(`EINVAL: invalid argument, readlink '${path}'`);
      (newErr as any).code = 'EINVAL';
      return callback(newErr);
    }
    callback(err, linkString);
  });
};

const originalReadlinkSync = fs.readlinkSync;
// @ts-ignore
fs.readlinkSync = function(path: any, options: any) {
  try {
    return originalReadlinkSync(path, options);
  } catch (err: any) {
    if (err.code === 'EISDIR') {
      const newErr = new Error(`EINVAL: invalid argument, readlink '${path}'`);
      (newErr as any).code = 'EINVAL';
      throw newErr;
    }
    throw err;
  }
};

if (fs.promises) {
  const originalPromisesReadlink = fs.promises.readlink;
  // @ts-ignore
  fs.promises.readlink = async function(path: any, options: any) {
    try {
      return await originalPromisesReadlink(path, options);
    } catch (err: any) {
      if (err.code === 'EISDIR') {
        const newErr = new Error(`EINVAL: invalid argument, readlink '${path}'`);
        (newErr as any).code = 'EINVAL';
        throw newErr;
      }
      throw err;
    }
  };
}

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.symlinks = false;
    return config;
  },
};

export default nextConfig;
