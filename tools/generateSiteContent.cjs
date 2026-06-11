const fs = require('fs');
const path = require('path');

function kebab(s) {
  return s
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
}

function extract(file) {
  const content = fs.readFileSync(file, 'utf8');
  const hMatch = content.match(/<h[1-3][^>]*>([\s\S]*?)<\/[hH][1-3]>/i);
  const pMatch = content.match(/<p[^>]*>([\s\S]*?)<\/[pP]>/i);
  const title = hMatch ? hMatch[1].replace(/<[^>]+>/g, '').trim() : null;
  let summary = pMatch ? pMatch[1].replace(/<[^>]+>/g, '').trim() : null;
  if (!summary) {
    const bigMatch = content.match(/AI Executive Summary([\s\S]{0,300})</i);
    if (bigMatch) summary = bigMatch[0].replace(/<[^>]+>/g, '').trim();
  }
  return { title, summary };
}

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fp = path.join(dir, file);
    const stat = fs.statSync(fp);
    if (stat && stat.isDirectory()) results = results.concat(walk(fp));
    else if (file.endsWith('.tsx')) results.push(fp);
  });
  return results;
}

const pagesDir = path.join(__dirname, '..', 'src', 'app', 'pages');
const files = walk(pagesDir);

const out = [];
files.forEach((f) => {
  const rel = path.relative(path.join(__dirname, '..', 'src', 'app'), f);
  const parts = rel.split(path.sep);
  const name = path.basename(f, '.tsx');
  const { title, summary } = extract(f);
  let route = '/' + kebab(name);
  if (name.toLowerCase() === 'dashboard') route = '/';
  if (parts.length > 2) {
    route = '/dashboards/' + kebab(name);
  }
  out.push({ path: route, title: title || name, summary: summary || '', source: rel });
});

const dest = path.join(__dirname, '..', 'src', 'app', 'data', 'siteContent.json');
fs.writeFileSync(dest, JSON.stringify(out, null, 2), 'utf8');
console.log('Wrote', dest);
