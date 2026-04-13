import React from 'react';
import { Bookmark, Search, Edit3, Trash2, LayoutGrid, Star, ThumbsUp } from 'lucide-react';

export function AssetCatalog() {
  return (
    <div className="p-6 h-[calc(100vh-60px)] flex flex-col bg-slate-50/50">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600 }}>精品模型与资产目录大厅</h2>
          <p className="text-[12px] text-slate-500 mt-1">运用标准化梳理结构化清单，提供构建查看、搜索、修改、删除及收藏精品模型能力闭环。</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
             <input placeholder="全域资产特征/标识检索..." className="bg-white border border-slate-200 rounded-full pl-9 pr-4 py-1.5 outline-none text-[12.5px] w-72 shadow-sm focus:border-orange-400" />
             <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>
          <button className="bg-orange-600 text-white px-4 py-1.5 rounded-full text-[12px] font-medium shadow-sm hover:bg-orange-700 transition-colors">发布资产</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 overflow-auto pb-4 px-1">
        {[
          { title: '用户行为倾向多维预测 (AI_PRD)', type: '算法衍生库', owner: '算法团队', likes: 254, star: true, tags: ['高质量', '已对齐'] },
          { title: '集团大盘实时营收汇总表', type: 'DWS 视图层', owner: '财务数据组', likes: 890, star: true, tags: ['月跑万次', '极高响应'] },
          { title: '渠道投放ROI归因宽表', type: 'DWD 宽表层', owner: '运营支撑域', likes: 120, star: false, tags: ['多关联', '日更'] },
          { title: '终端崩溃明细日志清洗', type: 'DWD 明细表', owner: '终端安全组', likes: 45, star: false, tags: ['增量同步', '亿级'] },
          { title: '大客户续约流失风控模型', type: '算法衍生库', owner: '风控合规组', likes: 432, star: true, tags: ['精品力荐', 'L4加密'] },
        ].map((item, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden">
             {item.star && (
                <div className="absolute top-0 right-0">
                   <div className="w-16 h-16 bg-gradient-to-bl from-orange-400/20 to-transparent absolute top-0 right-0"></div>
                   <Star className="absolute top-3 right-3 w-4 h-4 text-orange-400 fill-orange-400" />
                </div>
             )}
             
             <div className="flex items-center gap-1.5 text-[10.5px] font-mono text-orange-600 font-bold tracking-tight mb-2 uppercase">
               <LayoutGrid className="w-3.5 h-3.5" />
               <span>{item.type}</span>
             </div>
             <h3 className="font-semibold text-[15px] text-slate-800 leading-tight mb-3 pr-6 truncate">{item.title}</h3>
             
             <div className="flex flex-wrap gap-1.5 mb-4">
                {item.tags.map(t => <span key={t} className="bg-slate-50 text-slate-500 border border-slate-100 text-[10px] px-2 py-0.5 rounded-full">{t}</span>)}
             </div>

             <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                <div className="text-[12px] text-slate-400 flex items-center gap-2">
                   <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 font-bold flex items-center justify-center text-[10px] uppercase">{item.owner[0]}</div>
                   {item.owner}
                </div>
                <div className="flex items-center gap-3">
                   <div className="flex items-center gap-1 text-[11px] text-slate-400"><ThumbsUp className="w-3.5 h-3.5"/> {item.likes}</div>
                   <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-orange-500 hover:text-orange-700 bg-orange-50 p-1 rounded"><Edit3 className="w-3.5 h-3.5"/></button>
                      <button className="text-rose-500 hover:text-rose-700 bg-rose-50 p-1 rounded"><Trash2 className="w-3.5 h-3.5"/></button>
                      <button className="text-slate-500 hover:text-slate-700 bg-slate-50 p-1 rounded"><Bookmark className="w-3.5 h-3.5"/></button>
                   </div>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
