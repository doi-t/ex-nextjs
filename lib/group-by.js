// https://stackoverflow.com/a/38575908
// https://gist.github.com/robmathers/1830ce09695f759bf2c4df15c29dd22d
export function groupBy(nodes, key) {
  return nodes.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}
