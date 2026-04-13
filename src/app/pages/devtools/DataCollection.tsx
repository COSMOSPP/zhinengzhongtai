import React from 'react';
import { DownloadCloud, Server, LayoutGrid, Clock, FileType2, Search, ArrowRightLeft, FileCode, CheckSquare, Zap } from 'lucide-react';

export function DataCollection() {
  return (
    <div className="p-6 h-[calc(100vh-60px)] flex flex-col bg-slate-50/50">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600 }}>共享数据采集枢纽</h2>
          <p className="text-[12px] text-slate-500 mt-1 max-w-4xl">
            提供多种频度（实时、准实时、批量、一次性）、多种异构源的数据采集网络。内置虚拟数据源、字段自动解析，并强力支撑 CHECK/VAL 数据对账入湖验证。
          </p>
        </div>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-[12px] font-medium shadow-sm hover:bg-orange-700 transition-colors flex items-center gap-2">
           <Zap className="w-4 h-4"/>
           新建智能采集向导
        </button>
      </div>

      <div className="flex gap-2 border-b border-gray-200 mb-4 px-1">
        {['离线标准化文件采集', '准实时对账与 ASN 解析', '多端数据库与 Kafka 直连采集'].map((tab, i) => (
          <button key={i} className={`pb-2.5 px-3 text-[13px] font-medium border-b-2 transition-colors flex items-center gap-1.5 ${i === 0 ? 'border-orange-600 text-orange-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto space-y-5">
         
         {/* Feature Grid */}
         <div className="grid grid-cols-4 gap-4">
            <div className="bg-white border text-center border-orange-100 rounded-xl p-4 shadow-sm hover:shadow transition-shadow">
               <div className="w-10 h-10 mx-auto bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-2"><FileType2 className="w-5 h-5"/></div>
               <div className="font-semibold text-[13px] text-slate-800">FTP 文件接驳与转化</div>
               <div className="text-[11px] text-slate-500 mt-1 font-mono">GBK/TXT 自定义格式 → Hive表</div>
            </div>
            <div className="bg-white border text-center border-orange-100 rounded-xl p-4 shadow-sm hover:shadow transition-shadow">
               <div className="w-10 h-10 mx-auto bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-2"><CheckSquare className="w-5 h-5"/></div>
               <div className="font-semibold text-[13px] text-slate-800">CHECK/VAL 核心对账</div>
               <div className="text-[11px] text-slate-500 mt-1 font-mono">对账通过触发入库 · 回执任务生成</div>
            </div>
            <div className="bg-white border text-center border-orange-100 rounded-xl p-4 shadow-sm hover:shadow transition-shadow">
               <div className="w-10 h-10 mx-auto bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-2"><ArrowRightLeft className="w-5 h-5"/></div>
               <div className="font-semibold text-[13px] text-slate-800">审批与文件重传机制</div>
               <div className="text-[11px] text-slate-500 mt-1 font-mono">对账驳回阻断 · 重传批次审计</div>
            </div>
            <div className="bg-white border text-center border-orange-100 rounded-xl p-4 shadow-sm hover:shadow transition-shadow bg-gradient-to-br from-white to-orange-50/30">
               <div className="w-10 h-10 mx-auto bg-orange-100 text-orange-700 rounded-full flex items-center justify-center mb-2"><LayoutGrid className="w-5 h-5"/></div>
               <div className="font-semibold text-[13px] text-slate-800">虚拟数据源与提效工具</div>
               <div className="text-[11px] text-slate-500 mt-1 font-sans">字段自动排序组装 / 一接口多Hive分区写入</div>
            </div>
         </div>

         {/* Task List */}
         <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
               <span className="font-semibold text-[13px] text-slate-700">业务全网主干采集链路明细</span>
               <div className="relative">
                 <input placeholder="检索链路/场景..." className="bg-slate-50 border border-slate-100 w-64 rounded-md pl-7 pr-3 py-1 text-[11px] outline-none focus:border-orange-300" />
                 <Search className="w-3 h-3 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2" />
               </div>
            </div>
            <table className="w-full text-left">
               <thead className="bg-slate-50 text-[12px] font-medium text-slate-500">
                  <tr>
                     <th className="px-4 py-3">场景与链路名称</th>
                     <th className="px-4 py-3">采集模式 / 频率</th>
                     <th className="px-4 py-3">源与目标节点</th>
                     <th className="px-4 py-3">专属对账及解码处理</th>
                     <th className="px-4 py-3">流转状态</th>
                  </tr>
               </thead>
               <tbody className="text-[12px] text-slate-600">
                  <tr className="border-b border-slate-50 hover:bg-orange-50/20">
                     <td className="px-4 py-3 font-semibold text-slate-800">4GMR网络加工数据采集</td>
                     <td className="px-4 py-3"><span className="bg-slate-100 px-2 py-0.5 rounded">非标准化批采集</span></td>
                     <td className="px-4 py-3 font-mono text-[11px] flex items-center gap-1">File_Servers <ArrowRightLeft className="w-3 h-3"/> Hive_DWD</td>
                     <td className="px-4 py-3 text-[11px]">具备 CHECK 稽核卡点</td>
                     <td className="px-4 py-3 text-emerald-600 font-medium">采集中</td>
                  </tr>
                  <tr className="border-b border-slate-50 hover:bg-orange-50/20">
                     <td className="px-4 py-3 font-semibold text-slate-800">C网/固网语音小时级详单</td>
                     <td className="px-4 py-3"><span className="bg-slate-100 px-2 py-0.5 rounded">准实时对账采集</span></td>
                     <td className="px-4 py-3 font-mono text-[11px] flex items-center gap-1">FTP_Telecom <ArrowRightLeft className="w-3 h-3"/> Hive_ODS</td>
                     <td className="px-4 py-3 text-[11px]">支持任务延迟兜底等待结单</td>
                     <td className="px-4 py-3 text-emerald-600 font-medium">稳定</td>
                  </tr>
                  <tr className="border-b border-slate-50 hover:bg-orange-50/20">
                     <td className="px-4 py-3 font-semibold text-slate-800">5G DPI 融合位置态势全量采集</td>
                     <td className="px-4 py-3"><span className="bg-slate-100 px-2 py-0.5 rounded">准实时极速流</span></td>
                     <td className="px-4 py-3 font-mono text-[11px] flex items-center gap-1">Kafka_Topic <ArrowRightLeft className="w-3 h-3"/> Hive_Raw</td>
                     <td className="px-4 py-3 text-[11px]"><span className="text-orange-600/80">ASN 转码解析</span> / 无对账直通</td>
                     <td className="px-4 py-3 text-blue-600 font-medium">高吞吐运行</td>
                  </tr>
                  <tr className="border-b border-slate-50 hover:bg-orange-50/20">
                     <td className="px-4 py-3 font-semibold text-slate-800">45G 核心用户登网属性信息</td>
                     <td className="px-4 py-3"><span className="bg-slate-100 px-2 py-0.5 rounded">全量直连批采集</span></td>
                     <td className="px-4 py-3 font-mono text-[11px] flex items-center gap-1">Oracle_RAC <ArrowRightLeft className="w-3 h-3"/> Hive_DIM</td>
                     <td className="px-4 py-3 text-[11px]">记录数跨域强比对强校验</td>
                     <td className="px-4 py-3 text-slate-400">休眠待唤醒</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
