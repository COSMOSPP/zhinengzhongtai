import React from 'react';
import { Route, HardDriveDownload, UserPlus, Milestone, Flame, CheckCircle2, ChevronRight, ActivitySquare } from 'lucide-react';

export function ModelLifecycle() {
  return (
    <div className="p-6 h-[calc(100vh-60px)] flex flex-col bg-slate-50/50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600 }}>模型全生命周期系统化管理网络</h2>
          <p className="text-[12px] text-slate-500 mt-1">
            定义各个环节执行流程与流控状态（设计、开发、验证、部署、维护、销毁）。打通审批人编排，节点审批联动自动化操作机制。
          </p>
        </div>
        <button className="bg-slate-800 text-white px-4 py-2 rounded-lg text-[12px] font-medium shadow-sm hover:bg-slate-900 transition-colors flex items-center gap-2">
           <HardDriveDownload className="w-4 h-4 text-orange-400"/>
           批量导入存量模型流注册
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 mb-5">
         <h3 className="font-semibold text-[13px] text-slate-800 mb-6 flex items-center gap-2">
            <Route className="w-4 h-4 text-orange-500"/> 生命旅程节点流程编排与联动策略
         </h3>

         {/* Workflow timeline UI */}
         <div className="flex justify-between relative mt-4">
            <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-100 z-0"></div>
            <div className="absolute top-4 left-6 w-[60%] h-0.5 bg-orange-500 z-0 shadow-[0_0_8px_rgba(249,115,22,0.6)]"></div>
            
            {[
              { id: '1.设计阶段', n: '数据需求与架构建模', c: 'bg-orange-500 border-orange-500', t: 'text-orange-500' },
              { id: '2.开发状态', n: '实施部署挂载任务', c: 'bg-orange-500 border-orange-500', t: 'text-orange-500' },
              { id: '3.验收验证', n: '合规稽核与强对对账', c: 'bg-orange-500 border-orange-500', t: 'text-orange-500' },
              { id: '4.发布上线', n: '投递到现网核心源', c: 'bg-white border-slate-200', t: 'text-slate-400' },
              { id: '5.运管维护', n: '巡检与资产定级标注', c: 'bg-white border-slate-200', t: 'text-slate-400' },
              { id: '6.下线销毁', n: '归档退役与沉睡处理', c: 'bg-white border-slate-200', t: 'text-slate-400' }
            ].map((s, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center group cursor-pointer">
                 <div className={`w-8 h-8 rounded-full border-2 ${s.c} flex items-center justify-center bg-white shadow-sm transition-transform group-hover:scale-110`}>
                    {i < 3 ? <CheckCircle2 className="w-4 h-4 text-white p-0.5 bg-orange-500 rounded-full"/> : <span className="w-2 h-2 rounded-full bg-slate-200"></span>}
                 </div>
                 <div className={`text-[12.5px] font-bold mt-3 ${s.t}`}>{s.id}</div>
                 <div className="text-[10px] text-slate-400 mt-1 max-w-[80px] text-center">{s.n}</div>
              </div>
            ))}
         </div>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-5 overflow-hidden">
         <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 flex flex-col">
            <h3 className="font-semibold text-[13px] text-slate-800 border-b border-slate-100 pb-2 mb-4">流转节点 - 阶段配置表</h3>
            <div className="flex-1 space-y-3 overflow-y-auto pr-2">
               {/* Config Node Card */}
               <div className="border border-orange-200 bg-orange-50/30 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                     <span className="font-bold text-[14px] text-slate-700 flex items-center gap-1.5"><Milestone className="w-4 h-4 text-orange-500"/> 第3节点: 验收验证阶段</span>
                     <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-mono">Current Stage</span>
                  </div>
                  <div className="space-y-3 text-[12px]">
                     <div>
                        <div className="text-slate-500 mb-1 flex items-center justify-between">
                           配置节点审批组成员 <span className="text-orange-600 font-medium cursor-pointer">+增加</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="bg-white border border-slate-200 px-2 py-1 rounded flex items-center gap-1 shadow-sm"><UserPlus className="w-3 h-3 text-slate-400"/> 高级架构师(张天)</span>
                           <span className="bg-white border border-slate-200 px-2 py-1 rounded flex items-center gap-1 shadow-sm"><UserPlus className="w-3 h-3 text-slate-400"/> 审计组(王海)</span>
                        </div>
                     </div>
                     <div className="pt-2 border-t border-orange-100/50">
                        <div className="text-slate-500 mb-1">审批通过后底座平台联动行为配置</div>
                        <select className="w-full bg-white border border-slate-200 rounded p-2 focus:outline-none text-orange-700 font-medium shadow-sm">
                           <option>Trigger_Deploy → 自动执行部署与现网调度交接注册</option>
                           <option>Only_Tagging → 仅修改模型发布状态为主版本无副作用</option>
                        </select>
                     </div>
                  </div>
               </div>
               
               <div className="border border-slate-100 rounded-lg p-4 opacity-60 pointer-events-none grayscale">
                  <div className="flex justify-between items-center mb-3">
                     <span className="font-bold text-[14px] text-slate-700 flex items-center gap-1.5"><Milestone className="w-4 h-4"/> 第4节点: 发布上线</span>
                  </div>
                  <div className="space-y-2 text-[12px]">
                     <div className="text-slate-500">组员未指派，无自动化触发逻辑挂载。</div>
                  </div>
               </div>
            </div>
         </div>

         <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm p-5 flex flex-col relative overflow-hidden">
            <h3 className="font-semibold text-[13px] text-slate-100 border-b border-slate-700 pb-2 mb-4 z-10 flex items-center gap-2">
               <ActivitySquare className="w-4 h-4 text-orange-400"/> 模型全链监控雷达
            </h3>
            
            <div className="flex-1 overflow-auto z-10 space-y-3">
               {[
                 { m: 'DWD_USER_ACTION_LOG', s: '开发中 (DEV)', owner: '李工', a: '流转停滞超3天告警' },
                 { m: 'ADS_FINANCE_RPT_20', s: '发布审核 (PENDING)', owner: '王审核', a: '待签批节点，已通知' },
                 { m: 'TMP_JOIN_CACHE_08', s: '退役挂起 (DEPRECATED)', owner: '系统级', a: '将在 3天后自动Drop处理' }
               ].map((x, i) => (
                 <div key={i} className="bg-slate-800/80 border border-slate-700 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                       <span className="font-mono text-[12.5px] font-bold text-orange-300">{x.m}</span>
                       <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${i===1 ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-slate-700 text-slate-400'}`}>{x.s}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-sans">
                       <span>当前所属干预人: <span className="text-slate-200">{x.owner}</span></span>
                       <span className="flex items-center gap-1"><Flame className={`w-3 h-3 ${i===0 ? 'text-red-400' : 'text-slate-500'}`}/> {x.a}</span>
                    </div>
                 </div>
               ))}
            </div>

            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-orange-500/10 blur-[60px] pointer-events-none"></div>
         </div>
      </div>
    </div>
  );
}
