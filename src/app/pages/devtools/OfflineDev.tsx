import React, { useState } from 'react';
import { ArrowLeftRight, Code2, Database, TerminalSquare, SlidersHorizontal, CheckCircle2 } from 'lucide-react';

export function OfflineDev() {
  const [mode, setMode] = useState('sql');

  return (
    <div className="p-6 h-[calc(100vh-60px)] flex flex-col bg-slate-50/50">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600 }}>离线数据开发与低代码转化工具</h2>
          <p className="text-[12px] text-slate-500 mt-1 max-w-4xl leading-relaxed">
            提供一站式 Web 化全面托管工作流。专为采集、核心系统的庞大脚本设计自动“代码转低代码”翻译器，并统一对接低代码任务网关。
          </p>
        </div>
      </div>

      <div className="flex gap-2 border-b border-gray-200 mb-5 px-1">
        <button onClick={() => setMode('sql')} className={`pb-2.5 px-3 text-[13px] font-medium border-b-2 transition-colors flex items-center gap-1.5 ${mode === 'sql' ? 'border-orange-600 text-orange-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
          SQL 转低代码程序
        </button>
        <button onClick={() => setMode('python')} className={`pb-2.5 px-3 text-[13px] font-medium border-b-2 transition-colors flex items-center gap-1.5 ${mode === 'python' ? 'border-orange-600 text-orange-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
          Python 任务迁移转化
        </button>
      </div>

      {mode === 'sql' && (
         <div className="flex-1 flex gap-5 overflow-hidden animate-in fade-in">
            {/* Editor Input */}
            <div className="w-1/2 flex flex-col bg-slate-900 rounded-xl shadow-sm border border-slate-800 overflow-hidden">
               <div className="px-4 py-3 border-b border-slate-700/50 flex justify-between items-center text-slate-300">
                  <span className="text-[13px] font-semibold flex items-center gap-2"><Database className="w-4 h-4 text-orange-400"/> 原始 SQL 在线编写 (标准语系)</span>
               </div>
               <div className="flex-1 p-4 font-mono text-[13px] leading-relaxed text-slate-300 overflow-auto">
                  <span className="text-blue-400">SELECT</span><br/>
                  &nbsp;&nbsp;A.cust_id, A.cust_level, <br/>
                  &nbsp;&nbsp;<span className="text-orange-300">SUM</span>(B.order_amt) <span className="text-blue-400">AS</span> total_consume <br/>
                  <span className="text-blue-400">FROM</span> core_db.dwd_cust_info A <br/>
                  <span className="text-blue-400">LEFT JOIN</span> core_db.dwd_order_info B <span className="text-blue-400">ON</span> A.cust_id = B.cust_id <br/>
                  <span className="text-blue-400">WHERE</span> A.status <span className="text-blue-400">IN</span> (<span className="text-green-400">'01'</span>, <span className="text-green-400">'02'</span>) <br/>
                  <span className="text-blue-400">GROUP BY</span> A.cust_id, A.cust_level;
               </div>
               <div className="p-3 bg-slate-800 border-t border-slate-700 flex justify-end">
                  <button className="bg-orange-600 text-white px-4 py-1.5 rounded text-[12px] font-bold flex items-center gap-2 hover:bg-orange-500 transition-colors shadow-[0_0_15px_rgba(234,88,12,0.4)]">
                     <ArrowLeftRight className="w-4 h-4"/> 激活翻译引擎
                  </button>
               </div>
            </div>

            {/* Translation Results & Rules */}
            <div className="w-1/2 flex flex-col gap-4">
               <div className="bg-white border border-orange-100 rounded-xl shadow-sm p-4 text-slate-600">
                  <h3 className="font-semibold text-[13px] text-orange-700 border-b border-orange-100 pb-2 mb-3 flex items-center gap-2">
                     <TerminalSquare className="w-4 h-4"/> 翻译目标状态: 可视化低代码算子装配完成
                  </h3>
                  <div className="text-[12px] bg-slate-50 p-3 rounded-lg border border-slate-100 font-mono text-slate-500 relative">
                     <div className="absolute -top-3 -right-2 right-2 text-right"><span className="bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded text-[10px] font-bold">100% SUCCESS</span></div>
                     {'[源节点] DWD_CUST_INFO -> [过滤算子] STATUS IN (01,02) -> [保留]'} <br/>
                     {'[源节点] DWD_ORDER_INFO -> [保留]'} <br/>
                     <span className="text-orange-500 px-1 font-bold">{'>>>>  [连接算子] LEFT JOIN (cust_id)'}</span> <br/>
                     {'[聚合算子] GROUP_BY: cust_id, cust_level | SUM: order_amt -> [输出流]'}
                  </div>
               </div>
               
               <div className="flex-1 bg-white border border-gray-100 rounded-xl shadow-sm p-4 overflow-auto custom-scrollbar">
                  <h3 className="font-semibold text-[13px] text-slate-800 border-b border-slate-100 pb-2 mb-3">支持的 21 种复杂转换场景检测池</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px]">
                     {[
                        '单表单目标-无变量', '单表单目标-源表带条件 (in, and, or)', '单表单目标-源表带条件变量',
                        '单表单目标-源表 groupby', '单表单目标-源表 case when', '单表单目标-源表 (nvl、sum)',
                        '单表单目标-源表 (rownum)', '多表单目标-1层 union', '多表单目标-2层 union',
                        '多表单目标-3层 union', '多表单目标-1层 join 连接-left', '多表单目标-2层 join 连接-left',
                        '多表单目标-3层 join 连接-left', '多表单目标-1层 join 连接-inner', '多表单目标-2层 join 连接-inner',
                        '多表单目标-3层 join 连接-inner', '多表单目标-1层 join 连接-right', '多表单目标-2层 join 连接-right',
                        '多表单目标-3层 join 连接-right', '多表单目标-多表多嵌套分析'
                     ].map((r, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-slate-500">
                           <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${[1,2,5,10].includes(i) ? 'text-emerald-500' : 'text-slate-300'}`}/> {r}
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      )}

      {mode === 'python' && (
         <div className="flex-1 bg-white border border-gray-100 rounded-xl shadow-sm p-6 animate-in fade-in flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
               <SlidersHorizontal className="w-8 h-8 text-orange-400" />
            </div>
            <h3 className="text-[16px] font-semibold text-slate-700 mb-2">Python 类开发任务向低代码流转化</h3>
            <p className="text-[13px] text-slate-500 max-w-lg leading-relaxed">
               为核心业务采集、开发任务迁移专用设计的辅助工具。将在特定场景下自动静态剖析 Python 脚本的数据处理链路，通过低代码统一网关完成新老系统的无缝切换对接适配。
            </p>
            <button className="mt-8 bg-orange-500 text-white px-5 py-2 rounded-lg text-[13px] font-bold shadow-md hover:bg-orange-600 transition-colors">
               扫描工程挂载脚本
            </button>
         </div>
      )}
    </div>
  );
}
