import { useState } from 'react';
import {
  Database, ChevronRight, ChevronDown, Search, Filter,
  Table2, GitBranch, Tag, BarChart2, AlertTriangle, CheckCircle,
  FileText, Eye, Edit, RefreshCw, Plus, Download, Settings,
  Layers, ArrowRight, Clock, TrendingUp, Shield
} from 'lucide-react';

const sidebarMenu = [
  {
    key: 'metadata',
    label: '元数据管理',
    icon: Database,
    color: 'text-blue-600',
    children: [
      { key: 'catalog', label: '数据目录' },
      { key: 'lineage', label: '数据血缘' },
      { key: 'search', label: '元数据搜索' },
      { key: 'sync', label: '元数据采集' },
    ],
  },
  {
    key: 'asset',
    label: '数据资产管理',
    icon: Layers,
    color: 'text-emerald-600',
    children: [
      { key: 'assets', label: '数据资产列表' },
      { key: 'tags', label: '标签分类管理' },
      { key: 'dictionary', label: '数据字典' },
      { key: 'ownership', label: '数据所有权' },
    ],
  },
  {
    key: 'quality',
    label: '数据质量管理',
    icon: Shield,
    color: 'text-violet-600',
    children: [
      { key: 'rules', label: '质量规则配置' },
      { key: 'monitor', label: '质量监控大盘' },
      { key: 'report', label: '质量报告' },
      { key: 'alert', label: '质量告警' },
    ],
  },
];

// ── Metadata Catalog Content ──────────────────────────────
const catalogData = [
  { name: 'dw_user_behavior', db: 'data_warehouse', type: '事实表', owner: '张三', updated: '2026-04-07', columns: 42, records: '2.1亿', tags: ['用户行为', '核心'] },
  { name: 'dim_user_profile', db: 'data_warehouse', type: '维度表', owner: '李四', updated: '2026-04-06', columns: 28, records: '1320万', tags: ['用户画像'] },
  { name: 'ods_order_detail', db: 'ods_layer', type: 'ODS表', owner: '王五', updated: '2026-04-08', columns: 56, records: '8.7亿', tags: ['订单', '核心'] },
  { name: 'ads_daily_active', db: 'ads_layer', type: 'ADS表', owner: '赵六', updated: '2026-04-08', columns: 15, records: '730天', tags: ['活跃用户', 'DAU'] },
  { name: 'dwd_transaction_log', db: 'data_warehouse', type: '明细表', owner: '孙七', updated: '2026-04-05', columns: 34, records: '5.2亿', tags: ['交易', '日志'] },
];

// ── Asset Content ─────────────────────────────────────────
const assetData = [
  { name: '用户域数据集', level: 'L2-敏感', count: 128, size: '234 GB', score: 94, category: '用户数据' },
  { name: '交易域数据集', level: 'L3-高敏', count: 87, size: '1.2 TB', score: 88, category: '业务数据' },
  { name: '日志域数据集', level: 'L1-一般', count: 342, size: '2.8 TB', score: 97, category: '系统日志' },
  { name: '风控域数据集', level: 'L3-高敏', count: 56, size: '98 GB', score: 91, category: '风控数据' },
];

// ── Quality Rules Content ─────────────────────────────────
const qualityRules = [
  { name: '主键唯一性检查', table: 'dw_user_behavior', type: '唯一性', priority: '高', passRate: 100, status: 'pass' },
  { name: '空值率检查', table: 'dim_user_profile', type: '完整性', priority: '高', passRate: 98.7, status: 'pass' },
  { name: '数值范围检查', table: 'ods_order_detail', type: '准确性', priority: '中', passRate: 99.2, status: 'pass' },
  { name: '引用完整性检查', table: 'dwd_transaction_log', type: '一致性', priority: '高', passRate: 87.3, status: 'warn' },
  { name: '时效性检查', table: 'ads_daily_active', type: '时效性', priority: '中', passRate: 100, status: 'pass' },
  { name: '业务规则校验', table: 'ods_order_detail', type: '业务规则', priority: '高', passRate: 94.1, status: 'warn' },
];

export function DataGovernancePage() {
  const [expanded, setExpanded] = useState<string[]>(['metadata', 'asset', 'quality']);
  const [activeItem, setActiveItem] = useState('catalog');

  const toggle = (key: string) => {
    setExpanded((prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]);
  };

  const activeSection = sidebarMenu.find((m) => m.children.some((c) => c.key === activeItem))?.key || 'metadata';

  return (
    <div className="flex h-full overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col flex-shrink-0 overflow-y-auto">
        <div className="px-3 py-3 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">数据治理</p>
        </div>
        <nav className="flex-1 px-2 py-2 space-y-0.5">
          {sidebarMenu.map((group) => (
            <div key={group.key}>
              <button
                onClick={() => toggle(group.key)}
                className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <group.icon size={15} className={group.color} />
                  <span className="text-sm font-medium text-gray-700">{group.label}</span>
                </div>
                <ChevronDown
                  size={13}
                  className={`text-gray-400 transition-transform ${expanded.includes(group.key) ? 'rotate-180' : ''}`}
                />
              </button>
              {expanded.includes(group.key) && (
                <div className="ml-4 mt-0.5 space-y-0.5 border-l-2 border-gray-100 pl-3">
                  {group.children.map((child) => (
                    <button
                      key={child.key}
                      onClick={() => setActiveItem(child.key)}
                      className={`flex items-center w-full px-2.5 py-1.5 rounded-lg text-sm transition-colors ${
                        activeItem === child.key
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      {activeItem === child.key && <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 flex-shrink-0" />}
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto" style={{ background: '#f0f2f5' }}>
        <div className="p-4 space-y-4">

          {/* ── Metadata Section ── */}
          {activeSection === 'metadata' && (
            <>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Database size={18} className="text-blue-600" />
                    <h2 className="text-gray-900 font-bold" style={{ fontSize: 16 }}>
                      {activeItem === 'catalog' && '数据目录'}
                      {activeItem === 'lineage' && '数据血缘'}
                      {activeItem === 'search' && '元数据搜索'}
                      {activeItem === 'sync' && '元数据采集'}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 bg-gray-100 rounded-xl px-3 py-1.5">
                      <Search size={13} className="text-gray-400" />
                      <input placeholder="搜索表名/库名..." className="bg-transparent text-sm outline-none text-gray-600 w-32" />
                    </div>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white rounded-xl font-medium" style={{ background: '#1677ff' }}>
                      <Plus size={13} /> 新增
                    </button>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-4 gap-3 mb-5">
                  {[
                    { label: '数据库', value: '24', color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: '数据表', value: '1,286', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: '字段总数', value: '38,421', color: 'text-violet-600', bg: 'bg-violet-50' },
                    { label: '今日新增', value: '12', color: 'text-orange-600', bg: 'bg-orange-50' },
                  ].map((s) => (
                    <div key={s.label} className={`${s.bg} rounded-xl p-3 text-center`}>
                      <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        {['表名', '所属数据库', '类型', '负责人', '字段数', '数据量', '更新时间', '标签', '操作'].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {catalogData.map((row) => (
                        <tr key={row.name} className="hover:bg-blue-50/30 transition-colors">
                          <td className="px-4 py-3 font-mono text-xs text-blue-700 font-medium">{row.name}</td>
                          <td className="px-4 py-3 text-gray-600 text-xs">{row.db}</td>
                          <td className="px-4 py-3"><span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{row.type}</span></td>
                          <td className="px-4 py-3 text-gray-700 text-xs">{row.owner}</td>
                          <td className="px-4 py-3 text-gray-700 text-xs">{row.columns}</td>
                          <td className="px-4 py-3 text-gray-700 text-xs">{row.records}</td>
                          <td className="px-4 py-3 text-gray-400 text-xs">{row.updated}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1 flex-wrap">
                              {row.tags.map((t) => (
                                <span key={t} className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded text-xs">{t}</span>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button className="text-blue-600 hover:text-blue-700"><Eye size={13} /></button>
                              <button className="text-gray-500 hover:text-gray-700"><GitBranch size={13} /></button>
                              <button className="text-gray-500 hover:text-gray-700"><Edit size={13} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Lineage preview */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <GitBranch size={16} className="text-blue-600" />
                  <h3 className="text-gray-900 font-semibold" style={{ fontSize: 14 }}>数据血缘关系图（示例）</h3>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center gap-4 overflow-x-auto">
                  {[
                    { label: 'MySQL\nods_order', type: 'source', color: 'bg-orange-100 border-orange-300 text-orange-700' },
                    { label: '→', type: 'arrow', color: '' },
                    { label: 'ODS\nods_order_detail', type: 'table', color: 'bg-blue-100 border-blue-300 text-blue-700' },
                    { label: '→', type: 'arrow', color: '' },
                    { label: 'DWD\ndwd_transaction_log', type: 'table', color: 'bg-violet-100 border-violet-300 text-violet-700' },
                    { label: '→', type: 'arrow', color: '' },
                    { label: 'ADS\nads_daily_active', type: 'table', color: 'bg-emerald-100 border-emerald-300 text-emerald-700' },
                    { label: '→', type: 'arrow', color: '' },
                    { label: '数据看板\n可视化报表', type: 'dest', color: 'bg-gray-100 border-gray-300 text-gray-700' },
                  ].map((node, i) =>
                    node.type === 'arrow' ? (
                      <ArrowRight key={i} size={20} className="text-gray-400 flex-shrink-0" />
                    ) : (
                      <div key={i} className={`border rounded-xl px-4 py-3 text-center text-xs font-medium whitespace-pre-line flex-shrink-0 ${node.color}`} style={{ minWidth: 90 }}>
                        {node.label}
                      </div>
                    )
                  )}
                </div>
              </div>
            </>
          )}

          {/* ── Asset Section ── */}
          {activeSection === 'asset' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Layers size={18} className="text-emerald-600" />
                  <h2 className="text-gray-900 font-bold" style={{ fontSize: 16 }}>数据资产管理</h2>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50">
                    <Download size={13} /> 导出
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white rounded-xl" style={{ background: '#1677ff' }}>
                    <Plus size={13} /> 录入资产
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                {[
                  { label: '数据集总数', value: '613', icon: Database, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: '高敏数据集', value: '143', icon: Shield, color: 'text-rose-600', bg: 'bg-rose-50' },
                  { label: '平均质量评分', value: '92.5', icon: BarChart2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { label: '总数据量', value: '4.3 TB', icon: Layers, color: 'text-violet-600', bg: 'bg-violet-50' },
                ].map((s) => (
                  <div key={s.label} className={`${s.bg} rounded-xl p-4`}>
                    <s.icon size={20} className={s.color} />
                    <p className={`text-xl font-bold ${s.color} mt-2`}>{s.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {assetData.map((asset) => (
                  <div key={asset.name} className="border border-gray-100 rounded-xl p-4 hover:border-emerald-200 hover:shadow-sm transition-all">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-gray-800">{asset.name}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            asset.level.includes('L3') ? 'bg-red-50 text-red-600' :
                            asset.level.includes('L2') ? 'bg-amber-50 text-amber-600' :
                            'bg-gray-100 text-gray-500'
                          }`}>{asset.level}</span>
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-xs">{asset.category}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span>数据表数：{asset.count}</span>
                          <span>数据量：{asset.size}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-bold text-emerald-600">{asset.score}</span>
                          <span className="text-xs text-gray-400">/ 100</span>
                        </div>
                        <span className="text-xs text-gray-400">质量评分</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div
                          className="bg-emerald-500 h-1.5 rounded-full transition-all"
                          style={{ width: `${asset.score}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Quality Section ── */}
          {activeSection === 'quality' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { label: '质量规则总数', value: '86', color: 'text-blue-600', bg: 'bg-blue-50', icon: Settings },
                  { label: '今日检查次数', value: '1,284', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: CheckCircle },
                  { label: '规则通过率', value: '94.6%', color: 'text-violet-600', bg: 'bg-violet-50', icon: TrendingUp },
                  { label: '告警规则数', value: '8', color: 'text-amber-600', bg: 'bg-amber-50', icon: AlertTriangle },
                ].map((s) => (
                  <div key={s.label} className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4`}>
                    <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
                      <s.icon size={18} className={s.color} />
                    </div>
                    <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-violet-600" />
                    <h3 className="text-gray-900 font-semibold" style={{ fontSize: 14 }}>质量规则配置</h3>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white rounded-xl" style={{ background: '#1677ff' }}>
                    <Plus size={13} /> 新建规则
                  </button>
                </div>
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        {['规则名称', '关联表', '规则类型', '优先级', '通过率', '状态', '操作'].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {qualityRules.map((rule) => (
                        <tr key={rule.name} className="hover:bg-violet-50/20 transition-colors">
                          <td className="px-4 py-3 text-sm font-medium text-gray-800">{rule.name}</td>
                          <td className="px-4 py-3 font-mono text-xs text-blue-700">{rule.table}</td>
                          <td className="px-4 py-3"><span className="px-2 py-0.5 bg-violet-50 text-violet-600 rounded text-xs">{rule.type}</span></td>
                          <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-xs ${rule.priority === '高' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>{rule.priority}</span></td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${rule.passRate >= 95 ? 'bg-emerald-500' : rule.passRate >= 90 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${rule.passRate}%` }} />
                              </div>
                              <span className="text-xs text-gray-700">{rule.passRate}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            {rule.status === 'pass'
                              ? <span className="flex items-center gap-1 text-xs text-green-600"><CheckCircle size={12} />通过</span>
                              : <span className="flex items-center gap-1 text-xs text-amber-600"><AlertTriangle size={12} />告警</span>
                            }
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button className="text-blue-600 text-xs hover:underline">查看</button>
                              <button className="text-gray-500 text-xs hover:underline">编辑</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
