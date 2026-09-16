
(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- ripple ---------------- */
  function ripple(e, el){
    if(reduce) return;
    var r=el.getBoundingClientRect(), d=Math.max(r.width,r.height),
        s=document.createElement('span');
    s.className='ripple';
    s.style.width=s.style.height=d+'px';
    s.style.left=((e.clientX||r.left+r.width/2)-r.left-d/2)+'px';
    s.style.top=((e.clientY||r.top+r.height/2)-r.top-d/2)+'px';
    el.appendChild(s); setTimeout(function(){s.remove();},520);
  }

  /* ---------------- scroll reveal ---------------- */
  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function(es){
    es.forEach(function(en){
      if(en.isIntersecting){
        var i = +(en.target.dataset.rvi||0);
        en.target.style.transitionDelay = Math.min(i*55,330)+'ms';
        en.target.classList.add('in');
        io.unobserve(en.target);
      }
    });
  },{rootMargin:'0px 0px -8% 0px',threshold:.06}) : null;

  function armReveal(panel){
    var items = panel.querySelectorAll('.rv:not(.in)');
    if(!io || reduce){ items.forEach(function(n){n.classList.add('in');}); return; }
    items.forEach(function(n,i){ n.dataset.rvi = i % 7; io.observe(n); });
  }

  /* ---------------- tabs ---------------- */
  var pills = [].slice.call(document.querySelectorAll('.pill')),
      panels = [].slice.call(document.querySelectorAll('.panel'));

  function showTab(name, push){
    var found=false;
    pills.forEach(function(p){
      var on = p.dataset.tab===name;
      p.setAttribute('aria-selected', on?'true':'false');
      p.tabIndex = on?0:-1;
      if(on) found=true;
    });
    if(!found) return false;
    panels.forEach(function(pa){
      var on = pa.id==='p-'+name;
      pa.classList.toggle('on', on);
      pa.hidden = !on;
      if(on) armReveal(pa);
    });
    if(push && history.replaceState) history.replaceState(null,'','#'+name);
    var act=document.querySelector('.pill[aria-selected="true"]');
    if(act && act.scrollIntoView) act.scrollIntoView({block:'nearest',inline:'nearest'});
    return true;
  }

  pills.forEach(function(p){
    p.addEventListener('click',function(e){
      ripple(e,p);
      showTab(p.dataset.tab,true);
      window.scrollTo({top:0,behavior:reduce?'auto':'smooth'});
    });
    p.addEventListener('keydown',function(e){
      var i=pills.indexOf(p), n=null;
      if(e.key==='ArrowRight') n=pills[(i+1)%pills.length];
      if(e.key==='ArrowLeft')  n=pills[(i-1+pills.length)%pills.length];
      if(e.key==='Home') n=pills[0];
      if(e.key==='End')  n=pills[pills.length-1];
      if(n){ e.preventDefault(); n.focus(); showTab(n.dataset.tab,true); }
    });
  });

  /* jump cards on the overview */
  document.addEventListener('click',function(e){
    var j=e.target.closest('[data-goto]');
    if(!j) return;
    ripple(e,j);
    showTab(j.dataset.goto,true);
    window.scrollTo({top:0,behavior:reduce?'auto':'smooth'});
  });

  /* Card wrappers are div[role=button] rather than native controls, because they
     contain citation controls and nesting them would be invalid HTML, which makes the
     browser force-close the card and spill its content out of the grid.
     Restore keyboard activation that the native element would have given us. */
  document.addEventListener('keydown',function(e){
    if(e.key!=='Enter' && e.key!==' ' && e.key!=='Spacebar') return;
    var t=e.target;
    if(!t || t.getAttribute('role')!=='button') return;
    if(t.closest('.cpop')) return;
    e.preventDefault();
    t.click();
  });

  /* ---------------- modals ---------------- */
  var ov=document.getElementById('ov'), box=ov.querySelector('.mdl-box'),
      mb=document.getElementById('mdlBody'), mt=document.getElementById('mdlTitle'),
      mk=document.getElementById('mdlKick'), mc=document.getElementById('mdlClock'),
      xBtn=document.getElementById('mdlX'), last=null;

  /* which tab does a given modal's trigger live in? */
  function tabOf(id){
    var t=document.querySelector('[data-modal="'+id+'"]');
    if(!t) return null;
    var p=t.closest('.panel');
    return p ? p.id.replace(/^p-/,'') : null;
  }

  /* ---------------- sub-tabs (inside the Defend panel) ---------------- */
  var subs=[].slice.call(document.querySelectorAll('[data-sub]'));
  function showSub(id, focus){
    var hit=false;
    subs.forEach(function(b){
      var on=b.dataset.sub===id;
      if(on) hit=true;
      b.setAttribute('aria-selected', on?'true':'false');
      var p=document.getElementById('sp-'+b.dataset.sub);
      if(p) p.hidden=!on;
    });
    if(hit && focus){
      var btn=document.getElementById('st-'+id);
      if(btn){ btn.focus(); btn.scrollIntoView({block:'nearest',inline:'center',behavior:reduce?'auto':'smooth'}); }
    }
    return hit;
  }
  document.addEventListener('click',function(e){
    var b=e.target.closest('[data-sub]');
    if(!b) return;
    ripple(e,b);
    showSub(b.dataset.sub,false);
    var bar=b.closest('.subbar');
    if(bar) window.scrollTo({top:bar.offsetTop-96, behavior:reduce?'auto':'smooth'});
  });
  document.addEventListener('keydown',function(e){
    var b=document.activeElement;
    if(!b || !b.dataset || !b.dataset.sub) return;
    if(['ArrowRight','ArrowLeft','Home','End'].indexOf(e.key)<0) return;
    e.preventDefault();
    var i=subs.indexOf(b), n=subs.length;
    var j = e.key==='Home' ? 0 : e.key==='End' ? n-1 : e.key==='ArrowRight' ? (i+1)%n : (i-1+n)%n;
    showSub(subs[j].dataset.sub,true);
  });
  /* reveal whichever sub-panel contains a given element */
  function revealSubOf(el){
    var p = el && el.closest ? el.closest('.subpanel') : null;
    if(p) showSub(p.id.replace(/^sp-/,''),false);
  }

  function open(id, trigger){
    var src=document.getElementById(id);
    if(!src) return;
    last = trigger || document.activeElement;
    mk.textContent = src.getAttribute('data-kick')||'';
    mt.textContent = src.getAttribute('data-title')||'';
    var c = src.getAttribute('data-clock')||'';
    mc.textContent=c; mc.style.display=c?'':'none';
    mb.innerHTML = src.innerHTML;
    ov.hidden=false; ov.classList.add('open');
    document.body.classList.add('mdl-open');
    mb.scrollTop=0; xBtn.focus();
    if(history.replaceState) history.replaceState(null,'','#'+id);
  }
  function close(){
    ov.classList.remove('open'); ov.hidden=true;
    document.body.classList.remove('mdl-open');
    mb.innerHTML='';
    var cur=document.querySelector('.pill[aria-selected="true"]');
    if(history.replaceState) history.replaceState(null,'','#'+(cur?cur.dataset.tab:''));
    if(last && last.focus) last.focus();
    last=null;
  }

  document.addEventListener('click',function(e){
    var t=e.target.closest('[data-modal]');
    if(t){ e.preventDefault(); ripple(e,t); open(t.getAttribute('data-modal'),t); return; }
    if(e.target===ov || e.target.closest('#mdlX')) close();
  });

  document.addEventListener('keydown',function(e){
    if(!ov.classList.contains('open')) return;
    if(e.key==='Escape'){ e.preventDefault(); close(); return; }
    if(e.key==='Tab'){
      var f=box.querySelectorAll('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])');
      if(!f.length) return;
      var first=f[0], lastEl=f[f.length-1];
      if(e.shiftKey && document.activeElement===first){ e.preventDefault(); lastEl.focus(); }
      else if(!e.shiftKey && document.activeElement===lastEl){ e.preventDefault(); first.focus(); }
    }
  });

  /* ---------------- deep links ---------------- */
  function fromHash(){
    var hsh=(location.hash||'').replace('#','');
    if(!hsh){ showTab('threat',false); return; }
    if(showTab(hsh,false)) return;                 /* #tabname */
    var el=document.getElementById(hsh);
    if(el && el.classList.contains('mdl-src')){     /* #modalid */
      var tb=tabOf(hsh);
      if(tb) showTab(tb,false); else showTab('threat',false);
      var trg=document.querySelector('[data-modal="'+hsh+'"]');
      if(trg) revealSubOf(trg);
      open(hsh,null);
      return;
    }
    if(el){                                        /* #sectionid inside some panel */
      var pnl=el.closest('.panel');
      if(pnl){
        showTab(pnl.id.replace(/^p-/,''),false);
        revealSubOf(el);
        /* let the panel become visible before scrolling to the section */
        requestAnimationFrame(function(){
          el.scrollIntoView({behavior: reduce?'auto':'smooth', block:'start'});
        });
        return;
      }
    }
    showTab('threat',false);
  }
  window.addEventListener('hashchange',function(){
    if(ov.classList.contains('open')) return;
    fromHash();
  });
  fromHash();
})();

;

(function(){
  var DATA, pop=null, cur=null;
  try{ DATA=JSON.parse(document.getElementById('citeData').textContent); }catch(e){ return; }
  var SRC=DATA._srcs;

  function build(){
    pop=document.createElement('div');
    pop.className='cpop'; pop.setAttribute('role','dialog'); pop.setAttribute('aria-label','Source reference');
    pop.innerHTML='<button class="cp-x" aria-label="Close reference">&#10005;</button>'
      +'<div class="cp-src"></div><div class="cp-loc"></div><blockquote></blockquote><div class="cp-doss"></div>';
    document.body.appendChild(pop);
    pop.querySelector('.cp-x').addEventListener('click',function(e){e.stopPropagation();hide();});
  }

  function hide(){
    if(pop) pop.classList.remove('on');
    if(cur){ cur.classList.remove('on'); cur.setAttribute('aria-expanded','false'); cur=null; }
  }

  function show(btn){
    var id=btn.getAttribute('data-cite'), rec=DATA[id];
    if(!rec){ return; }
    var meta=SRC[rec[0]]||['Unknown source','',''];
    if(!pop) build();
    pop.querySelector('.cp-src').textContent=meta[0];
    pop.querySelector('.cp-loc').textContent=rec[1] ? rec[1]+' — '+meta[1] : meta[1];
    pop.querySelector('blockquote').textContent='“'+rec[2]+'”';
    pop.querySelector('.cp-doss').textContent='Extraction: '+meta[2];

    hide();
    cur=btn; btn.classList.add('on'); btn.setAttribute('aria-expanded','true');
    pop.classList.add('on');

    /* position: below the marker, flipped up if it would overflow, clamped horizontally */
    var r=btn.getBoundingClientRect(), pw=pop.offsetWidth, ph=pop.offsetHeight,
        sx=window.pageXOffset, sy=window.pageYOffset, m=12;
    var left=r.left+sx+r.width/2-pw/2;
    left=Math.max(sx+m, Math.min(left, sx+document.documentElement.clientWidth-pw-m));
    var top=r.bottom+sy+9;
    if(r.bottom+ph+20 > window.innerHeight && r.top-ph-9 > 0) top=r.top+sy-ph-9;
    pop.style.left=left+'px'; pop.style.top=top+'px';
  }

  document.addEventListener('click',function(e){
    var b=e.target.closest('.ct');
    if(b){ e.preventDefault(); e.stopPropagation(); (cur===b)?hide():show(b); return; }
    if(pop && pop.classList.contains('on') && !e.target.closest('.cpop')) hide();
  },true);

  document.addEventListener('keydown',function(e){
    if(e.key==='Escape' && pop && pop.classList.contains('on')){ e.stopPropagation(); hide(); }
  },true);
  window.addEventListener('resize',hide);
  function track(){ if(cur && document.body.contains(cur)) show(cur); else hide(); }
  window.addEventListener('scroll',track,{passive:true});
  /* the modal overlay is its own scroll container — the popover must track it too */
  /* the modal BODY is its own scroll container — the popover must track it */
  var ovEl=document.getElementById('ov'), mbEl=document.getElementById('mdlBody');
  if(ovEl) ovEl.addEventListener('scroll',track,{passive:true});
  if(mbEl) mbEl.addEventListener('scroll',track,{passive:true});
  /* a marker inside a modal disappears when the modal closes; drop the popover with it */
  document.addEventListener('click',function(e){
    if(e.target.closest('#mdlX') || e.target.id==='ov') hide();
  });

  /* render the reference list on the Record tab */
  var host=document.getElementById('refList');
  if(host){
    var counts={};
    Object.keys(DATA).forEach(function(k){ if(k!=='_srcs'){ counts[DATA[k][0]]=(counts[DATA[k][0]]||0)+1; } });
    var html='';
    Object.keys(SRC).forEach(function(k){
      var s=SRC[k], n=counts[k]||0;
      html+='<div class="refi r-'+k+'"><div class="rid">'+k+'</div><div>'
        +'<h4>'+s[0]+'</h4><p>'+s[1]+(n?' &nbsp;·&nbsp; <b>'+n+' citation'+(n===1?'':'s')+'</b> in this document':'')+'</p>'
        +'<div class="rpath">'+s[2]+'</div></div></div>';
    });
    host.innerHTML=html;
  }
})();
