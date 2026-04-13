import React from 'react';
import { Activity, LayoutDashboard, ShieldCheck, Box, RefreshCw, FolderSearch, PenTool } from 'lucide-react';

export function ModelQuality() {
  return (
    <div className="p-6 h-[calc(100vh-60px)] flex flex-col bg-slate-50/50">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600 }}>模型研发与全生命周期质量把控</h2>
          <p className="text-[12px] text-slate-500 mt-1 max-w-3xl leading-relaxed">
            聚焦质量稽核任务配置、模型命名、避免系统内碎片化逻辑。解耦稽核与采集系统能力，通过调度底层检查模块保障研发模型的规范可用闭环体系。
          </p>
        </div>
        <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-[12px] font-medium shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
           <PenTool className="w-3.5 h-3.5"/> 自动生成稽核卡点
        </button>
      </div>

      <div className="grid grid-cols-3 gap-5 mb-5">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4 items-center">
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center shrink-0 border border-amber-100"><Activity className="w-5 h-5 text-amber-600"/></div>
            <div>
              <div className="text-slate-500 text-[11.5px] mb-1 font-medium">配置中活跃质量任务大盘</div>
              <div className="text-slate-800 text-[20px] font-bold font-mono">1,402</div>
            </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4 items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-amber-50/50 to-transparent z-0"></div>
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center shrink-0 border border-amber-100 z-10"><ShieldCheck className="w-5 h-5 text-amber-600"/></div>
            <div className="z-10">
              <div className="text-slate-500 text-[11.5px] mb-1 font-medium">拦截潜在模型碎片缺陷</div>
              <div className="text-amber-700 text-[20px] font-bold font-mono tracking-tight">38.4% <span className="text-[11px] font-sans font-normal text-slate-400">避碎率</span></div>
            </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4 items-center">
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center shrink-0 border border-orange-100"><FolderSearch className="w-5 h-5 text-orange-600"/></div>
            <div>
              <div className="text-slate-500 text-[11.5px] mb-1 font-medium">自动内容解析与表信息库入库</div>
              <div className="text-orange-700 text-[20px] font-bold font-mono">正常响应中</div>
            </div>
        </div>
      </div>

      <div className="flex-1 bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col overflow-hidden">
         <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between bg-white z-10 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
           <h3 className="font-semibold text-[14px] flex items-center gap-2"><LayoutDashboard className="w-4 h-4 text-orange-500" /> 稽核调度与执行流态面板</h3>
           <div className="flex items-center gap-4 text-[12px] font-medium text-slate-500">
             <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-green-400 rounded"></div>同步卡点检查中</div>
             <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-orange-400 rounded"></div>文件解析执行</div>
             <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-amber-400 rounded"></div>库内比对稽核</div>
           </div>
         </div>
         
         <div className="flex-1 overflow-auto p-4 bg-slate-50/20">
            {/* Waterfall logic representation */}
            <div className="space-y-4">
              {[
                { name: '支付域核心流水同步模型管控', schedule: 'HBase → Hive (Daily - 04:00 AM)', tag: '防碎片强管控', status: 'pass' },
                { name: '用户端营销标签时序关联图谱', schedule: 'Hive → ES (H-1小时流)', tag: '强一致校验', status: 'running' },
                { name: '清结算月底财务结算核心依赖表', schedule: 'Oracle → GreenPlum (Monthly)', tag: '对账文件解析强卡点', status: 'wait' }
              ].map((task, i) => (
                 <div key={i} className="bg-white border border-slate-100 rounded-lg p-5 shadow-sm hover:shadow transition-shadow">
                    <div className="flex items-center justify-between mb-4 border-b border-slate-50 pb-3">
                       <div>
                         <span className="font-semibold text-[14px] text-slate-800 flex items-center gap-2">
                           <Box className="w-4 h-4 text-slate-400"/> {task.name}
                         </span>
                         <div className="text-[11px] font-mono text-slate-400 mt-1">{task.schedule}</div>
                       </div>
                       <span className="bg-orange-50 text-orange-600 border border-orange-100 px-2 py-0.5 rounded text-[11px] font-medium">{task.tag}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 mt-2">
                       <div className={`h-2 flex-1 rounded-l-full cursor-help relative group ${task.status === 'pass' || task.status === 'running' || task.status === 'wait' ? 'bg-green-400' : 'bg-slate-200'}`}>
                          <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded font-mono shadow-xl z-20 whitespace-nowrap">同步卡点检查点</div>
                       </div>
                       <div className={`h-2 flex-1 cursor-help relative group ${task.status === 'pass' || task.status === 'running' ? 'bg-orange-400' : 'bg-slate-200'}`}>
                          <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded font-mono shadow-xl z-20 whitespace-nowrap">自动提取表信息文件解析</div>
                          {task.status === 'running' && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500 animate-spin bg-white rounded-full flex items-center justify-center p-0.5"><RefreshCw className="w-full h-full"/></div>}
                       </div>
                       <div className={`h-2 flex-1 rounded-r-full cursor-help relative group ${task.status === 'pass' ? 'bg-amber-400' : 'bg-slate-200'}`}>
                          <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded font-mono shadow-xl z-20 whitespace-nowrap">入库后规则逻辑探针比对</div>
                       </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium font-sans mt-1.5 px-1">
                      <span>数据管道探视同步</span>
                      <span className="pr-12">解耦解析入库</span>
                      <span>深度模型缺陷规避审核</span>
                    </div>
                 </div>
              ))}
            </div>
         </div>
      </div>
    </div>
  );
}
