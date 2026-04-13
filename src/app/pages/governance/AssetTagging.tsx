import React, { useState } from 'react';
import { Tags, FileSearch, ShieldAlert, Sparkles, Filter, Link2 } from 'lucide-react';

export function AssetTagging() {
  return (
    <div className="p-6 h-[calc(100vh-60px)] flex flex-col bg-slate-50/50">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600 }}>平台资产标注与特征打标</h2>
          <p className="text-[12px] text-slate-500 mt-1">支持面向集团业务场景针对“精品模型”配置属性定义、血缘标签、及安全敏感分级标定。</p>
        </div>
        <div className="flex items-center gap-2 relative">
          <input placeholder="搜索模型/任务名称..." className="bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 outline-none text-[12px] focus:border-orange-400 w-64 shadow-sm" />
          <FileSearch className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="flex-1 bg-white border border-gray-100 rounded-xl shadow-sm flex overflow-hidden">
         {/* Left Side: Category Tree / Filter */}
         <div className="w-1/4 min-w-[240px] border-r border-gray-100 bg-slate-50/30 p-4">
           <div className="font-semibold text-[13px] text-slate-800 mb-3 flex items-center gap-1.5"><Filter className="w-4 h-4"/> 筛选对象盘点</div>
           <div className="space-y-1.5 text-[12.5px] font-medium text-slate-600">
             <div className="p-2 bg-orange-50 text-orange-700 rounded-md border border-orange-100 cursor-pointer flex justify-between">
                <span>高优精品模型资产</span>
                <span className="bg-orange-100 text-orange-800 text-[10px] px-1.5 rounded-full font-mono font-bold leading-relaxed">24</span>
             </div>
             <div className="p-2 hover:bg-slate-100 rounded-md cursor-pointer transition-colors text-slate-500">常规落盘宽表</div>
             <div className="p-2 hover:bg-slate-100 rounded-md cursor-pointer transition-colors text-slate-500">数据计算调度任务</div>
             <div className="p-2 hover:bg-slate-100 rounded-md cursor-pointer transition-colors text-slate-500">外部穿透视图</div>
           </div>

           <div className="font-semibold text-[13px] text-slate-800 mb-3 mt-6">快捷标注维度</div>
           <div className="space-y-2">
             {['血缘上下文对齐', '集团场景溯源', '安全与合规级别', '业务价值度量'].map((d, i) => (
               <div key={i} className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-orange-300 group-hover:bg-orange-400 transition-colors"></div>
                  <span className="text-[12px] text-slate-500 group-hover:text-slate-800">{d}</span>
               </div>
             ))}
           </div>
         </div>

         {/* Right Side: Models list */}
         <div className="flex-1 overflow-auto flex flex-col p-5">
           <div className="mb-4">
             <h3 className="font-semibold text-[14px] flex items-center gap-2"><Sparkles className="w-4 h-4 text-orange-500" /> 高优精品模型资源池池化盘点</h3>
             <p className="text-[11.5px] text-slate-400 mt-1">需完善属性填充、血缘上下游串联标注与数据敏感段界定。</p>
           </div>
           
           <div className="space-y-4 flex-1">
              {[
                { name: 'dim_customer_core_360', desc: '消费者全生命周期核心聚合模型', tags: ['客户留存场景', '高转化特征'], links: '5源库 → 12报表', sec: 'L4 机密', secBg: 'bg-red-50 text-red-600 border-red-100' },
                { name: 'dwd_traffic_hourly_agg', desc: '全局流量小时级实时汇聚清洗段', tags: ['实时看板', '大盘引流追踪'], links: '2消息队列 → 4 DaaS', sec: 'L2 内部', secBg: 'bg-green-50 text-green-600 border-green-100' },
                { name: 'ads_finance_settlement_monthly', desc: '清结算月底财务核心结账出报模型', tags: ['审计合规要求', '财务月结'], links: '15层模型溯源', sec: 'L5 极高密', secBg: 'bg-rose-100 text-rose-800 border-rose-200' },
              ].map((m, i) => (
                <div key={i} className="border border-slate-100 rounded-xl p-4 hover:border-orange-200 hover:shadow-md transition-all bg-white relative group">
                   <button className="absolute top-4 right-4 bg-orange-50 text-orange-600 px-3 py-1.5 rounded text-[11.5px] font-medium opacity-0 group-hover:opacity-100 transition-opacity border border-orange-100">
                      录入人工打标
                   </button>
                   <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shrink-0">
                         <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                         <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-[14px] font-bold text-slate-800">{m.name}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${m.secBg}`}>{m.sec}</span>
                         </div>
                         <div className="text-[12.5px] text-slate-500 mb-3">{m.desc}</div>
                         
                         <div className="flex items-center gap-5 text-[12px]">
                            <div className="flex items-center gap-1.5 text-slate-600">
                               <Tags className="w-3.5 h-3.5 text-slate-400" />
                               {m.tags.map(t => <span key={t} className="bg-slate-100 px-1.5 py-0.5 rounded">{t}</span>)}
                            </div>
                            <div className="w-px h-3 bg-slate-200"></div>
                            <div className="flex items-center gap-1.5 text-orange-500 font-mono tracking-tight cursor-pointer hover:underline">
                               <Link2 className="w-3.5 h-3.5" /> 血缘网络: {m.links}
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              ))}
           </div>
         </div>
      </div>
    </div>
  );
}
