import React, { useState } from 'react';
import { SidebarLayout, SidebarItem } from '../components/SidebarLayout';
import {
  Brain, Server, Monitor, FileText, Plus, Package,
  Pause, Play, Settings2, Zap, CheckCircle, Upload,
  AlertTriangle, TrendingUp, BarChart2, RefreshCw, Layers,
  GitBranch, Download, ArrowUpRight, Eye, Copy, X,
  Cloud, Box, Shield, Network, Cpu, Globe, Search,
  Star, Clock, Archive, PlusCircle, Filter, MapPin,
  ToggleRight, ToggleLeft, Link2, Edit3, Trash2, ChevronDown,
} from 'lucide-react';

const ORANGE = '#fa541c';

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const sidebarItems: SidebarItem[] = [
  {
    key: 'model-listing',
    label: '模型上架',
    icon: Brain,
    children: [
      { key: 'ai-model-mgmt', label: 'AI 模型管理', icon: Brain },
    ],
  },
  {
    key: 'model-deploy',
    label: '模型部署',
    icon: Server,
    children: [
      { key: 'app-deploy', label: '应用部署', icon: Server },
      { key: 'app-publish', label: '应用发布', icon: Globe },
    ],
  },
];

// ─── Mock data ─────────────────────────────────────────────────────────────────
const aiModels = [
  {
    id: 1, name: 'ChatGLM-4-cs-v1.2', cnName: '客服对话模型-v1.2',
    base: 'ChatGLM-4', method: 'LoRA', size: '6.2B', format: 'SafeTensors',
    status: 'deployed', version: 'v1.2', prevVersions: ['v1.0', 'v1.1'],
    source: '内部训练', owner: '张明', created: '2026-04-08',
    accuracy: '92.3%', loss: '0.42', tags: ['对话', '客服', '中文'],
  },
  {
    id: 2, name: 'Qwen-2.5-7B-instruct-v1.0', cnName: '通用指令模型-v1.0',
    base: 'Qwen-2.5-7B', method: 'QLoRA', size: '7.1B', format: 'GGUF',
    status: 'available', version: 'v1.0', prevVersions: [],
    source: '内部训练', owner: '李华', created: '2026-04-05',
    accuracy: '94.1%', loss: '0.31', tags: ['指令', '通用'],
  },
  {
    id: 3, name: 'DeepSeek-R1-7B', cnName: 'DeepSeek推理模型-7B',
    base: 'DeepSeek-R1', method: '外部导入', size: '7B', format: 'SafeTensors',
    status: 'available', version: 'v1.0', prevVersions: [],
    source: '外部导入', owner: '系统管理员', created: '2026-04-01',
    accuracy: '—', loss: '—', tags: ['推理', '代码', '数学'],
  },
  {
    id: 4, name: 'BERT-intent-v2.1', cnName: '意图识别模型-v2.1',
    base: 'BERT-base-zh', method: 'Full FT', size: '0.4B', format: 'PyTorch',
    status: 'deployed', version: 'v2.1', prevVersions: ['v1.0', 'v2.0'],
    source: '内部训练', owner: '王芳', created: '2026-03-28',
    accuracy: '89.7%', loss: '0.18', tags: ['分类', '意图', '中文'],
  },
];

const deployments = [
  {
    id: 'DEP001', name: 'ChatGLM-4-客服推理服务', model: 'ChatGLM-4-cs-v1.2',
    image: 'registry.internal/chatglm4-cs:v1.2', replicas: 3, mode: '模板部署',
    status: 'online', resourcePool: '视觉AI团队', cpu: '8C', gpu: '4×A100 80G',
    mem: '256GB', autoScale: true, greyUpgrade: false,
    endpoint: '/api/infer/chatglm4-cs', port: 8000, created: '2026-04-08',
    qps: 1240, latency: '82ms', calls: '1.2M',
  },
  {
    id: 'DEP002', name: 'BERT-意图识别服务', model: 'BERT-intent-v2.1',
    image: 'registry.internal/bert-intent:v2.1', replicas: 2, mode: '手动部署',
    status: 'online', resourcePool: 'NLP团队', cpu: '4C', gpu: '1×V100 32G',
    mem: '64GB', autoScale: false, greyUpgrade: true,
    endpoint: '/api/infer/bert-intent', port: 8000, created: '2026-03-28',
    qps: 3412, latency: '18ms', calls: '5.4M',
  },
  {
    id: 'DEP003', name: 'DeepSeek-R1-推理服务', model: 'DeepSeek-R1-7B',
    image: 'registry.internal/deepseek-r1:v1.0', replicas: 1, mode: '模板部署',
    status: 'stopped', resourcePool: '感知组', cpu: '8C', gpu: '2×A100 80G',
    mem: '128GB', autoScale: true, greyUpgrade: false,
    endpoint: '/api/infer/deepseek-r1', port: 8000, created: '2026-04-01',
    qps: 0, latency: '—', calls: '142K',
  },
];

const publishedApis = [
  {
    id: 'API001', name: 'ChatGLM-4 客服对话 API', deployment: 'ChatGLM-4-客服推理服务',
    model: 'ChatGLM-4-cs-v1.2', endpoint: '/api/v1/chat/completions',
    port: 8000, originalPort: 10000, protocol: 'HTTP/HTTPS',
    presetImage: 'DeepSeek', status: 'online', concurrency: 2000,
    callsToday: '68.2K', callsTotal: '1.2M', latency: '82ms', successRate: '99.9%',
    proxy: 'nginx-proxy-01', gpuCluster: 'gpu-cluster-zone-a',
  },
  {
    id: 'API002', name: 'BERT 意图识别 API', deployment: 'BERT-意图识别服务',
    model: 'BERT-intent-v2.1', endpoint: '/api/v1/classify/intent',
    port: 8000, originalPort: 8000, protocol: 'HTTP',
    presetImage: 'Qwen', status: 'online', concurrency: 5000,
    callsToday: '182.4K', callsTotal: '5.4M', latency: '18ms', successRate: '99.97%',
    proxy: 'nginx-proxy-02', gpuCluster: 'gpu-cluster-zone-b',
  },
  {
    id: 'API003', name: 'DeepSeek-R1 推理 API', deployment: 'DeepSeek-R1-推理服务',
    model: 'DeepSeek-R1-7B', endpoint: '/api/v1/infer/deepseek',
    port: 8000, originalPort: 10000, protocol: 'HTTP',
    presetImage: 'TeleChat', status: 'offline', concurrency: 1000,
    callsToday: '0', callsTotal: '142K', latency: '—', successRate: '—',
    proxy: 'nginx-proxy-01', gpuCluster: 'gpu-cluster-zone-a',
  },
];

const statusCfg: Record<string, { label: string; color: string; bg: string }> = {
  deployed:  { label: '已部署', color: '#16a34a', bg: '#dcfce7' },
  available: { label: '可用',   color: '#3b82f6', bg: '#eff6ff' },
  online:    { label: '在线',   color: '#16a34a', bg: '#dcfce7' },
  stopped:   { label: '已停止', color: '#64748b', bg: '#f1f5f9' },
  offline:   { label: '离线',   color: '#dc2626', bg: '#fee2e2' },
};

// ─── Shared Helpers ───────────────────────────────────────────────────────────
function SectionHeader({ title, desc, action }: { title: string; desc?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-5">
      <div>
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 rounded-full shrink-0" style={{ background: ORANGE }} />
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>{title}</span>
        </div>
        {desc && <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px', paddingLeft: '12px' }}>{desc}</p>}
      </div>
      {action}
    </div>
  );
}

function OrangeBtn({ children, icon: Icon, onClick, sm }: { children: React.ReactNode; icon?: any; onClick?: () => void; sm?: boolean }) {
  return (
    <button onClick={onClick}
      className="flex items-center gap-1.5 rounded-lg text-white hover:opacity-90 transition-all shadow-sm"
      style={{ fontSize: sm ? '11px' : '12px', padding: sm ? '4px 10px' : '6px 12px', background: `linear-gradient(135deg,${ORANGE},#ff7a45)` }}>
      {Icon && <Icon className={sm ? 'w-3 h-3' : 'w-3.5 h-3.5'} />}
      {children}
    </button>
  );
}

function GhostBtn({ children, icon: Icon, onClick }: { children: React.ReactNode; icon?: any; onClick?: () => void }) {
  return (
    <button onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border hover:bg-gray-50 transition-all"
      style={{ fontSize: '12px', color: '#64748b', borderColor: '#e2e8f0' }}>
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </button>
  );
}

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

function InfoBox({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl p-4 space-y-2" style={{ background: '#fff7ed', border: '1px solid #fed7aa' }}>
      <div className="flex items-center gap-2 mb-1">
        <div className="w-1 h-3.5 rounded-full" style={{ background: ORANGE }} />
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#c2410c' }}>{title}</span>
      </div>
      {items.map((it, i) => (
        <div key={i} className="flex items-start gap-2 pl-3" style={{ fontSize: '12px', color: '#7c3d15' }}>
          <span style={{ color: ORANGE, flexShrink: 0, marginTop: '1px' }}>·</span>
          {it}
        </div>
      ))}
    </div>
  );
}

// ─── Panel 1: AI 模型管理 ─────────────────────────────────────────────────────
function AIModelMgmt() {
  const [importModal, setImportModal] = useState(false);
  const [versionModal, setVersionModal] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const filtered = aiModels.filter((m) =>
    m.name.includes(search) || m.cnName.includes(search) || m.base.includes(search) || m.tags.some((t) => t.includes(search))
  );

  return (
    <div className="p-6 space-y-5">
      <SectionHeader
        title="AI 模型管理"
        desc="支持 AI 模型的生命周期管理，支持模型的版本管理，支持外部模型的导入和算法的入驻等"
        action={
          <div className="flex items-center gap-2">
            <GhostBtn icon={Upload} onClick={() => setImportModal(true)}>导入外部模型</GhostBtn>
            <OrangeBtn icon={Plus}>注册新模型</OrangeBtn>
          </div>
        }
      />

      <InfoBox title="功能说明" items={[
        '支持 AI 模型的生命周期管理，支持模型的版本管理，支持外部模型的导入和算法的入驻等。',
        '支持扩展服务名称支持汉字命名，提升命名灵活性。',
      ]} />

      <div className="grid grid-cols-4 gap-3">
        <StatCard label="模型总数" value={String(aiModels.length)} icon={Brain} color={ORANGE} />
        <StatCard label="已部署" value="2" icon={Server} color="#16a34a" />
        <StatCard label="可用未部署" value="2" icon={CheckCircle} color="#3b82f6" />
        <StatCard label="外部导入" value="1" icon={Upload} color="#8b5cf6" />
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: '#94a3b8' }} />
          <input
            placeholder="搜索模型名称（支持汉字）、基础模型、标签…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg pl-8 pr-3 py-1.5 focus:outline-none bg-white"
            style={{ fontSize: '12px', border: '1px solid #e2e8f0' }}
            onFocus={(e) => (e.target.style.borderColor = ORANGE)}
            onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
          />
        </div>
        <GhostBtn icon={Filter}>筛选</GhostBtn>
      </div>

      {/* Model table */}
      <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #f1ede9' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#faf7f5', borderBottom: '1px solid #f1ede9' }}>
              {['模型名称（支持汉字）', '基础模型', '微调方式', '参数量', '格式', '来源', '版本', '状态', '操作'].map((h) => (
                <th key={h} className="text-left px-4 py-2.5" style={{ fontSize: '12px', fontWeight: 500, color: '#64748b' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => {
              const cfg = statusCfg[m.status];
              return (
                <tr key={m.id} style={{ borderBottom: '1px solid #f8f8f8' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#fff7f5')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#fff7ed' }}>
                        <Brain className="w-3.5 h-3.5" style={{ color: ORANGE }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>{m.name}</div>
                        <div style={{ fontSize: '11px', color: ORANGE, marginTop: '1px' }}>{m.cnName}</div>
                        <div className="flex gap-1 mt-0.5">
                          {m.tags.map((t) => (
                            <span key={t} className="px-1.5 py-0.5 rounded" style={{ fontSize: '10px', background: '#f1f5f9', color: '#64748b' }}>{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3" style={{ fontSize: '12px', color: '#475569' }}>{m.base}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded" style={{ fontSize: '11px', background: '#f5f3ff', color: '#7c3aed' }}>{m.method}</span>
                  </td>
                  <td className="px-4 py-3" style={{ fontSize: '12px', color: '#374151' }}>{m.size}</td>
                  <td className="px-4 py-3" style={{ fontSize: '12px', color: '#64748b' }}>{m.format}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full" style={{
                      fontSize: '10px',
                      background: m.source === '外部导入' ? '#f5f3ff' : '#eff6ff',
                      color: m.source === '外部导入' ? '#7c3aed' : '#3b82f6',
                    }}>{m.source}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => setVersionModal(m.id)}
                      className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-orange-50 transition-colors"
                      style={{ fontSize: '11px', color: ORANGE, border: `1px solid ${ORANGE}30` }}>
                      <GitBranch className="w-3 h-3" />{m.version}
                    </button>
                    {m.prevVersions.length > 0 && (
                      <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>历史 {m.prevVersions.length} 版</div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full" style={{ fontSize: '11px', background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {m.status !== 'deployed' && <button style={{ fontSize: '11px', color: ORANGE }} className="hover:underline">部署</button>}
                      <button style={{ fontSize: '11px', color: '#64748b' }}>详情</button>
                      <button style={{ fontSize: '11px', color: '#64748b' }}>导出</button>
                      {m.source === '外部导入' && <button style={{ fontSize: '11px', color: '#ef4444' }}>删除</button>}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Version modal */}
      {versionModal !== null && (() => {
        const m = aiModels.find((x) => x.id === versionModal)!;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.3)' }}
            onClick={() => setVersionModal(null)}>
            <div className="bg-white rounded-2xl p-6 w-96 shadow-2xl" onClick={(e) => e.stopPropagation()}
              style={{ border: '1px solid #f1ede9' }}>
              <div className="flex items-center justify-between mb-4">
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>{m.name} — 版本管理</span>
                <button onClick={() => setVersionModal(null)} style={{ color: '#94a3b8' }}><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-2">
                {[m.version, ...m.prevVersions].map((v, i) => (
                  <div key={v} className="flex items-center justify-between p-3 rounded-xl"
                    style={{ background: i === 0 ? '#fff7ed' : '#f8fafc', border: `1px solid ${i === 0 ? '#fed7aa' : '#e2e8f0'}` }}>
                    <div className="flex items-center gap-2">
                      <Archive className="w-3.5 h-3.5" style={{ color: i === 0 ? ORANGE : '#94a3b8' }} />
                      <span style={{ fontSize: '13px', fontWeight: i === 0 ? 600 : 400, color: i === 0 ? ORANGE : '#374151' }}>{v}</span>
                      {i === 0 && <span className="px-1.5 py-0.5 rounded-full" style={{ fontSize: '10px', background: '#fff7ed', color: ORANGE }}>当前</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      {i !== 0 && <button style={{ fontSize: '11px', color: '#64748b' }}>回滚</button>}
                      <button style={{ fontSize: '11px', color: '#64748b' }}>下载</button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 py-2 rounded-xl text-white"
                style={{ fontSize: '13px', fontWeight: 600, background: `linear-gradient(135deg,${ORANGE},#ff7a45)` }}>
                上传新版本
              </button>
            </div>
          </div>
        );
      })()}

      {/* Import modal */}
      {importModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.3)' }}
          onClick={() => setImportModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-[480px] shadow-2xl" onClick={(e) => e.stopPropagation()}
            style={{ border: '1px solid #f1ede9' }}>
            <div className="flex items-center justify-between mb-5">
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>导入外部模型</span>
              <button onClick={() => setImportModal(false)} style={{ color: '#94a3b8' }}><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Hugging Face', icon: '🤗', desc: '从 HF Hub 导入' },
                  { label: '本地上传', icon: '💾', desc: '从本地文件导入' },
                  { label: 'S3/OSS', icon: '☁️', desc: '从对象存储导入' },
                  { label: '算法入驻', icon: '🔬', desc: '第三方算法接入' },
                ].map((s) => (
                  <button key={s.label} className="p-4 rounded-xl text-left transition-all hover:border-orange-300"
                    style={{ border: '1.5px solid #e2e8f0', background: '#f8fafc' }}>
                    <div style={{ fontSize: '20px', marginBottom: '4px' }}>{s.icon}</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>{s.label}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{s.desc}</div>
                  </button>
                ))}
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '6px' }}>
                  模型汉字名称 <span style={{ color: ORANGE }}>*</span>
                  <span style={{ color: '#94a3b8', fontWeight: 400, marginLeft: '4px' }}>（支持中文命名，提升命名灵活性）</span>
                </label>
                <input placeholder="例如：通用推理模型-企业版" className="w-full rounded-lg px-3 py-2 focus:outline-none"
                  style={{ fontSize: '12px', border: '1px solid #e2e8f0', background: '#f8fafc' }}
                  onFocus={(e) => (e.target.style.borderColor = ORANGE)}
                  onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')} />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setImportModal(false)} className="flex-1 py-2 rounded-xl border hover:bg-gray-50"
                  style={{ fontSize: '13px', color: '#64748b', borderColor: '#e2e8f0' }}>取消</button>
                <button onClick={() => setImportModal(false)} className="flex-1 py-2 rounded-xl text-white"
                  style={{ fontSize: '13px', fontWeight: 600, background: `linear-gradient(135deg,${ORANGE},#ff7a45)` }}>确认导入</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Panel 2: 应用部署 ────────────────────────────────────────────────────────
function AppDeploy() {
  const [deployModal, setDeployModal] = useState(false);
  const [deployMode, setDeployMode] = useState<'template' | 'manual'>('template');

  return (
    <div className="p-6 space-y-5">
      <SectionHeader
        title="应用部署"
        desc="支持将服务组件和 AI 模型封装在一个镜像或多个镜像中，按照模板或手动实现快速部署，支持部署的自动弹缩以及灰度升级等"
        action={
          <div className="flex items-center gap-2">
            <GhostBtn icon={RefreshCw}>刷新状态</GhostBtn>
            <OrangeBtn icon={Plus} onClick={() => setDeployModal(true)}>新建部署</OrangeBtn>
          </div>
        }
      />

      <InfoBox title="功能说明" items={[
        '支持将服务组件和 AI 模型封装在一个镜像或多个镜像中，按照模板或手动实现快速部署，支持部署的自动弹缩以及灰度升级等。',
        '建设推理资源团队私有资源池，仅可用于团队运行推理服务。',
      ]} />

      <div className="grid grid-cols-4 gap-3">
        <StatCard label="部署总数" value={String(deployments.length)} icon={Server} color={ORANGE} />
        <StatCard label="在线" value="2" icon={CheckCircle} color="#16a34a" />
        <StatCard label="已停止" value="1" icon={AlertTriangle} color="#64748b" />
        <StatCard label="私有资源池" value="3" icon={Shield} color="#8b5cf6" />
      </div>

      <div className="space-y-4">
        {deployments.map((dep) => {
          const cfg = statusCfg[dep.status];
          return (
            <div key={dep.id} className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #f1ede9' }}>
              {/* Header */}
              <div className="px-5 py-4" style={{ background: dep.status === 'online' ? '#fafffe' : '#fafafa' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: dep.status === 'online' ? '#dcfce7' : '#f1f5f9' }}>
                      <Box className="w-5 h-5" style={{ color: dep.status === 'online' ? '#16a34a' : '#64748b' }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>{dep.name}</span>
                        <span className="px-2 py-0.5 rounded-full" style={{ fontSize: '11px', background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                        <span className="px-2 py-0.5 rounded" style={{ fontSize: '10px', background: '#f5f3ff', color: '#7c3aed' }}>{dep.mode}</span>
                      </div>
                      <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                        模型: {dep.model} · 镜像: <code style={{ color: ORANGE }}>{dep.image}</code>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg"
                      style={{ fontSize: '11px', background: '#fff7ed', color: ORANGE }}>
                      <Eye className="w-3 h-3" /> 监控
                    </button>
                    <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg"
                      style={{ fontSize: '11px', background: '#f1f5f9', color: '#64748b' }}>
                      <Settings2 className="w-3 h-3" /> 配置
                    </button>
                    {dep.status === 'online'
                      ? <button className="p-1.5 rounded hover:bg-amber-50" style={{ color: '#d97706' }}><Pause className="w-4 h-4" /></button>
                      : <button className="p-1.5 rounded hover:bg-green-50" style={{ color: '#16a34a' }}><Play className="w-4 h-4" /></button>}
                  </div>
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-4 gap-0 divide-x" style={{ borderTop: '1px solid #f1f5f9', divideColor: '#f1f5f9' }}>
                {[
                  { label: '副本数', value: `${dep.replicas} 个`, icon: Layers },
                  { label: '私有资源池', value: dep.resourcePool, icon: Shield },
                  { label: '资源规格', value: `${dep.gpu} / ${dep.mem}`, icon: Cpu },
                  { label: '服务端点', value: `${dep.endpoint}:${dep.port}`, icon: Network },
                ].map((item) => (
                  <div key={item.label} className="px-4 py-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <item.icon className="w-3.5 h-3.5" style={{ color: '#94a3b8' }} />
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>{item.label}</span>
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: 500, color: '#374151' }}>{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Feature toggles */}
              <div className="px-5 py-3 flex items-center gap-4" style={{ background: '#f8fafc', borderTop: '1px solid #f1f5f9' }}>
                <div className="flex items-center gap-2">
                  {dep.autoScale
                    ? <ToggleRight className="w-4 h-4" style={{ color: '#16a34a' }} />
                    : <ToggleLeft className="w-4 h-4" style={{ color: '#94a3b8' }} />}
                  <span style={{ fontSize: '11px', color: dep.autoScale ? '#16a34a' : '#94a3b8' }}>自动弹缩</span>
                </div>
                <div className="flex items-center gap-2">
                  {dep.greyUpgrade
                    ? <ToggleRight className="w-4 h-4" style={{ color: '#3b82f6' }} />
                    : <ToggleLeft className="w-4 h-4" style={{ color: '#94a3b8' }} />}
                  <span style={{ fontSize: '11px', color: dep.greyUpgrade ? '#3b82f6' : '#94a3b8' }}>灰度升级</span>
                </div>
                <div className="ml-auto flex items-center gap-3" style={{ fontSize: '11px', color: '#94a3b8' }}>
                  <span>QPS: <strong style={{ color: '#374151' }}>{dep.qps}</strong></span>
                  <span>延迟: <strong style={{ color: '#374151' }}>{dep.latency}</strong></span>
                  <span>总调用: <strong style={{ color: '#374151' }}>{dep.calls}</strong></span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deploy modal */}
      {deployModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.3)' }}
          onClick={() => setDeployModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-[520px] shadow-2xl" onClick={(e) => e.stopPropagation()}
            style={{ border: '1px solid #f1ede9' }}>
            <div className="flex items-center justify-between mb-5">
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>新建应用部署</span>
              <button onClick={() => setDeployModal(false)} style={{ color: '#94a3b8' }}><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '6px' }}>部署方式</label>
                <div className="flex gap-3">
                  {[
                    { v: 'template' as const, label: '模板部署', desc: '快速套用预设模板', icon: '📋' },
                    { v: 'manual' as const, label: '手动部署', desc: '自定义镜像与配置', icon: '🔧' },
                  ].map((opt) => (
                    <button key={opt.v} onClick={() => setDeployMode(opt.v)}
                      className="flex-1 flex items-center gap-3 p-4 rounded-xl text-left transition-all"
                      style={{ border: `1.5px solid ${deployMode === opt.v ? ORANGE : '#e2e8f0'}`, background: deployMode === opt.v ? '#fff7ed' : '#f8fafc' }}>
                      <span style={{ fontSize: '22px' }}>{opt.icon}</span>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: deployMode === opt.v ? ORANGE : '#374151' }}>{opt.label}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>{opt.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              {[
                { label: '部署名称', placeholder: '例如：ChatGLM-4-生产服务' },
                { label: '选择模型', placeholder: '选择已上架的 AI 模型' },
                { label: '私有资源池', placeholder: '选择团队资源池' },
              ].map((f) => (
                <div key={f.label}>
                  <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '6px' }}>{f.label}</label>
                  <input placeholder={f.placeholder} className="w-full rounded-lg px-3 py-2 focus:outline-none"
                    style={{ fontSize: '12px', border: '1px solid #e2e8f0', background: '#f8fafc' }}
                    onFocus={(e) => (e.target.style.borderColor = ORANGE)}
                    onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')} />
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button onClick={() => setDeployModal(false)} className="flex-1 py-2 rounded-xl border hover:bg-gray-50"
                  style={{ fontSize: '13px', color: '#64748b', borderColor: '#e2e8f0' }}>取消</button>
                <button onClick={() => setDeployModal(false)} className="flex-1 py-2 rounded-xl text-white"
                  style={{ fontSize: '13px', fontWeight: 600, background: `linear-gradient(135deg,${ORANGE},#ff7a45)` }}>创建部署</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Panel 3: 应用发布 ────────────────────────────────────────────────────────
function AppPublish() {
  const [publishModal, setPublishModal] = useState(false);

  const portMigrations = [
    {
      image: 'DeepSeek', models: ['DeepSeek-R1-7B', 'DeepSeek-V3-7B', 'DeepSeek-Coder-7B'],
      oldPort: 10000, newPort: 8000,
      desc: '将所有预置镜像 DeepSeek 各模型参数，端口号是 10000 的调整为 8000，确保接口标准化与兼容性，预防用户填写错误。',
    },
    {
      image: 'Qwen', models: ['Qwen-2.5-7B', 'Qwen-2.5-14B', 'Qwen-2.5-72B'],
      oldPort: 10000, newPort: 8000,
      desc: '将所有预置镜像 Qwen 各模型参数，端口号是 10000 的调整为 8000，确保接口标准化与兼容性，预防用户填写错误。',
    },
    {
      image: 'TeleChat', models: ['TeleChat-7B', 'TeleChat-12B'],
      oldPort: 10000, newPort: 8000,
      desc: '将所有预置镜像 TeleChat 各模型参数，端口号是 10000 的调整为 8000，确保接口标准化与兼容性，预防用户填写错误。',
    },
  ];

  return (
    <div className="p-6 space-y-5">
      <SectionHeader
        title="应用发布"
        desc="支持将部署的 AI 应用发布为外部可调用的 API，支持应用调用的高并发访问等"
        action={
          <div className="flex items-center gap-2">
            <GhostBtn icon={RefreshCw}>刷新</GhostBtn>
            <OrangeBtn icon={Plus} onClick={() => setPublishModal(true)}>发布新 API</OrangeBtn>
          </div>
        }
      />

      <InfoBox title="功能说明" items={[
        '推理的服务，由代理机进行 ng 转发，再到 GPU 集群。',
        '支持模型应用部署的 API 端口统一，将所有预置镜像 DeepSeek 各模型参数，端口号是 10000 的调整为 8000，确保接口标准化与兼容性，预防用户填写错误。',
        '支持模型应用部署的 API 端口统一，将所有预置镜像 Qwen 各模型参数，端口号是 10000 的调整为 8000，确保接口标准化与兼容性，预防用户填写错误。',
        '支持模型应用部署的 API 端口统一，将所有预置镜像 TeleChat 各模型参数，端口号是 10000 的调整为 8000，确保接口标准化与兼容性，预防用户填写错误。',
      ]} />

      <div className="grid grid-cols-4 gap-3">
        <StatCard label="已发布 API" value={String(publishedApis.length)} icon={Globe} color={ORANGE} />
        <StatCard label="在线" value="2" icon={CheckCircle} color="#16a34a" />
        <StatCard label="今日总调用" value="250.6K" icon={Zap} color="#3b82f6" />
        <StatCard label="最大并发" value="5,000" icon={TrendingUp} color="#8b5cf6" />
      </div>

      {/* Port standardization notice */}
      <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #f1ede9' }}>
        <div className="px-4 py-3 flex items-center gap-2" style={{ background: 'linear-gradient(135deg,#fff7ed,#fff5f0)', borderBottom: '1px solid #fed7aa' }}>
          <div className="w-2 h-2 rounded-full" style={{ background: ORANGE }} />
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#c2410c' }}>API 端口标准化规则（10000 → 8000）</span>
          <span className="ml-auto px-2 py-0.5 rounded-full" style={{ fontSize: '10px', background: '#dcfce7', color: '#16a34a' }}>已应用</span>
        </div>
        <div className="p-4">
          {/* Traffic flow */}
          <div className="flex items-center justify-center gap-3 mb-5 p-4 rounded-xl" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            {[
              { label: '客户端', icon: '💻', color: '#64748b' },
              { label: '代理机 (nginx)', icon: '🔀', color: '#3b82f6' },
              { label: 'ng 转发', icon: '→', color: '#94a3b8', isArrow: true },
              { label: 'GPU 集群', icon: '🖥', color: '#16a34a' },
            ].map((node, i) => (
              node.isArrow ? (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span style={{ fontSize: '20px', color: '#94a3b8' }}>→</span>
                  <span style={{ fontSize: '10px', color: '#94a3b8' }}>ng 转发</span>
                </div>
              ) : (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${node.color}15`, border: `1.5px solid ${node.color}30` }}>
                      <span style={{ fontSize: '20px' }}>{node.icon}</span>
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 500, color: node.color }}>{node.label}</span>
                  </div>
                  {i < 2 && <span style={{ fontSize: '18px', color: '#cbd5e1', marginBottom: '16px' }}>→</span>}
                </React.Fragment>
              )
            ))}
          </div>

          {/* Port rules */}
          <div className="grid grid-cols-3 gap-4">
            {portMigrations.map((rule) => (
              <div key={rule.image} className="rounded-xl overflow-hidden" style={{ border: '1px solid #f1f5f9' }}>
                <div className="px-3 py-2 flex items-center justify-between"
                  style={{ background: `linear-gradient(135deg,${ORANGE}10,${ORANGE}05)`, borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>{rule.image}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded font-mono" style={{ fontSize: '11px', background: '#fee2e2', color: '#dc2626' }}>:{rule.oldPort}</span>
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>→</span>
                    <span className="px-1.5 py-0.5 rounded font-mono" style={{ fontSize: '11px', background: '#dcfce7', color: '#16a34a' }}>:{rule.newPort}</span>
                  </div>
                </div>
                <div className="p-3 space-y-1.5">
                  {rule.models.map((m) => (
                    <div key={m} className="flex items-center gap-2" style={{ fontSize: '11px', color: '#64748b' }}>
                      <CheckCircle className="w-3 h-3 shrink-0" style={{ color: '#16a34a' }} />
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Published APIs */}
      <div className="space-y-3">
        {publishedApis.map((api) => {
          const cfg = statusCfg[api.status];
          return (
            <div key={api.id} className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #f1ede9' }}>
              <div className="px-5 py-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#fff7ed' }}>
                      <Globe className="w-5 h-5" style={{ color: ORANGE }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>{api.name}</span>
                        <span className="px-2 py-0.5 rounded-full" style={{ fontSize: '11px', background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                        <span className="px-2 py-0.5 rounded" style={{ fontSize: '10px', background: '#f5f3ff', color: '#7c3aed' }}>{api.protocol}</span>
                        <span className="px-2 py-0.5 rounded" style={{ fontSize: '10px', background: '#f0fdf4', color: '#16a34a' }}>并发 {api.concurrency}</span>
                      </div>
                      <div className="flex items-center gap-3" style={{ fontSize: '11px', color: '#94a3b8' }}>
                        <code style={{ color: ORANGE }}>{api.endpoint}</code>
                        <span>端口:
                          <span className="ml-1 px-1.5 py-0.5 rounded font-mono" style={{ fontSize: '10px', background: '#dcfce7', color: '#16a34a' }}>:{api.port}</span>
                          {api.originalPort !== api.port && (
                            <span className="ml-1" style={{ color: '#94a3b8' }}>
                              (原 <span className="line-through">:{api.originalPort}</span>)
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg"
                      style={{ fontSize: '11px', background: '#fff7ed', color: ORANGE }}>
                      <Zap className="w-3 h-3" /> 测试
                    </button>
                    <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg"
                      style={{ fontSize: '11px', background: '#f1f5f9', color: '#64748b' }}>
                      <Copy className="w-3 h-3" /> 复制地址
                    </button>
                    <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg"
                      style={{ fontSize: '11px', background: '#f1f5f9', color: '#64748b' }}>
                      <FileText className="w-3 h-3" /> 文档
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats bar */}
              <div className="grid grid-cols-5 divide-x px-0" style={{ borderTop: '1px solid #f1f5f9' }}>
                {[
                  { label: '代理机', value: api.proxy },
                  { label: 'GPU 集群', value: api.gpuCluster },
                  { label: '今日调用', value: api.callsToday },
                  { label: '延迟', value: api.latency },
                  { label: '成功率', value: api.successRate },
                ].map((s) => (
                  <div key={s.label} className="px-4 py-2.5 text-center">
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '2px' }}>{s.label}</div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#374151' }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Publish modal */}
      {publishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.3)' }}
          onClick={() => setPublishModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-[480px] shadow-2xl" onClick={(e) => e.stopPropagation()}
            style={{ border: '1px solid #f1ede9' }}>
            <div className="flex items-center justify-between mb-5">
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>发布新 API</span>
              <button onClick={() => setPublishModal(false)} style={{ color: '#94a3b8' }}><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              {[
                { label: 'API 名称', placeholder: '例如：ChatGLM-4 通用对话接口' },
                { label: '关联部署', placeholder: '选择已部署的应用' },
              ].map((f) => (
                <div key={f.label}>
                  <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '6px' }}>{f.label}</label>
                  <input placeholder={f.placeholder} className="w-full rounded-lg px-3 py-2 focus:outline-none"
                    style={{ fontSize: '12px', border: '1px solid #e2e8f0', background: '#f8fafc' }}
                    onFocus={(e) => (e.target.style.borderColor = ORANGE)}
                    onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '6px' }}>服务端口</label>
                <div className="flex items-center gap-3">
                  <input defaultValue="8000" className="w-28 rounded-lg px-3 py-2 focus:outline-none font-mono"
                    style={{ fontSize: '13px', border: '1px solid #e2e8f0', background: '#f8fafc' }}
                    onFocus={(e) => (e.target.style.borderColor = ORANGE)}
                    onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')} />
                  <div className="flex-1 p-2.5 rounded-xl" style={{ background: '#fff7ed', border: '1px solid #fed7aa' }}>
                    <div style={{ fontSize: '11px', color: '#c2410c' }}>
                      ⚠️ 端口 10000 将自动标准化为 8000
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '6px' }}>最大并发</label>
                <input defaultValue="1000" className="w-full rounded-lg px-3 py-2 focus:outline-none"
                  style={{ fontSize: '12px', border: '1px solid #e2e8f0', background: '#f8fafc' }}
                  onFocus={(e) => (e.target.style.borderColor = ORANGE)}
                  onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')} />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setPublishModal(false)} className="flex-1 py-2 rounded-xl border hover:bg-gray-50"
                  style={{ fontSize: '13px', color: '#64748b', borderColor: '#e2e8f0' }}>取消</button>
                <button onClick={() => setPublishModal(false)} className="flex-1 py-2 rounded-xl text-white"
                  style={{ fontSize: '13px', fontWeight: 600, background: `linear-gradient(135deg,${ORANGE},#ff7a45)` }}>立即发布</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Route Component ──────────────────────────────────────────────────────────
const contentMap: Record<string, React.ReactNode> = {
  'ai-model-mgmt': <AIModelMgmt />,
  'app-deploy': <AppDeploy />,
  'app-publish': <AppPublish />,
};

export function AIInference() {
  const [activeKey, setActiveKey] = useState('ai-model-mgmt');
  return (
    <SidebarLayout title="AI 推理" items={sidebarItems} activeKey={activeKey} onSelect={setActiveKey}>
      {contentMap[activeKey]}
    </SidebarLayout>
  );
}
