import React from 'react';
import { ArrowRightCircle, HardDrive, RefreshCw, Layers, DatabaseBackup, Clock } from 'lucide-react';

export function DataSync() {
  return (
    <div className="p-6 h-[calc(100vh-60px)] flex flex-col bg-slate-50/50">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600 }}>全局数据同步与迁移网流</h2>
          <p className="text-[12px] text-slate-500 mt-1">
            提供从采集节点到各级数据架构的跨域迁移。支持全表、分区表数据的全集、批量及增量同步，高度可视化保障 PB 级流转稳定性。
          </p>
        </div>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-[12px] font-medium shadow-sm hover:bg-orange-700 transition-colors flex items-center gap-2">
           <DatabaseBackup className="w-4 h-4"/>
           发起全量生产迁移作业
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 flex-1">
         
         {/* Left col - Pipeline templates */}
         <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 flex flex-col">
            <h3 className="font-semibold text-[14px] text-slate-800 mb-4 flex items-center gap-2">
               <Layers className="w-4 h-4 text-orange-500" /> 跨环境分发拓扑通道
            </h3>
            <div className="space-y-4 overflow-auto flex-1 pr-2">
               {[
                 { name: '采集库向核心系统现网迁移', desc: '用于将采集沉淀的热点现网数据分发入湖', tags: ['PB级高稳', '自动重启加持'] },
                 { name: '现网数据投递至准生产与测试网', desc: '同步采集、低代码、调度、模型任务元数据防泄露投递', tags: ['脱敏处理', '环境隔离保障'] },
                 { name: '准生产系统验收向现网同步映射', desc: '包含稽核规则和任务编排的平滑上推发布', tags: ['全量与增量', '严格比对'] }
               ].map((p, i) => (
                  <div key={i} className="border border-slate-100 rounded-lg p-4 hover:border-orange-300 hover:shadow-md cursor-pointer transition-all relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-2 h-full bg-orange-100 group-hover:bg-orange-400 transition-colors"></div>
                     <div className="font-semibold text-[13px] text-slate-800 mb-1">{p.name}</div>
                     <div className="text-[11.5px] text-slate-500 mb-3 leading-relaxed">{p.desc}</div>
                     <div className="flex gap-2">
                        {p.tags.map(t => <span key={t} className="bg-slate-50 text-[10px] text-slate-500 px-2 py-0.5 rounded border border-slate-100">{t}</span>)}
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Right col - Active running stats */}
         <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-xl p-5 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl"></div>
            
            <h3 className="font-semibold text-[14px] text-slate-100 mb-4 flex items-center gap-2 z-10">
               <RefreshCw className="w-4 h-4 text-orange-400 animate-spin-slow" /> 大规模同步执行监控大盘
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-6 z-10">
               <div className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-lg">
                  <div className="text-slate-400 text-[11px] mb-1">今日同步出网总数据级</div>
                  <div className="text-slate-100 text-[24px] font-mono font-bold tracking-tighter">12.4 <span className="text-[14px] text-slate-500 font-sans">PB</span></div>
               </div>
               <div className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-lg">
                  <div className="text-slate-400 text-[11px] mb-1">并发活跃迁移通道</div>
                  <div className="text-slate-100 text-[24px] font-mono font-bold tracking-tighter">842 <span className="text-[14px] text-slate-500 font-sans">Streams</span></div>
               </div>
            </div>

            <div className="flex-1 space-y-3 z-10">
               {[1, 2, 3].map(i => (
                 <div key={i} className="bg-slate-800/60 p-3 rounded border border-slate-700 font-mono text-[11px]">
                    <div className="flex justify-between text-slate-300 mb-2">
                       <span>[JOB_ID_X{i}982] SYS_CORE_SYNC</span>
                       <span className="text-orange-400 flex items-center gap-1"><Clock className="w-3 h-3"/> {60 + i*15}%</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-1">
                       <div className="bg-gradient-to-r from-orange-500 to-amber-400 h-1 rounded-full" style={{ width: `${60 + i*15}%`}}></div>
                    </div>
                    <div className="flex justify-between text-slate-500 mt-2 text-[10px]">
                       <span>增量分区追补 (分区表拉取)</span>
                       <span>Auto-Restart: ENABLED</span>
                    </div>
                 </div>
               ))}
            </div>

         </div>
      </div>
    </div>
  );
}
