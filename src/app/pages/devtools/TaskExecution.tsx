import React from 'react';
import { PlayCircle, Clock, Zap, FileKey2, CheckSquare } from 'lucide-react';

export function TaskExecution() {
  return (
    <div className="p-6 h-[calc(100vh-60px)] flex flex-col bg-slate-50/50">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600 }}>任务触发与执行响应视图</h2>
          <p className="text-[12px] text-slate-500 mt-1 max-w-3xl leading-relaxed">
            操作及干预排布完成的任务。支持随时强力下发“立即执行”或配置精密的定时静默执行轨道。结合数据质量稽核生态构建联合触发联动。
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 flex-1">
         {/* Operations */}
         <div className="col-span-1 bg-white border border-gray-100 rounded-xl shadow-sm p-5 space-y-4">
            <h3 className="font-semibold text-[13px] text-slate-800 border-b border-slate-100 pb-2">人工指令管控端</h3>
            
            <div className="border border-orange-100 bg-orange-50/50 p-4 rounded-xl flex flex-col items-center justify-center text-center py-6">
               <button className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center hover:scale-105 hover:bg-orange-600 transition-all shadow-md group mb-3">
                  <PlayCircle className="w-8 h-8 group-hover:scale-110 transition-transform"/>
               </button>
               <div className="font-bold text-[14px] text-slate-800">立即全量试跑执行</div>
               <div className="text-[11px] text-slate-500 mt-1">无视调度依赖与时间强行压板执行任务</div>
            </div>

            <div className="border border-slate-100 bg-slate-50/50 p-4 rounded-xl flex flex-col items-center justify-center text-center py-6 mt-4">
               <button className="w-16 h-16 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center hover:scale-105 hover:bg-slate-300 transition-all shadow-sm group mb-3">
                  <Clock className="w-8 h-8 group-hover:scale-110 transition-transform"/>
               </button>
               <div className="font-bold text-[14px] text-slate-800">按计划定轨执行</div>
               <div className="text-[11px] text-slate-500 mt-1">沉入后台静默挂载到 CRON 调度树中</div>
            </div>
         </div>

         {/* Monitoring and Dynamic Triggers */}
         <div className="col-span-2 bg-slate-900 border border-slate-800 rounded-xl shadow-sm p-0 flex flex-col relative overflow-hidden">
            <div className="w-full bg-slate-800/80 px-4 py-3 flex justify-between items-center z-10 border-b border-slate-700">
               <span className="text-[13px] font-semibold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-orange-400" /> 接口事件动态触发监控流
               </span>
               <div className="flex items-center gap-2">
                  <span className="text-[11px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span> Listener ACTIVE</span>
               </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-center items-center relative z-10">
               <div className="max-w-md w-full bg-slate-800/60 border border-slate-700 p-5 rounded-xl backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center shrink-0">
                        <FileKey2 className="w-5 h-5 text-orange-400" />
                     </div>
                     <div>
                        <h4 className="text-[14px] font-bold text-slate-100 mb-1">CHECK 文件驱逐型联合触发架构</h4>
                        <p className="text-[12px] text-slate-400 leading-relaxed">
                           现已新增通过接口进行的数据质量验证卡点：当接收到底层业务源接口的 <span className="text-orange-300 font-mono">CHECK 对账约束文件</span> 到达系统时，调度器将不再等待计划时间，而是 **即时** 触发相应的数据质量稽核查杀任务执行。
                        </p>
                     </div>
                  </div>
                  
                  <div className="mt-5 pt-5 border-t border-slate-700 space-y-3">
                     <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded bg-slate-700 flex items-center justify-center text-[10px] text-slate-300 font-mono">01</div>
                        <div className="text-[11px] text-slate-300">File_GW_API 监听到文件落地</div>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded bg-orange-500 text-white flex items-center justify-center text-[10px] font-mono shadow-[0_0_10px_rgba(249,115,22,0.4)]">02</div>
                        <div className="flex-1 bg-gradient-to-r from-orange-500/20 to-transparent p-1.5 rounded flex items-center gap-2 text-orange-200 text-[11px]">
                           <CheckSquare className="w-3.5 h-3.5"/> 立即激活质量稽核算子运行
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded bg-slate-700 flex items-center justify-center text-[10px] text-slate-300 font-mono">03</div>
                        <div className="text-[11px] text-slate-300">通过引擎阻断问题数据汇流</div>
                     </div>
                  </div>
               </div>
            </div>
            
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-orange-500/10 blur-[60px] pointer-events-none"></div>
         </div>
      </div>
    </div>
  );
}
