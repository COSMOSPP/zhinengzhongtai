import React, { useState } from 'react';
import { SidebarLayout, SidebarItem } from '../components/SidebarLayout';
import {
  Database, Tag, Plus, Upload, Search, RefreshCw,
  CheckCircle, AlertTriangle, Play, Pause, Settings2,
  FileText, Image, AlignLeft, Layers, Eye, Download,
  Users, Clock, Filter, Trash2, Edit3, MoreHorizontal,
  Zap, Brain, ChevronDown, ChevronRight, ToggleLeft,
  ToggleRight, Copy, PlusCircle, X, ArrowUp, ArrowDown,
  FolderOpen, GitBranch, Archive, Package,
} from 'lucide-react';

const ORANGE = '#fa541c';

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const sidebarItems: SidebarItem[] = [
  {
    key: 'ann-mgmt',
    label: '标注管理',
    icon: Database,
    children: [
      { key: 'dataset-mgmt', label: '数据集管理', icon: Database },
      { key: 'task-mgmt', label: '标注任务管理', icon: Tag },
      { key: 'label-mgmt', label: '标注标签管理', icon: Package },
    ],
  },
  {
    key: 'ann-tools',
    label: '标注工具',
    icon: Tag,
    children: [
      { key: 'auto-ann', label: '自动标注', icon: Brain },
    ],
  },
];

// ─── Mock data ─────────────────────────────────────────────────────────────────
const datasets = [
  {
    id: 1, name: '商品图像分类数据集-v2', type: '图像分类', size: '12.4 GB', version: 'v2.0',
    count: 10000, annotated: 7842, status: 'active', creator: '张明', created: '2026-03-15',
    tags: ['图像', '电商', '分类'], team: '视觉组',
  },
  {
    id: 2, name: '用户评论情感语料库', type: '文本分类', size: '2.1 GB', version: 'v1.3',
    count: 50000, annotated: 50000, status: 'completed', creator: '李华', created: '2026-03-08',
    tags: ['文本', 'NLP', '情感'], team: 'NLP组',
  },
  {
    id: 3, name: '医疗目标检测数据集', type: '目标检测', size: '28.6 GB', version: 'v1.0',
    count: 5000, annotated: 1200, status: 'paused', creator: '王芳', created: '2026-02-20',
    tags: ['图像', '医疗', '检测'], team: '医疗AI组',
  },
  {
    id: 4, name: '医疗报告 NER 语料', type: '命名实体识别', size: '1.3 GB', version: 'v1.0',
    count: 8000, annotated: 0, status: 'pending', creator: '陈磊', created: '2026-04-01',
    tags: ['文本', '医疗', 'NER'], team: 'NLP组',
  },
  {
    id: 5, name: '自动驾驶语义分割集', type: '语义分割', size: '45.2 GB', version: 'v1.1',
    count: 3200, annotated: 960, status: 'active', creator: '赵思', created: '2026-03-28',
    tags: ['图像', '自动驾驶'], team: '感知组',
  },
];

const annTasks = [
  { id: 'T001', name: '商品图像批次标注#1', dataset: '商品图像分类数据集-v2', type: '图像分类', assignType: '手工', assignee: '张明', total: 1000, done: 760, deadline: '2026-04-15', status: 'running', priority: '高' },
  { id: 'T002', name: '情感分类全量标注', dataset: '用户评论情感语料库', type: '文本分类', assignType: '智能', assignee: '系统分配', total: 5000, done: 5000, deadline: '2026-04-05', status: 'done', priority: '中' },
  { id: 'T003', name: '医疗影像检测标注', dataset: '医疗目标检测数据集', type: '目标检测', assignType: '手工', assignee: '王芳', total: 500, done: 120, deadline: '2026-04-20', status: 'paused', priority: '高' },
  { id: 'T004', name: 'NER 医疗报告标注', dataset: '医疗报告 NER 语料', type: '命名实体识别', assignType: '智能', assignee: '系统分配', total: 800, done: 0, deadline: '2026-04-30', status: 'pending', priority: '低' },
];

const labelGroups = [
  {
    id: 1, name: '情感分类标签组', type: '文本分类', count: 3,
    labels: [
      { name: '正面', color: '#16a34a', shortcut: '1', count: 18420 },
      { name: '负面', color: '#dc2626', shortcut: '2', count: 22310 },
      { name: '中性', color: '#64748b', shortcut: '3', count: 9270 },
    ],
  },
  {
    id: 2, name: '商品图像分类标签组', type: '图像分类', count: 5,
    labels: [
      { name: '服装', color: '#3b82f6', shortcut: '1', count: 2100 },
      { name: '电器', color: '#8b5cf6', shortcut: '2', count: 1850 },
      { name: '食品', color: '#f59e0b', shortcut: '3', count: 1640 },
      { name: '家具', color: '#0d9488', shortcut: '4', count: 1380 },
      { name: '其他', color: '#94a3b8', shortcut: '5', count: 872 },
    ],
  },
  {
    id: 3, name: '医疗NER标签组', type: '序列标注', count: 5,
    labels: [
      { name: 'PER 人名', color: '#3b82f6', shortcut: 'P', count: 0 },
      { name: 'ORG 机构', color: '#8b5cf6', shortcut: 'O', count: 0 },
      { name: 'DIS 疾病', color: '#dc2626', shortcut: 'D', count: 0 },
      { name: 'MED 药物', color: '#d97706', shortcut: 'M', count: 0 },
      { name: 'LOC 地点', color: '#0d9488', shortcut: 'L', count: 0 },
    ],
  },
];

const autoAnnModels = [
  { id: 1, name: 'CLIP-ViT-L/14', type: '图像分类', provider: 'OpenAI', status: 'online', accuracy: '94.2%', speed: '120 张/s', pluggable: true },
  { id: 2, name: 'YOLOv8-nano', type: '目标检测', provider: 'Ultralytics', status: 'online', accuracy: '87.6%', speed: '85 张/s', pluggable: true },
  { id: 3, name: 'BERT-NER-zh', type: '命名实体识别', provider: '本地部署', status: 'online', accuracy: '91.3%', speed: '600 条/s', pluggable: true },
  { id: 4, name: 'GPT-4o-mini', type: '文本分类', provider: 'OpenAI', status: 'offline', accuracy: '96.8%', speed: '200 条/s', pluggable: false },
];

const cotTasks = [
  { id: 1, input: '患者主诉头痛、发热三天，体温38.5℃', steps: ['识别症状：头痛、发热', '判断严重程度：中度发热', '推断诊断方向：感染性疾病'], output: '建议进一步检查血常规及体温监测', enabled: true },
  { id: 2, input: '商品评论：发货很快，质量也不错，下次还会买', steps: ['分析情感词：快(正)、不错(正)', '排除负面信号：无', '综合判断：正面情感'], output: '正面', enabled: false },
];

const statusCfg: Record<string, { label: string; color: string; bg: string }> = {
  active:    { label: '标注中', color: '#fa541c', bg: '#fff7ed' },
  completed: { label: '已完成', color: '#16a34a', bg: '#dcfce7' },
  paused:    { label: '已暂停', color: '#d97706', bg: '#fef3c7' },
  pending:   { label: '待启动', color: '#64748b', bg: '#f1f5f9' },
  running:   { label: '进行中', color: '#3b82f6', bg: '#eff6ff' },
  done:      { label: '已完成', color: '#16a34a', bg: '#dcfce7' },
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
    <div className="rounded-xl p-4" style={{ background: '#fff7ed', border: '1px solid #fed7aa' }}>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1 h-3.5 rounded-full" style={{ background: ORANGE }} />
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#c2410c' }}>{title}</span>
      </div>
      <ul className="space-y-1.5 pl-3">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2" style={{ fontSize: '12px', color: '#7c3d15' }}>
            <span style={{ color: ORANGE, marginTop: '2px', flexShrink: 0 }}>·</span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Panel 1: 数据集管理 ──────────────────────────────────────────────────────
function DatasetMgmt() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showVersionModal, setShowVersionModal] = useState<number | null>(null);

  const filterLabels: Record<string, string> = { all: '全部', active: '标注中', completed: '已完成', paused: '已暂停', pending: '待启动' };
  const filtered = datasets.filter((d) => {
    const ms = d.name.includes(search) || d.type.includes(search) || d.team.includes(search);
    const mf = activeFilter === 'all' || d.status === activeFilter;
    return ms && mf;
  });

  return (
    <div className="p-6 space-y-5">
      <SectionHeader
        title="数据集管理"
        desc="支持数据集的导入导出、生命周期管理、版本管理及训练代码高效存储管理"
        action={
          <div className="flex items-center gap-2">
            <GhostBtn icon={Download}>导出</GhostBtn>
            <GhostBtn icon={Upload}>导入数据集</GhostBtn>
            <OrangeBtn icon={Plus}>新建数据集</OrangeBtn>
          </div>
        }
      />

      <InfoBox title="功能说明" items={[
        '支持团队间数据集隔离管理功能',
        '支持数据集版本管理，可追溯历史版本',
        '支持训练代码以及其他 AI 数据的高效存储管理',
      ]} />

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        <StatCard label="数据集总数" value={String(datasets.length)} icon={Database} color={ORANGE} />
        <StatCard label="标注中" value="2" icon={Tag} color="#3b82f6" />
        <StatCard label="已完成" value="1" icon={CheckCircle} color="#16a34a" />
        <StatCard label="总数据量" value="99.6K" icon={Layers} color="#8b5cf6" />
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: '#94a3b8' }} />
          <input placeholder="搜索数据集名称、类型、团队…" value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg pl-8 pr-3 py-1.5 focus:outline-none bg-white"
            style={{ fontSize: '12px', border: '1px solid #e2e8f0', width: '220px' }}
            onFocus={(e) => (e.target.style.borderColor = ORANGE)}
            onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')} />
        </div>
        <div className="flex items-center gap-1 bg-white rounded-lg p-1" style={{ border: '1px solid #e2e8f0' }}>
          {Object.keys(filterLabels).map((f) => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className="px-3 py-1 rounded-md transition-all"
              style={{ fontSize: '12px', background: activeFilter === f ? ORANGE : 'transparent', color: activeFilter === f ? '#fff' : '#64748b' }}>
              {filterLabels[f]}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #f1ede9' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#faf7f5', borderBottom: '1px solid #f1ede9' }}>
              {['数据集名称', '类型', '归属团队', '版本', '数据量', '标注进度', '大小', '状态', '操作'].map((h) => (
                <th key={h} className="text-left px-4 py-2.5" style={{ fontSize: '12px', fontWeight: 500, color: '#64748b' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((ds) => {
              const pct = Math.round((ds.annotated / ds.count) * 100);
              const cfg = statusCfg[ds.status];
              return (
                <tr key={ds.id} style={{ borderBottom: '1px solid #f8f8f8' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#fff7f5')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#fff7ed' }}>
                        {ds.type.includes('图像') || ds.type.includes('检测') || ds.type.includes('分割')
                          ? <Image className="w-3.5 h-3.5" style={{ color: ORANGE }} />
                          : <AlignLeft className="w-3.5 h-3.5" style={{ color: ORANGE }} />}
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>{ds.name}</div>
                        <div className="flex gap-1 mt-0.5">
                          {ds.tags.slice(0, 2).map((t) => (
                            <span key={t} className="px-1.5 py-0.5 rounded" style={{ fontSize: '10px', background: '#f1f5f9', color: '#64748b' }}>{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3" style={{ fontSize: '12px', color: '#475569' }}>{ds.type}</td>
                  <td className="px-4 py-3" style={{ fontSize: '12px', color: '#64748b' }}>{ds.team}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => setShowVersionModal(ds.id)}
                      className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-orange-50 transition-colors"
                      style={{ fontSize: '11px', color: ORANGE, border: `1px solid ${ORANGE}30` }}>
                      <GitBranch className="w-3 h-3" />{ds.version}
                    </button>
                  </td>
                  <td className="px-4 py-3" style={{ fontSize: '12px', color: '#374151' }}>{ds.count.toLocaleString()} 条</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: '#f1f5f9' }}>
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: pct === 100 ? '#16a34a' : ORANGE }} />
                      </div>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>{pct}%</span>
                    </div>
                    <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '1px' }}>{ds.annotated.toLocaleString()}/{ds.count.toLocaleString()}</div>
                  </td>
                  <td className="px-4 py-3" style={{ fontSize: '12px', color: '#64748b' }}>{ds.size}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full" style={{ fontSize: '11px', background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button style={{ fontSize: '12px', color: ORANGE }} className="hover:underline">标注</button>
                      <button style={{ fontSize: '12px', color: '#64748b' }}>详情</button>
                      <button style={{ fontSize: '12px', color: '#ef4444' }}>删除</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Version modal */}
      {showVersionModal !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.3)' }}
          onClick={() => setShowVersionModal(null)}>
          <div className="bg-white rounded-2xl p-6 w-96 shadow-2xl" onClick={(e) => e.stopPropagation()}
            style={{ border: '1px solid #f1ede9' }}>
            <div className="flex items-center justify-between mb-4">
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>版本历史</span>
              <button onClick={() => setShowVersionModal(null)} style={{ color: '#94a3b8' }}><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-2">
              {['v2.0 (当前)', 'v1.5', 'v1.3', 'v1.0'].map((v, i) => (
                <div key={v} className="flex items-center justify-between p-3 rounded-xl"
                  style={{ background: i === 0 ? '#fff7ed' : '#f8fafc', border: `1px solid ${i === 0 ? '#fed7aa' : '#e2e8f0'}` }}>
                  <div className="flex items-center gap-2">
                    <Archive className="w-3.5 h-3.5" style={{ color: i === 0 ? ORANGE : '#94a3b8' }} />
                    <span style={{ fontSize: '13px', fontWeight: i === 0 ? 600 : 400, color: i === 0 ? ORANGE : '#374151' }}>{v}</span>
                  </div>
                  {i !== 0 && <button style={{ fontSize: '11px', color: '#64748b' }} className="hover:text-orange-500">回滚</button>}
                  {i === 0 && <span className="px-2 py-0.5 rounded-full" style={{ fontSize: '10px', background: '#fff7ed', color: ORANGE }}>当前</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Panel 2: 标注任务管理 ────────────────────────────────────────────────────
function TaskMgmt() {
  const [assignModal, setAssignModal] = useState(false);
  const [assignType, setAssignType] = useState<'manual' | 'smart'>('manual');

  return (
    <div className="p-6 space-y-5">
      <SectionHeader
        title="标注任务管理"
        desc="支持标注任务的生命周期管理，支持手工、智能等不同方式分配标注任务"
        action={
          <div className="flex items-center gap-2">
            <GhostBtn icon={Filter}>筛选</GhostBtn>
            <OrangeBtn icon={Plus} onClick={() => setAssignModal(true)}>新建任务</OrangeBtn>
          </div>
        }
      />

      <InfoBox title="功能说明" items={[
        '支持标注任务的生命周期管理（创建→分配→标注→审核→完成）',
        '支持手工分配：由管理员指定标注员',
        '支持智能分配：系统按负载、技能自动分配任务',
        '支持文本分类标注场景的内容内换行符的识别功能，增加用户的可阅读性',
      ]} />

      <div className="grid grid-cols-4 gap-3">
        <StatCard label="任务总数" value={String(annTasks.length)} icon={Tag} color={ORANGE} />
        <StatCard label="进行中" value="1" icon={Play} color="#3b82f6" />
        <StatCard label="已完成" value="1" icon={CheckCircle} color="#16a34a" />
        <StatCard label="待启动" value="1" icon={Clock} color="#94a3b8" />
      </div>

      <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #f1ede9' }}>
        <div className="px-4 py-3 flex items-center justify-between" style={{ background: '#faf7f5', borderBottom: '1px solid #f1ede9' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>任务列表</span>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: '#94a3b8' }} />
            <input placeholder="搜索任务…" className="rounded-lg pl-8 pr-3 py-1 bg-white focus:outline-none"
              style={{ fontSize: '12px', border: '1px solid #e2e8f0', width: '180px' }}
              onFocus={(e) => (e.target.style.borderColor = ORANGE)}
              onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')} />
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#fafafa', borderBottom: '1px solid #f1f5f9' }}>
              {['任务ID', '任务名称', '数据集', '类型', '分配方式', '负责人', '进度', '截止日期', '优先级', '状态', '操作'].map((h) => (
                <th key={h} className="text-left px-3 py-2.5" style={{ fontSize: '11px', fontWeight: 500, color: '#64748b' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {annTasks.map((t) => {
              const pct = Math.round((t.done / t.total) * 100);
              const cfg = statusCfg[t.status];
              return (
                <tr key={t.id} style={{ borderBottom: '1px solid #f8f8f8' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#fff7f5')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                  <td className="px-3 py-3 font-mono" style={{ fontSize: '11px', color: '#94a3b8' }}>{t.id}</td>
                  <td className="px-3 py-3" style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>{t.name}</td>
                  <td className="px-3 py-3" style={{ fontSize: '11px', color: '#64748b', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.dataset}</td>
                  <td className="px-3 py-3">
                    <span className="px-2 py-0.5 rounded" style={{ fontSize: '10px', background: '#f1f5f9', color: '#475569' }}>{t.type}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="px-2 py-0.5 rounded-full" style={{ fontSize: '10px', background: t.assignType === '智能' ? '#f5f3ff' : '#eff6ff', color: t.assignType === '智能' ? '#7c3aed' : '#3b82f6' }}>
                      {t.assignType === '智能' ? '🤖 智能' : '👤 手工'}
                    </span>
                  </td>
                  <td className="px-3 py-3" style={{ fontSize: '12px', color: '#374151' }}>{t.assignee}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-14 h-1.5 rounded-full overflow-hidden" style={{ background: '#f1f5f9' }}>
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: pct === 100 ? '#16a34a' : ORANGE }} />
                      </div>
                      <span style={{ fontSize: '10px', color: '#64748b' }}>{pct}%</span>
                    </div>
                  </td>
                  <td className="px-3 py-3" style={{ fontSize: '11px', color: '#94a3b8' }}>{t.deadline}</td>
                  <td className="px-3 py-3">
                    <span className="px-2 py-0.5 rounded-full" style={{ fontSize: '10px', background: t.priority === '高' ? '#fee2e2' : t.priority === '中' ? '#fef3c7' : '#f1f5f9', color: t.priority === '高' ? '#dc2626' : t.priority === '中' ? '#d97706' : '#64748b' }}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="px-2 py-0.5 rounded-full" style={{ fontSize: '10px', background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1.5">
                      {t.status === 'running' && <button className="p-1 rounded hover:bg-amber-50" style={{ color: '#d97706' }}><Pause className="w-3.5 h-3.5" /></button>}
                      {t.status === 'paused' && <button className="p-1 rounded hover:bg-orange-50" style={{ color: ORANGE }}><Play className="w-3.5 h-3.5" /></button>}
                      <button style={{ fontSize: '11px', color: ORANGE }} className="hover:underline">标注</button>
                      <button style={{ fontSize: '11px', color: '#64748b' }}>详情</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* New Task Modal */}
      {assignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.3)' }}
          onClick={() => setAssignModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-[480px] shadow-2xl" onClick={(e) => e.stopPropagation()}
            style={{ border: '1px solid #f1ede9' }}>
            <div className="flex items-center justify-between mb-5">
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>新建标注任务</span>
              <button onClick={() => setAssignModal(false)} style={{ color: '#94a3b8' }}><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              {[
                { label: '任务名称', placeholder: '请输入任务名称' },
                { label: '关联数据集', placeholder: '选择数据集' },
              ].map((f) => (
                <div key={f.label}>
                  <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '6px' }}>{f.label} <span style={{ color: ORANGE }}>*</span></label>
                  <input placeholder={f.placeholder} className="w-full rounded-lg px-3 py-2 focus:outline-none"
                    style={{ fontSize: '12px', border: '1px solid #e2e8f0', background: '#f8fafc' }}
                    onFocus={(e) => (e.target.style.borderColor = ORANGE)}
                    onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '6px' }}>分配方式</label>
                <div className="flex gap-3">
                  {(['manual', 'smart'] as const).map((v) => (
                    <button key={v} onClick={() => setAssignType(v)}
                      className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all"
                      style={{ border: `1.5px solid ${assignType === v ? ORANGE : '#e2e8f0'}`, background: assignType === v ? '#fff7ed' : '#f8fafc' }}>
                      <span style={{ fontSize: '18px' }}>{v === 'manual' ? '👤' : '🤖'}</span>
                      <div className="text-left">
                        <div style={{ fontSize: '13px', fontWeight: 600, color: assignType === v ? ORANGE : '#374151' }}>{v === 'manual' ? '手工分配' : '智能分配'}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>{v === 'manual' ? '管理员指定标注员' : '系统自动按负载分配'}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button onClick={() => setAssignModal(false)} className="flex-1 py-2 rounded-xl border hover:bg-gray-50 transition-all"
                  style={{ fontSize: '13px', color: '#64748b', borderColor: '#e2e8f0' }}>取消</button>
                <button onClick={() => setAssignModal(false)} className="flex-1 py-2 rounded-xl text-white"
                  style={{ fontSize: '13px', fontWeight: 600, background: `linear-gradient(135deg,${ORANGE},#ff7a45)` }}>确认创建</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Panel 3: 标注标签管理 ────────────────────────────────────────────────────
function LabelMgmt() {
  const [showImportModal, setShowImportModal] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<number | null>(1);
  const [newGroupModal, setNewGroupModal] = useState(false);

  return (
    <div className="p-6 space-y-5">
      <SectionHeader
        title="标注标签管理"
        desc="支持标注标签的增删改查，标签组合，标注模板组合等管理"
        action={
          <div className="flex items-center gap-2">
            <GhostBtn icon={Upload} onClick={() => setShowImportModal(true)}>批量导入</GhostBtn>
            <OrangeBtn icon={Plus} onClick={() => setNewGroupModal(true)}>新建标签组</OrangeBtn>
          </div>
        }
      />

      <InfoBox title="功能说明" items={[
        '支持标注标签的增删改查',
        '支持标签组合管理，可将多个标签归入同一标签组',
        '支持标注模板组合管理',
        '支持标签模板的批量导入功能，以实现标签的快速添加',
      ]} />

      <div className="grid grid-cols-4 gap-3">
        <StatCard label="标签组数" value={String(labelGroups.length)} icon={Package} color={ORANGE} />
        <StatCard label="标签总数" value="13" icon={Tag} color="#3b82f6" />
        <StatCard label="已使用" value="8" icon={CheckCircle} color="#16a34a" />
        <StatCard label="模板数" value="6" icon={FileText} color="#8b5cf6" />
      </div>

      {/* Label groups */}
      <div className="space-y-3">
        {labelGroups.map((group) => {
          const isExpanded = expandedGroup === group.id;
          return (
            <div key={group.id} className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #f1ede9' }}>
              <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedGroup(isExpanded ? null : group.id)}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#fff7ed' }}>
                    <Package className="w-4 h-4" style={{ color: ORANGE }} />
                  </div>
                  <div className="text-left">
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>{group.name}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{group.type} · {group.count} 个标签</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 rounded text-xs hover:bg-orange-50 transition-colors" style={{ color: ORANGE, fontSize: '11px' }}
                    onClick={(e) => { e.stopPropagation(); }}>编辑</button>
                  <button className="p-1 hover:bg-gray-100 rounded transition-colors" style={{ color: '#64748b' }}
                    onClick={(e) => { e.stopPropagation(); }}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  {isExpanded ? <ChevronDown className="w-4 h-4" style={{ color: '#94a3b8' }} />
                    : <ChevronRight className="w-4 h-4" style={{ color: '#94a3b8' }} />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4" style={{ borderTop: '1px solid #f1f5f9' }}>
                  <div className="flex items-center justify-between py-2 mb-2">
                    <span style={{ fontSize: '12px', color: '#64748b' }}>标签列表</span>
                    <button className="flex items-center gap-1" style={{ fontSize: '12px', color: ORANGE }}>
                      <PlusCircle className="w-3.5 h-3.5" /> 添加标签
                    </button>
                  </div>
                  <div className="space-y-2">
                    {group.labels.map((label, li) => (
                      <div key={label.name} className="flex items-center justify-between p-3 rounded-xl"
                        style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-sm shrink-0" style={{ background: label.color }} />
                          <span style={{ fontSize: '13px', fontWeight: 500, color: '#1e293b' }}>{label.name}</span>
                          <span className="px-2 py-0.5 rounded" style={{ fontSize: '10px', background: '#fff', color: '#64748b', border: '1px solid #e2e8f0' }}>
                            快捷键 {label.shortcut}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span style={{ fontSize: '12px', color: '#94a3b8' }}>{label.count.toLocaleString()} 条已标注</span>
                          <div className="flex items-center gap-1">
                            <button className="p-1 hover:bg-gray-100 rounded" style={{ color: '#64748b' }}><ArrowUp className="w-3 h-3" /></button>
                            <button className="p-1 hover:bg-gray-100 rounded" style={{ color: '#64748b' }}><ArrowDown className="w-3 h-3" /></button>
                            <button className="p-1 hover:bg-gray-100 rounded" style={{ color: '#64748b' }}><Edit3 className="w-3 h-3" /></button>
                            <button className="p-1 hover:bg-red-50 rounded" style={{ color: '#ef4444' }}><Trash2 className="w-3 h-3" /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Batch Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.3)' }}
          onClick={() => setShowImportModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-[440px] shadow-2xl" onClick={(e) => e.stopPropagation()}
            style={{ border: '1px solid #f1ede9' }}>
            <div className="flex items-center justify-between mb-5">
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>批量导入标签</span>
              <button onClick={() => setShowImportModal(false)} style={{ color: '#94a3b8' }}><X className="w-4 h-4" /></button>
            </div>
            <div className="p-4 rounded-xl text-center cursor-pointer hover:bg-orange-50 transition-colors"
              style={{ border: '2px dashed #fed7aa', background: '#fff7ed' }}>
              <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: ORANGE }} />
              <div style={{ fontSize: '13px', fontWeight: 500, color: '#c2410c' }}>点击或拖拽上传标签模板文件</div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>支持 .csv / .json / .xlsx 格式</div>
            </div>
            <div className="mt-4 p-3 rounded-xl" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '12px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>CSV 模板示例</div>
              <pre style={{ fontSize: '11px', color: '#64748b', lineHeight: 1.6 }}>{`标签名称,颜色,快捷键,分组
正面,#16a34a,1,情感分类
负面,#dc2626,2,情感分类`}</pre>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowImportModal(false)} className="flex-1 py-2 rounded-xl border hover:bg-gray-50"
                style={{ fontSize: '13px', color: '#64748b', borderColor: '#e2e8f0' }}>取消</button>
              <button className="flex-1 py-2 rounded-xl text-white"
                style={{ fontSize: '13px', fontWeight: 600, background: `linear-gradient(135deg,${ORANGE},#ff7a45)` }}>确认导入</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Panel 4: 自动标注 ────────────────────────────────────────────────────────
function AutoAnnotation() {
  const [cotEnabled, setCotEnabled] = useState(true);
  const [cotPrompt, setCotPrompt] = useState('请对以下内容进行逐步分析，给出推理步骤后再输出最终标签。');
  const [editingCot, setEditingCot] = useState(false);
  const [tasks, setTasks] = useState(cotTasks);
  const [selectedModel, setSelectedModel] = useState(autoAnnModels[0]);

  const removeStep = (taskId: number, stepIdx: number) => {
    setTasks((prev) => prev.map((t) => t.id === taskId
      ? { ...t, steps: t.steps.filter((_, i) => i !== stepIdx) }
      : t
    ));
  };

  const moveStep = (taskId: number, stepIdx: number, dir: 'up' | 'down') => {
    setTasks((prev) => prev.map((t) => {
      if (t.id !== taskId) return t;
      const steps = [...t.steps];
      const to = dir === 'up' ? stepIdx - 1 : stepIdx + 1;
      if (to < 0 || to >= steps.length) return t;
      [steps[stepIdx], steps[to]] = [steps[to], steps[stepIdx]];
      return { ...t, steps };
    }));
  };

  return (
    <div className="p-6 space-y-5">
      <SectionHeader
        title="自动标注"
        desc="通过 AI 算法模型对各类数据进行智能标注，支持 AI 标注模型的可插拔，提升标注效率"
        action={<OrangeBtn icon={Zap}>启动自动标注</OrangeBtn>}
      />

      <InfoBox title="功能说明" items={[
        '支持通过 AI 算法模型对各类数据进行智能标注',
        '支持 AI 标注模型的可插拔，以支持不断扩展的高性能模型',
        '支持思维链数据标注功能：提供思维链的开关、思维链提示词的修改编辑',
        '支持批量的思维链标注、思维链步骤的自由调整删除编辑等',
      ]} />

      {/* Model selection */}
      <div className="bg-white rounded-xl p-5" style={{ border: '1px solid #f1ede9' }}>
        <div className="flex items-center justify-between mb-4">
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>AI 标注模型（可插拔）</div>
          <OrangeBtn icon={PlusCircle} sm>接入新模型</OrangeBtn>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {autoAnnModels.map((m) => (
            <div key={m.id} onClick={() => m.status === 'online' && setSelectedModel(m)}
              className="p-4 rounded-xl transition-all cursor-pointer"
              style={{
                border: `1.5px solid ${selectedModel.id === m.id ? ORANGE : 'transparent'}`,
                background: selectedModel.id === m.id ? '#fff7ed' : '#f8fafc',
                opacity: m.status === 'offline' ? 0.6 : 1,
                cursor: m.status === 'offline' ? 'not-allowed' : 'pointer',
              }}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: selectedModel.id === m.id ? ORANGE : '#1e293b' }}>{m.name}</span>
                  {m.pluggable && (
                    <span className="ml-2 px-1.5 py-0.5 rounded" style={{ fontSize: '10px', background: '#eff6ff', color: '#3b82f6' }}>可插拔</span>
                  )}
                </div>
                <span className="px-2 py-0.5 rounded-full" style={{
                  fontSize: '10px',
                  background: m.status === 'online' ? '#dcfce7' : '#f1f5f9',
                  color: m.status === 'online' ? '#16a34a' : '#64748b',
                }}>
                  {m.status === 'online' ? '在线' : '离线'}
                </span>
              </div>
              <div className="flex items-center gap-3" style={{ fontSize: '11px', color: '#94a3b8' }}>
                <span>{m.type}</span><span>·</span>
                <span>准确率 {m.accuracy}</span><span>·</span>
                <span>{m.speed}</span>
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>提供方: {m.provider}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CoT settings */}
      <div className="bg-white rounded-xl p-5" style={{ border: '1px solid #f1ede9' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>思维链（Chain-of-Thought）标注</div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>逐步推理，提升复杂任务标注质量</div>
          </div>
          <button onClick={() => setCotEnabled(!cotEnabled)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all"
            style={{ fontSize: '12px', background: cotEnabled ? '#fff7ed' : '#f1f5f9', color: cotEnabled ? ORANGE : '#64748b', border: `1px solid ${cotEnabled ? '#fed7aa' : '#e2e8f0'}` }}>
            {cotEnabled ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
            {cotEnabled ? '已开启' : '已关闭'}
          </button>
        </div>

        {cotEnabled && (
          <div className="space-y-4">
            {/* Prompt editor */}
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #f1ede9' }}>
              <div className="flex items-center justify-between px-3 py-2" style={{ background: '#faf7f5', borderBottom: '1px solid #f1ede9' }}>
                <span style={{ fontSize: '12px', fontWeight: 500, color: '#374151' }}>思维链提示词</span>
                <button onClick={() => setEditingCot(!editingCot)}
                  className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-orange-50 transition-colors"
                  style={{ fontSize: '11px', color: ORANGE }}>
                  <Edit3 className="w-3 h-3" /> {editingCot ? '保存' : '编辑'}
                </button>
              </div>
              {editingCot ? (
                <textarea value={cotPrompt} onChange={(e) => setCotPrompt(e.target.value)}
                  className="w-full p-3 focus:outline-none resize-none"
                  style={{ fontSize: '12px', lineHeight: 1.7, minHeight: '80px', color: '#374151' }} />
              ) : (
                <div className="p-3" style={{ fontSize: '12px', lineHeight: 1.7, color: '#374151' }}>{cotPrompt}</div>
              )}
            </div>

            {/* CoT samples */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#374151' }}>思维链标注样例</span>
                <OrangeBtn icon={Plus} sm>批量标注</OrangeBtn>
              </div>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="rounded-xl overflow-hidden" style={{ border: '1px solid #f1ede9' }}>
                    {/* Input */}
                    <div className="px-4 py-2.5" style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                      <span style={{ fontSize: '11px', color: '#94a3b8', marginRight: '8px' }}>输入</span>
                      <span style={{ fontSize: '12px', color: '#374151' }}>{task.input}</span>
                    </div>

                    {/* Steps */}
                    <div className="p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>推理步骤</span>
                        <button className="flex items-center gap-1" style={{ fontSize: '11px', color: ORANGE }}
                          onClick={() => setTasks((prev) => prev.map((t) => t.id === task.id ? { ...t, steps: [...t.steps, '新增步骤'] } : t))}>
                          <Plus className="w-3 h-3" /> 添加步骤
                        </button>
                      </div>
                      {task.steps.map((step, si) => (
                        <div key={si} className="flex items-center gap-2 p-2 rounded-lg"
                          style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                          <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-white"
                            style={{ fontSize: '10px', fontWeight: 700, background: ORANGE }}>{si + 1}</div>
                          <span style={{ fontSize: '12px', color: '#374151', flex: 1 }}>{step}</span>
                          <div className="flex items-center gap-1 shrink-0">
                            <button onClick={() => moveStep(task.id, si, 'up')} disabled={si === 0}
                              className="p-1 rounded hover:bg-gray-100 disabled:opacity-30" style={{ color: '#64748b' }}>
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button onClick={() => moveStep(task.id, si, 'down')} disabled={si === task.steps.length - 1}
                              className="p-1 rounded hover:bg-gray-100 disabled:opacity-30" style={{ color: '#64748b' }}>
                              <ArrowDown className="w-3 h-3" />
                            </button>
                            <button onClick={() => removeStep(task.id, si)} className="p-1 rounded hover:bg-red-50"
                              style={{ color: '#ef4444' }}>
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Output */}
                    <div className="px-4 py-2.5 flex items-center gap-2" style={{ background: '#f0fdf4', borderTop: '1px solid #dcfce7' }}>
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>输出标签</span>
                      <span className="px-2 py-0.5 rounded" style={{ fontSize: '12px', fontWeight: 600, background: '#dcfce7', color: '#15803d' }}>{task.output}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Route Component ──────────────────────────────────────────────────────────
const contentMap: Record<string, React.ReactNode> = {
  'dataset-mgmt': <DatasetMgmt />,
  'task-mgmt': <TaskMgmt />,
  'label-mgmt': <LabelMgmt />,
  'auto-ann': <AutoAnnotation />,
};

export function AIAnnotation() {
  const [activeKey, setActiveKey] = useState('dataset-mgmt');
  return (
    <SidebarLayout title="AI 标注" items={sidebarItems} activeKey={activeKey} onSelect={setActiveKey}>
      {contentMap[activeKey]}
    </SidebarLayout>
  );
}
