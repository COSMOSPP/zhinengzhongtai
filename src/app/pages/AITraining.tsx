import React, { useState } from 'react';
import { SidebarLayout, SidebarItem } from '../components/SidebarLayout';
import {
  Activity, Settings2, Layers, Brain, Cpu,
  Plus, CheckCircle, Zap, BarChart2, AlertTriangle,
  Search, Package, GitBranch, Users, FolderOpen,
  Server, RefreshCw, Link2, ShieldCheck, Upload,
  Clock, Play, Pause, Trash2, Edit3, Download,
  ChevronDown, ChevronRight, X, PlusCircle,
  ArrowUpRight, Database, Filter, MoreHorizontal,
  Building2, UserCheck, Cpu as CpuIcon, MapPin,
  HardDrive, Network, Star, Eye, Copy,
} from 'lucide-react';

const ORANGE = '#fa541c';

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const sidebarItems: SidebarItem[] = [
  {
    key: 'train-engine',
    label: '训练引擎',
    icon: Cpu,
    children: [
      { key: 'component-mgmt', label: '组件管理', icon: Package },
    ],
  },
  {
    key: 'train-task',
    label: '训练任务',
    icon: Activity,
    children: [
      { key: 'project-mgmt', label: '训练项目管理', icon: FolderOpen },
      { key: 'task-mgmt', label: '训练任务管理', icon: Activity },
    ],
  },
];

// ─── Mock data ─────────────────────────────────────────────────────────────────
const components = [
  {
    id: 1, name: 'pytorch-base', type: '基础框架', version: 'v2.2.0', source: '官方仓库',
    status: 'connected', size: '8.4 GB', lastCheck: '2026-04-10 08:30', stars: 4.9,
    desc: 'PyTorch 深度学习基础框架组件，支持 GPU 加速与分布式训练。',
    tags: ['PyTorch', 'GPU', '分布式'],
  },
  {
    id: 2, name: 'transformers-hf', type: 'NLP框架', version: 'v4.40.0', source: 'Hugging Face',
    status: 'connected', size: '2.1 GB', lastCheck: '2026-04-10 08:30', stars: 4.8,
    desc: 'Hugging Face Transformers 组件，提供预训练模型加载与微调能力。',
    tags: ['Transformers', 'NLP', '微调'],
  },
  {
    id: 3, name: 'deepspeed-engine', type: '加速框架', version: 'v0.14.0', source: 'Microsoft',
    status: 'disconnected', size: '1.8 GB', lastCheck: '2026-04-09 15:20', stars: 4.7,
    desc: 'DeepSpeed 分布式训练加速引擎，支持 ZeRO 优化与大模型训练。',
    tags: ['DeepSpeed', '加速', 'ZeRO'],
  },
  {
    id: 4, name: 'megatron-lm', type: '大模型框架', version: 'v4.0.0', source: 'NVIDIA',
    status: 'connected', size: '3.2 GB', lastCheck: '2026-04-10 07:50', stars: 4.6,
    desc: 'NVIDIA Megatron-LM 大规模语言模型训练框架，支持张量并行与流水线并行。',
    tags: ['Megatron', '大模型', '并行'],
  },
  {
    id: 5, name: 'llama-factory', type: '微调工具', version: 'v0.8.2', source: '开源社区',
    status: 'connected', size: '0.6 GB', lastCheck: '2026-04-10 09:00', stars: 4.8,
    desc: 'LLaMA Factory 一站式大模型微调工具，支持 LoRA、QLoRA、Full-FT 等多种方式。',
    tags: ['LoRA', '微调', 'LLM'],
  },
];

const projects = [
  {
    id: 'P001', name: '客服场景大模型微调项目', desc: '针对电商客服场景的 ChatGLM-4 LoRA 微调',
    status: 'running', leader: '张明', members: 5, tasks: 12, completedTasks: 8,
    gpu: '4×A100', created: '2026-03-01', deadline: '2026-04-30', priority: '高',
    province: ['广东省公司', '浙江省公司', '上海省公司'],
  },
  {
    id: 'P002', name: '医疗NLP模型训练项目', desc: 'BERT 基础模型命名实体识别任务微调',
    status: 'paused', leader: '李华', members: 3, tasks: 7, completedTasks: 4,
    gpu: '2×V100', created: '2026-02-15', deadline: '2026-05-15', priority: '中',
    province: ['北京省公司', '天津省公司'],
  },
  {
    id: 'P003', name: '代码生成模型项目', desc: 'Qwen-2.5-Coder 代码补全能力增强训练',
    status: 'pending', leader: '王芳', members: 4, tasks: 9, completedTasks: 0,
    gpu: '8×A100', created: '2026-04-01', deadline: '2026-06-30', priority: '高',
    province: ['江苏省公司'],
  },
];

const trainingTasks = [
  { id: 'JOB001', name: 'ChatGLM4-LoRA-cs-r8', project: '客服场景大模型微调项目', model: 'ChatGLM-4', method: 'LoRA', status: 'running', progress: 68, epoch: '3/5', loss: '0.42', gpu: '4×A100', startTime: '2026-04-08 10:00', eta: '约2h', creator: '张明' },
  { id: 'JOB002', name: 'ChatGLM4-LoRA-cs-r16', project: '客服场景大模型微调项目', model: 'ChatGLM-4', method: 'LoRA', status: 'success', progress: 100, epoch: '5/5', loss: '0.31', gpu: '4×A100', startTime: '2026-04-06 14:00', eta: '—', creator: '张明' },
  { id: 'JOB003', name: 'BERT-NER-full-ft', project: '医疗NLP模型训练项目', model: 'BERT-base-zh', method: 'Full FT', status: 'failed', progress: 34, epoch: '2/10', loss: '1.24', gpu: '2×V100', startTime: '2026-04-07 09:00', eta: '—', creator: '李华' },
  { id: 'JOB004', name: 'Qwen25-Coder-QLoRA', project: '代码生成模型项目', model: 'Qwen-2.5-7B', method: 'QLoRA', status: 'queued', progress: 0, epoch: '0/8', loss: '—', gpu: '8×A100', startTime: '—', eta: '—', creator: '王芳' },
];

const statusCfg: Record<string, { label: string; color: string; bg: string }> = {
  running:      { label: '运行中', color: '#3b82f6', bg: '#eff6ff' },
  success:      { label: '已完成', color: '#16a34a', bg: '#dcfce7' },
  failed:       { label: '失败',   color: '#dc2626', bg: '#fee2e2' },
  queued:       { label: '排队中', color: '#64748b', bg: '#f1f5f9' },
  paused:       { label: '已暂停', color: '#d97706', bg: '#fef3c7' },
  pending:      { label: '待启动', color: '#64748b', bg: '#f1f5f9' },
  connected:    { label: '已连接', color: '#16a34a', bg: '#dcfce7' },
  disconnected: { label: '连接异常', color: '#dc2626', bg: '#fee2e2' },
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

// ─── Panel 1: 组件管理 ────────────────────────────────────────────────────────
function ComponentMgmt() {
  const [search, setSearch] = useState('');
  const [checkingId, setCheckingId] = useState<number | null>(null);
  const [addModal, setAddModal] = useState(false);

  const filtered = components.filter(
    (c) => c.name.includes(search) || c.type.includes(search) || c.source.includes(search)
  );

  const handleCheck = (id: number) => {
    setCheckingId(id);
    setTimeout(() => setCheckingId(null), 2000);
  };

  return (
    <div className="p-6 space-y-5">
      <SectionHeader
        title="组件管理"
        desc="支持训练组件管理，支持训练组件的创建及配置，以支撑多样的训练任务"
        action={
          <div className="flex items-center gap-2">
            <GhostBtn icon={Upload}>导入组件</GhostBtn>
            <OrangeBtn icon={Plus} onClick={() => setAddModal(true)}>新建组件</OrangeBtn>
          </div>
        }
      />

      <InfoBox title="功能说明" items={[
        '支持组件全局搜索功能，快速定位目标仓库。',
        '支持仓库组件连接性检查工具，确保组件上传连续性，确保服务可用性。',
      ]} />

      <div className="grid grid-cols-4 gap-3">
        <StatCard label="组件总数" value={String(components.length)} icon={Package} color={ORANGE} />
        <StatCard label="已连接" value="4" icon={Link2} color="#16a34a" />
        <StatCard label="连接异常" value="1" icon={AlertTriangle} color="#dc2626" />
        <StatCard label="组件类型" value="5" icon={Layers} color="#8b5cf6" />
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: '#94a3b8' }} />
          <input
            placeholder="全局搜索组件名称、类型、来源…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg pl-8 pr-3 py-1.5 focus:outline-none bg-white"
            style={{ fontSize: '12px', border: '1px solid #e2e8f0' }}
            onFocus={(e) => (e.target.style.borderColor = ORANGE)}
            onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
          />
        </div>
        <GhostBtn icon={Filter}>类型筛选</GhostBtn>
        <div className="ml-auto flex items-center gap-1.5">
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>共 {filtered.length} 个组件</span>
        </div>
      </div>

      {/* Component grid */}
      <div className="grid grid-cols-2 gap-4">
        {filtered.map((comp) => {
          const cfg = statusCfg[comp.status];
          const isChecking = checkingId === comp.id;
          return (
            <div key={comp.id} className="bg-white rounded-xl p-5 hover:shadow-md transition-shadow"
              style={{ border: '1px solid #f1ede9' }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#fff7ed' }}>
                    <Package className="w-5 h-5" style={{ color: ORANGE }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>{comp.name}</span>
                      <span className="px-1.5 py-0.5 rounded" style={{ fontSize: '10px', background: '#f5f3ff', color: '#7c3aed' }}>{comp.version}</span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{comp.type} · {comp.source}</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full shrink-0" style={{ fontSize: '11px', background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
              </div>

              <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.7, marginBottom: '12px' }}>{comp.desc}</p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {comp.tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-full" style={{ fontSize: '10px', background: '#f1f5f9', color: '#64748b' }}>{t}</span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #f1f5f9' }}>
                <div className="flex items-center gap-3" style={{ fontSize: '11px', color: '#94a3b8' }}>
                  <span>大小 {comp.size}</span>
                  <span>检查 {comp.lastCheck}</span>
                  <span className="flex items-center gap-0.5">
                    <Star className="w-3 h-3" style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                    {comp.stars}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCheck(comp.id)}
                    disabled={isChecking}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all"
                    style={{ fontSize: '11px', background: '#eff6ff', color: '#3b82f6', border: '1px solid #bfdbfe' }}
                  >
                    <ShieldCheck className="w-3 h-3" />
                    {isChecking ? '检查中…' : '连接检查'}
                  </button>
                  <button style={{ fontSize: '11px', color: ORANGE }} className="hover:underline">配置</button>
                  <button style={{ fontSize: '11px', color: '#64748b' }}>详情</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      {addModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.3)' }}
          onClick={() => setAddModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-[480px] shadow-2xl" onClick={(e) => e.stopPropagation()}
            style={{ border: '1px solid #f1ede9' }}>
            <div className="flex items-center justify-between mb-5">
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>新建训练组件</span>
              <button onClick={() => setAddModal(false)} style={{ color: '#94a3b8' }}><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              {[
                { label: '组件名称', placeholder: '支持中英文，例如：pytorch-custom' },
                { label: '仓库地址', placeholder: 'https://registry.example.com/...' },
                { label: '版本号', placeholder: 'v1.0.0' },
              ].map((f) => (
                <div key={f.label}>
                  <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '6px' }}>
                    {f.label} <span style={{ color: ORANGE }}>*</span>
                  </label>
                  <input placeholder={f.placeholder} className="w-full rounded-lg px-3 py-2 focus:outline-none"
                    style={{ fontSize: '12px', border: '1px solid #e2e8f0', background: '#f8fafc' }}
                    onFocus={(e) => (e.target.style.borderColor = ORANGE)}
                    onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '6px' }}>组件类型</label>
                <div className="flex flex-wrap gap-2">
                  {['基础框架', 'NLP框架', '加速框架', '大模型框架', '微调工具'].map((t) => (
                    <button key={t} className="px-3 py-1 rounded-lg transition-all"
                      style={{ fontSize: '12px', background: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0' }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setAddModal(false)} className="flex-1 py-2 rounded-xl border hover:bg-gray-50 transition-all"
                  style={{ fontSize: '13px', color: '#64748b', borderColor: '#e2e8f0' }}>取消</button>
                <button onClick={() => setAddModal(false)} className="flex-1 py-2 rounded-xl text-white"
                  style={{ fontSize: '13px', fontWeight: 600, background: `linear-gradient(135deg,${ORANGE},#ff7a45)` }}>创建组件</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Panel 2: 训练项目管理 ────────────────────────────────────────────────────
function ProjectMgmt() {
  const [expandedProject, setExpandedProject] = useState<string | null>('P001');
  const [distributeModal, setDistributeModal] = useState<string | null>(null);
  const [addModal, setAddModal] = useState(false);

  return (
    <div className="p-6 space-y-5">
      <SectionHeader
        title="训练项目管理"
        desc="支持按训练项目进行训练管理，支持训练项目的生命周期管理，以及训练项目的资源配合、成员配置等"
        action={
          <div className="flex items-center gap-2">
            <GhostBtn icon={Download}>导出</GhostBtn>
            <OrangeBtn icon={Plus} onClick={() => setAddModal(true)}>新建项目</OrangeBtn>
          </div>
        }
      />

      <InfoBox title="功能说明" items={[
        '支持按训练项目进行训练管理，支持训练项目的生命周期管理，以及训练项目的资源配合、成员配置等。',
        '支持配置化将训练后的权重文件下发至不同省公司。',
      ]} />

      <div className="grid grid-cols-4 gap-3">
        <StatCard label="项目总数" value={String(projects.length)} icon={FolderOpen} color={ORANGE} />
        <StatCard label="运行中" value="1" icon={Activity} color="#3b82f6" />
        <StatCard label="已暂停" value="1" icon={Pause} color="#d97706" />
        <StatCard label="待启动" value="1" icon={Clock} color="#64748b" />
      </div>

      {/* Project cards */}
      <div className="space-y-3">
        {projects.map((proj) => {
          const cfg = statusCfg[proj.status];
          const taskPct = Math.round((proj.completedTasks / proj.tasks) * 100);
          const isExpanded = expandedProject === proj.id;

          return (
            <div key={proj.id} className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #f1ede9' }}>
              {/* Header */}
              <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedProject(isExpanded ? null : proj.id)}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${proj.status === 'running' ? '#3b82f6' : proj.status === 'paused' ? '#d97706' : '#94a3b8'}15` }}>
                    <FolderOpen className="w-5 h-5" style={{ color: proj.status === 'running' ? '#3b82f6' : proj.status === 'paused' ? '#d97706' : '#94a3b8' }} />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>{proj.name}</span>
                      <span className="px-2 py-0.5 rounded-full" style={{ fontSize: '10px', background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                      <span className="px-2 py-0.5 rounded-full" style={{
                        fontSize: '10px',
                        background: proj.priority === '高' ? '#fee2e2' : '#fef3c7',
                        color: proj.priority === '高' ? '#dc2626' : '#d97706',
                      }}>{proj.priority}优先级</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{proj.desc}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-center">
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b' }}>{proj.tasks}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>训练任务</div>
                  </div>
                  <div className="text-center">
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b' }}>{proj.members}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>成员</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: '#f1f5f9' }}>
                        <div className="h-full rounded-full" style={{ width: `${taskPct}%`, background: ORANGE }} />
                      </div>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>{taskPct}%</span>
                    </div>
                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>完成 {proj.completedTasks}/{proj.tasks}</div>
                  </div>
                  {isExpanded
                    ? <ChevronDown className="w-4 h-4" style={{ color: '#94a3b8' }} />
                    : <ChevronRight className="w-4 h-4" style={{ color: '#94a3b8' }} />}
                </div>
              </button>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="px-5 pb-5" style={{ borderTop: '1px solid #f1f5f9' }}>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {/* Project info */}
                    <div className="rounded-xl p-4" style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}>项目信息</div>
                      {[
                        { label: '项目编号', value: proj.id },
                        { label: '负责人', value: proj.leader },
                        { label: 'GPU 资源', value: proj.gpu },
                        { label: '创建时间', value: proj.created },
                        { label: '截止时间', value: proj.deadline },
                      ].map((row) => (
                        <div key={row.label} className="flex items-center justify-between mb-2">
                          <span style={{ fontSize: '11px', color: '#94a3b8' }}>{row.label}</span>
                          <span style={{ fontSize: '12px', color: '#374151', fontWeight: 500 }}>{row.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Member config */}
                    <div className="rounded-xl p-4" style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                      <div className="flex items-center justify-between mb-3">
                        <span style={{ fontSize: '12px', fontWeight: 600, color: '#374151' }}>成员配置</span>
                        <button className="flex items-center gap-1" style={{ fontSize: '11px', color: ORANGE }}>
                          <PlusCircle className="w-3 h-3" /> 添加
                        </button>
                      </div>
                      {['张明 (负责人)', '李华 (研究员)', '王芳 (研究员)', '陈磊 (工程师)', '赵思 (工程师)'].slice(0, proj.members).map((m) => (
                        <div key={m} className="flex items-center justify-between py-1.5">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white"
                              style={{ fontSize: '10px', fontWeight: 700, background: ORANGE }}>
                              {m[0]}
                            </div>
                            <span style={{ fontSize: '12px', color: '#374151' }}>{m}</span>
                          </div>
                          <button style={{ fontSize: '10px', color: '#94a3b8' }}>移除</button>
                        </div>
                      ))}
                    </div>

                    {/* Weight distribution — key feature */}
                    <div className="rounded-xl p-4" style={{ background: '#fff7ed', border: '1px solid #fed7aa' }}>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div style={{ fontSize: '12px', fontWeight: 700, color: '#c2410c' }}>权重文件下发配置</div>
                          <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>训练后自动下发至省公司</div>
                        </div>
                        <button onClick={() => setDistributeModal(proj.id)}
                          className="flex items-center gap-1 px-2 py-1 rounded-lg text-white"
                          style={{ fontSize: '11px', background: ORANGE }}>
                          <Settings2 className="w-3 h-3" /> 配置
                        </button>
                      </div>
                      <div className="space-y-1.5">
                        {proj.province.map((p) => (
                          <div key={p} className="flex items-center gap-2 px-2 py-1.5 rounded-lg"
                            style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid #fde68a' }}>
                            <MapPin className="w-3 h-3 shrink-0" style={{ color: ORANGE }} />
                            <span style={{ fontSize: '12px', color: '#7c3d15' }}>{p}</span>
                            <CheckCircle className="w-3 h-3 ml-auto" style={{ color: '#16a34a' }} />
                          </div>
                        ))}
                        <button className="w-full flex items-center justify-center gap-1 py-1.5 rounded-lg transition-colors hover:bg-orange-100"
                          style={{ fontSize: '11px', color: ORANGE, border: '1px dashed #fed7aa', background: 'transparent', marginTop: '4px' }}>
                          <Plus className="w-3 h-3" /> 添加省公司
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <OrangeBtn icon={Plus} sm>新建训练任务</OrangeBtn>
                    <GhostBtn icon={Users}>成员管理</GhostBtn>
                    <GhostBtn icon={HardDrive}>资源配置</GhostBtn>
                    {proj.status === 'running' && <GhostBtn icon={Pause}>暂停项目</GhostBtn>}
                    {proj.status === 'paused' && <GhostBtn icon={Play}>恢复项目</GhostBtn>}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Distribute Modal */}
      {distributeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.3)' }}
          onClick={() => setDistributeModal(null)}>
          <div className="bg-white rounded-2xl p-6 w-[440px] shadow-2xl" onClick={(e) => e.stopPropagation()}
            style={{ border: '1px solid #f1ede9' }}>
            <div className="flex items-center justify-between mb-5">
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>权重文件下发配置</span>
              <button onClick={() => setDistributeModal(null)} style={{ color: '#94a3b8' }}><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3 mb-4">
              {['广东省公司', '浙江省公司', '上海省公司', '北京省公司', '江苏省公司', '天津省公司'].map((p, i) => (
                <label key={p} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-orange-50 transition-colors"
                  style={{ border: '1px solid #f1f5f9' }}>
                  <input type="checkbox" defaultChecked={i < 3} className="rounded"
                    style={{ accentColor: ORANGE }} />
                  <MapPin className="w-3.5 h-3.5" style={{ color: ORANGE }} />
                  <span style={{ fontSize: '13px', color: '#374151' }}>{p}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDistributeModal(null)} className="flex-1 py-2 rounded-xl border hover:bg-gray-50"
                style={{ fontSize: '13px', color: '#64748b', borderColor: '#e2e8f0' }}>取消</button>
              <button onClick={() => setDistributeModal(null)} className="flex-1 py-2 rounded-xl text-white"
                style={{ fontSize: '13px', fontWeight: 600, background: `linear-gradient(135deg,${ORANGE},#ff7a45)` }}>保存配置</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Panel 3: 训练任务管理 ────────────────────────────────────────────────────
function TaskMgmt() {
  const [selectedJob, setSelectedJob] = useState(trainingTasks[0]);

  const taskStatusCfg: Record<string, { label: string; color: string; bg: string }> = {
    running: { label: '运行中', color: '#3b82f6', bg: '#eff6ff' },
    success: { label: '已完成', color: '#16a34a', bg: '#dcfce7' },
    failed:  { label: '失败',   color: '#dc2626', bg: '#fee2e2' },
    queued:  { label: '排队中', color: '#64748b', bg: '#f1f5f9' },
  };

  const lossData = [
    { step: 100, loss: 2.1 }, { step: 200, loss: 1.6 }, { step: 300, loss: 1.2 },
    { step: 400, loss: 0.95 }, { step: 500, loss: 0.78 }, { step: 600, loss: 0.65 },
    { step: 700, loss: 0.55 }, { step: 800, loss: 0.48 }, { step: 900, loss: 0.44 }, { step: 1000, loss: 0.42 },
  ];

  return (
    <div className="p-6 space-y-5">
      <SectionHeader
        title="训练任务管理"
        desc="支持按训练项目进行训练管理，支持训练项目的生命周期管理，以及训练项目的资源配合、成员配置等"
        action={<OrangeBtn icon={Plus}>新建训练任务</OrangeBtn>}
      />

      <InfoBox title="功能说明" items={[
        '支持配置化将训练后的权重文件下发至不同省公司。',
        '支持训练任务的全生命周期管理（创建→排队→运行→完成/失败）。',
        '支持训练过程 Loss 实时可视化监控。',
      ]} />

      <div className="grid grid-cols-4 gap-3">
        <StatCard label="任务总数" value={String(trainingTasks.length)} icon={Activity} color={ORANGE} />
        <StatCard label="运行中" value="1" icon={Play} color="#3b82f6" />
        <StatCard label="已完成" value="1" icon={CheckCircle} color="#16a34a" />
        <StatCard label="失败" value="1" icon={AlertTriangle} color="#dc2626" />
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Task list */}
        <div className="space-y-2">
          {trainingTasks.map((job) => {
            const cfg = taskStatusCfg[job.status];
            return (
              <div key={job.id} onClick={() => setSelectedJob(job)}
                className="p-3 rounded-xl cursor-pointer transition-all"
                style={{
                  border: `1.5px solid ${selectedJob.id === job.id ? ORANGE : 'transparent'}`,
                  background: selectedJob.id === job.id ? '#fff7ed' : '#fff',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}>
                <div className="flex items-center justify-between mb-1">
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#1e293b' }}>{job.name}</span>
                  <span className="px-1.5 py-0.5 rounded-full" style={{ fontSize: '10px', background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>{job.project}</div>
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded" style={{ fontSize: '10px', background: '#f5f3ff', color: '#7c3aed' }}>{job.method}</span>
                  <span style={{ fontSize: '10px', color: '#94a3b8' }}>{job.model}</span>
                </div>
                {job.status === 'running' && (
                  <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: '#f1f5f9' }}>
                    <div className="h-full rounded-full" style={{ width: `${job.progress}%`, background: `linear-gradient(90deg,${ORANGE},#ff7a45)` }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Detail panel */}
        <div className="col-span-2 space-y-4">
          <div className="bg-white rounded-xl p-4" style={{ border: '1px solid #f1ede9' }}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>{selectedJob.name}</span>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                  {selectedJob.id} · {selectedJob.project}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1" style={{ fontSize: '12px', color: '#64748b' }}>
                  <Cpu className="w-3.5 h-3.5" /> {selectedJob.gpu}
                </span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>创建: {selectedJob.creator}</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: '训练进度', value: `${selectedJob.progress}%`, color: ORANGE },
                { label: '当前 Epoch', value: selectedJob.epoch, color: '#3b82f6' },
                { label: '训练 Loss', value: selectedJob.loss, color: '#8b5cf6' },
                { label: '预计剩余', value: selectedJob.eta, color: '#0d9488' },
              ].map((s) => (
                <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: `${s.color}08`, border: `1px solid ${s.color}15` }}>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>{s.label}</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Loss chart */}
          <div className="bg-white rounded-xl p-4" style={{ border: '1px solid #f1ede9' }}>
            <div className="flex items-center justify-between mb-3">
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Loss 收敛曲线</span>
              <button className="flex items-center gap-1" style={{ fontSize: '11px', color: '#64748b' }}>
                <RefreshCw className="w-3 h-3" /> 刷新
              </button>
            </div>
            <div style={{ height: 150 }}>
              {/* Simple SVG loss curve */}
              <svg width="100%" height="150" viewBox="0 0 400 150">
                <defs>
                  <linearGradient id="lossGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={ORANGE} stopOpacity="0.2" />
                    <stop offset="100%" stopColor={ORANGE} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,20 C30,22 50,40 80,55 C110,70 130,85 160,100 C190,115 220,125 260,130 C300,135 340,137 400,138"
                  fill="url(#lossGrad)" stroke="none" />
                <path d="M0,20 C30,22 50,40 80,55 C110,70 130,85 160,100 C190,115 220,125 260,130 C300,135 340,137 400,138"
                  fill="none" stroke={ORANGE} strokeWidth="2.5" strokeLinecap="round" />
                {[0, 80, 160, 260, 400].map((x, i) => {
                  const ys = [20, 55, 100, 130, 138];
                  return <circle key={i} cx={x} cy={ys[i]} r="3" fill={ORANGE} />;
                })}
                {[0.42, 0.65, 0.95, 1.6, 2.1].reverse().map((v, i) => {
                  const xs = [0, 80, 160, 260, 400];
                  const ys = [20, 55, 100, 130, 138];
                  return (
                    <text key={i} x={xs[i] + 4} y={ys[i] - 6} fontSize="9" fill="#94a3b8">{v}</text>
                  );
                })}
                <line x1="0" y1="145" x2="400" y2="145" stroke="#f1f5f9" strokeWidth="1" />
                {[0, 100, 200, 300, 400].map((x, i) => (
                  <text key={i} x={x} y="150" fontSize="9" fill="#94a3b8" textAnchor="middle">{i * 250}</text>
                ))}
              </svg>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <OrangeBtn icon={Eye}>查看日志</OrangeBtn>
            <GhostBtn icon={Download}>下载权重</GhostBtn>
            <GhostBtn icon={Copy}>复制任务</GhostBtn>
            {selectedJob.status === 'running' && <GhostBtn icon={Pause}>暂停任务</GhostBtn>}
            {selectedJob.status === 'failed' && <OrangeBtn icon={RefreshCw}>重新运行</OrangeBtn>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Route Component ──────────────────────────────────────────────────────────
const contentMap: Record<string, React.ReactNode> = {
  'component-mgmt': <ComponentMgmt />,
  'project-mgmt': <ProjectMgmt />,
  'task-mgmt': <TaskMgmt />,
};

export function AITraining() {
  const [activeKey, setActiveKey] = useState('component-mgmt');
  return (
    <SidebarLayout title="AI 训练" items={sidebarItems} activeKey={activeKey} onSelect={setActiveKey}>
      {contentMap[activeKey]}
    </SidebarLayout>
  );
}
