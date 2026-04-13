import React, { useState } from 'react';
import { Search, Plus, Download, Upload, Shield, EyeOff } from 'lucide-react';

export function UserMgmt() {
  const [activeTab, setActiveTab] = useState('all');
  
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 style={{ fontSize: '16px', fontWeight: 600 }}>用户管理</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input placeholder="搜索人力账号/员工…" className="bg-white border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:border-[#fa541c]" style={{ fontSize: '12px', width: '200px' }} />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-slate-600 rounded-lg hover:bg-gray-50 shadow-sm transition-colors" style={{ fontSize: '12px' }}>
            <Download className="w-3.5 h-3.5" /> 批量导出
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-slate-600 rounded-lg hover:bg-gray-50 shadow-sm transition-colors" style={{ fontSize: '12px' }}>
            <Upload className="w-3.5 h-3.5" /> 批量导入
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#fa541c] text-white rounded-lg hover:bg-[#d4380d] shadow-sm transition-colors" style={{ fontSize: '12px' }}>
            <Plus className="w-3.5 h-3.5" /> 新增用户
          </button>
        </div>
      </div>

      <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3 text-[12px] text-slate-600 flex justify-between items-center">
        <span>支持集团人力账号注册、同步，自动映射系统账号并归属普通租户。</span>
        <a href="#" className="text-[#fa541c] hover:underline">下载批量导入模板</a>
      </div>

      <div className="flex gap-4 border-b border-gray-100">
        {[
          { id: 'all', label: '全部用户' },
          { id: 'standard', label: '普通租户用户' },
          { id: 'ai-ops', label: 'AI中台运营人员' },
          { id: 'secure', label: '安全迎检用户 (脱敏展示)' },
        ].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} className={`pb-2 px-1 text-[13px] font-medium border-b-2 transition-colors ${activeTab === t.id ? 'border-[#fa541c] text-[#fa541c]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {['人力账号', '归属处室', '归属系统', '账号类型', '权限级别', '状态', '新增时间', '操作'].map((h) => (
                <th key={h} className="text-left px-4 py-2.5 text-slate-500 whitespace-nowrap" style={{ fontSize: '12px', fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { account: 'EMP001', dept: '总公司/研发部', sys: '数据中台', type: '普通租户', level: '五级用户 (密文展示)', status: '正常', time: '2023-10-12 14:30' },
              { account: 'EMP002', dept: '省分公司/AI部', sys: 'AI中台', type: '运营人员', level: '团队管理权限', status: '正常', time: '2023-11-05 09:12' },
              { account: 'EMP003', dept: '集团审计组', sys: '数据中台', type: '迎检用户', level: '安全迎检配置', status: '隐藏中', time: '2023-12-01 10:00' },
            ].map((row, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-mono text-[#fa541c]" style={{ fontSize: '12px' }}>{row.account}</td>
                <td className="px-4 py-3 text-slate-600" style={{ fontSize: '12px' }}>{row.dept}</td>
                <td className="px-4 py-3" style={{ fontSize: '12px' }}>{row.sys}</td>
                <td className="px-4 py-3" style={{ fontSize: '12px' }}>{row.type}</td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1 text-slate-600 bg-slate-100 px-2 py-0.5 rounded w-max" style={{ fontSize: '11px' }}>
                    {row.level.includes('密文') ? <EyeOff className="w-3 h-3 text-slate-400" /> : <Shield className="w-3 h-3 text-emerald-500" />}
                    {row.level}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={row.status === '正常' ? 'text-green-600' : 'text-slate-400'} style={{ fontSize: '12px' }}>{row.status}</span>
                </td>
                <td className="px-4 py-3 text-slate-400 font-mono" style={{ fontSize: '11px' }}>{row.time}</td>
                <td className="px-4 py-3 text-[#fa541c] cursor-pointer hover:underline" style={{ fontSize: '12px' }}>配置维护</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
