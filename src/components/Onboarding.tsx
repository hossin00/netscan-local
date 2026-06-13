import { useState } from 'react';
const SLIDES = [{"accent": "#06b6d4", "icon": "\ud83d\udce1", "title": "Discover every\ndevice nearby", "desc": "Scan your WiFi network and see every connected device instantly. Know exactly what's on your network."}, {"accent": "#0891b2", "icon": "\ud83d\udd0d", "title": "Check open ports\nand services", "desc": "Scan any device for open ports and running services. Essential for network security audits."}, {"accent": "#155e75", "icon": "\u26a0\ufe0f", "title": "Spot unauthorized\ndevices", "desc": "Flag unknown devices that appear on your network. Take control of your home or office security."}];
export function Onboarding({ onDone }: { onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const slide = SLIDES[idx];
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', background:'#080d1a', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:'-15%', left:'50%', transform:'translateX(-50%)', width:'400px', height:'400px', borderRadius:'50%', background:slide.accent+'08', filter:'blur(80px)', pointerEvents:'none' }}/>
      <div style={{ padding:'20px 24px', display:'flex', justifyContent:'flex-end' }}>
        <button onClick={onDone} style={{ color:'#06b6d460', fontSize:'14px', background:'none', border:'none', cursor:'pointer', fontFamily:'Inter' }}>Skip</button>
      </div>
      <div key={idx} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'20px 32px', textAlign:'center', animation:'si 0.35s ease' }}>
        <div style={{ width:'100px', height:'100px', borderRadius:'28px', background:slide.accent+'18', border:`1px solid ${slide.accent}35`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'32px', fontSize:'46px' }}>{slide.icon}</div>
        <h2 style={{ fontFamily:'Inter', fontWeight:'700', fontSize:'28px', lineHeight:'1.25', color:'white', marginBottom:'14px', whiteSpace:'pre-line' }}>{slide.title}</h2>
        <p style={{ color:'#06b6d485', fontSize:'15px', lineHeight:'1.7', maxWidth:'280px' }}>{slide.desc}</p>
      </div>
      <div style={{ padding:'16px 24px 48px' }}>
        <div style={{ display:'flex', justifyContent:'center', gap:'8px', marginBottom:'18px' }}>
          {SLIDES.map((_,i)=><button key={i} onClick={()=>setIdx(i)} style={{ width:i===idx?'24px':'6px', height:'6px', borderRadius:'3px', background:i===idx?slide.accent:'#ffffff18', border:'none', cursor:'pointer', padding:0, transition:'all 0.3s' }}/>)}
        </div>
        <button onClick={()=>idx===SLIDES.length-1?onDone():setIdx(idx+1)} style={{ width:'100%', padding:'16px', background:slide.accent, color:'white', border:'none', borderRadius:'14px', fontSize:'16px', fontWeight:'600', cursor:'pointer', fontFamily:'Inter', boxShadow:`0 8px 28px ${slide.accent}45`, transition:'all 0.2s' }}>
          {idx===SLIDES.length-1?'Get started →':'Continue'}
        </button>
      </div>
      <style>{`@keyframes si{from{opacity:0;transform:translateX(24px)}to{opacity:1;transform:translateX(0)}}`}</style>
    </div>
  );
}
