import React from 'react';
import { Network, Plus, Users, ShieldAlert, FileOutput } from 'lucide-react';

export function OrgMgmt() {
  return (
    <div className="p-6 h-[calc(100vh-60px)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600 }}>组织架构与多团队管理</h2>
          <p className="text-[12px] text-slate-400 mt-1">维护包含31省、集团、专业公司等整体架构数据及运维团队配置</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-slate-600 rounded-lg shadow-sm hover:bg-slate-50 transition-colors" style={{ fontSize: '12px' }}>
            <FileOutput className="w-3.5 h-3.5" /> 导入集团全量架构
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#fa541c] text-white rounded-lg shadow-sm hover:bg-[#d4380d] transition-colors" style={{ fontSize: '12px' }}>
            <Plus className="w-3.5 h-3.5" /> 新建部门/团队
          </button>
        </div>
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* Left Tree */}
        <div className="w-1/3 bg-white rounded-xl border border-gray-100 shadow-sm p-4 overflow-auto">
          <div className="font-medium text-[13px] mb-4 text-slate-800 border-b border-gray-50 pb-2 flex items-center justify-between">
            组织架构树形试图
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 p-1.5 bg-[#fa541c]/10 text-[#fa541c] rounded cursor-pointer text-[13px] font-semibold transition-colors">
              <Network className="w-4 h-4" /> 集团系统内部
            </div>
            <div className="pl-6 space-y-1 mt-1 border-l border-slate-100 ml-3">
              <div className="flex items-center gap-2 p-1.5 hover:bg-slate-50 text-slate-700/80 rounded cursor-pointer text-[13px] font-medium relative hover:text-[#fa541c]">
                <div className="absolute w-3 border-t border-slate-100 -left-3 top-1/2"></div>
                AI 中台运营团队
              </div>
              <div className="flex items-center gap-2 p-1.5 hover:bg-slate-50 text-slate-700/80 rounded cursor-pointer text-[13px] font-medium relative">
                <div className="absolute w-3 border-t border-slate-100 -left-3 top-1/2"></div>
                数据中台产研部
              </div>
            </div>
            <div className="flex items-center gap-2 p-1.5 hover:bg-slate-50 text-slate-700 rounded cursor-pointer text-[13px] font-semibold mt-3">
              <Network className="w-4 h-4 text-slate-400" /> 31省分机构
            </div>
            <div className="pl-6 space-y-1 mt-1 border-l border-slate-100 ml-3">
              {['北京市分公司', '上海市分公司', '广东省分公司', '浙江省专业公司'].map((prov, idx) => (
                <div key={prov} className="flex items-center gap-2 p-1.5 hover:bg-slate-50 text-slate-600 rounded cursor-pointer text-[13px] relative">
                  <div className="absolute w-3 border-t border-slate-100 -left-3 top-1/2"></div>
                  {prov}
                  {idx === 0 && <span className="ml-auto bg-green-50 text-green-600 px-1 py-0.5 rounded text-[10px]">对接中</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-2/3 bg-white rounded-xl border border-gray-100 shadow-sm p-5 overflow-auto flex flex-col">
          <div className="flex items-center justify-between mb-5 border-b border-gray-100 pb-3">
            <div>
               <div className="font-semibold text-[15px] flex items-center gap-2">
                 <Users className="w-4 h-4 text-[#fa541c]" /> AI 中台运营团队
               </div>
               <div className="text-[12px] text-slate-400 mt-1">负责中台所有租户团队的日常调度监控与系统维护</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50/80 to-transparent p-4 border border-orange-100/60 rounded-xl mb-5 flex items-center justify-between">
            <div>
              <div className="font-medium text-[13px] text-[#fa541c] flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" /> 开启超级运营人员漫游权限
              </div>
              <div className="text-[11px] text-slate-500 mt-1 w-3/4 leading-relaxed">
                允许挂载为 "AI中台运营人员" 角色的员工在前端可下拉无缝切换至所有其他团队与租户空间，确保高优解决运营业务问题。
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer mr-2">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#fa541c]"></div>
            </label>
          </div>

          <div className="relative flex-1 rounded-lg border border-gray-100 overflow-hidden">
            <table className="w-full text-left bg-white">
              <thead className="bg-slate-50/50 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-slate-600 text-[12.5px] font-medium border-b border-gray-100">姓名与职务</th>
                  <th className="px-4 py-3 text-slate-600 text-[12.5px] font-medium border-b border-gray-100">后台账号</th>
                  <th className="px-4 py-3 text-slate-600 text-[12.5px] font-medium border-b border-gray-100">全局切换特权生效</th>
                  <th className="px-4 py-3 text-slate-600 text-[12.5px] font-medium border-b border-gray-100">维护操作</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: '王架构 (AI运维组长)', acc: 'wang.ops.01', active: true },
                  { name: '李运维 (算法监控岗)', acc: 'li.ops.02', active: true },
                  { name: '张数据 (基础支持岗)', acc: 'zhang.db.01', active: false },
                ].map((user, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 group transition-colors">
                    <td className="px-4 py-3.5 border-b border-gray-50 text-[12.5px] text-slate-700">{user.name}</td>
                    <td className="px-4 py-3.5 border-b border-gray-50 text-[12px] font-mono text-slate-500">{user.acc}</td>
                    <td className="px-4 py-3.5 border-b border-gray-50 text-[12px]">
                      {user.active ? 
                        <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">已获得</span> : 
                        <span className="text-slate-400">未分派</span>}
                    </td>
                    <td className="px-4 py-3.5 border-b border-gray-50 text-[12px] text-[#fa541c]">
                      <button className="hover:underline">修改配置</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
