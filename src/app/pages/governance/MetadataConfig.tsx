import React, { useState } from 'react';
import { Settings, Database, Server, BookTemplate, FileText, Plus, ArrowDownToLine } from 'lucide-react';

export function MetadataConfig() {
  const [activeTab, setActiveTab] = useState('subject');

  const tabs = [
    { id: 'subject', label: '主题域标准 (Subject Domain)', icon: Database },
    { id: 'source', label: '数据源标准 (Data Source)', icon: Server },
    { id: 'model', label: '模型标准规范 (Model Specs)', icon: BookTemplate },
    { id: 'field', label: '字段基准字典 (Field Dict)', icon: FileText },
  ];

  return (
    <div className="p-6 h-[calc(100vh-60px)] flex flex-col bg-slate-50/50">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600 }}>集团元数据配置与架构规范落地</h2>
          <p className="text-[12px] text-slate-500 mt-1">同步《大数据平台模型建设需求对接规范》等全局指导原则，约束采集与核心系统数据标准。</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg shadow-sm hover:bg-slate-50 transition-colors text-[12px] font-medium">
            <ArrowDownToLine className="w-3.5 h-3.5" /> 导入集团规范文件
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-600 text-white rounded-lg shadow-sm hover:bg-orange-700 transition-colors text-[12px] font-medium">
            <Plus className="w-3.5 h-3.5" /> 新增当前属性元数据
          </button>
        </div>
      </div>

      <div className="flex gap-2 border-b border-gray-200 mb-4 px-1">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} className={`pb-2.5 px-3 text-[13px] font-medium border-b-2 transition-colors flex items-center gap-1.5 ${activeTab === t.id ? 'border-orange-600 text-orange-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
            <t.icon className="w-3.5 h-3.5" /> {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-hidden bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col">
          {activeTab === 'subject' && (
            <div className="flex-1 overflow-auto">
              <table className="w-full text-left text-[12.5px]">
                <thead className="bg-[#f8fafc] sticky top-0 shadow-sm z-10 border-b border-gray-100">
                  <tr>
                    <th className="px-5 py-3 font-semibold text-slate-700">主题域编码 (Domain Code)</th>
                    <th className="px-5 py-3 font-semibold text-slate-700">主题域名称</th>
                    <th className="px-5 py-3 font-semibold text-slate-700">所属业务线 (Biz Line)</th>
                    <th className="px-5 py-3 font-semibold text-slate-700">规范描述</th>
                    <th className="px-5 py-3 font-semibold text-slate-700">约束及关联数据源</th>
                    <th className="px-5 py-3 font-semibold text-slate-700">操作配置</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {[
                    { code: 'DOM_USER_01', name: '全域用户中心', biz: '基础支撑业务', desc: '包含消费者档案、标签及生命周期', src: 'TeleDB_Core, MySQL_User' },
                    { code: 'DOM_TRADE_02', name: '交易订单汇聚', biz: '核心交易系统', desc: '订单支付、退款及物流逆向全链路', src: 'Oracle_Trade, Kafka_Stream' },
                    { code: 'DOM_LOG_03', name: '泛终端日志行为', biz: '业务运营监测', desc: '移动端、Web端、车机端埋点数据', src: 'Log_Collector_Cluster' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-4 font-mono text-orange-600 font-medium tracking-tight">
                        <span className="bg-orange-50 px-2 py-0.5 rounded border border-orange-100">{row.code}</span>
                      </td>
                      <td className="px-5 py-4 font-medium text-slate-700">{row.name}</td>
                      <td className="px-5 py-4"><span className="bg-slate-100 px-2 py-1 rounded text-[11px] text-slate-600">{row.biz}</span></td>
                      <td className="px-5 py-4 text-slate-500">{row.desc}</td>
                      <td className="px-5 py-4 font-mono text-slate-400 text-[11px]">{row.src}</td>
                      <td className="px-5 py-4 text-orange-600 font-medium hover:underline cursor-pointer">下钻架构配置</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-4 bg-orange-50/30 text-orange-800 text-[12px] border-t border-orange-100 m-4 rounded flex items-start gap-2">
                 <Settings className="w-4 h-4 text-orange-500 mt-0.5" />
                 <span className="leading-relaxed font-medium">当前列表字段类型、枚举值及命名规范均强制继承并应用《大数据平台模型设计规范》V2版约束，拦截任何不合规 DDL 操作。</span>
              </div>
            </div>
          )}
          {activeTab !== 'subject' && (
             <div className="flex-1 flex items-center justify-center text-slate-400 text-[13px] italic bg-slate-50/50">
                点击上方对应切签加载细分领域的元数据映射控制表。
             </div>
          )}
      </div>
    </div>
  );
}
