import { useState } from 'react';
import {
  User, Code2, Database, Settings, Shield,
  EyeOff, Lock, CheckCircle, ChevronRight,
  Plus, Search, Filter, RefreshCw, Info,
  AlertTriangle, Cpu, Key, FileCode, Package
} from 'lucide-react';

const encapTypes = [
  {
    key: 'user',
    icon: User,
    label: '用户信息封装',
    desc: '对系统内用户基本信息、权限信息、角色归属等进行结构化封装，供安全子系统进行身份核查与访问鉴权。',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    fields: ['用户ID', '姓名', '角色', '部门', '权限范围', '登录IP', '认证方式'],
    count: 3421,
    status: 'active',
  },
  {
    key: 'sql',
    icon: FileCode,
    label: 'SQL代码封装',
    desc: '对系统内的 SQL 查询语句、存储过程、数据操作代码进行统一封装管理，实现 SQL 注入防御与审计追踪。',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    fields: ['SQL文本', '执行上下文', '数据库标识', '操作类型', '影响行数', '执行耗时'],
    count: 892,
    status: 'active',
  },
  {
    key: 'business',
    icon: Package,
    label: '业务数据封装',
    desc: '将核心业务数据按照统一的数据接口规范进行封装，实现数据安全分级访问控制与业务数据脱敏处理。',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    fields: ['数据实体', '字段列表', '敏感等级', '脱敏规则', '访问策略', '有效期'],
    count: 2847,
    status: 'active',
  },
  {
    key: 'params',
    icon: Settings,
    label: '参数配置封装',
    desc: '对系统运行时参数、API 调用参数、配置项等进行安全封装，防止参数篡改与注入攻击，保障系统配置安全。',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    fields: ['参数名称', '参数值', '数据类型', '校验规则', '加密标记', '有效范围'],
    count: 456,
    status: 'active',
  },
];

const securityRules = [
  { label: '访问控制', icon: Shield, desc: '基于角色的细粒度访问权限控制', enabled: true, level: '严格' },
  { label: '数据脱敏', icon: EyeOff, desc: '手机号、身份证、邮箱等敏感字段自动脱敏', enabled: true, level: '高' },
  { label: '传输加密', icon: Lock, desc: 'TLS 1.3 全链路数据传输加密', enabled: true, level: '标准' },
  { label: '审计日志', icon: Key, desc: '所有数据访问操作实时记录审计日志', enabled: true, level: '全量' },
];

const apiList = [
  { name: 'user-info-query', method: 'GET', path: '/api/v2/user/info', calls: 128432, latency: '12ms', status: 'healthy' },
  { name: 'sql-exec-validate', method: 'POST', path: '/api/v2/sql/validate', calls: 87291, latency: '45ms', status: 'healthy' },
  { name: 'business-data-access', method: 'POST', path: '/api/v2/data/access', calls: 234108, latency: '28ms', status: 'healthy' },
  { name: 'params-config-get', method: 'GET', path: '/api/v2/params/config', calls: 54731, latency: '8ms', status: 'warning' },
  { name: 'data-desensitize', method: 'POST', path: '/api/v2/security/desensitize', calls: 193842, latency: '35ms', status: 'healthy' },
];

export function CapabilityDevPage() {
  const [activeEncap, setActiveEncap] = useState('user');
  const [searchTerm, setSearchTerm] = useState('');

  const current = encapTypes.find((e) => e.key === activeEncap)!;

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#f0f2f5' }}>
      <div className="max-w-[1600px] mx-auto px-4 py-4 space-y-4">
        {/* Page Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Code2 size={20} className="text-blue-600" />
                <h1 className="text-gray-900" style={{ fontSize: 18, fontWeight: 700 }}>能力开发</h1>
              </div>
              <p className="text-gray-500 text-sm">将系统内用户信息、代码（SQL）、业务数据、参数信息进行安全封装，供数据安全子系统进行调用核查，实现数据安全访问控制与脱敏加密。</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-white rounded-xl font-medium" style={{ background: 'linear-gradient(135deg,#1677ff,#36b0ff)' }}>
              <Plus size={14} />
              新建封装
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left: Encap Types */}
          <div className="space-y-3">
            {encapTypes.map((enc) => (
              <div
                key={enc.key}
                onClick={() => setActiveEncap(enc.key)}
                className={`bg-white rounded-xl p-4 border cursor-pointer transition-all hover:shadow-md ${
                  activeEncap === enc.key ? `border-blue-300 shadow-md ring-2 ring-blue-100` : 'border-gray-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 ${enc.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <enc.icon size={20} className={enc.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-sm font-semibold text-gray-800">{enc.label}</p>
                      <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        运行中
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{enc.desc}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-gray-400">封装记录</span>
                      <span className={`text-xs font-semibold ${enc.color}`}>{enc.count.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Middle: Detail */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-9 h-9 ${current.bg} rounded-xl flex items-center justify-center`}>
                  <current.icon size={18} className={current.color} />
                </div>
                <div>
                  <h3 className="text-gray-900 font-semibold" style={{ fontSize: 14 }}>{current.label}</h3>
                  <p className="text-xs text-gray-400">封装字段配置</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{current.desc}</p>
              <div className="space-y-2">
                {current.fields.map((field, i) => (
                  <div key={field} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded text-xs flex items-center justify-center font-bold">{i + 1}</span>
                      <span className="text-sm text-gray-700">{field}</span>
                    </div>
                    <CheckCircle size={14} className="text-green-500" />
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-sm text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors font-medium flex items-center justify-center gap-1">
                <Plus size={14} />
                添加字段
              </button>
            </div>

            {/* Security Rules */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <Shield size={16} className="text-rose-600" />
                <h3 className="text-gray-900 font-semibold" style={{ fontSize: 14 }}>安全防护配置</h3>
              </div>
              <div className="space-y-3">
                {securityRules.map((rule) => (
                  <div key={rule.label} className="flex items-start justify-between bg-gray-50 rounded-xl p-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-rose-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <rule.icon size={15} className="text-rose-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">{rule.label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{rule.desc}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">已启用</span>
                      <span className="text-xs text-gray-400">{rule.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: API list */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Cpu size={16} className="text-violet-600" />
                <h3 className="text-gray-900 font-semibold" style={{ fontSize: 14 }}>封装 API 列表</h3>
              </div>
              <div className="flex items-center gap-1.5 bg-gray-100 rounded-lg px-2.5 py-1.5">
                <Search size={12} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent text-xs outline-none text-gray-600 w-24"
                />
              </div>
            </div>
            <div className="space-y-2.5">
              {apiList
                .filter((a) => a.name.includes(searchTerm) || a.path.includes(searchTerm))
                .map((api) => (
                  <div key={api.name} className="border border-gray-100 rounded-xl p-3 hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${api.method === 'GET' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                          {api.method}
                        </span>
                        <span className="text-xs font-medium text-gray-700">{api.name}</span>
                      </div>
                      <span className={`w-2 h-2 rounded-full ${api.status === 'healthy' ? 'bg-green-500' : 'bg-amber-500'}`} />
                    </div>
                    <p className="text-xs text-gray-400 font-mono mb-2">{api.path}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span>{api.calls.toLocaleString()} 次</span>
                      <span>·</span>
                      <span>P50: {api.latency}</span>
                    </div>
                  </div>
                ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-blue-50 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-blue-600">5</p>
                  <p className="text-xs text-gray-500">封装 API</p>
                </div>
                <div className="bg-green-50 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-green-600">98.6%</p>
                  <p className="text-xs text-gray-500">健康率</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
