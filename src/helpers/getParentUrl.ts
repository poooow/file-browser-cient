export function  getParentUrl(url: URL) {
  let path = url.pathname.replace(/\/$/, '');  
  let parentPath = path.substring(0, path.lastIndexOf('/')) || '/';
  
  return parentPath;
}