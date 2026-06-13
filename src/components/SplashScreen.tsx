import { useEffect, useState } from 'react';
export function SplashScreen({ onDone }: { onDone: () => void }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const t1=setTimeout(()=>setP(1),300);
    const t2=setTimeout(()=>setP(2),1100);
    const t3=setTimeout(()=>onDone(),2400);
    return ()=>[t1,t2,t3].forEach(clearTimeout);
  }, []);
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:`radial-gradient(ellipse at 50% 15%, #353a47 0%, #080d1a 60%)`, opacity:p===2?0:1, transition:'opacity 0.5s ease' }}>
      <div style={{ transform:p>=1?'scale(1) translateY(0)':'scale(0.45) translateY(36px)', opacity:p>=1?1:0, transition:'all 0.7s cubic-bezier(0.34,1.56,0.64,1)', marginBottom:'22px' }}>
        <div style={{ width:'88px', height:'88px', borderRadius:'24px', background:`linear-gradient(145deg,#06b6d4,#06b6d4bb)`, boxShadow:`0 18px 56px #06b6d455`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'38px' }}>
          📡
        </div>
      </div>
      <div style={{ opacity:p>=1?1:0, transform:p>=1?'translateY(0)':'translateY(14px)', transition:'all 0.5s ease 0.15s', textAlign:'center', marginBottom:'44px' }}>
        <h1 style={{ fontFamily:'Inter', fontWeight:'700', fontSize:'29px', color:'white', marginBottom:'7px' }}>NetScan Local</h1>
        <p style={{ color:'#06b6d485', fontSize:'14px' }}>See every device on your network.</p>
      </div>
      <div style={{ opacity:p>=1?1:0, transition:'opacity 0.3s ease 0.4s', display:'flex', flexDirection:'column', gap:'9px', alignItems:'center' }}>
        <div style={{display:"flex",alignItems:"center",gap:"12px",background:"#ffffff06",border:"1px solid #ffffff10",borderRadius:"12px",padding:"10px 16px",width:"252px"}}><span style={{fontSize:"20px"}}>📡</span><div><div style={{color:"white",fontSize:"13px",fontWeight:"500"}}>Device discovery</div><div style={{color:"#06b6d480",fontSize:"11px"}}>Every device found</div></div></div><div style={{display:"flex",alignItems:"center",gap:"12px",background:"#ffffff06",border:"1px solid #ffffff10",borderRadius:"12px",padding:"10px 16px",width:"252px"}}><span style={{fontSize:"20px"}}>🔍</span><div><div style={{color:"white",fontSize:"13px",fontWeight:"500"}}>Port scanner</div><div style={{color:"#06b6d480",fontSize:"11px"}}>Open ports revealed</div></div></div><div style={{display:"flex",alignItems:"center",gap:"12px",background:"#ffffff06",border:"1px solid #ffffff10",borderRadius:"12px",padding:"10px 16px",width:"252px"}}><span style={{fontSize:"20px"}}>⚠️</span><div><div style={{color:"white",fontSize:"13px",fontWeight:"500"}}>Security alerts</div><div style={{color:"#06b6d480",fontSize:"11px"}}>Unknown devices flagged</div></div></div>
      </div>
      <div style={{ position:'absolute', bottom:'56px', display:'flex', gap:'6px', opacity:p>=1?1:0 }}>
        {[0,1,2].map(i=><div key={i} style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#06b6d4', animation:`pulse 1.2s ease-in-out ${i*0.2}s infinite` }}/>)}
      </div>
      <style>{`@keyframes pulse{0%,80%,100%{opacity:.3;transform:scale(.8)}40%{opacity:1;transform:scale(1)}}`}</style>
    </div>
  );
}
