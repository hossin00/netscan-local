import { useState } from 'react';
import { Wifi, Search, Shield, AlertTriangle, RefreshCw, Smartphone, Laptop, Printer, Tv } from 'lucide-react';
interface Device { ip:string; name:string; type:string; status:'online'|'unknown'|'suspicious'; mac:string; vendor:string; }
const MOCK_DEVICES:Device[]=[
  {ip:'192.168.1.1',name:'Router',type:'router',status:'online',mac:'A1:B2:C3:D4:E5:F6',vendor:'Netgear'},
  {ip:'192.168.1.100',name:'My PC',type:'pc',status:'online',mac:'B2:C3:D4:E5:F6:A1',vendor:'Unknown'},
  {ip:'192.168.1.101',name:'iPhone',type:'phone',status:'online',mac:'C3:D4:E5:F6:A1:B2',vendor:'Apple'},
  {ip:'192.168.1.102',name:'Smart TV',type:'tv',status:'online',mac:'D4:E5:F6:A1:B2:C3',vendor:'Samsung'},
];
const PORTS=[{p:80,l:'HTTP'},{p:443,l:'HTTPS'},{p:22,l:'SSH'},{p:21,l:'FTP'},{p:3389,l:'RDP'},{p:8080,l:'HTTP Alt'}];
const ac='#06b6d4';
export default function App() {
  const [tab,setTab]=useState<'network'|'ports'|'info'>('network');
  const [scanning,setScanning]=useState(false);
  const [devices,setDevices]=useState<Device[]>([]);
  const [ip,setIp]=useState('192.168.1.100');
  const [portResults,setPortResults]=useState<Record<number,boolean>>({});
  const [scannedPorts,setScannedPorts]=useState(false);
  const scanNetwork=async()=>{
    setScanning(true);setDevices([]);
    for(let i=0;i<MOCK_DEVICES.length;i++){
      await new Promise(r=>setTimeout(r,400));
      setDevices(prev=>[...prev,MOCK_DEVICES[i]]);
    }
    setScanning(false);
  };
  const scanPorts=async()=>{
    setScanning(true);setPortResults({});
    const results:Record<number,boolean>={};
    for(const {p} of PORTS){
      await new Promise(r=>setTimeout(r,150));
      results[p]=Math.random()>0.5;
    }
    setPortResults(results);setScannedPorts(true);setScanning(false);
  };
  const typeIcon=(t:string)=>{
    if(t==='phone')return <Smartphone size={16}/>;
    if(t==='tv')return <Tv size={16}/>;
    if(t==='router')return <Wifi size={16}/>;
    return <Laptop size={16}/>;
  };
  return(
    <div style={{minHeight:'100vh',background:'#080d1a',display:'flex',flexDirection:'column'}}>
      <header style={{padding:'14px 20px',borderBottom:'1px solid #0c2030',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:'9px'}}>
          <div style={{width:'34px',height:'34px',borderRadius:'9px',background:`linear-gradient(135deg,${ac},#0891b2)`,display:'flex',alignItems:'center',justifyContent:'center'}}><Wifi size={15} color="white"/></div>
          <div><div style={{fontWeight:'700',fontSize:'15px',color:'white',lineHeight:1}}>NetScan Local</div><div style={{fontSize:'10px',color:'#0e7490',marginTop:'2px'}}>{devices.length} devices found</div></div>
        </div>
      </header>
      <div style={{display:'flex',padding:'0 20px',borderBottom:'1px solid #0c2030'}}>
        {(['network','ports','info'] as const).map(t=><button key={t} onClick={()=>setTab(t)} style={{padding:'10px 14px',fontSize:'12px',fontWeight:'500',borderBottom:`2px solid ${tab===t?ac:'transparent'}`,color:tab===t?'#67e8f9':'#0e7490',background:'none',border:'none',borderBottomWidth:'2px',borderBottomStyle:'solid',cursor:'pointer',fontFamily:'Inter',textTransform:'capitalize'}}>{t==='network'?'Network Scan':t==='ports'?'Port Scan':'System Info'}</button>)}
      </div>
      <div style={{flex:1,overflow:'auto',padding:'16px 20px'}}>
        {tab==='network'&&(
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            <button onClick={scanNetwork} disabled={scanning} style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',padding:'13px',borderRadius:'11px',background:scanning?'#0c2030':ac,border:'none',color:'white',fontSize:'14px',fontWeight:'600',cursor:scanning?'not-allowed':'pointer',fontFamily:'Inter',boxShadow:scanning?'none':`0 4px 16px ${ac}40`,transition:'all 0.2s'}}>
              <RefreshCw size={16} style={{animation:scanning?'spin 1s linear infinite':undefined}}/> {scanning?'Scanning network...':'Scan Network'}
            </button>
            {devices.length>0&&<div style={{background:'#0c1428',border:'1px solid #0c2030',borderRadius:'12px',padding:'14px'}}>
              <div style={{fontSize:'12px',color:'#0e7490',fontWeight:'600',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'12px'}}>Discovered Devices</div>
              {devices.map(d=>(
                <div key={d.ip} style={{display:'flex',alignItems:'center',gap:'10px',padding:'10px 12px',background:'#080d1a',borderRadius:'9px',marginBottom:'7px',border:`1px solid ${d.status==='suspicious'?'#ef444430':'#0c2030'}`}}>
                  <div style={{width:'34px',height:'34px',borderRadius:'8px',background:ac+'18',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,color:ac}}>{typeIcon(d.type)}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{color:'white',fontSize:'13px',fontWeight:'500'}}>{d.name}</div>
                    <div style={{color:'#0e7490',fontSize:'11px',marginTop:'2px'}}>{d.ip} · {d.vendor}</div>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:'6px',flexShrink:0}}>
                    <div style={{width:'6px',height:'6px',borderRadius:'50%',background:d.status==='online'?'#10b981':'#f59e0b'}}/>
                    <span style={{fontSize:'11px',color:d.status==='suspicious'?'#f87171':'#67e8f9'}}>{d.mac.slice(-8)}</span>
                  </div>
                </div>
              ))}
            </div>}
            {devices.length===0&&!scanning&&(
              <div style={{textAlign:'center',padding:'60px 20px'}}>
                <div style={{fontSize:'48px',marginBottom:'14px'}}>📡</div>
                <h3 style={{fontSize:'18px',fontWeight:'700',color:'white',marginBottom:'8px'}}>Scan your network</h3>
                <p style={{color:'#0e7490',fontSize:'13px',lineHeight:'1.6',maxWidth:'220px',margin:'0 auto'}}>Discover all devices connected to your WiFi network.</p>
              </div>
            )}
          </div>
        )}
        {tab==='ports'&&(
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            <div style={{display:'flex',gap:'8px'}}>
              <input value={ip} onChange={e=>setIp(e.target.value)} placeholder="IP address"
                style={{flex:1,background:'#0c1428',border:'1px solid #0c2030',borderRadius:'10px',padding:'10px 13px',color:'white',fontSize:'14px',outline:'none',fontFamily:'Inter'}}
                onFocus={e=>e.target.style.borderColor=ac} onBlur={e=>e.target.style.borderColor='#0c2030'}/>
              <button onClick={scanPorts} disabled={scanning} style={{padding:'10px 16px',borderRadius:'10px',background:scanning?'#0c2030':ac,border:'none',color:'white',fontSize:'13px',fontWeight:'600',cursor:scanning?'not-allowed':'pointer',fontFamily:'Inter',whiteSpace:'nowrap',boxShadow:scanning?'none':`0 3px 10px ${ac}35`}}>
                {scanning?'Scanning...':'Scan Ports'}
              </button>
            </div>
            {scannedPorts&&(
              <div style={{background:'#0c1428',border:'1px solid #0c2030',borderRadius:'12px',padding:'14px'}}>
                <div style={{fontSize:'12px',color:'#0e7490',fontWeight:'600',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'12px'}}>Port Results — {ip}</div>
                {PORTS.map(({p,l})=>(
                  <div key={p} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'9px 12px',background:'#080d1a',borderRadius:'8px',marginBottom:'5px',border:`1px solid ${portResults[p]?ac+'30':'#0c2030'}`}}>
                    <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                      <div style={{width:'6px',height:'6px',borderRadius:'50%',background:portResults[p]?ac:'#374151'}}/>
                      <span style={{color:'white',fontSize:'13px'}}>{l}</span>
                    </div>
                    <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
                      <span style={{color:'#0e7490',fontSize:'11px'}}>:{p}</span>
                      <span style={{fontSize:'11px',color:portResults[p]?ac:'#374151',fontWeight:'600'}}>{portResults[p]?'OPEN':'CLOSED'}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!scannedPorts&&!scanning&&(
              <div style={{textAlign:'center',padding:'40px 20px'}}>
                <div style={{fontSize:'40px',marginBottom:'12px'}}>🔍</div>
                <p style={{color:'#0e7490',fontSize:'13px',lineHeight:'1.6'}}>Enter an IP and scan for open ports and running services.</p>
              </div>
            )}
          </div>
        )}
        {tab==='info'&&(
          <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
            {[['User Agent',navigator.userAgent.slice(0,60)+'...'],['Platform',navigator.platform],['Language',navigator.language],['Online',String(navigator.onLine)],['Cookies',String(navigator.cookieEnabled)],['Screen',window.screen.width+'x'+window.screen.height],['Viewport',window.innerWidth+'x'+window.innerHeight],['Time Zone',Intl.DateTimeFormat().resolvedOptions().timeZone]].map(([k,v])=>(
              <div key={k} style={{background:'#0c1428',border:'1px solid #0c2030',borderRadius:'10px',padding:'12px 14px',display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:'12px'}}>
                <span style={{fontSize:'12px',color:'#0e7490',fontWeight:'500',flexShrink:0}}>{k}</span>
                <span style={{fontSize:'12px',color:'#67e8f9',textAlign:'right',wordBreak:'break-all'}}>{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
