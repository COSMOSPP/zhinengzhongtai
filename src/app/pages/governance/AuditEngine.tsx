import React from 'react';
import { Target, FileKey2, FileCog, Zap, HardDriveUpload, CheckSquare } from 'lucide-react';

export function AuditEngine() {
  return (
    <div className="p-6 h-[calc(100vh-60px)] flex flex-col bg-slate-50/50">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600 }}>稽核引擎底座 (Audit Engine)</h2>
          <p className="text-[12px] text-slate-500 mt-1 max-w-2xl">集对账稽核规则配置、底层稽核资源调度为一体。支持解析与预判大批量 CHECK/VALUE 对账扫描文件，并嵌入验证《平台模型规范》体系。</p>
        </div>
        <button className="bg-amber-500 text-white px-4 py-2 rounded-lg text-[12px] font-medium shadow-sm hover:bg-amber-600 transition-colors flex items-center gap-2">
           <HardDriveUpload className="w-4 h-4"/>
           装载全量对账文件扫描
        </button>
      </div>

      <div className="grid grid-cols-2 gap-5 flex-1 overflow-hidden pb-2">
         {/* CHECK/VALUE Parser */}
         <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 flex flex-col h-full border-t-4 border-t-amber-400">
            <h3 className="font-semibold text-[14px] flex items-center gap-2 mb-1"><FileKey2 className="w-4 h-4 text-amber-500" /> CHECK/VALUE 传输质量评估流</h3>
            <p className="text-[11.5px] text-slate-400 mb-4">通过对账文件保证落盘数据的完备性一致性。</p>

            <div className="grid grid-cols-3 gap-3 mb-5">
               {[
                 { label: '文件级完整性比对', id: 'size_check', ok: true },
                 { label: '主子表记录匹配校验', id: 'record_match', ok: true },
                 { label: '关键数额散列一致性', id: 'hash_sum', ok: false },
               ].map(c => (
                 <div key={c.id} className={`p-3 rounded-lg border ${c.ok ? 'bg-amber-50 border-amber-100' : 'bg-red-50 border-red-100'} flex flex-col justify-between h-20`}>
                    <div className="text-[11.5px] font-medium text-slate-700 leading-tight">{c.label}</div>
                    <div className="flex items-center justify-end">
                      {c.ok ? <span className="text-[10px] font-mono text-amber-600 bg-amber-100 px-1 py-0.5 rounded">通过 CHECK</span> : 
                              <span className="text-[10px] font-mono whitespace-nowrap text-red-600 bg-red-100 px-1 py-0.5 rounded animate-pulse">差异: VALUE Mismatch</span>}
                    </div>
                 </div>
               ))}
            </div>

            <div className="flex-1 overflow-auto bg-slate-50 border border-slate-100 rounded-lg p-0 relative">
               <div className="sticky top-0 bg-slate-100/80 backdrop-blur font-semibold text-[12px] py-2 px-4 border-b border-slate-200">文件校验解析批次追踪</div>
               <div className="p-4 space-y-3">
                 {[1, 2, 3, 4].map(idx => (
                    <div key={idx} className="flex gap-4">
                       <div className="font-mono text-slate-400 text-[10px] mt-0.5 shrink-0">12:30:{10+idx*4}</div>
                       <div>
                         <div className={`text-[12px] font-mono font-medium ${idx===2 ? 'text-red-500' : 'text-slate-700'}`}>TXN_BATCH_20260408_{idx}.chk</div>
                         <div className="text-[11px] text-slate-500 mt-0.5">记录条数: {4200 * idx} | 体积: {idx * 1.2} GB | 校验态: {idx===2 ? 'HSAH验证破损' : '一致'}</div>
                       </div>
                    </div>
                 ))}
               </div>
            </div>
         </div>

         {/* Model Spec Validator */}
         <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 flex flex-col h-full border-t-4 border-t-orange-500">
            <h3 className="font-semibold text-[14px] flex items-center gap-2 mb-1"><Target className="w-4 h-4 text-orange-500" /> 贯穿生命周期模型验证卡点</h3>
            <p className="text-[11.5px] text-slate-400 mb-4">强耦合《大数据平台模型建设需求规范》，对模型及字段格式阻断评估。</p>

            <div className="space-y-4 pr-2 overflow-auto custom-scrollbar flex-1">
               <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                 <div className="flex items-center justify-between mb-2">
                   <div className="font-medium text-[13px] text-slate-800">DWD 层核心订单主题域模型重构</div>
                   <span className="text-[10px] font-mono bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-bold">审计状态: 驳回预警</span>
                 </div>
                 <div className="space-y-2 mt-3">
                   <div className="flex items-start gap-2 text-[12px]">
                      <CheckSquare className="w-4 h-4 text-amber-500 shrink-0" />
                      <div className="text-slate-600">模型字段英文命名驼峰准则全量检查项符合要求。</div>
                   </div>
                   <div className="flex items-start gap-2 text-[12px]">
                      <CheckSquare className="w-4 h-4 text-amber-500 shrink-0" />
                      <div className="text-slate-600">关联物理计算集群配额校验通过。</div>
                   </div>
                   <div className="flex items-start gap-2 text-[12px] bg-red-50 p-2 rounded border border-red-100 mt-1">
                      <Zap className="w-4 h-4 text-red-500 shrink-0 translate-y-0.5" />
                      <div>
                        <div className="text-red-800 font-medium font-mono">Exception: Data_Domain_Compliance_Error</div>
                        <div className="text-red-600/80 mt-1 leading-relaxed">违规侦测点：该模型内部引用的底层外键字段 <code className="bg-white px-1 py-0.5 rounded">ods_cust_id</code> 未遵循跨层设计范式，跨越了约束逻辑，存在导致孤儿数据的安全隐患。稽核引擎已拒绝入库！</div>
                      </div>
                   </div>
                 </div>
               </div>

               <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl opacity-70">
                 <div className="flex items-center justify-between mb-2">
                   <div className="font-medium text-[13px] text-slate-800">ADS 高管决策大屏聚合指标体系</div>
                   <span className="text-[10px] font-mono bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold">审计状态: 安全装载</span>
                 </div>
                 <div className="flex items-start gap-2 text-[12px] mt-2">
                    <CheckSquare className="w-4 h-4 text-amber-500 shrink-0" />
                    <div className="text-slate-500">通过全量 188 项模型安全基线审查策略池校验。</div>
                 </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
