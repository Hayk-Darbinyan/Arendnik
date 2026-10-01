# Bundles a single self-contained preview page (inline data, no backend, placeholder art instead of photos).
# Usage (after npm install):  python3 build-preview.py [out.html]
import re, os, sys, shutil, subprocess
out = sys.argv[1] if len(sys.argv) > 1 else '../homely-preview.html'
os.makedirs('.preview', exist_ok=True)
app = open('src/App.jsx').read()
helper = """const pal=[['#dfe6fb','#9fb4f0'],['#c9d6fa','#6f8be0'],['#e8eefc','#b8c6ef'],['#1E3BB3','#5a76e0']];
const img=(id)=>{const p=pal[[...id].reduce((a,c)=>a+c.charCodeAt(0),0)%pal.length];
const svg=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' preserveAspectRatio='xMidYMid slice'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop stop-color='${p[0]}'/><stop offset='1' stop-color='${p[1]}'/></linearGradient></defs><rect width='400' height='300' fill='url(#g)'/><rect x='240' y='40' width='110' height='140' rx='4' fill='#fff' opacity='.25'/><rect x='40' y='190' width='200' height='60' rx='12' fill='#000' opacity='.22'/><rect x='260' y='200' width='90' height='50' rx='8' fill='#000' opacity='.15'/></svg>`;
return 'data:image/svg+xml;utf8,'+encodeURIComponent(svg).replace(/\\(/g,'%28').replace(/\\)/g,'%29').replace(/'/g,'%27')};
"""
app = re.sub(r"const img = .*\n", lambda m: helper, app)
app = app.replace("useState(() => localStorage.getItem('lang') || 'en')", "useState(() => { try { return localStorage.getItem('lang') || 'en' } catch { return 'en' } })")
app = app.replace("localStorage.setItem('lang', lang);", "try { localStorage.setItem('lang', lang) } catch {};")
app = re.sub(r"const r = await fetch\('/api/contact'.*\n\s*if \(!r.ok\) throw 0\n", "await new Promise(r => setTimeout(r, 700))\n", app)
open('.preview/App.jsx', 'w').write(app)
[shutil.copy('src/' + f, '.preview/' + f) for f in ('i18n.js', 'links.js')]
open('.preview/main.jsx', 'w').write("import { createRoot } from 'react-dom/client'\nimport App from './App.jsx'\ncreateRoot(document.getElementById('root')).render(<App />)\n")
subprocess.run(['npx', 'esbuild', '.preview/main.jsx', '--bundle', '--minify', '--format=iife', '--define:process.env.NODE_ENV="production"', '--outfile=.preview/out.js'], check=True)
js = open('.preview/out.js').read().replace('</script', '<\\/script'); css = open('src/styles.css').read()
open(out, 'w').write(f"""<!doctype html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/><title>Arendnik — preview</title>
<link href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700&display=swap" rel="stylesheet"/><style>{css}</style></head><body><div id="root"></div><script>{js}</script></body></html>""")
