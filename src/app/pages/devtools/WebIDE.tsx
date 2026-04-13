import React, { useState } from 'react';
import { Terminal, Database, ToggleLeft, ToggleRight, ShieldAlert, FileText, Search, Play, Settings2 } from 'lucide-react';

export function WebIDE() {
  const [gatewayMode, setGatewayMode] = useState(true);
  
  return (
    <div className="p-6 h-[calc(100vh-60px)] flex flex-col bg-slate-50/50">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600 }}>集成开发环境 WebIDE</h2>
          <p className="text-[12px] text-slate-500 mt-1">
            提供浏览器端查询、构建、调试。安全合规接入安全数据库网关与日志授权策略。
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm">
          <div className="text-[12.5px] font-medium text-slate-700 flex items-center gap-2">
             <Database className="w-4 h-4 text-orange-500" />
             SQL 访问网关控制模式
          </div>
          <button onClick={() => setGatewayMode(!gatewayMode)} className="flex items-center gap-1.5 transition-colors">
            {gatewayMode ? (
               <><ToggleRight className="w-6 h-6 text-orange-500" /> <span className="text-orange-600 text-[12px] font-bold">任务网关访问</span></>
            ) : (
               <><ToggleLeft className="w-6 h-6 text-slate-300" /> <span className="text-slate-500 text-[12px] font-bold">直接访问集群 (特批)</span></>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-4 gap-4 overflow-hidden">
         {/* Left Side: Auth & Logs */}
         <div className="col-span-1 bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col">
            <div className="px-4 py-3 border-b border-gray-50 flex items-center gap-2 bg-slate-50/50">
               <ShieldAlert className="w-4 h-4 text-orange-500" />
               <span className="font-semibold text-[13px] text-slate-800">大数据安全管理授权</span>
            </div>
            <div className="p-4 space-y-4 flex-1 overflow-auto">
               <div className="space-y-1">
                  <div className="text-[11.5px] font-medium text-slate-500 mb-2">脱敏与查询权限侦测</div>
                  <div className="px-3 py-2 bg-orange-50 text-orange-700 border border-orange-100 rounded text-[12px] flex items-center justify-between">
                     <span>手机号字段 Masking</span>
                     <span className="font-mono text-[10px] bg-orange-200/50 px-1.5 py-0.5 rounded">Active</span>
                  </div>
                  <div className="px-3 py-2 bg-slate-50 text-slate-600 border border-slate-100 rounded text-[12px] flex items-center justify-between mt-2">
                     <span>跨域联表 Join 控制</span>
                     <span className="font-mono text-[10px] bg-slate-200 px-1.5 py-0.5 rounded">Restricted</span>
                  </div>
               </div>

               <div className="space-y-1 pt-4 border-t border-slate-100">
                  <div className="text-[11.5px] font-medium text-slate-500 mb-2">安全日志监测授权池</div>
                  {[
                    { n: 'Hive/SparkSQL 操作日志', stat: '已授权' },
                    { n: 'Web 业务访问日志', stat: '已授权' },
                    { n: '接口级调用日志', stat: '已授权' },
                    { n: 'FTP 文件传输日志', stat: '待申请' },
                    { n: 'Kafka 流道流转日志', stat: '需特批' }
                  ].map((l, i) => (
                    <div key={i} className="flex items-center justify-between text-[12px] py-1.5">
                       <div className="flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-slate-400" />
                          <span className={l.stat === '已授权' ? 'text-slate-700' : 'text-slate-400'}>{l.n}</span>
                       </div>
                       <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${l.stat === '已授权' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>{l.stat}</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Center/Right: IDE Core */}
         <div className="col-span-3 flex flex-col gap-4">
            <div className="flex-1 bg-slate-900 rounded-xl shadow-sm border border-slate-800 flex flex-col overflow-hidden relative">
               <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                  <Terminal className="w-32 h-32 text-orange-400" />
               </div>
               <div className="px-4 py-2 border-b border-slate-800 flex items-center justify-between text-[12px] font-mono shrink-0">
                  <div className="flex gap-4 text-slate-400">
                     <span className="text-orange-400">query_session_041.sql</span>
                     <span className="hover:text-slate-200 cursor-pointer">pyspark_job.py</span>
                  </div>
                  <div className="flex gap-2">
                     <button className="text-slate-400 hover:text-white px-2 py-1"><Settings2 className="w-4 h-4"/></button>
                     <button className="bg-orange-600 hover:bg-orange-500 text-white px-3 py-1 rounded flex items-center gap-1 font-bold">
                        <Play className="w-3.5 h-3.5" /> Execute
                     </button>
                  </div>
               </div>
               <div className="flex-1 p-4 font-mono text-[13px] leading-relaxed text-slate-300 overflow-auto">
                  <span className="text-slate-500">-- 敏感数据访问将自动经过内置脱敏引擎处理，并纳入审计</span><br/>
                  <span className="text-blue-400">SELECT</span><br/>
                  &nbsp;&nbsp;u.user_id,<br/>
                  &nbsp;&nbsp;<span className="text-orange-300">mask_hash</span>(u.phone_number) <span className="text-blue-400">AS</span> safe_phone,<br/>
                  &nbsp;&nbsp;a.action_type,<br/>
                  &nbsp;&nbsp;a.timestamp<br/>
                  <span className="text-blue-400">FROM</span> data_lake.ods_user_base u<br/>
                  <span className="text-blue-400">JOIN</span> hive.dw_user_action a <span className="text-blue-400">ON</span> u.user_id = a.user_id<br/>
                  <span className="text-blue-400">WHERE</span> u.status = <span className="text-green-400">'active'</span><br/>
                  <span className="text-blue-400">LIMIT</span> <span className="text-purple-400">1000</span>;
               </div>
            </div>

            {/* Results Console */}
            <div className="h-48 bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col shrink-0">
               <div className="px-4 py-2 border-b border-gray-50 flex items-center justify-between bg-slate-50/50">
                  <span className="text-[12px] font-semibold text-slate-700">执行结果 & 审计日志</span>
                  <span className="text-[11px] font-mono text-slate-400">Time: 1.42s | Rows: 1,000 | Masked: True</span>
               </div>
               <div className="flex-1 p-0 overflow-auto">
                  <table className="w-full text-left text-[12px]">
                     <thead className="bg-slate-50 text-slate-500 sticky top-0">
                        <tr>
                           <th className="px-4 py-2 font-medium">user_id</th>
                           <th className="px-4 py-2 font-medium text-orange-600 flex items-center gap-1">safe_phone <ShieldAlert className="w-3 h-3"/></th>
                           <th className="px-4 py-2 font-medium">action_type</th>
                           <th className="px-4 py-2 font-medium">timestamp</th>
                        </tr>
                     </thead>
                     <tbody className="font-mono text-slate-600">
                        <tr className="border-b border-gray-50"><td className="px-4 py-2">UID_89912</td><td className="px-4 py-2 text-slate-400">138****9921</td><td className="px-4 py-2">LOGIN</td><td className="px-4 py-2">2026-04-13 14:01:21</td></tr>
                        <tr className="border-b border-gray-50"><td className="px-4 py-2">UID_10283</td><td className="px-4 py-2 text-slate-400">186****3325</td><td className="px-4 py-2">PAY</td><td className="px-4 py-2">2026-04-13 14:02:44</td></tr>
                        <tr><td className="px-4 py-2">UID_55481</td><td className="px-4 py-2 text-slate-400">139****1108</td><td className="px-4 py-2">VIEW</td><td className="px-4 py-2">2026-04-13 14:03:00</td></tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
