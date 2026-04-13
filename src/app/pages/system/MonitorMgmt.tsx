import React from 'react';
import { Activity, Server, Clock, HardDrive, Cpu, AlertTriangle, PlayCircle } from 'lucide-react';

export function MonitorMgmt() {
  return (
    <div className="p-6 space-y-5 h-[calc(100vh-60px)] overflow-auto bg-slate-50/50">
      <div className="flex items-center justify-between mb-4">
        <div>
           <h2 style={{ fontSize: '16px', fontWeight: 600 }}>平台组件与多维度资源监控大盘</h2>
           <div className="text-[12px] text-slate-500 mt-1">全面监管业务交付状态、资源运行负载指标、DaaS/离线服务全生命周期质量。</div>
        </div>
        <div className="bg-white px-3 py-1.5 border border-slate-200 rounded-lg shadow-sm flex items-center gap-4">
           <div className="flex items-center gap-2 text-[12.5px] font-medium text-slate-700">
             <Activity className="w-4 h-4 text-emerald-500 animate-pulse" /> 探针节点全量拉起
           </div>
           <div className="w-px h-3 bg-slate-200"></div>
           <div className="text-[11px] text-slate-500">刷新间隔: <span className="font-mono">10s</span></div>
        </div>
      </div>

      {/* Top Value Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { title: '主机与资源状态警告', val: '0', sub: '全局多维关联穿透无异常', icon: Server, color: 'text-emerald-500', bg: 'bg-emerald-50/80', border: 'border-emerald-100', valColor: 'text-emerald-700' },
          { title: 'DaaS 积压与响应超时', val: '12', sub: '实时识别接口拥堵模式', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50/80', border: 'border-orange-100', valColor: 'text-orange-600' },
          { title: '关键组件健康异常检出', val: '1', sub: '受控隔离环境排查中', icon: Cpu, color: 'text-red-500', bg: 'bg-red-50/80', border: 'border-red-100', valColor: 'text-red-600' },
          { title: '高可用容灾 POD 集群', val: '128', sub: '国产化适配容器健康度 99.9%', icon: HardDrive, color: 'text-blue-500', bg: 'bg-blue-50/80', border: 'border-blue-100', valColor: 'text-blue-700' },
        ].map((c, i) => (
          <div key={i} className={`bg-white border rounded-xl p-4 flex items-center justify-between shadow-sm relative overflow-hidden group transition-all hover:shadow-md ${c.border}`}>
            <div className={`absolute top-0 right-0 w-2 h-full ${c.bg}`}></div>
            <div className="flex-1 pr-2">
              <div className="text-[12.5px] font-medium text-slate-600 mb-2 truncate">{c.title}</div>
              <div className="flex items-baseline gap-2 mb-1">
                 <div className={`text-[28px] font-bold ${c.valColor} font-mono leading-none tracking-tight`}>{c.val}</div>
                 <div className="text-[11px] text-slate-400 mt-1 truncate">{c.sub}</div>
              </div>
            </div>
            <div className={`w-11 h-11 rounded-full ${c.bg} flex items-center justify-center shrink-0 -mr-2`}>
              <c.icon className={`w-5 h-5 ${c.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5 h-72">
        {/* Realtime Bar Chart */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 flex flex-col transition-shadow hover:shadow-md">
          <div className="flex justify-between items-center mb-1">
             <h3 className="font-semibold text-[14px] text-slate-800">24小时服务调用量与负载时延趋势</h3>
             <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">DaaS & Service聚合</span>
          </div>
          <p className="text-[12px] text-slate-500 mb-5">时序特征穿透对比业务交付状态，定位异常访问尖峰。</p>
          <div className="flex-1 flex items-end justify-between px-2 gap-2 mt-4 bg-slate-50/50 rounded-lg p-3 border border-slate-100 border-dashed relative">
             <div className="absolute top-4 left-4 text-[10px] text-slate-400 font-mono tracking-widest border-b border-dashed border-slate-200 w-[90%]">&nbsp;</div>
             <div className="absolute top-1/2 left-4 text-[10px] text-slate-400 font-mono tracking-widest border-b border-dashed border-slate-200 w-[90%]">&nbsp;</div>
            {[15, 30, 20, 50, 45, 80, 55, 40, 75, 95, 60, 35, 25, 45, 100, 70, 65, 40, 30, 20, 15, 60, 90].map((h, i) => (
              <div key={i} className={`w-full ${h > 80 ? 'bg-[#fa541c]' : 'bg-[#fa541c]/30'} hover:bg-[#d4380d] rounded-t-sm relative group transition-all z-10 cursor-pointer shadow-sm`} style={{ height: `${h}%` }}>
                 <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 pointer-events-none text-white text-[11px] py-1 px-2.5 rounded shadow-xl z-20 whitespace-nowrap">
                   {h * 200} Req/s 
                 </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 text-[11px] text-slate-400 font-mono">
            <span>00:00 (YTD)</span>
            <span>12:00</span>
            <span>24:00 (NOW)</span>
          </div>
        </div>

        {/* Task Nodes & DaaS Monitor */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col transition-shadow hover:shadow-md">
          <div className="p-5 pb-4 border-b border-gray-50 flex items-center justify-between">
             <div>
               <h3 className="font-semibold text-[14px] text-slate-800">服务接口运行流水线及积压洞察</h3>
               <p className="text-[12px] text-slate-500 mt-1">完整覆盖核心离线计算/实时DaaS的响应延迟监控矩阵。</p>
             </div>
             <AlertTriangle className="w-5 h-5 text-orange-400" />
          </div>
          <div className="flex-1 overflow-auto p-5 custom-scrollbar">
            <div className="relative border-l border-slate-200 ml-3 space-y-7 pb-2 mt-1">
              {[
                { time: '10:00:23', name: '数据源表全量同步保障', type: 'Offline Task', status: 'success', dur: '5m 12s', target: 'Warehouse' },
                { time: '10:06:10', name: '全路段DaaS实时汇聚查询口', type: 'API Load', status: 'success', dur: '12ms', target: 'API Gateway' },
                { time: '10:08:45', name: '业务大盘离线指标分析流转', type: 'Dask Nodes', status: 'warning', dur: '响应降级 (堵塞)', target: 'Compute Pool' },
                { time: '10:15:00', name: '报表目标引擎落盘映射扫描', type: 'Data Sync', status: 'pending', dur: '系统拉起启动...', target: 'TeleDB Node' },
              ].map((ev, i) => (
                <div key={i} className="relative pl-7">
                  <div className={`absolute -left-2 w-4 h-4 rounded-full border-4 border-white 
                    ${ev.status === 'success' ? 'bg-emerald-500' : 
                      ev.status === 'warning' ? 'bg-orange-500 animate-pulse' : 'bg-blue-400 border-blue-50'} top-0.5 shadow-sm`}></div>
                  
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[13.5px] font-medium text-slate-700">{ev.name}</span>
                    <span className="font-mono text-[11px] font-medium text-[#fa541c] bg-[#fa541c]/5 px-2 py-0.5 rounded border border-[#fa541c]/10">{ev.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-[11.5px] text-slate-500 mt-1.5">
                    <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-mono tracking-tight">{ev.type}</span>
                    <span className="flex items-center gap-1.5"><PlayCircle className="w-3.5 h-3.5 opacity-40 text-slate-600" /> {ev.dur}</span>
                    <span className="text-slate-300">|</span>
                    <span className="flex items-center gap-1"><Server className="w-3 h-3 text-slate-400"/> {ev.target}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
