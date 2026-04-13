import React, { useState } from 'react';
import { BellRing, ShieldAlert, Cpu, Settings2, Plus, ArrowUpRight, Search } from 'lucide-react';

export function AlertMgmt() {
  const [activeTab, setActiveTab] = useState('events');

  return (
    <div className="p-6 h-[calc(100vh-60px)] flex flex-col bg-slate-50/50">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600 }}>全链路高级别监控告警中心</h2>
          <p className="text-[12px] text-slate-500 mt-1">支持对主机组件、离散服务及 DaaS 数据接口监控拦截，多通道联动并支持安全合规强升级。</p>
        </div>
        <div className="flex gap-2">
          {activeTab === 'rules' && (
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#fa541c] text-white rounded-lg shadow-sm hover:bg-[#d4380d] transition-colors" style={{ fontSize: '12px' }}>
              <Plus className="w-3.5 h-3.5" /> 新建监控告警规则项
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-4 border-b border-gray-200 mb-4 px-1">
        {[
          { id: 'events', label: '接口积压与异常事件跟踪' },
          { id: 'rules', label: '告警条件规则库配置 (alert_rule)' },
          { id: 'escalation', label: '自动强制升级与分派分析' },
        ].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} className={`pb-2.5 px-2 text-[13px] font-medium border-b-2 transition-colors ${activeTab === t.id ? 'border-[#fa541c] text-[#fa541c]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-hidden">
        {activeTab === 'events' && (
          <div className="h-full flex flex-col bg-white border border-gray-100 rounded-xl shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
               <div className="flex items-center gap-2 px-2 py-1 bg-red-50 text-red-600 rounded border border-red-100">
                 <BellRing className="w-4 h-4 animate-bounce" />
                 <span className="font-semibold text-[13.5px]">待介入严重异常清单</span>
               </div>
               <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input placeholder="查询 alert_name / rule_id..." className="bg-slate-50 border border-gray-200 rounded-lg pl-8 pr-3 py-1 text-[12px] outline-none w-64 focus:border-[#fa541c] transition-all" />
               </div>
            </div>
            
            <div className="flex-1 overflow-auto border border-gray-100 rounded-lg shadow-inner bg-slate-50/20">
              <table className="w-full text-left text-[12.5px]">
                <thead className="bg-white sticky top-0 shadow-sm z-10">
                  <tr>
                    <th className="px-5 py-3 font-semibold text-slate-700 border-b border-gray-200">标准接口名 (alert_name)</th>
                    <th className="px-5 py-3 font-semibold text-slate-700 border-b border-gray-200">实例对象穿透诊断</th>
                    <th className="px-5 py-3 font-semibold text-slate-700 border-b border-gray-200">评定级别优先度</th>
                    <th className="px-5 py-3 font-semibold text-slate-700 border-b border-gray-200">未响应积压时间</th>
                    <th className="px-5 py-3 font-semibold text-slate-700 border-b border-gray-200">当前派发状态</th>
                    <th className="px-5 py-3 font-semibold text-slate-700 border-b border-gray-200">管理</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {[
                    { rule: 'DAAS_Kafa_Topic_Overflow', obj: '专区 DaaS Kafka 通道', state: '吞吐异常积压', lvl: '系统级紧急', time: '15分钟', status: '通知短信未响应', bg: 'bg-red-50/50' },
                    { rule: 'TeleDB_MasterSlave_Lag', obj: 'VIP 核心主备拉取库', state: '回执延时堆积', lvl: '高优干预', time: '4小时 32分', status: '已被认领跟进', bg: 'bg-orange-50/30' },
                    { rule: 'DataInterface_API_Timeout', obj: 'SAAS 业务调用网关', state: '持续超时未完成', lvl: '合规预警', time: '12分钟', status: '系统记录与隔离', bg: '' },
                  ].map((row, i) => (
                    <tr key={i} className={`border-b border-gray-50 hover:bg-slate-50/80 transition-colors ${row.bg}`}>
                      <td className="px-5 py-3.5 font-mono text-[#fa541c] font-medium tracking-tight">
                         <span className="bg-[#fa541c]/5 px-2 py-0.5 rounded border border-[#fa541c]/10">{row.rule}</span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-700 font-medium">
                         {row.obj} <span className="mx-2 text-slate-200">|</span> 
                         <span className={i === 0 ? "text-red-500 font-semibold" : i===1 ? "text-orange-500" : "text-slate-500"}> {row.state}</span>
                      </td>
                      <td className="px-5 py-3.5">
                         <span className={`px-2 py-0.5 rounded-full border text-[11px] font-medium ${
                           row.lvl.includes('紧急') ? 'bg-red-50 text-red-600 border-red-200' : 
                           row.lvl.includes('高优') ? 'bg-orange-50 text-orange-600 border-orange-200' : 
                           'bg-blue-50 text-blue-600 border-blue-200'}`}>{row.lvl}
                         </span>
                      </td>
                      <td className="px-5 py-3.5 font-mono text-slate-500 bg-slate-50/50">{row.time}</td>
                      <td className="px-5 py-3.5">
                          <span className={`${row.status.includes('未') ? 'text-red-500 font-medium' : 'text-slate-500'}`}>{row.status}</span>
                      </td>
                      <td className="px-5 py-3.5 text-[#fa541c] font-medium hover:underline cursor-pointer">下钻诊断溯源</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 bg-orange-50/50 border border-orange-100/80 rounded-lg p-3 text-[12px] text-orange-900 flex items-center justify-between shadow-sm">
              <span className="leading-relaxed">因安全与迎检需求：系统将依据 <strong className="font-semibold underline decoration-orange-300">超时未解决时间跨度与数据敏感一致度</strong> (监测准度 ≥99.9%) 将遗漏的高危告警逐级压栈上报，直至最高层短信/钉钉熔断。</span>
              <button className="flex items-center gap-1.5 bg-white border border-orange-200 text-orange-700 px-3 py-1.5 rounded-lg shadow-sm hover:bg-orange-50 transition-colors font-medium ml-4 shrink-0">
                 <ArrowUpRight className="w-4 h-4"/> 激活强制手工判定挂起升级
              </button>
            </div>
          </div>
        )}

        {activeTab === 'rules' && (
           <div className="h-full flex gap-5">
             <div className="w-1/3 bg-white border border-gray-100 rounded-xl shadow-sm p-4 flex flex-col">
                <div className="font-semibold text-[13.5px] mb-4 text-slate-800 border-b border-gray-50 pb-2">基础监控矩阵与专区接口库</div>
                <div className="space-y-1 text-[12.5px] text-slate-700 flex-1 overflow-auto pr-1">
                  <div className="p-2 hover:bg-slate-50 rounded-lg border border-transparent hover:border-slate-100 cursor-pointer font-medium flex gap-2 items-center"><Cpu className="w-4 h-4 text-blue-500"/> 底层 IAAS 主机及容器节点模型</div>
                  <div className="p-2 hover:bg-slate-50 rounded-lg border border-transparent hover:border-slate-100 cursor-pointer font-medium flex gap-2 items-center"><ShieldAlert className="w-4 h-4 text-emerald-500"/> 安全迎检预置合规强策略</div>
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 cursor-pointer font-medium flex gap-2 items-center text-[#fa541c] shadow-sm"><Settings2 className="w-4 h-4 text-[#fa541c]"/> 特供 DaaS 透明查询引擎</div>
                  <div className="pl-9 py-1.5 text-slate-500 text-[11.5px] hover:text-[#fa541c] cursor-pointer">跨专区 Kafka Topic 并发超限</div>
                  <div className="pl-9 py-1.5 text-slate-500 text-[11.5px] hover:text-[#fa541c] cursor-pointer font-semibold bg-[#fa541c]/5 text-[#fa541c] rounded-md mx-2 border border-[#fa541c]/10 relative">
                     <div className="absolute w-3 h-px bg-[#fa541c]/30 -left-3 top-1/2"></div>
                     核心接口机双活心跳丢包甄别
                  </div>
                  <div className="pl-9 py-1.5 text-slate-500 text-[11.5px] hover:text-[#fa541c] cursor-pointer">VIP 路由备接异常切换失败预警</div>
                  <div className="pl-9 py-1.5 text-slate-500 text-[11.5px] hover:text-[#fa541c] cursor-pointer">TeleDB 主备库事务一致性时延穿透</div>
                  <div className="p-2 hover:bg-slate-50 rounded-lg border border-transparent hover:border-slate-100 cursor-pointer font-medium mt-3 flex gap-2 items-center border-t border-dashed border-gray-100 pt-3"><Settings2 className="w-4 h-4 text-slate-400"/> 通用 PAAS/SAAS 场景全链监控</div>
                </div>
             </div>
             <div className="w-2/3 bg-white border border-gray-100 rounded-xl shadow-sm p-6 overflow-auto">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
                   <div>
                     <div className="font-semibold text-[15px] flex items-center gap-2 text-slate-800">
                        参数编排配置：接口机心跳丢失保护拦截 
                        <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[10px] font-mono border border-slate-200">RuleID: DAAS_INTF_BEAT</span>
                     </div>
                     <div className="text-[12px] text-slate-500 mt-1">控制此规则面向的模型、响应策略、超时及级别设定</div>
                   </div>
                </div>
                <div className="space-y-6">
                   <div className="grid grid-cols-2 gap-6">
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                         <label className="block text-[12.5px] font-medium text-slate-700 mb-2">生效对象约束挂载点</label>
                         <input disabled value="全量专区 DAAS 接口机集群及负载端" className="w-full bg-white border border-slate-200 rounded p-2 text-[12.5px] outline-none text-slate-500" />
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                         <label className="block text-[12.5px] font-medium text-slate-700 mb-2">自动化告警分派至协同团队</label>
                         <select className="w-full border border-gray-200 rounded p-2 text-[12.5px] outline-none focus:border-[#fa541c] hover:border-gray-300">
                            <option>通道默认 (短信+站内): 中台全域应急运营小组</option>
                            <option>业务开发与值干班组通道</option>
                         </select>
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-6">
                      <div>
                         <label className="block text-[12.5px] font-medium text-slate-800 mb-2">多维监控判定类型与阈值</label>
                         <select className="w-full border border-gray-200 rounded p-2 text-[12.5px] outline-none focus:border-[#fa541c] shadow-sm mb-2">
                            <option>运行回调回执失败率 ≥ 5% (近3统计窗)</option>
                            <option>接口持续响应完全超时判定</option>
                            <option>超计划完成预期时间点与延迟预测模型</option>
                         </select>
                         <div className="text-[11px] text-slate-400">结合底层资源库进行实例与任务状态核对验证</div>
                      </div>
                      <div>
                         <label className="block text-[12.5px] font-medium text-slate-800 mb-2">事件优先级规则评估依据</label>
                         <select className="w-full border border-gray-200 rounded p-2 text-[12.5px] outline-none focus:border-[#fa541c] shadow-sm mb-2">
                            <option>依据当前合模关联核心数据依赖强绑定 (绝高优)</option>
                            <option>基于历史统计数据一致性基准/准确度定级</option>
                            <option>普通时效与合规场景普通抛出</option>
                         </select>
                         <div className="text-[11px] text-slate-400 text-orange-500">已开启动态根因识别溯源算法加持 (准确评估达95%)</div>
                      </div>
                   </div>

                   <div className="pt-5 mt-4 border-t border-gray-100 flex gap-3">
                      <button className="bg-[#fa541c] text-white px-5 py-2 rounded-lg text-[13px] font-medium shadow hover:bg-[#d4380d] transition-all">保存全部逻辑规则</button>
                      <button className="bg-white border border-gray-200 text-slate-600 px-5 py-2 rounded-lg text-[13px] font-medium hover:bg-slate-50 transition-all">废弃放弃修改</button>
                   </div>
                </div>
             </div>
           </div>
        )}

        {activeTab === 'escalation' && (
          <div className="h-full bg-white border border-gray-100 rounded-xl shadow-sm p-6 flex items-center justify-center">
            <div className="text-center">
               <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex mx-auto items-center justify-center mb-4 text-[#fa541c]">
                 <ArrowUpRight className="w-8 h-8 opacity-40" />
               </div>
               <h3 className="text-slate-700 font-semibold text-[15px]">系统级动态告警升级推流策略</h3>
               <p className="text-slate-500 text-[12.5px] mt-2 max-w-md mx-auto leading-relaxed">基于持续积压时间超时、及预警对象的重要标签智能驱动的自动流转系统。它解决了传统模式中 IAAS、SAAS 配置负责人员目标流失遗漏等管理隐患问题。</p>
               <button className="mt-5 text-[#fa541c] hover:underline text-[13px] font-medium">预览默认流转脚本规则</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
