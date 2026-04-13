import React from 'react';
import { Share2, FileCode2, Send, Repeat, Link2, CheckCircle2 } from 'lucide-react';

export function DataSharing() {
  return (
    <div className="p-6 h-[calc(100vh-60px)] flex flex-col bg-slate-50/50">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600 }}>核心项目数据共享与订阅</h2>
          <p className="text-[12px] text-slate-500 mt-1 max-w-3xl leading-relaxed">
            支持项目私有表共享后供跨域订阅。联动核心业务系统将 Hive 表抽取转换，自动拼装数据与定制化 CHECK/VAL (文件及大小校验) 后下发目标 FTP。全透传链路调度与依赖。
          </p>
        </div>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-[12px] font-medium shadow-sm hover:bg-orange-700 transition-colors flex items-center gap-2">
           <Share2 className="w-4 h-4"/>
           发布新的共享模型表
        </button>
      </div>

      <div className="grid grid-cols-2 gap-5 flex-1">
         {/* Share Catalog */}
         <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between bg-slate-50/50">
               <span className="font-semibold text-[13px] text-slate-700 font-sans">现网资源共享大厅</span>
            </div>
            <div className="flex-1 overflow-auto p-4 space-y-3">
               {[
                 { t: '核心用户画像标签宽表', owner: '营销活动引擎组', mode: '下发校验与对账文件' },
                 { t: '实时终端地理栅格位置', owner: '网规网优组', mode: '生成 VAL 高压缩文件' },
                 { t: '当月高优流失风险客群', owner: '客服数据支撑部', mode: '标准集及 CHECK 双核验证' }
               ].map((item, i) => (
                  <div key={i} className="border border-slate-100 p-4 rounded-lg hover:border-orange-200 transition-colors group cursor-pointer">
                     <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-[13px] text-slate-800">{item.t}</div>
                        <span className="text-[10px] text-orange-600 bg-orange-50 font-medium px-2 py-0.5 rounded border border-orange-100">
                           支持跨租户订阅
                        </span>
                     </div>
                     <div className="flex justify-between items-end">
                        <div>
                           <div className="text-[11px] text-slate-500 mb-1">私有模型所有者: {item.owner}</div>
                           <div className="text-[11px] text-slate-400 flex items-center gap-1"><FileCode2 className="w-3.5 h-3.5 text-slate-300"/> Hive 表自动转出配置: {item.mode}</div>
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 text-orange-600 text-[11px] font-medium border-b border-orange-600 transition-opacity">申请接入</button>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Delivery Stats & Monitoring */}
         <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm text-slate-300 p-5 flex flex-col">
            <h3 className="font-semibold text-[14px] text-slate-100 flex items-center gap-2 mb-4">
              <Send className="w-4 h-4 text-orange-400"/> FTP 下发与核心系统联动调度
            </h3>
            
            <div className="space-y-4 mb-6">
               <div className="bg-slate-800/80 p-3 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-medium text-[12px] text-slate-200 mb-0.5 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400"/> 下发对账闭环同步</div>
                    <div className="text-[10px] text-slate-400">下发 FTP 后自动把执行结果同步至现网核心调度系统</div>
                  </div>
                  <div className="text-orange-400 font-mono text-[16px] font-bold">28 ms</div>
               </div>
               <div className="bg-slate-800/80 p-3 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-medium text-[12px] text-slate-200 mb-0.5 flex items-center gap-1.5"><Repeat className="w-3.5 h-3.5 text-blue-400"/> 重传与重跑级联</div>
                    <div className="text-[10px] text-slate-400">基于现网系统依赖，重传/重跑完成后二次触发同步拉起</div>
                  </div>
                  <div className="text-slate-200 text-[12px] font-medium border border-slate-600 px-2 py-0.5 rounded">监听中</div>
               </div>
            </div>

            <div className="flex-1 border border-slate-700/50 bg-slate-950 rounded-lg p-3 overflow-hidden flex flex-col">
               <div className="text-[11px] text-slate-500 mb-2 font-mono border-b border-slate-800 pb-2">实况链路投递网络 (Live Stream)</div>
               <div className="flex-1 overflow-auto space-y-2 font-mono text-[10px]">
                  {[1, 2, 3, 4, 5].map(n => (
                     <div key={n} className="flex gap-2">
                        <span className="text-emerald-400 shrink-0">[SYNC_OK]</span>
                        <span className="text-slate-400">{20 + n * 3}s ago</span>
                        <span className="text-slate-300">Hive_to_FTP_{n}45.val 下发完毕，现网核心依赖触发通过。大小: {n * 1.4} GB</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
