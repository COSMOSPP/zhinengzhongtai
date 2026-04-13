import React from 'react';
import { Server, Database, Save, PieChart } from 'lucide-react';

export function RoleMgmt() {
  return (
    <div className="p-6 space-y-6 max-h-[calc(100vh-60px)] overflow-auto bg-slate-50/40">
      <div className="flex items-center justify-between">
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600 }}>权限与全域租户资源配额配置</h2>
          <div className="text-[12.5px] text-slate-500 mt-1 tracking-wide">统一调控分配物理机节点、Yarn计算队列容量与底层数据目录可见权限额度边界。</div>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#fa541c] text-white rounded-lg hover:bg-[#d4380d] shadow-sm transition-colors font-medium tracking-wide" style={{ fontSize: '12px' }}>
          <Save className="w-3.5 h-3.5" /> 保存配额全局策略
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Resource Allocation & Quota */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:border-[#fa541c]/40 transition-colors">
          <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between bg-white relative">
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#fa541c]/20 to-transparent"></div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-orange-50 text-[#fa541c] flex items-center justify-center">
                <PieChart className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-[14px] text-slate-800">机器算力与弹性队列配额边界</h3>
            </div>
            <span className="text-[11px] font-mono text-[#fa541c] border border-[#fa541c]/20 bg-[#fa541c]/5 px-2 py-0.5 rounded-full font-medium">IAAS / PAAS 层级</span>
          </div>
          <div className="p-6 space-y-7 flex-1">
            <div>
              <label className="block text-[12.5px] font-semibold text-slate-800 mb-2.5">调度与数据稽核引擎专用 Yarn 队列资源</label>
              <select className="flex-1 w-full border border-gray-200 rounded-lg p-2.5 text-[12.5px] outline-none focus:border-[#fa541c] transition-shadow focus:shadow-sm">
                <option>深度动态隔离：按开发/采集不同业务属性细分投递专属队列配额槽</option>
                <option>混部统一池化：统一注入 default 队列大池子管理集群</option>
              </select>
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-slate-800 mb-2.5">AI计算与采集任务专属物理机关联策略</label>
              <div className="flex gap-2">
                 <select className="flex-1 border border-gray-200 rounded-lg p-2.5 text-[12.5px] outline-none focus:border-[#fa541c] transition-shadow focus:shadow-sm bg-slate-50/50">
                   <option>安全隔离准入：依据项目角色与子租户身份对等绑定硬配额</option>
                   <option>全放开策略模式：允许所有提交方全局统筹路由</option>
                 </select>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-red-50/80 to-transparent border border-red-100/80 rounded-xl">
              <input type="checkbox" className="mt-1 rounded text-red-500 focus:ring-red-500 border-red-200 w-4 h-4" defaultChecked />
              <div className="flex-1">
                <div className="text-[13px] font-semibold text-red-900">集中接管并收归团队实例池硬件配发权</div>
                <div className="text-[11.5px] text-red-700/80 mt-1.5 leading-relaxed font-medium">
                  勾选代表平台取消原本下放至各个散落小团队对其所拥有服务器的直管修改权限，统一收敛由总控制台来维系配额的绝对合规下发底线。
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Access & tenant perms */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:border-[#fa541c]/40 transition-colors">
          <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between bg-white relative">
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
                <Database className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-[14px] text-slate-800">平台资产门户与内部互通数据权限库</h3>
            </div>
            <span className="text-[11px] font-mono text-blue-500 bg-blue-50 px-2 py-0.5 border border-blue-100/50 rounded-full font-medium">SAAS / 数据层</span>
          </div>
          <div className="p-6 space-y-7 flex-1">
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50/60 to-transparent border border-blue-100/60 rounded-xl shadow-[inset_0_0_12px_rgba(255,255,255,0.5)]">
              <input type="checkbox" className="mt-1 rounded text-blue-600 focus:ring-blue-500 border-blue-300 w-4 h-4" defaultChecked />
              <div className="flex-1">
                 <div className="text-[13px] font-semibold text-blue-900">针对普通租户常态化解禁开放"数据开放广场"</div>
                 <div className="text-[11.5px] text-blue-700/80 mt-1.5 leading-relaxed font-medium">
                   调整以往严格的层层审批门槛，现在直接赋予普通底层受众在数据广场内查询目录索引和样本数据的通道许可。
                 </div>
              </div>
            </div>

            <div>
              <label className="block text-[12.5px] font-semibold text-slate-800 mb-2.5">局域跨组团队内部数据集互查及订阅准入门槛</label>
              <select className="w-full border border-gray-200 rounded-lg p-2.5 text-[12.5px] outline-none focus:border-[#fa541c] transition-shadow shadow-sm bg-slate-50/50">
                <option>优化安全范式关联：基于显性订阅动作驱动的动态获取链路</option>
                <option>退化遗留方式：单纯维系用户历史角色绑定的静态死局范围展示</option>
              </select>
              <div className="mt-3 bg-slate-50/50 border border-slate-100 p-3 rounded-lg text-[11px] text-slate-500 leading-relaxed font-medium">
                上述下发的获取策略组合用以保障大型集团在频繁共享团队数据集的过程中能够保持透明并符合审计追溯底线，极大拉升访问隔离与合规管控逻辑的自愈性。
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
