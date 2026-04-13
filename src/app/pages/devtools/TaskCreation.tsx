import React, { useState } from 'react';
import { Edit, Save, Server, Clock, GitCommit, Layers, ShieldHalf } from 'lucide-react';

export function TaskCreation() {
  const [taskType, setTaskType] = useState('collect');

  return (
    <div className="p-6 h-[calc(100vh-60px)] flex flex-col bg-slate-50/50">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600 }}>任务制定与编排设计</h2>
          <p className="text-[12px] text-slate-500 mt-1">负责调度基本信息的勾勒，细分数据采集汇聚级任务与大数据底层开发级任务属性边界。</p>
        </div>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-[12px] font-medium shadow-sm hover:bg-orange-700 transition-colors flex items-center gap-2">
           <Save className="w-4 h-4"/> 保存任务草案
        </button>
      </div>

      <div className="flex flex-1 gap-5 overflow-hidden">
         <div className="w-1/3 min-w-[320px] bg-white border border-gray-100 rounded-xl shadow-sm p-5 overflow-y-auto">
            <h3 className="font-semibold text-[13px] text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
               <Edit className="w-4 h-4 text-orange-500"/> 基础骨架定义
            </h3>
            <div className="space-y-4 text-[12px]">
               <div>
                  <label className="block text-slate-500 mb-1">任务名称</label>
                  <input type="text" className="w-full border border-slate-200 rounded-md p-1.5 focus:border-orange-400 outline-none" defaultValue="每日凌晨网关日志汇总" />
               </div>
               <div>
                  <label className="block text-slate-500 mb-1">描述</label>
                  <textarea className="w-full border border-slate-200 rounded-md p-1.5 focus:border-orange-400 outline-none" rows={2} defaultValue="汇聚并提纯 5G 信令网关报文"></textarea>
               </div>
               <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-500 mb-1">优先权级</label>
                    <select className="w-full border border-slate-200 rounded-md p-1.5 outline-none">
                       <option>P1 - 骨干最高</option>
                       <option>P2 - 核心保障</option>
                       <option>P3 - 常规调度</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">运行承载模式</label>
                    <select className="w-full border border-slate-200 rounded-md p-1.5 outline-none text-orange-600 font-medium">
                       <option>Yarn 集群资源运行</option>
                       <option>独立主机独占模式</option>
                    </select>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-500 mb-1">计划触发方式</label>
                    <select className="w-full border border-slate-200 rounded-md p-1.5 outline-none">
                       <option>CRON 定时触发</option>
                       <option>前置依赖驱动</option>
                       <option>事件挂载触发</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">绑定调用程序</label>
                    <input type="text" className="w-full border border-slate-200 rounded-md p-1.5 focus:border-orange-400 outline-none font-mono" defaultValue="bin/spark-submit" />
                  </div>
               </div>
            </div>
         </div>

         <div className="flex-1 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="flex bg-slate-50/50 border-b border-gray-100">
               <button onClick={() => setTaskType('collect')} className={`px-5 py-3 text-[13px] font-medium transition-colors ${taskType === 'collect' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-slate-500 hover:text-slate-800'}`}>数据采集类任务特征扩展</button>
               <button onClick={() => setTaskType('dev')} className={`px-5 py-3 text-[13px] font-medium transition-colors ${taskType === 'dev' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-slate-500 hover:text-slate-800'}`}>数据开发类任务特征扩展</button>
            </div>
            
            <div className="p-6 flex-1 overflow-auto">
               {taskType === 'collect' ? (
                  <div className="animate-in fade-in space-y-6">
                     <div>
                        <div className="font-semibold text-[13px] text-slate-800 mb-1 flex items-center gap-2"><Layers className="w-4 h-4 text-orange-500"/> 绑定架构层级归属</div>
                        <p className="text-[11px] text-slate-400 mb-3">严格遵守《平台模型建设对接规范》约束层级</p>
                        <select className="border border-slate-200 rounded-md p-2 w-64 text-[12px] outline-none bg-orange-50/30">
                           <option>贴源抽取层 (ODS)</option>
                           <option>明细汇聚层 (DWD)</option>
                        </select>
                     </div>
                     <div className="pt-4 border-t border-slate-100">
                        <div className="font-semibold text-[13px] text-slate-800 mb-1 flex items-center gap-2"><ShieldHalf className="w-4 h-4 text-orange-500"/> 修改部署架构与高可用测试</div>
                        <p className="text-[11px] text-slate-400 mb-3">配置测试接口用于保证采集节点在高并发及容灾情况下的业务连续性。</p>
                        <div className="flex gap-4">
                           <label className="flex items-center gap-2 bg-slate-50 px-3 py-2 border border-slate-100 rounded cursor-pointer">
                              <input type="checkbox" className="accent-orange-500" defaultChecked />
                              <span className="text-[12px] text-slate-600">注入高可用测试接口(HA)工具</span>
                           </label>
                           <label className="flex items-center gap-2 bg-slate-50 px-3 py-2 border border-slate-100 rounded cursor-pointer">
                              <input type="checkbox" className="accent-orange-500" defaultChecked />
                              <span className="text-[12px] text-slate-600">开放极限压力测试接口通道</span>
                           </label>
                        </div>
                     </div>
                  </div>
               ) : (
                  <div className="animate-in fade-in space-y-6">
                     <div>
                        <div className="font-semibold text-[13px] text-slate-800 mb-1 flex items-center gap-2"><Server className="w-4 h-4 text-orange-500"/> 算力运行服务器指派</div>
                        <p className="text-[11px] text-slate-400 mb-3">定向挑选适合大规模数据开发的专用计算节点群</p>
                        <select className="border border-slate-200 rounded-md p-2 w-full max-w-md text-[12px] outline-none">
                           <option>Hadoop_Computing_Cluster_A (800 vCores / 4TB RAM)</option>
                           <option>Spark_Realtime_Node_Pool (NVMe Backed)</option>
                        </select>
                     </div>
                     <div className="pt-4 border-t border-slate-100">
                        <div className="font-semibold text-[13px] text-slate-800 mb-1 flex items-center gap-2"><Clock className="w-4 h-4 text-orange-500"/> 批处理与调度周期配置</div>
                        <p className="text-[11px] text-slate-400 mb-3">为离线 ETL 计算脚本配置执行周期。</p>
                        <div className="grid grid-cols-2 max-w-md gap-4">
                           <input type="text" className="w-full border border-slate-200 rounded-md p-2 text-[12px] outline-none" placeholder="CRON 表达式 例如 0 0 2 * * ?" />
                           <input type="text" className="w-full border border-slate-200 rounded-md p-2 text-[12px] outline-none" placeholder="超时中断阈值 (分钟)" />
                        </div>
                     </div>
                     <div className="pt-4 border-t border-slate-100">
                        <div className="font-semibold text-[13px] text-slate-800 mb-1 flex items-center gap-2"><GitCommit className="w-4 h-4 text-orange-500"/> 脚本上下文强依赖项</div>
                        <textarea className="w-full max-w-md border border-slate-200 rounded-md p-2 text-[12px] outline-none" rows={3} placeholder="跨库外键预先就绪检查点或数据源预热指令..."></textarea>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
}
