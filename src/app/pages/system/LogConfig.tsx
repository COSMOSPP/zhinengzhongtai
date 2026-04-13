import React from 'react';
import { History, ShieldAlert, ListTree, RefreshCcw } from 'lucide-react';

export function LogConfig() {
  return (
    <div className="p-6 space-y-6 max-h-[calc(100vh-60px)] overflow-auto">
      <div>
        <h2 style={{ fontSize: '16px', fontWeight: 600 }}>日志规范与存储追踪</h2>
        <p className="text-[12px] text-slate-500 mt-1">全局定义系统操作记录存储策略、迎检规范及接口标准</p>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 h-[340px] flex flex-col">
          <div className="font-semibold text-[14px] mb-5 flex items-center gap-2 border-b border-gray-50 pb-3">
            <History className="w-4 h-4 text-blue-500" /> 模块日志存储及自动清理
          </div>
          <div className="space-y-5 flex-1">
            <div className="flex items-center justify-between">
              <div className="text-[13px] text-slate-700 font-medium">调度执行与数据扫描日志</div>
              <select className="border border-gray-200 rounded-lg p-1.5 text-[12px] outline-none w-32 focus:border-[#fa541c]">
                <option>保留 180 天</option>
                <option>永久保留 (手动清)</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-[13px] text-slate-700 font-medium">数据开发与代码执行追踪</div>
              <select className="border border-gray-200 rounded-lg p-1.5 text-[12px] outline-none w-32 focus:border-[#fa541c]">
                <option>保留 90 天</option>
                <option>保留 30 天</option>
              </select>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-3 mt-4">
              <RefreshCcw className="w-5 h-5 text-slate-400 mt-0.5" />
              <div>
                <div className="flex items-center justify-between w-full">
                  <div className="text-[13px] font-medium text-slate-700">超出安全周期自动备份与硬删策略</div>
                  <label className="relative inline-flex items-center cursor-pointer ml-8">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-8 h-4 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#fa541c]"></div>
                  </label>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">过期日志打包投递至冷存储集群后移除</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 h-[340px] flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#fa541c]/5 rounded-bl-full pointer-events-none"></div>
          <div className="font-semibold text-[14px] mb-5 flex items-center gap-2 border-b border-gray-50 pb-3">
            <ShieldAlert className="w-4 h-4 text-emerald-500" /> 特殊安全迎检过滤策略生效中
          </div>
          <div className="space-y-4 relative z-10 flex-1">
            <div className="flex items-center justify-between text-[12.5px] hover:bg-slate-50 px-2 py-2 rounded transition-colors -mx-2">
              <span className="text-slate-600">系统时间显示格式</span>
              <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded text-[11px] font-medium">强制24小时制对齐</span>
            </div>
            <div className="flex items-center justify-between text-[12.5px] hover:bg-slate-50 px-2 py-2 rounded transition-colors -mx-2">
              <span className="text-slate-600">安全审查 "访问" 术语替换规则</span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400 line-through">User Access</span>
                <span className="font-mono bg-white border border-slate-200 px-2 py-0.5 rounded text-[11px] shadow-sm text-slate-700">"操作 (Operate)"</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[12.5px] hover:bg-slate-50 px-2 py-2 rounded transition-colors -mx-2">
              <span className="text-slate-600">日志动态操作人硬编码自动修正</span>
              <span className="text-green-600 flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>已应用安全上下文注入</span>
            </div>
            <div className="flex items-center justify-between text-[12.5px] hover:bg-slate-50 px-2 py-2 rounded transition-colors -mx-2">
              <span className="text-slate-600">各类库表权限异常数据修复</span>
              <span className="text-slate-500 text-[11px]">已自动清洗异常台账数据块</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="font-semibold text-[14px] mb-3 flex items-center gap-2">
          <ListTree className="w-4 h-4 text-[#fa541c]" /> 全面追踪审计范围增强下发规则
        </div>
        <p className="text-[12px] text-slate-500 mb-5 leading-relaxed">
          已按照平台安全规范拓宽范围，覆盖捕获以下深水区操作事件：用户生命周期增删改、菜单级别权限调整、团队底层挂载数据源操作、附带权限查阅事件、以及高危数据变更记录。
        </p>
        <div className="rounded-lg border border-slate-100 overflow-hidden">
          <table className="w-full text-left text-[12.5px] bg-slate-50/30">
            <thead className="bg-[#fa541c]/5 border-b border-[#fa541c]/10">
              <tr>
                <th className="px-4 py-2.5 font-medium text-slate-800">目标接口专区系统方</th>
                <th className="px-4 py-2.5 font-medium text-slate-800">投递日志接口规范版本号</th>
                <th className="px-4 py-2.5 font-medium text-slate-800">当前链路状态</th>
                <th className="px-4 py-2.5 font-medium text-slate-800">订阅管理</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white">
                <td className="px-4 py-3 bg-white">集团一级审计核心系统</td>
                <td className="px-4 py-3 bg-white font-mono text-slate-500 text-[11px]">GovREST_Standard_V3.JSON</td>
                <td className="px-4 py-3 bg-white"><span className="flex items-center gap-1.5 text-emerald-600"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>自动化推送流水持续集成中</span></td>
                <td className="px-4 py-3 bg-white text-[#fa541c] hover:underline cursor-pointer">重新校准接口</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
