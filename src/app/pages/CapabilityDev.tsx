import { useState } from 'react';
import { SidebarLayout, SidebarItem } from '../components/SidebarLayout';
import {
  Code2, User, Database, Sliders, Shield, Lock, Eye, EyeOff,
  Plus, Play, Copy, CheckCircle, AlertTriangle, RefreshCw,
  Package, Key, FileText, Activity, Layers, ChevronRight,
  Search, Settings2, Zap, BarChart2, Globe, ArrowUpRight,
} from 'lucide-react';

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const sidebarItems: SidebarItem[] = [
  {
    key: 'encapsulate',
    label: '数据封装',
    icon: Package,
    children: [
      { key: 'enc-config', label: '封装配置', icon: Code2 },
      { key: 'enc-apis', label: '接口管理', icon: Layers },
    ],
  },
  {
    key: 'security',
    label: '安全防护',
    icon: Shield,
    children: [
      { key: 'sec-access', label: '访问控制', icon: Key },
      { key: 'sec-desensitize', label: '数据脱敏', icon: EyeOff },
      { key: 'sec-encrypt', label: '传输加密', icon: Lock },
    ],
  },
  {
    key: 'auth',
    label: '访问授权',
    icon: Globe,
    children: [
      { key: 'auth-grant', label: '授权管理', icon: Shield },
      { key: 'auth-log', label: '调用日志', icon: FileText },
    ],
  },
];

// ─── Mock data ─────────────────────────────────────────────────────────────────
const encapsulationTypes = [
  { key: 'user', label: '用户信息', icon: User, color: '#3b82f6' },
  { key: 'sql', label: '代码（SQL）', icon: Code2, color: '#8b5cf6' },
  { key: 'business', label: '业务数据', icon: Database, color: '#0d9488' },
  { key: 'params', label: '参数信息', icon: Sliders, color: '#fa541c' },
];

const mockApis = [
  { id: 1, name: '用户行为数据接口', path: '/api/v1/user/behavior', method: 'POST', status: 'active', calls: '12,430', version: 'v1.2' },
  { id: 2, name: '业务报表数据接口', path: '/api/v1/business/report', method: 'GET', status: 'active', calls: '8,721', version: 'v2.0' },
  { id: 3, name: 'SQL 查询安全代理', path: '/api/v1/sql/proxy', method: 'POST', status: 'active', calls: '3,256', version: 'v1.5' },
  { id: 4, name: '参数配置同步接口', path: '/api/v1/params/sync', method: 'PUT', status: 'inactive', calls: '0', version: 'v1.0' },
];

const securityPolicies = [
  { key: 'access', label: '访问控制', icon: Key, enabled: true, desc: '基于 RBAC 的数据访问控制策略', level: '高' },
  { key: 'audit', label: '操作审计', icon: Eye, enabled: true, desc: '数据访问行为全程审计记录', level: '高' },
  { key: 'ratelimit', label: '频率限制', icon: Activity, enabled: true, desc: '防止接口滥用，限制调用频率', level: '中' },
  { key: 'ip', label: 'IP 白名单', icon: Globe, enabled: false, desc: '仅允许指定 IP 访问敏感接口', level: '中' },
];

const desensitizeRules = [
  { field: '手机号', type: '正则替换', rule: '138****5678', enabled: true },
  { field: '身份证号', type: '部分掩码', rule: '110***19901010****', enabled: true },
  { field: '邮箱地址', type: '部分显示', rule: 'use***@example.com', enabled: true },
  { field: '银行卡号', type: '尾4位显示', rule: '**** **** **** 1234', enabled: false },
];

const authGrants = [
  { id: 1, system: '数据安全子系统', apiCount: 4, granted: '2026-03-15', expire: '2027-03-15', status: 'active' },
  { id: 2, system: '运营分析平台', apiCount: 2, granted: '2026-02-01', expire: '2026-08-01', status: 'active' },
  { id: 3, system: '外部合作商A', apiCount: 1, granted: '2026-01-20', expire: '2026-04-20', status: 'expiring' },
  { id: 4, system: '历史集成系统', apiCount: 3, granted: '2025-06-01', expire: '2026-01-01', status: 'expired' },
];

const callLogs = [
  { time: '2026-04-10 14:32:01', caller: '数据安全子系统', api: '/api/v1/user/behavior', status: 200, latency: '34ms' },
  { time: '2026-04-10 14:31:55', caller: '运营分析平台', api: '/api/v1/business/report', status: 200, latency: '18ms' },
  { time: '2026-04-10 14:31:40', caller: '数据安全子系统', api: '/api/v1/sql/proxy', status: 403, latency: '5ms' },
  { time: '2026-04-10 14:31:22', caller: '外部合作商A', api: '/api/v1/params/sync', status: 200, latency: '21ms' },
  { time: '2026-04-10 14:30:58', caller: '数据安全子系统', api: '/api/v1/user/behavior', status: 200, latency: '29ms' },
];

// ─── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: any; color: string }) {
  return (
    <div className="bg-white rounded-xl p-4 flex items-center gap-3" style={{ border: '1px solid #f1ede9' }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}15` }}>
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div>
        <div style={{ fontSize: '20px', fontWeight: 800, color: '#1e293b' }}>{value}</div>
        <div style={{ fontSize: '12px', color: '#94a3b8' }}>{label}</div>
      </div>
    </div>
  );
}

// ─── Section header ────────────────────────────────────────────────────────────
function SectionHeader({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <div className="w-1 h-4 rounded-full" style={{ background: '#fa541c' }} />
        <span style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>{title}</span>
      </div>
      {action}
    </div>
  );
}

function OrangeBtn({ children, icon: Icon, onClick }: { children: React.ReactNode; icon?: any; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white hover:opacity-90 transition-all shadow-sm"
      style={{ fontSize: '12px', background: 'linear-gradient(135deg,#fa541c,#ff7a45)' }}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </button>
  );
}

// ─── Panels ───────────────────────────────────────────────────────────────────
function EncConfig() {
  const [selectedType, setSelectedType] = useState('user');
  const [sqlCode, setSqlCode] = useState(
    `-- 示例：查询用户最近7天行为数据（已配置安全代理）\nSELECT \n  u.user_id,\n  u.user_name,\n  b.action_type,\n  b.action_time\nFROM users u\nJOIN user_behavior b ON u.user_id = b.user_id\nWHERE b.action_time >= NOW() - INTERVAL 7 DAY\n  AND u.status = 'active'\nLIMIT 1000;`
  );
  const [copied, setCopied] = useState(false);

  return (
    <div className="p-6 space-y-5">
      <SectionHeader
        title="数据封装配置"
        action={<OrangeBtn icon={Plus}>新建封装任务</OrangeBtn>}
      />

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        <StatCard label="封装接口" value="4" icon={Layers} color="#fa541c" />
        <StatCard label="今日调用" value="24.4K" icon={Activity} color="#3b82f6" />
        <StatCard label="安全检查" value="100%" icon={Shield} color="#16a34a" />
        <StatCard label="封装类型" value="4种" icon={Package} color="#8b5cf6" />
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Left */}
        <div className="space-y-3">
          <div className="bg-white rounded-xl p-4" style={{ border: '1px solid #f1ede9' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}>数据类型选择</div>
            <div className="space-y-2">
              {encapsulationTypes.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setSelectedType(t.key)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left"
                  style={{
                    background: selectedType === t.key ? `${t.color}12` : '#f8fafc',
                    border: `1.5px solid ${selectedType === t.key ? t.color : 'transparent'}`,
                  }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${t.color}15` }}>
                    <t.icon className="w-4 h-4" style={{ color: t.color }} />
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: selectedType === t.key ? t.color : '#374151' }}>{t.label}</span>
                  {selectedType === t.key && <CheckCircle className="w-4 h-4 ml-auto" style={{ color: t.color }} />}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4" style={{ border: '1px solid #f1ede9' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}>安全检查项</div>
            <div className="space-y-2">
              {['数据权限验证', '敏感字段识别', 'SQL 注入防护', '访问频率限制', '数据血缘记录'].map((item) => (
                <div key={item} className="flex items-center gap-2" style={{ fontSize: '12px', color: '#475569' }}>
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color: '#16a34a' }} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right editor */}
        <div className="col-span-2 space-y-4">
          <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #f1ede9' }}>
            <div className="flex items-center justify-between px-4 py-3" style={{ background: '#0a1520', borderBottom: '1px solid #1e2d3d' }}>
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4" style={{ color: '#fa541c' }} />
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#e2e8f0' }}>SQL 代码封装编辑器</span>
                <span className="px-2 py-0.5 rounded-full" style={{ fontSize: '11px', background: '#16a34a20', color: '#4ade80', border: '1px solid #16a34a40' }}>安全代理模式</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-colors"
                  style={{ fontSize: '12px', color: copied ? '#4ade80' : '#94a3b8', background: 'rgba(255,255,255,0.05)' }}
                >
                  {copied ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? '已复制' : '复制'}
                </button>
                <button
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-white"
                  style={{ fontSize: '12px', background: 'linear-gradient(135deg,#fa541c,#ff7a45)' }}
                >
                  <Play className="w-3.5 h-3.5" /> 执行封装
                </button>
              </div>
            </div>
            <textarea
              value={sqlCode}
              onChange={(e) => setSqlCode(e.target.value)}
              className="w-full p-4 focus:outline-none font-mono"
              style={{ fontSize: '12px', minHeight: '200px', resize: 'vertical', color: '#a5f3fc', background: '#0a1520', lineHeight: 1.7 }}
            />
          </div>

          <div className="bg-white rounded-xl p-4" style={{ border: '1px solid #f1ede9' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '14px' }}>封装参数配置</div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: '接口名称', placeholder: 'user_behavior_query', required: true },
                { label: '数据域', placeholder: '用户中心', required: true },
                { label: '返回字段', placeholder: 'user_id, user_name, action_type…', required: false },
                { label: '最大返回行数', placeholder: '1000', required: false },
                { label: '缓存时效（秒）', placeholder: '300', required: false },
                { label: '调用方系统', placeholder: '数据安全接入子系统', required: true },
              ].map((f) => (
                <div key={f.label}>
                  <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>
                    {f.label} {f.required && <span style={{ color: '#fa541c' }}>*</span>}
                  </label>
                  <input
                    type="text"
                    placeholder={f.placeholder}
                    className="w-full rounded-lg px-3 py-2 focus:outline-none transition-all"
                    style={{ fontSize: '12px', border: '1px solid #e2e8f0', background: '#f8fafc' }}
                    onFocus={(e) => (e.target.style.borderColor = '#fa541c')}
                    onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-xl flex items-start gap-2" style={{ background: '#fff7ed', border: '1px solid #fed7aa' }}>
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#f97316' }} />
              <p style={{ fontSize: '12px', color: '#c2410c' }}>
                封装后的接口将供数据安全接入与防护子系统调用核查，请确保 SQL 符合安全规范，避免使用高危操作（DROP、TRUNCATE 等）。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EncApis() {
  return (
    <div className="p-6 space-y-5">
      <SectionHeader
        title="接口管理"
        action={
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all hover:bg-gray-50" style={{ fontSize: '12px', color: '#64748b', borderColor: '#e2e8f0' }}>
              <RefreshCw className="w-3.5 h-3.5" /> 刷新
            </button>
            <OrangeBtn icon={Plus}>新建接口</OrangeBtn>
          </div>
        }
      />

      <div className="grid grid-cols-4 gap-3">
        <StatCard label="接口总数" value="4" icon={Layers} color="#fa541c" />
        <StatCard label="运行中" value="3" icon={Activity} color="#16a34a" />
        <StatCard label="今日调用" value="24.4K" icon={BarChart2} color="#3b82f6" />
        <StatCard label="错误率" value="0.2%" icon={AlertTriangle} color="#f59e0b" />
      </div>

      <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #f1ede9' }}>
        <div className="px-4 py-3 flex items-center gap-3" style={{ background: '#fafafa', borderBottom: '1px solid #f1ede9' }}>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: '#94a3b8' }} />
            <input
              placeholder="搜索接口名称或路径…"
              className="rounded-lg pl-8 pr-3 py-1.5 focus:outline-none"
              style={{ fontSize: '12px', border: '1px solid #e2e8f0', width: '220px', background: '#fff' }}
              onFocus={(e) => (e.target.style.borderColor = '#fa541c')}
              onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
            />
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#faf7f5', borderBottom: '1px solid #f1ede9' }}>
              {['接口名称', '路径', '方式', '版本', '调用次数', '状态', '操作'].map((h) => (
                <th key={h} className="text-left px-4 py-2.5" style={{ fontSize: '12px', fontWeight: 500, color: '#64748b' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockApis.map((api) => (
              <tr key={api.id} className="transition-colors" style={{ borderBottom: '1px solid #f8f8f8' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#fff7f5')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <td className="px-4 py-3" style={{ fontSize: '13px', fontWeight: 500, color: '#1e293b' }}>{api.name}</td>
                <td className="px-4 py-3 font-mono" style={{ fontSize: '12px', color: '#fa541c' }}>{api.path}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded font-mono" style={{
                    fontSize: '11px',
                    background: api.method === 'POST' ? '#eff6ff' : api.method === 'GET' ? '#f0fdf4' : '#fff7ed',
                    color: api.method === 'POST' ? '#3b82f6' : api.method === 'GET' ? '#16a34a' : '#fa541c',
                  }}>{api.method}</span>
                </td>
                <td className="px-4 py-3" style={{ fontSize: '12px', color: '#64748b' }}>{api.version}</td>
                <td className="px-4 py-3" style={{ fontSize: '13px', color: '#374151' }}>{api.calls}</td>
                <td className="px-4 py-3">
                  <span className="px-2.5 py-0.5 rounded-full" style={{
                    fontSize: '11px',
                    background: api.status === 'active' ? '#dcfce7' : '#f1f5f9',
                    color: api.status === 'active' ? '#16a34a' : '#64748b',
                  }}>
                    {api.status === 'active' ? '运行中' : '已停用'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button style={{ fontSize: '12px', color: '#fa541c' }} className="hover:underline">编辑</button>
                    <button style={{ fontSize: '12px', color: '#64748b' }} className="hover:text-slate-800">测试</button>
                    <button style={{ fontSize: '12px', color: '#ef4444' }} className="hover:underline">删除</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SecAccess() {
  const [policies, setPolicies] = useState(securityPolicies);
  const togglePolicy = (key: string) =>
    setPolicies((p) => p.map((pol) => (pol.key === key ? { ...pol, enabled: !pol.enabled } : pol)));

  return (
    <div className="p-6 space-y-5">
      <SectionHeader title="访问控制策略" action={<OrangeBtn icon={Plus}>新增策略</OrangeBtn>} />
      <div className="grid grid-cols-4 gap-3">
        <StatCard label="策略总数" value="4" icon={Shield} color="#fa541c" />
        <StatCard label="已启用" value="3" icon={CheckCircle} color="#16a34a" />
        <StatCard label="今日拦截" value="128" icon={AlertTriangle} color="#ef4444" />
        <StatCard label="鉴权成功率" value="99.8%" icon={Zap} color="#3b82f6" />
      </div>

      <div className="bg-white rounded-xl p-5" style={{ border: '1px solid #f1ede9' }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '14px' }}>安全防护策略</div>
        <div className="space-y-3">
          {policies.map((pol) => (
            <div key={pol.key} className="flex items-center justify-between p-4 rounded-xl transition-all" style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: pol.enabled ? '#fff7ed' : '#f1f5f9' }}>
                  <pol.icon className="w-4 h-4" style={{ color: pol.enabled ? '#fa541c' : '#94a3b8' }} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>{pol.label}</span>
                    <span className="px-1.5 py-0.5 rounded" style={{ fontSize: '10px', background: pol.level === '高' ? '#fee2e2' : '#fef3c7', color: pol.level === '高' ? '#dc2626' : '#d97706' }}>
                      {pol.level}风险
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>{pol.desc}</div>
                </div>
              </div>
              <button
                onClick={() => togglePolicy(pol.key)}
                className="w-11 h-6 rounded-full transition-all relative shrink-0"
                style={{ background: pol.enabled ? '#fa541c' : '#e2e8f0' }}
              >
                <span
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all"
                  style={{ left: pol.enabled ? '23px' : '4px' }}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SecDesensitize() {
  return (
    <div className="p-6 space-y-5">
      <SectionHeader title="数据脱敏规则" action={<OrangeBtn icon={Plus}>添加脱敏规则</OrangeBtn>} />
      <div className="bg-white rounded-xl p-5" style={{ border: '1px solid #f1ede9' }}>
        <div className="space-y-3">
          {desensitizeRules.map((r) => (
            <div key={r.field} className="flex items-center justify-between p-4 rounded-xl" style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#fff7ed' }}>
                  <EyeOff className="w-4 h-4" style={{ color: '#fa541c' }} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>{r.field}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>{r.type}</span>
                    <code className="px-2 py-0.5 rounded" style={{ fontSize: '11px', background: '#f1f5f9', color: '#475569' }}>{r.rule}</code>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full" style={{
                  fontSize: '11px',
                  background: r.enabled ? '#dcfce7' : '#f1f5f9',
                  color: r.enabled ? '#16a34a' : '#94a3b8',
                }}>
                  {r.enabled ? '启用' : '禁用'}
                </span>
                <button style={{ fontSize: '12px', color: '#fa541c' }} className="hover:underline">编辑</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SecEncrypt() {
  return (
    <div className="p-6 space-y-5">
      <SectionHeader title="传输加密配置" />
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'TLS 版本', value: 'TLS 1.3', status: '已启用', color: '#16a34a', icon: Lock },
          { label: '证书状态', value: '有效', status: '2026-12-31到期', color: '#3b82f6', icon: Shield },
          { label: '加密算法', value: 'AES-256', status: '最高安全等级', color: '#fa541c', icon: Key },
        ].map((item) => (
          <div key={item.label} className="bg-white rounded-xl p-5" style={{ border: '1px solid #f1ede9' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${item.color}15` }}>
              <item.icon className="w-5 h-5" style={{ color: item.color }} />
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>{item.label}</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b' }}>{item.value}</div>
            <div style={{ fontSize: '11px', color: item.color, marginTop: '4px' }}>{item.status}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-5" style={{ border: '1px solid #f1ede9' }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '14px' }}>加密通道状态</div>
        <div className="p-4 rounded-xl flex items-center gap-3" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
          <CheckCircle className="w-5 h-5 shrink-0" style={{ color: '#16a34a' }} />
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#15803d' }}>全链路加密已启用</div>
            <div style={{ fontSize: '12px', color: '#4ade80', marginTop: '2px' }}>所有接口调用均通过 TLS 1.3 加密传输，符合等保三级安全标准。</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AuthGrant() {
  return (
    <div className="p-6 space-y-5">
      <SectionHeader title="授权管理" action={<OrangeBtn icon={Plus}>新增授权</OrangeBtn>} />
      <div className="grid grid-cols-4 gap-3">
        <StatCard label="授权系统" value="4" icon={Globe} color="#fa541c" />
        <StatCard label="有效授权" value="2" icon={CheckCircle} color="#16a34a" />
        <StatCard label="即将到期" value="1" icon={AlertTriangle} color="#f59e0b" />
        <StatCard label="已过期" value="1" icon={EyeOff} color="#ef4444" />
      </div>
      <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #f1ede9' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#faf7f5', borderBottom: '1px solid #f1ede9' }}>
              {['调用系统', '授权接口数', '授权时间', '到期时间', '状态', '操作'].map((h) => (
                <th key={h} className="text-left px-4 py-2.5" style={{ fontSize: '12px', fontWeight: 500, color: '#64748b' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {authGrants.map((g) => (
              <tr key={g.id} style={{ borderBottom: '1px solid #f8f8f8' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#fff7f5')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <td className="px-4 py-3" style={{ fontSize: '13px', fontWeight: 500, color: '#1e293b' }}>{g.system}</td>
                <td className="px-4 py-3" style={{ fontSize: '13px', color: '#374151' }}>{g.apiCount} 个接口</td>
                <td className="px-4 py-3" style={{ fontSize: '12px', color: '#64748b' }}>{g.granted}</td>
                <td className="px-4 py-3" style={{ fontSize: '12px', color: '#64748b' }}>{g.expire}</td>
                <td className="px-4 py-3">
                  <span className="px-2.5 py-0.5 rounded-full" style={{
                    fontSize: '11px',
                    background: g.status === 'active' ? '#dcfce7' : g.status === 'expiring' ? '#fef3c7' : '#fee2e2',
                    color: g.status === 'active' ? '#16a34a' : g.status === 'expiring' ? '#d97706' : '#dc2626',
                  }}>
                    {g.status === 'active' ? '有效' : g.status === 'expiring' ? '即将到期' : '已过期'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button style={{ fontSize: '12px', color: '#fa541c' }} className="hover:underline">续期</button>
                    <button style={{ fontSize: '12px', color: '#64748b' }} className="hover:text-slate-800">详情</button>
                    <button style={{ fontSize: '12px', color: '#ef4444' }} className="hover:underline">撤销</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AuthLog() {
  return (
    <div className="p-6 space-y-5">
      <SectionHeader
        title="调用日志"
        action={
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all hover:bg-gray-50" style={{ fontSize: '12px', color: '#64748b', borderColor: '#e2e8f0' }}>
            <RefreshCw className="w-3.5 h-3.5" /> 刷新
          </button>
        }
      />
      <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #f1ede9' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#faf7f5', borderBottom: '1px solid #f1ede9' }}>
              {['时间', '调用方', '接口路径', '状态码', '耗时'].map((h) => (
                <th key={h} className="text-left px-4 py-2.5" style={{ fontSize: '12px', fontWeight: 500, color: '#64748b' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {callLogs.map((log, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f8f8f8' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#fff7f5')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <td className="px-4 py-3 font-mono" style={{ fontSize: '12px', color: '#64748b' }}>{log.time}</td>
                <td className="px-4 py-3" style={{ fontSize: '13px', color: '#374151' }}>{log.caller}</td>
                <td className="px-4 py-3 font-mono" style={{ fontSize: '12px', color: '#fa541c' }}>{log.api}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded font-mono" style={{
                    fontSize: '11px',
                    background: log.status === 200 ? '#dcfce7' : '#fee2e2',
                    color: log.status === 200 ? '#16a34a' : '#dc2626',
                  }}>{log.status}</span>
                </td>
                <td className="px-4 py-3" style={{ fontSize: '12px', color: '#64748b' }}>{log.latency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Placeholder({ title }: { title: string }) {
  return (
    <div className="p-6 flex items-center justify-center h-64">
      <div className="text-center">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: '#fff7ed' }}>
          <Settings2 className="w-6 h-6" style={{ color: '#fa541c' }} />
        </div>
        <h3 style={{ fontSize: '14px', fontWeight: 500, color: '#475569', marginBottom: '4px' }}>{title}</h3>
        <p style={{ fontSize: '12px', color: '#94a3b8' }}>内容自动填充中，请稍候…</p>
      </div>
    </div>
  );
}

const contentMap: Record<string, React.ReactNode> = {
  'enc-config': <EncConfig />,
  'enc-apis': <EncApis />,
  'sec-access': <SecAccess />,
  'sec-desensitize': <SecDesensitize />,
  'sec-encrypt': <SecEncrypt />,
  'auth-grant': <AuthGrant />,
  'auth-log': <AuthLog />,
};

export function CapabilityDev() {
  const [activeKey, setActiveKey] = useState('enc-config');
  return (
    <SidebarLayout title="能力开放" items={sidebarItems} activeKey={activeKey} onSelect={setActiveKey}>
      {contentMap[activeKey] ?? <Placeholder title={activeKey} />}
    </SidebarLayout>
  );
}
