import React, { useState } from 'react';
import { Link } from 'react-router';
import {
  Bell, ChevronDown, X, CheckCircle, XCircle, Search,
  Settings, Database, Brain, Code2,
  Layers, Package, Cpu, BookOpen, Activity, Star, Users,
  Tag, Grid3x3, List, ArrowRight, Zap, TrendingUp,
  MonitorSpeaker, Sun, Moon, Palette, Globe,
  Shield, BarChart2, Monitor, Network, Sparkles,
  FlaskConical, ChevronRight, Gauge,
} from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const announcements = [
  {
    id: 1,
    type: 'model_update',
    typeLabel: '基模更新',
    title: 'GPT-4o-mini 及 Llama-3-70B 适配更新公告',
    date: '2026-04-08',
    content:
      '本次更新新增 GPT-4o-mini 和 Llama-3-70B 两款基础模型的平台适配，支持中文对话、代码生成、多轮推理等核心任务，可通过能力开放模块直接调用。',
    models: [
      {
        name: 'GPT-4o-mini',
        size: '7B',
        type: '文本生成',
        provider: 'OpenAI',
        version: 'v2.1.0',
        canSubscribe: false,
        desc: '轻量级多模态大模型，适合日常对话与简单推理任务，成本低、响应快速。因版权授权受限，暂不支持平台订阅，如需使用请联系管理员。',
      },
      {
        name: 'Llama-3-70B',
        size: '70B',
        type: '通用对话',
        provider: 'Meta',
        version: 'v3.0.0',
        canSubscribe: true,
        desc: 'Meta 最新发布的开源大语言模型，在推理、代码生成和多语言任务上均有优异表现，支持私有化部署与平台订阅调用。',
      },
    ],
  },
  {
    id: 2,
    type: 'feature_update',
    typeLabel: '功能更新',
    title: '嵌入标训推模块 & 数据广场功能正式上线',
    date: '2026-04-05',
    content:
      '数据智能中台新增嵌入标训推一体化模块，打通从向量嵌入→数据标注→模型训练→模型推理的完整 ML 工作流。数据广场模块同步上线，支持数据集发现、授权与共享。',
    models: [],
  },
  {
    id: 3,
    type: 'system',
    typeLabel: '系统公告',
    title: '系统主题管理功能上线，支持个性化界面定制',
    date: '2026-04-01',
    content:
      '新版系统主题管理支持背景色、展示模式（舒适/默认/紧凑）、导航栏样式的动态调整，适配首页关键能力模块与应用生态菜单的主题管理，可通过右下角⚙️ 按钮快速设置。',
    models: [],
  },
];

const modelPlazaData = [
  {
    id: 1,
    name: 'ChatGLM-4',
    type: '对话模型',
    provider: '智谱AI',
    size: '6B',
    stars: 4.8,
    tags: ['中文优化', '多轮对话'],
    canSubscribe: true,
    desc: 'ChatGLM-4 是新一代中文对话预训练模型，采用混合精度训练，在中文对话任务上具有优秀的表现能力，支持 128K 超长上下文。',
  },
  {
    id: 2,
    name: 'Qwen-2.5-72B',
    type: '通用大模型',
    provider: '阿里云',
    size: '72B',
    stars: 4.9,
    tags: ['多语言', '代码生成'],
    canSubscribe: true,
    desc: '通义千问最新版本，具备强大的中英文理解和生成能力，在数学推理和代码任务上大幅提升，支持工具调用与 Function Calling。',
  },
  {
    id: 3,
    name: 'DeepSeek-R1',
    type: '推理模型',
    provider: 'DeepSeek',
    size: '671B',
    stars: 5.0,
    tags: ['推理增强', 'MoE架构'],
    canSubscribe: false,
    desc: 'DeepSeek-R1 采用强化学习训练方法，在数学、科学推理任务上达到国际领先水平，采用 MoE 架构。由于计算资源限制，当前暂不支持订阅。',
  },
  {
    id: 4,
    name: 'MiniMax-Text-01',
    type: '长文本模型',
    provider: 'MiniMax',
    size: '456B',
    stars: 4.7,
    tags: ['超长上下文', '文档分析'],
    canSubscribe: true,
    desc: '支持百万 Token 超长上下文，适合长文档分析、代码库理解等任务，文本处理能力强大，在企业知识库问答场景中表现优异。',
  },
  {
    id: 5,
    name: 'ERNIE-4.0',
    type: '多模态模型',
    provider: '百度',
    size: 'N/A',
    stars: 4.6,
    tags: ['图文理解', '创作'],
    canSubscribe: false,
    desc: '文心大模型 4.0 版本，具备图文多模态理解能力，在知识型问答和内容创作上表现突出。因商业授权协议限制，暂不开放平台订阅。',
  },
  {
    id: 6,
    name: 'Mistral-7B-v0.3',
    type: '开源模型',
    provider: 'Mistral AI',
    size: '7B',
    stars: 4.5,
    tags: ['轻量高效', '英文优化'],
    canSubscribe: true,
    desc: '高效轻量的开源模型，在推理速度和性能上取得良好平衡，适合私有化部署场景，支持本地化微调与推理服务部署。',
  },
];

const keyCapabilities = [
  { icon: Code2, label: '能力开放', desc: '数据封装与接口', path: '/capability-dev', color: '#3b82f6' },
  { icon: Database, label: '数据治理', desc: '元数据与质量', path: '/data-governance', color: '#0d9488' },
  { icon: Layers, label: '大数据开发工具', desc: '数据开发工坊', path: '/dev-tools', color: '#6366f1' },
  { icon: Brain, label: 'AI能力', desc: '标注训练推理', path: '/ai', color: '#8b5cf6' },
  { icon: Monitor, label: '系统管理', desc: '账号日志监控', path: '/system-mgmt', color: '#0ea5e9' },
  { icon: BookOpen, label: '知识中心', desc: '文档用户解答', path: '/', color: '#ec4899' },
  { icon: Globe, label: '应用生态', desc: '生态应用集成', path: '/', color: '#f59e0b' },
  { icon: Network, label: '数据广场', desc: '数据集授权共享', path: '/', color: '#fa541c' },
];

const pipelineStages = [
  { key: 'embed', label: '嵌入', sub: 'Embedding', icon: Cpu, color: '#3b82f6', bg: '#eff6ff', count: 12, running: false },
  { key: 'label', label: '标注', sub: 'Labeling', icon: Tag, color: '#0d9488', bg: '#f0fdfa', count: 8, running: false },
  { key: 'train', label: '训练', sub: 'Training', icon: Activity, color: '#8b5cf6', bg: '#f5f3ff', count: 3, running: true },
  { key: 'infer', label: '推理', sub: 'Inference', icon: Brain, color: '#fa541c', bg: '#fff7ed', count: 15, running: false },
];

const datasets = [
  { id: 1, name: '电商用户行为数据集', type: '行为数据', size: '2.3 GB', records: '1,240 万条', access: 'open' },
  { id: 2, name: '医疗影像标注数据集', type: '图像数据', size: '15.8 GB', records: '86,000 张', access: 'restricted' },
  { id: 3, name: '金融风控特征库', type: '结构化数据', size: '480 MB', records: '520 万条', access: 'private' },
  { id: 4, name: '多语言 NLP 语料库', type: '文本数据', size: '8.7 GB', records: '3,600 万条', access: 'open' },
];

const appEcosystem = [
  { name: '数据报告中心', icon: BarChart2, color: '#3b82f6', desc: '自动报告生成' },
  { name: '智能问答系统', icon: Brain, color: '#8b5cf6', desc: 'RAG 知识问答' },
  { name: '数据血缘图谱', icon: Layers, color: '#0d9488', desc: '数据流转可视化' },
  { name: '模型评测平台', icon: Star, color: '#f59e0b', desc: 'Benchmark 测评' },
  { name: '数据权限管理', icon: Shield, color: '#ef4444', desc: '细粒度权限控制' },
  { name: '用户协作空间', icon: Users, color: '#10b981', desc: '团队协作共享' },
];

const announcementConfig: Record<string, { color: string; bg: string; border: string }> = {
  model_update: { color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe' },
  feature_update: { color: '#8b5cf6', bg: '#f5f3ff', border: '#ddd6fe' },
  system: { color: '#f59e0b', bg: '#fffbeb', border: '#fde68a' },
};

const accessConfig: Record<string, { label: string; color: string; bg: string }> = {
  open: { label: '公开', color: '#16a34a', bg: '#dcfce7' },
  restricted: { label: '受限', color: '#d97706', bg: '#fef3c7' },
  private: { label: '私有', color: '#dc2626', bg: '#fee2e2' },
};

// ─── Component ───────────────────────────────────────────────────────────────

export function Home() {
  const [expandedIds, setExpandedIds] = useState<number[]>([1]);
  const [modelSearch, setModelSearch] = useState('');
  const [expandedModel, setExpandedModel] = useState<number | null>(null);
  const [modelDescriptions, setModelDescriptions] = useState<Record<number, string>>({});
  const [modelView, setModelView] = useState<'grid' | 'list'>('grid');
  const [showTheme, setShowTheme] = useState(false);
  const [bgColor, setBgColor] = useState('#f4f5f7');
  const [displayMode, setDisplayMode] = useState<'default' | 'comfortable' | 'compact'>('default');
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  const toggleAnn = (id: number) =>
    setExpandedIds((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const filteredModels = modelPlazaData.filter(
    (m) =>
      m.name.toLowerCase().includes(modelSearch.toLowerCase()) ||
      m.type.includes(modelSearch) ||
      m.provider.includes(modelSearch)
  );

  const cardPy = displayMode === 'compact' ? 'py-2' : displayMode === 'comfortable' ? 'py-5' : 'py-3';

  return (
    <div className="min-h-screen" style={{ background: bgColor }}>
      {/* ── Hero ── */}
      <div
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#fff5ee 0%,#fff0e6 45%,#fde8d8 100%)' }}
      >
        {/* ── Irregular geometric background elements ── */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          {/* Large irregular polygon — top right */}
          <polygon points="780,0 1020,-30 1100,90 980,160 820,110" fill="none" stroke="#fa541c" strokeWidth="1.2" opacity="0.13"/>
          {/* Inner smaller polygon */}
          <polygon points="830,20 990,0 1060,85 960,135 845,95" fill="rgba(250,84,28,0.04)" stroke="#ff7a45" strokeWidth="0.8" opacity="0.18"/>

          {/* Scattered triangles */}
          <polygon points="60,30 130,10 95,95" fill="none" stroke="#fa541c" strokeWidth="1" opacity="0.12"/>
          <polygon points="200,55 270,20 290,100" fill="rgba(250,84,28,0.05)" stroke="#ff7a45" strokeWidth="0.8" opacity="0.15"/>
          <polygon points="520,10 580,40 540,90" fill="none" stroke="#fa541c" strokeWidth="0.9" opacity="0.1"/>
          <polygon points="1180,30 1240,70 1170,110" fill="none" stroke="#fa541c" strokeWidth="1" opacity="0.11"/>

          {/* Irregular quadrilaterals */}
          <polygon points="380,5 460,30 450,85 360,60" fill="none" stroke="#ff7a45" strokeWidth="0.8" opacity="0.1"/>
          <polygon points="680,20 750,5 770,60 700,75" fill="rgba(255,122,69,0.04)" stroke="#fa541c" strokeWidth="0.9" opacity="0.13"/>
          <polygon points="1050,50 1130,20 1150,95 1080,105" fill="none" stroke="#ff7a45" strokeWidth="0.8" opacity="0.1"/>

          {/* Scattered dots */}
          <circle cx="155" cy="45" r="3" fill="#fa541c" opacity="0.12"/>
          <circle cx="440" cy="25" r="2" fill="#ff7a45" opacity="0.15"/>
          <circle cx="650" cy="70" r="4" fill="#fa541c" opacity="0.08"/>
          <circle cx="900" cy="20" r="2.5" fill="#ff7a45" opacity="0.12"/>
          <circle cx="1160" cy="80" r="3" fill="#fa541c" opacity="0.1"/>
          <circle cx="310" cy="80" r="2" fill="#ff7a45" opacity="0.14"/>

          {/* Diagonal accent lines */}
          <line x1="0" y1="180" x2="90" y2="0" stroke="#fa541c" strokeWidth="1" opacity="0.07"/>
          <line x1="120" y1="200" x2="210" y2="0" stroke="#ff7a45" strokeWidth="0.7" opacity="0.06"/>
          <line x1="1100" y1="0" x2="1280" y2="150" stroke="#fa541c" strokeWidth="1" opacity="0.07"/>
          <line x1="1000" y1="0" x2="1150" y2="180" stroke="#ff7a45" strokeWidth="0.7" opacity="0.06"/>

          {/* Large faint irregular shape — left mid */}
          <polygon points="0,80 80,50 120,130 70,170 0,150" fill="rgba(250,84,28,0.05)" stroke="#fa541c" strokeWidth="1" opacity="0.12"/>

          {/* Cross/plus accent — scattered */}
          <line x1="490" y1="55" x2="510" y2="55" stroke="#fa541c" strokeWidth="1.5" opacity="0.15"/>
          <line x1="500" y1="45" x2="500" y2="65" stroke="#fa541c" strokeWidth="1.5" opacity="0.15"/>
          <line x1="835" y1="40" x2="855" y2="40" stroke="#ff7a45" strokeWidth="1.5" opacity="0.12"/>
          <line x1="845" y1="30" x2="845" y2="50" stroke="#ff7a45" strokeWidth="1.5" opacity="0.12"/>

          {/* Small decorative rhombus */}
          <polygon points="350,130 365,115 380,130 365,145" fill="none" stroke="#fa541c" strokeWidth="1" opacity="0.11"/>
          <polygon points="700,150 712,138 724,150 712,162" fill="rgba(250,84,28,0.06)" stroke="#ff7a45" strokeWidth="0.8" opacity="0.14"/>
          <polygon points="980,140 995,125 1010,140 995,155" fill="none" stroke="#fa541c" strokeWidth="0.9" opacity="0.1"/>
        </svg>

        {/* Subtle radial warmth */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 70% at 18% 55%,rgba(250,84,28,0.05) 0%,transparent 65%)' }} />

        <div className="relative max-w-7xl mx-auto px-6 py-9">
          <div className="flex items-center justify-between gap-8">
            {/* Left content */}
            <div className="flex-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 rounded-full border"
                style={{ background: 'rgba(250,84,28,0.1)', borderColor: 'rgba(250,84,28,0.3)', fontSize: '11px', color: '#c23f0e' }}>
                <Sparkles className="w-3 h-3" />
                数据智能中台 · 企业级 AI 数据平台
              </div>
              <h1 className="mb-2" style={{ fontSize: '28px', fontWeight: 800, lineHeight: 1.3, color: '#1a1a1a' }}>
                统一数据资产，智能驱动未来
              </h1>
              <p className="mb-5" style={{ fontSize: '13px', lineHeight: 1.8, color: '#7a5c50' }}>
                统一数据资产管理 · 智能 AI 能力编排 · 全链路安全防护 · 开箱即用数据工具链
              </p>
              <div className="flex items-center gap-3">
                <Link
                  to="/capability-dev"
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                  style={{ background: 'linear-gradient(135deg,#fa541c,#ff7a45)', fontSize: '13px', fontWeight: 600 }}
                >
                  开始使用 <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/data-governance"
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border hover:bg-orange-50 transition-all"
                  style={{ borderColor: 'rgba(250,84,28,0.3)', fontSize: '13px', color: '#c23f0e', fontWeight: 500, background: 'rgba(255,255,255,0.7)' }}
                >
                  数据治理
                </Link>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 shrink-0">
              {[
                { label: '活跃模型', value: '48', icon: Brain, color: '#fa541c', bg: 'rgba(250,84,28,0.08)', border: 'rgba(250,84,28,0.2)' },
                { label: '数据集', value: '1,286', icon: Database, color: '#3b82f6', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)' },
                { label: '在线用户', value: '2,341', icon: Users, color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.2)' },
                { label: '今日任务', value: '15,632', icon: Zap, color: '#0d9488', bg: 'rgba(13,148,136,0.08)', border: 'rgba(13,148,136,0.2)' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl px-4 py-3 text-center border"
                  style={{ background: s.bg, borderColor: s.border, minWidth: '115px', boxShadow: '0 2px 12px rgba(250,84,28,0.06)' }}
                >
                  <s.icon className="w-4 h-4 mx-auto mb-1.5" style={{ color: s.color }} />
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#1a1a1a' }}>{s.value}</div>
                  <div style={{ fontSize: '11px', color: '#7a5c50' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">

        {/* ── Quick Capabilities ── */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-4 rounded-full" style={{ background: '#fa541c' }} />
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>关键能力模块</span>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {keyCapabilities.map((cap) => (
              <Link
                key={cap.label}
                to={cap.path}
                className={`bg-white rounded-xl ${cardPy} px-2 text-center transition-all group hover:shadow-lg hover:-translate-y-0.5 border border-gray-100 cursor-pointer`}
              >
                <div
                  className="w-11 h-11 mx-auto rounded-xl flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform duration-200"
                  style={{ background: `${cap.color}18` }}
                >
                  <cap.icon className="w-5 h-5" style={{ color: cap.color }} />
                </div>
                <div className="mb-0.5" style={{ fontSize: '12px', fontWeight: 600, color: '#1e293b' }}>
                  {cap.label}
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                  {cap.desc}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Announcements ── */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-4 rounded-full" style={{ background: '#fa541c' }} />
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>系统公告</span>
            <span
              className="text-white rounded-full px-2 py-0.5"
              style={{ fontSize: '11px', lineHeight: 1.4, background: '#fa541c' }}
            >
              {announcements.length}
            </span>
          </div>
          <div className="space-y-2">
            {announcements.map((ann) => {
              const isExpanded = expandedIds.includes(ann.id);
              const cfg = announcementConfig[ann.type];
              return (
                <div
                  key={ann.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm"
                  style={{ border: `1px solid ${cfg.border}` }}
                >
                  <button
                    onClick={() => toggleAnn(ann.id)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50/50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      {/* Color accent dot */}
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: cfg.color }} />
                      <span
                        className="px-2.5 py-0.5 rounded-full border shrink-0"
                        style={{ fontSize: '11px', color: cfg.color, background: cfg.bg, borderColor: cfg.border }}
                      >
                        {ann.typeLabel}
                      </span>
                      <span style={{ fontSize: '13px', fontWeight: 500, color: '#1e293b' }}>{ann.title}</span>
                      <span style={{ fontSize: '12px', color: '#94a3b8' }}>{ann.date}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                      style={{ color: '#94a3b8' }}
                    />
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-2 border-t" style={{ borderColor: cfg.border }}>
                      <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.7 }}>{ann.content}</p>
                      {ann.models.length > 0 && (
                        <div className="mt-4">
                          <p style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                            新增适配模型详情
                          </p>
                          <div className="grid grid-cols-2 gap-3">
                            {ann.models.map((model) => (
                              <div
                                key={model.name}
                                className="rounded-xl p-4"
                                style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span style={{ fontSize: '14px', fontWeight: 600 }}>{model.name}</span>
                                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded" style={{ fontSize: '11px' }}>{model.type}</span>
                                    {model.canSubscribe ? (
                                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ fontSize: '11px', background: '#dcfce7', color: '#16a34a', border: '1px solid #bbf7d0' }}>
                                        <CheckCircle className="w-3 h-3" /> 可订阅
                                      </span>
                                    ) : (
                                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ fontSize: '11px', background: '#fee2e2', color: '#dc2626', border: '1px solid #fecaca' }}>
                                        <XCircle className="w-3 h-3" /> 不可订阅
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-3 mb-2">
                                  {[['提供商', model.provider], ['参数量', model.size], ['版本', model.version]].map(([k, v]) => (
                                    <span key={k} style={{ fontSize: '12px', color: '#64748b' }}>
                                      {k}: <strong style={{ color: '#334155' }}>{v}</strong>
                                    </span>
                                  ))}
                                </div>
                                <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.6 }}>{model.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Pipeline + Data Square ── */}
        <div className="grid grid-cols-2 gap-5">
          {/* 嵌入标训推 */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: '1px solid #e2e8f0' }}>
            {/* Card header */}
            <div className="px-5 py-3.5 flex items-center justify-between" style={{ borderBottom: '1px solid #f1f5f9' }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#fff7ed' }}>
                  <Cpu className="w-3.5 h-3.5" style={{ color: '#fa541c' }} />
                </div>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>嵌入标训推模块</span>
                <span className="px-2 py-0.5 rounded-full" style={{ fontSize: '11px', background: '#fff7ed', color: '#fa541c', border: '1px solid #fed7aa' }}>NEW</span>
              </div>
              <button className="flex items-center gap-1 hover:opacity-80 transition-opacity" style={{ fontSize: '12px', color: '#fa541c' }}>
                查看全部 <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-5">
              {/* Pipeline flow */}
              <div className="flex items-center justify-between mb-5">
                {pipelineStages.map((stage, idx) => (
                  <React.Fragment key={stage.key}>
                    <div className="flex flex-col items-center gap-1.5">
                      <div
                        className="relative rounded-2xl flex items-center justify-center shadow-sm"
                        style={{ width: 52, height: 52, background: stage.bg, border: `1.5px solid ${stage.color}25` }}
                      >
                        <stage.icon className="w-5 h-5" style={{ color: stage.color }} />
                        {stage.running && (
                          <span
                            className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white animate-pulse"
                            style={{ background: '#22c55e' }}
                          />
                        )}
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: stage.color }}>{stage.label}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>{stage.sub}</div>
                      <div className="px-2 py-0.5 rounded-full" style={{ fontSize: '11px', background: '#f1f5f9', color: '#64748b' }}>
                        {stage.count} 任务
                      </div>
                    </div>
                    {idx < pipelineStages.length - 1 && (
                      <div className="flex-1 flex items-center px-1 mt-[-28px]">
                        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg,#e2e8f0,#cbd5e1)' }} />
                        <ChevronRight className="w-3 h-3 shrink-0" style={{ color: '#cbd5e1' }} />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: '运行中', value: '3', color: '#3b82f6', bg: '#eff6ff' },
                  { label: '今日完成', value: '28', color: '#16a34a', bg: '#dcfce7' },
                  { label: '失败任务', value: '1', color: '#dc2626', bg: '#fee2e2' },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: s.bg }}>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: '11px', color: s.color }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 数据广场 */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: '1px solid #e2e8f0' }}>
            <div className="px-5 py-3.5 flex items-center justify-between" style={{ borderBottom: '1px solid #f1f5f9' }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#f0fdfa' }}>
                  <Grid3x3 className="w-3.5 h-3.5" style={{ color: '#0d9488' }} />
                </div>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>数据广场</span>
                <span className="px-2 py-0.5 rounded-full" style={{ fontSize: '11px', background: '#f0fdfa', color: '#0d9488', border: '1px solid #99f6e4' }}>NEW</span>
              </div>
              <button className="flex items-center gap-1 hover:opacity-80 transition-opacity" style={{ fontSize: '12px', color: '#0d9488' }}>
                浏览全部 <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-5 space-y-2">
              {datasets.map((ds) => {
                const acc = accessConfig[ds.access];
                return (
                  <div
                    key={ds.id}
                    className="flex items-center justify-between p-3 rounded-xl cursor-pointer group transition-all hover:shadow-sm"
                    style={{ background: '#f8fafc', border: '1px solid transparent' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = '#99f6e4';
                      (e.currentTarget as HTMLDivElement).style.background = '#f0fdfa';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = 'transparent';
                      (e.currentTarget as HTMLDivElement).style.background = '#f8fafc';
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: acc.bg }}>
                        <Database className="w-4 h-4" style={{ color: acc.color }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 500, color: '#1e293b' }}>{ds.name}</div>
                        <div className="flex items-center gap-1.5 mt-0.5" style={{ fontSize: '11px', color: '#94a3b8' }}>
                          <span>{ds.type}</span><span>·</span>
                          <span>{ds.size}</span><span>·</span>
                          <span>{ds.records}</span>
                        </div>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full shrink-0" style={{ fontSize: '11px', background: acc.bg, color: acc.color }}>
                      {acc.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Model Plaza ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 rounded-full" style={{ background: '#fa541c' }} />
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>模型广场</span>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                共 {modelPlazaData.length} 个模型 · 简介上限 2000 字
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: '#94a3b8' }} />
                <input
                  type="text"
                  placeholder="搜索模型名称/类型/厂商…"
                  value={modelSearch}
                  onChange={(e) => setModelSearch(e.target.value)}
                  className="bg-white rounded-lg pl-8 pr-3 py-1.5 focus:outline-none transition-all"
                  style={{ fontSize: '12px', width: '200px', border: '1px solid #e2e8f0' }}
                  onFocus={(e) => (e.target.style.borderColor = '#fa541c')}
                  onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
                />
              </div>
              {[{ v: 'grid' as const, Icon: Grid3x3 }, { v: 'list' as const, Icon: List }].map(({ v, Icon }) => (
                <button
                  key={v}
                  onClick={() => setModelView(v)}
                  className="p-1.5 rounded transition-colors"
                  style={{
                    background: modelView === v ? '#fff7ed' : 'transparent',
                    color: modelView === v ? '#fa541c' : '#94a3b8',
                  }}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          <div className={`grid gap-4 ${modelView === 'grid' ? 'grid-cols-3' : 'grid-cols-1'}`}>
            {filteredModels.map((model) => {
              const desc = modelDescriptions[model.id] ?? model.desc;
              const isOpen = expandedModel === model.id;
              return (
                <div
                  key={model.id}
                  className="bg-white rounded-2xl overflow-hidden transition-shadow hover:shadow-md"
                  style={{ border: '1px solid #e2e8f0' }}
                >
                  {/* Card top accent */}
                  <div className="h-1 w-full" style={{ background: model.canSubscribe ? 'linear-gradient(90deg,#fa541c,#ff7a45)' : '#e2e8f0' }} />
                  <div className="p-4">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>{model.name}</span>
                          {!model.canSubscribe && (
                            <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-full shrink-0" style={{ fontSize: '11px', background: '#fee2e2', color: '#dc2626', border: '1px solid #fecaca' }}>
                              <XCircle className="w-3 h-3" /> 不可订阅
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                          <span style={{ fontSize: '12px', color: '#64748b' }}>{model.provider}</span>
                          <span className="px-1.5 py-0.5 rounded" style={{ fontSize: '11px', background: '#f1f5f9', color: '#475569' }}>{model.type}</span>
                          <span className="px-1.5 py-0.5 rounded" style={{ fontSize: '11px', background: '#fff7ed', color: '#fa541c' }}>{model.size}</span>
                          <span className="flex items-center gap-0.5" style={{ fontSize: '11px', color: '#f59e0b' }}>
                            <Star className="w-3 h-3 fill-current" /> {model.stars}
                          </span>
                        </div>
                      </div>
                      {model.canSubscribe && (
                        <button
                          className="shrink-0 px-3 py-1 rounded-lg text-white hover:opacity-90 transition-all shadow-sm"
                          style={{ fontSize: '12px', background: 'linear-gradient(135deg,#fa541c,#ff7a45)' }}
                        >
                          订阅
                        </button>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {model.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-full" style={{ fontSize: '11px', background: '#f1f5f9', color: '#64748b' }}>
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    {isOpen ? (
                      <div>
                        <textarea
                          className="w-full rounded-lg p-2 focus:outline-none text-slate-600"
                          style={{ fontSize: '12px', minHeight: '80px', resize: 'both', lineHeight: 1.6, border: '1px solid #e2e8f0' }}
                          maxLength={2000}
                          value={desc}
                          onChange={(e) =>
                            setModelDescriptions((p) => ({ ...p, [model.id]: e.target.value }))
                          }
                          placeholder="模型简介（最多 2000 字）"
                          onFocus={(e) => (e.target.style.borderColor = '#fa541c')}
                          onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
                        />
                        <div className="flex items-center justify-between mt-1">
                          <span style={{ fontSize: '11px', color: '#94a3b8' }}>{desc.length} / 2000 字</span>
                          <button
                            onClick={() => setExpandedModel(null)}
                            className="flex items-center gap-0.5 hover:opacity-70 transition-opacity"
                            style={{ fontSize: '12px', color: '#94a3b8' }}
                          >
                            <X className="w-3 h-3" /> 收起
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="line-clamp-2" style={{ fontSize: '12px', lineHeight: 1.6, color: '#64748b' }}>
                          {desc}
                        </p>
                        <button
                          onClick={() => setExpandedModel(model.id)}
                          className="flex items-center gap-0.5 mt-1 hover:opacity-70 transition-opacity"
                          style={{ fontSize: '12px', color: '#fa541c' }}
                        >
                          展开详情 <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Application Ecosystem ── */}
        <section className="pb-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-4 rounded-full" style={{ background: '#fa541c' }} />
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>应用生态</span>
          </div>
          <div className="grid grid-cols-6 gap-3">
            {appEcosystem.map((app) => (
              <div
                key={app.name}
                className="bg-white rounded-2xl p-4 text-center cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 group"
                style={{ border: '1px solid #e2e8f0' }}
              >
                <div
                  className="w-11 h-11 mx-auto rounded-xl flex items-center justify-center mb-2.5 shadow-sm group-hover:scale-110 transition-transform duration-200"
                  style={{ background: `${app.color}18` }}
                >
                  <app.icon className="w-5 h-5" style={{ color: app.color }} />
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>{app.name}</div>
                <div className="mt-0.5" style={{ fontSize: '11px', color: '#94a3b8' }}>{app.desc}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── Theme Settings Panel ── */}
      <div className="fixed bottom-6 right-6 z-40">
        {showTheme && (
          <div className="absolute bottom-16 right-0 w-72 bg-white rounded-2xl shadow-2xl overflow-hidden" style={{ border: '1px solid #e2e8f0' }}>
            <div
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{ background: 'linear-gradient(135deg,#fff7ed,#fff)', borderColor: '#fed7aa' }}
            >
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4" style={{ color: '#fa541c' }} />
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>系统主题管理</span>
              </div>
              <button onClick={() => setShowTheme(false)} className="hover:opacity-70 transition-opacity" style={{ color: '#94a3b8' }}>
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              {/* Display mode */}
              <div>
                <label className="flex items-center gap-1.5 mb-2" style={{ fontSize: '12px', fontWeight: 500, color: '#64748b' }}>
                  <MonitorSpeaker className="w-3.5 h-3.5" /> 显示模式
                </label>
                <div className="flex gap-2">
                  {(['default', 'comfortable', 'compact'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setDisplayMode(m)}
                      className="flex-1 py-1.5 rounded-lg border transition-all"
                      style={{
                        fontSize: '11px',
                        borderColor: displayMode === m ? '#fa541c' : '#e2e8f0',
                        background: displayMode === m ? '#fff7ed' : 'transparent',
                        color: displayMode === m ? '#fa541c' : '#64748b',
                      }}
                    >
                      {m === 'default' ? '默认' : m === 'comfortable' ? '舒适' : '紧凑'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme mode */}
              <div>
                <label className="flex items-center gap-1.5 mb-2" style={{ fontSize: '12px', fontWeight: 500, color: '#64748b' }}>
                  <Sun className="w-3.5 h-3.5" /> 主题模式
                </label>
                <div className="flex gap-2">
                  {[{ v: 'light' as const, label: '☀️ 浅色' }, { v: 'dark' as const, label: '🌙 深色' }].map(({ v, label }) => (
                    <button
                      key={v}
                      onClick={() => setThemeMode(v)}
                      className="flex-1 py-1.5 rounded-lg border transition-all"
                      style={{
                        fontSize: '11px',
                        borderColor: themeMode === v ? '#fa541c' : '#e2e8f0',
                        background: themeMode === v ? '#fff7ed' : 'transparent',
                        color: themeMode === v ? '#fa541c' : '#64748b',
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Background color */}
              <div>
                <label className="flex items-center gap-1.5 mb-2" style={{ fontSize: '12px', fontWeight: 500, color: '#64748b' }}>
                  <Palette className="w-3.5 h-3.5" /> 背景色
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {['#f4f5f7', '#f0faf5', '#fdf0f8', '#fefce8', '#f5f0fe', '#ffffff'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setBgColor(c)}
                      className="w-7 h-7 rounded-lg transition-all hover:scale-110"
                      style={{
                        background: c,
                        border: bgColor === c ? '2px solid #fa541c' : '2px solid #e2e8f0',
                        transform: bgColor === c ? 'scale(1.1)' : 'scale(1)',
                      }}
                      title={c}
                    />
                  ))}
                  <label className="w-7 h-7 rounded-lg border overflow-hidden cursor-pointer hover:scale-110 transition-transform relative" style={{ borderColor: '#e2e8f0' }} title="自定义">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="w-full h-full flex items-center justify-center" style={{ fontSize: '10px', color: '#94a3b8' }}>+</div>
                  </label>
                </div>
              </div>

              <div className="pt-2 border-t flex items-center gap-2" style={{ borderColor: '#f1f5f9' }}>
                <TrendingUp className="w-3.5 h-3.5" style={{ color: '#94a3b8' }} />
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>主题设置即时生效，刷新后恢复默认</span>
              </div>
            </div>
          </div>
        )}
        <button
          onClick={() => setShowTheme((v) => !v)}
          className="w-12 h-12 rounded-full text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
          style={{ background: 'linear-gradient(135deg,#fa541c,#ff7a45)' }}
          title="系统主题管理"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}