import React from 'react';
import { BookMarked, Eye, LayoutTemplate, ShieldAlert, BookType } from 'lucide-react';

export function DataStandardMgmt() {
  return (
    <div className="p-6 h-[calc(100vh-60px)] flex flex-col bg-slate-50/50">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600 }}>数据标准 / 数据标注配置中枢</h2>
          <p className="text-[12px] text-slate-500 mt-1 max-w-3xl leading-relaxed">
            在组织内部统一定义、创建、发布和维护数据标准（标注）的过程。通过可视化的系统前台管控，保障全域数据的定义、格式、表示方法、使用规则的一致性及准确性。
          </p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-5 flex-1 overflow-hidden">
         {/* Sidebar Tree config */}
         <div className="col-span-1 bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col p-3 overflow-y-auto">
            <h3 className="font-semibold text-[13px] text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-2 mb-3">
               <LayoutTemplate className="w-4 h-4 text-orange-500"/> 主数据与规范目录
            </h3>
            <div className="space-y-1 text-[12px] font-medium text-slate-600">
               <div className="bg-orange-50 text-orange-700 px-3 py-2 rounded-lg cursor-pointer border border-orange-100 flex items-center gap-2">
                 <BookMarked className="w-3.5 h-3.5"/> 集团指标数据标准
               </div>
               <div className="px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 flex items-center gap-2">
                 <BookType className="w-3.5 h-3.5 text-slate-400"/> 核心业务主数据标准
               </div>
               <div className="px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 flex items-center gap-2">
                 <ShieldAlert className="w-3.5 h-3.5 text-slate-400"/> 安全定级标注规范
               </div>
               <div className="px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-50 flex items-center gap-2">
                 <Eye className="w-3.5 h-3.5 text-slate-400"/> 公共字典代码规范
               </div>
            </div>
         </div>

         {/* Standard Config Form / Grid */}
         <div className="col-span-4 bg-white border border-gray-100 rounded-xl shadow-sm p-6 overflow-y-auto relative">
            <div className="absolute top-0 right-0 py-1.5 px-3 bg-slate-900 text-slate-100 text-[10px] font-mono rounded-bl-lg font-bold">
               约束文件底座:《大数据平台模型建设需求对接规范》
            </div>

            <div className="flex justify-between items-center mb-6 mt-2">
               <h3 className="font-bold text-[16px] text-slate-800">集团级数据建设前台约束可视化面板</h3>
               <button className="bg-orange-600 text-white px-5 py-1.5 rounded shadow-sm text-[12px] font-medium hover:bg-orange-700">持久化标准策略</button>
            </div>

            <div className="space-y-6">
               <div className="border border-slate-100 rounded-lg p-5 bg-slate-50/50">
                  <div className="font-semibold text-[13px] text-slate-800 mb-4 border-b border-slate-200 pb-2">新增规格主数据结构定型</div>
                  
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-[12px]">
                     <div>
                        <label className="block text-slate-500 mb-1">标准域划分录入</label>
                        <select className="w-full bg-white border border-slate-200 rounded p-2 focus:border-orange-400 outline-none">
                           <option>公共维表标准 (DIM_STD)</option>
                           <option>业务基础标准 (BDS_STD)</option>
                        </select>
                     </div>
                     <div>
                        <label className="block text-slate-500 mb-1">主数据编码规则绑定</label>
                        <input type="text" className="w-full bg-white border border-slate-200 rounded p-2 focus:border-orange-400 outline-none font-mono" defaultValue="^[A-Z]{3,4}_[A-Z0-9_]+$" />
                     </div>
                     <div className="col-span-2">
                        <label className="block text-slate-500 mb-1">底层类型系统强一致性映射设置 (Type Mapping)</label>
                        <div className="bg-white border border-slate-200 rounded p-3 grid grid-cols-3 gap-4">
                           <div className="flex gap-2 items-center"><span className="w-20 text-slate-400">时间类型</span> <span className="bg-orange-50 text-orange-600 border border-orange-100 px-2 py-0.5 rounded font-mono text-[10px]">TIMESTAMP (Hive)</span></div>
                           <div className="flex gap-2 items-center"><span className="w-20 text-slate-400">大文本类型</span> <span className="bg-orange-50 text-orange-600 border border-orange-100 px-2 py-0.5 rounded font-mono text-[10px]">STRING (Hive)</span></div>
                           <div className="flex gap-2 items-center"><span className="w-20 text-slate-400">金钱数值</span> <span className="bg-orange-50 text-orange-600 border border-orange-100 px-2 py-0.5 rounded font-mono text-[10px]">DECIMAL(18,2)</span></div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="border border-slate-100 rounded-lg p-5">
                  <div className="font-semibold text-[13px] text-slate-800 mb-4 border-b border-slate-100 pb-2 flex justify-between">
                     <span>已有基础核规列表集</span>
                     <span className="text-[11px] font-normal text-orange-600 cursor-pointer">录入新核规</span>
                  </div>
                  <table className="w-full text-left text-[12px]">
                     <thead className="text-slate-400 bg-slate-50">
                        <tr>
                           <th className="px-3 py-2 font-medium rounded-l">标准名称 / 中文别名</th>
                           <th className="px-3 py-2 font-medium">技术键名 / 标注体系</th>
                           <th className="px-3 py-2 font-medium">基线状态</th>
                           <th className="px-3 py-2 font-medium rounded-r">拦截等级</th>
                        </tr>
                     </thead>
                     <tbody className="text-slate-600 relative">
                        <tr className="border-b border-slate-50">
                           <td className="px-3 py-3 font-semibold text-slate-700">归属地理区域编码</td>
                           <td className="px-3 py-3 font-mono text-[11px]">location_id</td>
                           <td className="px-3 py-3">已发版 v2.1</td>
                           <td className="px-3 py-3"><span className="text-red-500 bg-red-50 px-2 rounded-sm border border-red-100">强阻断 (Reject)</span></td>
                        </tr>
                        <tr className="border-b border-slate-50">
                           <td className="px-3 py-3 font-semibold text-slate-700">业务发生自然日</td>
                           <td className="px-3 py-3 font-mono text-[11px]">biz_date</td>
                           <td className="px-3 py-3">已发版 v1.0</td>
                           <td className="px-3 py-3"><span className="text-orange-500 bg-orange-50 px-2 rounded-sm border border-orange-100">告警提醒 (Warn)</span></td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
