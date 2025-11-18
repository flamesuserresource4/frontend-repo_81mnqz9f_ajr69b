/* Thandi Front-End Prototype (no frameworks) */
const API_BASE = (window.THANDI_API || '').replace(/\/$/,'') || '';

// Router (very small)
const routes = {};
function route(path, render){ routes[path] = render }
function navigate(path){ history.pushState({}, '', path); render() }
window.addEventListener('popstate', render)

// State
const state = {
  quiz: { step: 0, answers: {} },
  user: null,
  students: { items: [], page: 1, total: 0 },
  networkOnline: navigator.onLine
}

// LocalStorage autosave
const LS_KEY = 'thandi_quiz_v1';
try {
  const saved = JSON.parse(localStorage.getItem(LS_KEY) || 'null');
  if(saved && typeof saved === 'object') state.quiz = saved
} catch {}

window.addEventListener('online', ()=>{ state.networkOnline = true; notify("You're back online – you can continue. ") })
window.addEventListener('offline', ()=>{ state.networkOnline = false; notify("You're offline – answers saved. Re-connect to continue.", 'warn') })

function saveQuiz(){ localStorage.setItem(LS_KEY, JSON.stringify(state.quiz)) }
function clearQuiz(){ localStorage.removeItem(LS_KEY) }

// UI helpers
function el(tag, props={}, ...children){
  const e = document.createElement(tag)
  Object.entries(props).forEach(([k,v])=>{
    if(k === 'class') e.className = v
    else if(k.startsWith('on')) e.addEventListener(k.slice(2).toLowerCase(), v)
    else if(k === 'html') e.innerHTML = v
    else e.setAttribute(k, v)
  })
  children.filter(Boolean).forEach(c=> e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c))
  return e
}

function notify(text, tone){
  const n = el('div', { class: 'banner ' + (tone==='warn'?'warn':'') }, text)
  const c = document.querySelector('#flash');
  c.innerHTML = ''; c.appendChild(n)
  setTimeout(()=>{ if(c.contains(n)) c.removeChild(n) }, 3500)
}

function ensureVerificationFooter(){
  let f = document.getElementById('verification-footer');
  if(!f){
    f = el('div', { id:'verification-footer', class:'footer-note', role:'note' }, 'Verification: data sourced from DHET & QCTO registries.')
    document.body.appendChild(f)
  }
  const obs = new MutationObserver(()=>{
    if(!document.getElementById('verification-footer')){
      console.error('Verification footer missing');
      location.reload()
    }
  })
  obs.observe(document.body, { childList:true })
}

// API helper with retries
async function api(path, opts={}, retries=3){
  const url = API_BASE + path
  try{
    const res = await fetch(url, { headers: { 'Content-Type':'application/json' }, credentials: 'include', ...opts })
    if(!res.ok) throw new Error(String(res.status))
    if(res.status === 204) return null
    return await res.json()
  }catch(err){
    if(retries > 0) return api(path, opts, retries-1)
    throw err
  }
}

// Screens
function Landing(){
  const cta = el('button', { class:'btn', onClick:()=> navigate('/assess') }, 'Start assessment')
  const wrap = el('div', { class:'container center' },
    el('div', { class:'mt-8' }, el('span', { class:'badge' }, 'OK Computer DNA')),
    el('h1', { class:'h1 mt-6' }, 'Careers, safely.'),
    el('p', { class:'p' }, 'Finish in under 60 seconds. Save a PDF. Built for low-end phones.'),
    el('div', { class:'mt-6' }, cta)
  )
  return el('main', { class:'main', role:'main' }, wrap)
}

const QUESTIONS = [
  { id: 'q1', label: 'Which subjects do you enjoy most?', type:'text', placeholder:'e.g., Maths, Life Sciences' },
  { id: 'q2', label: 'Pick your strength', type:'select', options:['Problem solving','People & care','Hands-on','Art & media'] },
  { id: 'q3', label: 'What do you want after school?', type:'select', options:['University','TVET/College','Apprenticeship','Start working'] },
  { id: 'q4', label: 'How comfortable are you with computers?', type:'range', min:1, max:5 }
]

function Progress(){
  const pct = Math.round((state.quiz.step)/QUESTIONS.length*100)
  return el('div', { class:'progress', 'aria-valuemin':'0','aria-valuemax':'100','aria-valuenow':String(pct), role:'progressbar' },
    el('div', { class:'progress-bar', style:`width:${pct}%` })
  )
}

function Assess(){
  ensureVerificationFooter()
  const q = QUESTIONS[state.quiz.step]
  const next = el('button', { class:'btn', onClick:onNext }, state.quiz.step === QUESTIONS.length-1 ? 'See results' : 'Next')
  const back = el('button', { class:'btn ghost', onClick:onBack }, 'Back')

  function onNext(){
    if(state.quiz.step < QUESTIONS.length-1){ state.quiz.step++; saveQuiz(); render() }
    else submit()
  }
  function onBack(){ if(state.quiz.step>0){ state.quiz.step--; saveQuiz(); render() } }

  let field
  if(q.type==='text') field = el('input', { class:'input', type:'text', id:q.id, name:q.id, placeholder:q.placeholder||'', value: state.quiz.answers[q.id]||'', onInput:(e)=>{ state.quiz.answers[q.id]=e.target.value; saveQuiz() } })
  if(q.type==='select') field = el('select', { class:'input', id:q.id, name:q.id, onChange:(e)=>{ state.quiz.answers[q.id]=e.target.value; saveQuiz() } }, ...q.options.map(o=> el('option', { value:o, selected: state.quiz.answers[q.id]===o ? 'selected':null }, o)))
  if(q.type==='range') field = el('input', { class:'input', type:'range', min:q.min, max:q.max, step:'1', value: state.quiz.answers[q.id]||3, onInput:(e)=>{ state.quiz.answers[q.id]=e.target.value; saveQuiz() } })

  const offline = !state.networkOnline ? el('div', { class:'banner warn mt-3' }, "You're offline – answers saved. Re-connect to continue.") : null

  return el('main', { class:'main', role:'main' },
    el('div', { class:'container stack mt-6', style:'padding-bottom:80px' },
      el('div', {}, Progress()),
      el('div', { class:'card' },
        el('label', { class:'label', for:q.id }, q.label),
        field,
        el('div', { class:'row mt-4' }, back, next),
        offline
      )
    )
  )

  async function submit(){
    try{
      const payload = { answers: state.quiz.answers }
      const data = await api('/assess', { method:'POST', body: JSON.stringify(payload) })
      clearQuiz()
      navigate(`/results?id=${encodeURIComponent(data.id || data.resultId || '')}`)
    }catch(err){
      console.error(err)
      notify('Please try again later – code 500', 'warn')
    }
  }
}

function Results(){
  ensureVerificationFooter()
  const params = new URLSearchParams(location.search)
  const id = params.get('id')
  const wrap = el('div', { class:'container stack mt-6', style:'padding-bottom:80px' },
    el('h1', { class:'h1' }, 'Your top careers'),
    el('div', { id:'results-list', class:'stack' }, el('div', { class:'p' }, 'Loading...')),
    el('div', { class:'row mt-4' },
      el('button', { class:'btn', onClick:()=> window.print() }, 'Save PDF'),
      el('button', { class:'btn ghost', onClick:()=> navigate('/') }, 'Restart')
    )
  )
  fetchResults(id)
  return el('main', { class:'main', role:'main' }, wrap)

  async function fetchResults(resultId){
    try{
      const data = await api(`/results/${encodeURIComponent(resultId||'')}`)
      const list = document.getElementById('results-list');
      list.innerHTML = ''
      if(!data || !data.top || data.top.length === 0){
        list.appendChild(el('div', { class:'banner warn' }, 'No careers found – see your teacher.'))
        return
      }
      const ol = el('ol')
      data.top.slice(0,5).forEach((c, i)=>{
        ol.appendChild(el('li', {}, `${i+1}. ${c}`))
      })
      list.appendChild(ol)
    }catch(err){
      const list = document.getElementById('results-list');
      list.innerHTML = ''
      list.appendChild(el('div', { class:'banner warn' }, 'Please try again later – code 500'))
    }
  }
}

// Teacher screens
function Login(){
  const form = el('form', { class:'container stack mt-6 card', onSubmit:onSubmit },
    el('h1', { class:'h2' }, 'Teacher login'),
    el('label', { class:'label', for:'email' }, 'Email'),
    el('input', { id:'email', type:'email', required:'required', class:'input', autocomplete:'username' }),
    el('label', { class:'label', for:'password' }, 'Password'),
    el('input', { id:'password', type:'password', required:'required', class:'input', autocomplete:'current-password' }),
    el('button', { class:'btn mt-3', type:'submit' }, 'Sign in')
  )
  return el('main', { class:'main', role:'main' }, form)

  async function onSubmit(e){
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    try{
      await api('/login', { method:'POST', body: JSON.stringify({ email, password }) })
      state.user = { email }
      navigate('/admin')
    }catch(err){ notify('Please try again later – code 500', 'warn') }
  }
}

function Admin(){
  if(!state.user) return navigate('/login')
  const wrap = el('div', { class:'container stack mt-6' },
    el('h1', { class:'h2' }, 'Dashboard'),
    el('div', { class:'row' },
      el('div', { class:'card', style:'flex:1' }, el('div', { class:'p' }, 'Completion'), el('div', { class:'h1' }, '—')),
      el('div', { class:'card', style:'flex:1' }, el('div', { class:'p' }, 'Top careers'), el('div', { class:'h1' }, '—'))
    ),
    el('div', { class:'card' },
      el('div', { class:'row', style:'justify-content:space-between;align-items:center' },
        el('div', { class:'h2' }, 'Students'),
        el('input', { id:'q', class:'input', placeholder:'Search name or ID', onInput:()=> load(1) })
      ),
      el('div', { class:'mt-3' },
        el('table', { class:'table', id:'table' }, el('thead', {}, el('tr', {}, el('th', {}, 'Name'), el('th', {}, 'ID'), el('th', {}, 'Actions'))), el('tbody'))
      ),
      el('div', { class:'row mt-3' },
        el('button', { class:'btn ghost', onClick:()=> load(Math.max(1, state.students.page-1)) }, 'Prev'),
        el('button', { class:'btn ghost', onClick:()=> load(state.students.page+1) }, 'Next')
      )
    )
  )
  setTimeout(()=> load(1))
  return el('main', { class:'main', role:'main' }, wrap)

  async function load(page){
    const q = document.getElementById('q')?.value || ''
    try{
      const data = await api(`/students?page=${page}&q=${encodeURIComponent(q)}`)
      state.students.page = page
      state.students.items = data.items || []
      const tbody = document.querySelector('#table tbody');
      tbody.innerHTML = ''
      state.students.items.forEach(s=>{
        const tr = el('tr', {},
          el('td', {}, s.name||'—'),
          el('td', {}, s.id||'—'),
          el('td', {}, el('button', { class:'btn', onClick:()=> navigate(`/student?id=${encodeURIComponent(s.id)}`) }, 'Open'))
        );
        tbody.appendChild(tr)
      })
    }catch(err){ notify('Please try again later – code 500', 'warn') }
  }
}

function StudentDetail(){
  if(!state.user) return navigate('/login')
  ensureVerificationFooter()
  const params = new URLSearchParams(location.search)
  const id = params.get('id')
  const wrap = el('div', { class:'container stack mt-6', style:'padding-bottom:80px' },
    el('h1', { class:'h2' }, 'Student results'),
    el('div', { id:'detail', class:'card' }, 'Loading...'),
    el('div', { class:'row mt-3' },
      el('button', { class:'btn', onClick:()=> window.print() }, 'Export PDF'),
      el('button', { class:'btn ghost', onClick:()=> navigate('/admin') }, 'Back')
    )
  )
  fetchOne(id)
  return el('main', { class:'main', role:'main' }, wrap)

  async function fetchOne(sid){
    try{
      const data = await api(`/results/${encodeURIComponent(sid||'')}`)
      const box = document.getElementById('detail');
      box.innerHTML = ''
      if(!data){ box.appendChild(el('div', { class:'banner warn' }, 'No careers found – see your teacher.')); return }
      const list = el('ol')
      data.top?.slice(0,5).forEach((c,i)=> list.appendChild(el('li', {}, `${i+1}. ${c}`)))
      box.appendChild(list)
    }catch(err){
      const box = document.getElementById('detail');
      box.innerHTML = ''
      box.appendChild(el('div', { class:'banner warn' }, 'Please try again later – code 500'))
    }
  }
}

// Frame
function Header(){
  const bar = el('header', { class:'header', role:'banner' },
    el('div', { class:'container header-inner' },
      el('div', { class:'brand' }, 'Thandi'),
      el('nav', { 'aria-label':'Primary' },
        el('a', { href:'/', onClick:(e)=>{ e.preventDefault(); navigate('/') } }, 'Home'),
        ' ',
        el('a', { href:'/login', onClick:(e)=>{ e.preventDefault(); navigate('/login') } }, 'Teachers')
      )
    )
  )
  return bar
}

function Shell(child){
  const flash = el('div', { id:'flash', class:'container mt-3' })
  return el('div', {}, Header(), flash, child)
}

function render(){
  const path = location.pathname || '/'
  const root = document.getElementById('app')
  root.innerHTML = ''
  const screen = (routes[path] || Landing)()
  root.appendChild(Shell(screen))
}

// Routes
route('/', Landing)
route('/assess', Assess)
route('/results', Results)
route('/login', Login)
route('/admin', Admin)
route('/student', StudentDetail)

// Boot
render()
