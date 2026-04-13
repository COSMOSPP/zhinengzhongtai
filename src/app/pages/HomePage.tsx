import { useState } from 'react';
import {
  Bell, ChevronRight, Search, Star, Download,
  Cpu, Tag, Zap, Layers, Database, BarChart2,
  X, AlertCircle, Globe, Code, Shield, Activity,
  Package, Boxes, Brain, CheckCircle, TrendingUp,
  Users, HardDrive, Server, Gauge
} from 'lucide-react';

// ─── Mock Data ───────────────────────────────────────────

const announcements = [
  {
    id: 1,
    type: '基模更新',
    typeColor: 'bg-blue-100 text-blue-700',
    title: 'Qwen 2.5 系列模型全面更新',
    date: '2026-04-08',
    models: [
      { name: 'Qwen2.5-72B', size: '72B', architecture: 'Transformer', contextLength: '128K', license: '开源商用', updated: '2026-04-08' },
      { name: 'Qwen2.5-32B', size: '32B', architecture: 'Transformer', contextLength: '64K', license: '开源商用', updated: '2026-04-08' },
    ],
    content: '千问 2.5 系列模型完成重大迭代更新，在代码生成、数学推理、长上下文理解等多项基准测试中取得显著提升。本次更新包含 72B、32B、14B、7B 四个参数规格，最大支持 128K 超长上下文处理能力。',
    canSubscribe: false,
    subscribeNote: '该系列模型当前处于企业内测阶段，暂不支持对外订阅，如需使用请联系管理员申请权限。',
  },
  {
    id: 2,
    type: '功能更新',
    typeColor: 'bg-green-100 text-green-700',
    title: '数据广场与嵌入标训推模块正式上线',
    date: '2026-04-05',
    models: [],
    content: '新增数据广场模块，支持结构化、非结构化、流式数据及 API 等多种数据资源的统一管理与检索浏览。同步上线嵌入标训推一体化工作流，覆盖从数据标注到模型推理的完整 MLOps 链路，大幅提升 AI 开发效率。',
    canSubscribe: true,
  },
  {
    id: 3,
    type: '主题升级',
    typeColor: 'bg-purple-100 text-purple-700',
    title: '系统主题管理与自适应 UI 全面更新',
    date: '2026-04-01',
    models: [],
    content: '支持系统主题、背景色、展示模式等多维度动态配置，提供首页关键能力模块与应用生态菜单的可视化调整能力，新增模型文件上传失败智能提示与用户解答模块，全面优化使用体验。',
    canSubscribe: true,
  },
];

const models = [
  { id: 1, name: 'Qwen2.5-72B', size: '72B', type: 'LLM', desc: '千问最新旗舰大语言模型，支持代码生成、数学推理、多语言处理等多种任务，上下文长度达 128K Tokens。在多项业界权威评测中均处于开源模型顶尖水平，适合高精度推理场景部署。', tags: ['对话', '代码', '推理', '多语言'], calls: 328421, rating: 4.9, canSubscribe: false },
  { id: 2, name: 'DeepSeek-V3', size: '67B', type: 'LLM', desc: 'DeepSeek 推出的 V3 系列混合专家（MoE）大语言模型，综合能力均衡，代码和数学能力出色，支持中英双语，适合企业级通用推理场景批量部署与调用。', tags: ['多模态', '代码', '数学'], calls: 215308, rating: 4.8, canSubscribe: true },
  { id: 3, name: 'Llama-3.1-70B', size: '70B', type: 'LLM', desc: 'Meta AI 推出的开源旗舰模型，多任务综合能力强劲，支持工具调用、函数调用和长上下文理解，适合科研探索和企业私有化部署场景。', tags: ['通用', '多语言', '工具调用'], calls: 184209, rating: 4.7, canSubscribe: true },
  { id: 4, name: 'ChatGLM-4', size: '9B', type: 'LLM', desc: '智谱 AI 推出的新一代高效对话大模型，轻量化设计，中文理解能力突出，支持函数调用，适合本地化私有部署与二次开发定制。', tags: ['中文', '对话', '轻量'], calls: 147832, rating: 4.6, canSubscribe: true },
  { id: 5, name: 'Stable-Diffusion-XL', size: '6.9B', type: '图像生成', desc: 'Stability AI 发布的高质量图像生成基础模型，支持文生图、图生图、局部重绘等多种创作模式，社区 LoRA 资源丰富，适合创意图像内容生产。', tags: ['图像', '生成', '创意', '文生图'], calls: 98763, rating: 4.5, canSubscribe: false },
  { id: 6, name: 'BGE-M3', size: '570M', type: '嵌入模型', desc: 'BAAI（北京智源人工智能研究院）推出的多语言多粒度文本嵌入模型，支持稠密检索、稀疏检索、多向量检索三种检索模式，适配 RAG 等多种下游任务。', tags: ['嵌入', '检索', '多语言', 'RAG'], calls: 76491, rating: 4.7, canSubscribe: true },
];

const capabilities = [
  { icon: Brain, label: 'AI能力中心', desc: '标注/训练/推理一体化', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', count: '12 项能力', path: '/ai' },
  { icon: Database, label: '数据资产管理', desc: '元数据/质量/血缘追溯', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', count: '1,856 TB', path: '/data-governance' },
  { icon: Code, label: '数据开发平台', desc: 'SQL/代码/任务调度', color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-100', count: '328 任务', path: '/dev-tools' },
  { icon: Shield, label: '安全访问控制', desc: '脱敏/加密/权限管理', color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100', count: '99.9% 合规', path: '/security-mgmt' },
  { icon: Activity, label: '运营监控', desc: '实时监控/告警/分析', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100', count: '24/7 监控', path: '/operation-monitor' },
  { icon: Globe, label: '基础服务', desc: 'API 网关/存储/计算', color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-100', count: '99.99% SLA', path: '/basic-capability' },
];

const embedTrainModules = [
  { icon: Layers, label: '嵌入模块', shortLabel: 'Embedding', desc: '支持文本、图像等多模态数据嵌入向量化，提供高质量语义向量表示，完美适配 RAG 检索增强场景', tasks: 47, bg: 'from-blue-500 to-blue-600' },
  { icon: Tag, label: '标注模块', shortLabel: 'Annotation', desc: '集成智能辅助标注、人工标注、质量审核等完整标注工作流，支持分类、NER、关系抽取等多任务并行', tasks: 23, bg: 'from-amber-500 to-orange-500' },
  { icon: Cpu, label: '训练模块', shortLabel: 'Training', desc: '支持全参数微调、LoRA、QLoRA 等主流训练范式，提供分布式训练、超参搜索与实验追踪管理', tasks: 12, bg: 'from-violet-500 to-purple-600' },
  { icon: Zap, label: '推理模块', shortLabel: 'Inference', desc: '提供高性能模型推理服务，支持批量推理、流式输出、多模型并发调度与自动扩缩容部署', tasks: 89, bg: 'from-emerald-500 to-teal-600' },
];

const dataPlazaItems = [
  { type: '结构化数据', icon: Database, count: 248, size: '1.2 TB', color: 'bg-blue-600', lightBg: 'bg-blue-50', border: 'border-blue-200', tags: ['MySQL', 'PostgreSQL', 'Hive', 'ClickHouse'] },
  { type: '非结构化数据', icon: Package, count: 1842, size: '654 GB', color: 'bg-emerald-600', lightBg: 'bg-emerald-50', border: 'border-emerald-200', tags: ['文档', '图像', '视频', '音频'] },
  { type: '流式数据', icon: Activity, count: 56, size: '实时接入', color: 'bg-orange-500', lightBg: 'bg-orange-50', border: 'border-orange-200', tags: ['Kafka', 'Flink', '实时计算'] },
  { type: 'API 数据源', icon: Globe, count: 124, size: '按需调用', color: 'bg-violet-600', lightBg: 'bg-violet-50', border: 'border-violet-200', tags: ['REST', 'GraphQL', 'WebSocket'] },
];

const appEcosystem = [
  { name: '智能问答', icon: '💬', category: '对话应用', hot: true },
  { name: '代码助手', icon: '👨‍💻', category: 'AI开发', hot: true },
  { name: '文档分析', icon: '📄', category: '文档处理', hot: false },
  { name: '数据看板', icon: '📊', category: '数据分析', hot: true },
  { name: '知识库', icon: '📚', category: '知识管理', hot: false },
  { name: '图像识别', icon: '🖼️', category: '视觉AI', hot: false },
  { name: '语音转写', icon: '🎤', category: '语音AI', hot: false },
  { name: '智能报告', icon: '📑', category: '报告生成', hot: true },
];

const stats = [
  { label: '模型总数', value: '128', unit: '个', trend: '+12', icon: Brain, color: '#1677ff', bg: 'bg-blue-50' },
  { label: 'API 调用量', value: '284.7', unit: '万次', trend: '+23.5%', icon: TrendingUp, color: '#10b981', bg: 'bg-emerald-50' },
  { label: '活跃用户', value: '3,421', unit: '人', trend: '+8.2%', icon: Users, color: '#8b5cf6', bg: 'bg-violet-50' },
  { label: '数据资产', value: '1,856', unit: 'TB', trend: '+156TB', icon: HardDrive, color: '#f59e0b', bg: 'bg-amber-50' },
];

// ─── Component ────────────────────────────────────────────

export function HomePage() {
  const [activeAnn, setActiveAnn] = useState(0);
  const [modelSearch, setModelSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('全部');
  const [selectedModel, setSelectedModel] = useState<typeof models[0] | null>(null);
  const [modelDesc, setModelDesc] = useState('');

  const modelTypes = ['全部', ...Array.from(new Set(models.map((m) => m.type)))];
  const filteredModels = models.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(modelSearch.toLowerCase()) ||
      m.tags.some((t) => t.includes(modelSearch));
    const matchType = typeFilter === '全部' || m.type === typeFilter;
    return matchSearch && matchType;
  });

  const currentAnn = announcements[activeAnn];

  const openModel = (model: typeof models[0]) => {
    setSelectedModel(model);
    setModelDesc(model.desc);
  };

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#f0f2f5' }}>
      <div className="max-w-[1600px] mx-auto px-4 py-4 space-y-4">

        {/* ── Row 1: Announcement + Stats ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Announcement */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header bar */}
            <div
              className="flex items-center justify-between px-5 py-3"
              style={{ background: 'linear-gradient(90deg, #0b1f40, #1a3a72)' }}
            >
              <div className="flex items-center gap-2 text-white">
                <Bell size={15} />
                <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.5 }}>系统公告</span>
              </div>
              <div className="flex gap-1.5">
                {announcements.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveAnn(i)}
                    className={`rounded-full transition-all ${i === activeAnn ? 'bg-white w-5 h-2' : 'bg-white/30 w-2 h-2'}`}
                  />
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100 overflow-x-auto">
              {announcements.map((ann, i) => (
                <button
                  key={ann.id}
                  onClick={() => setActiveAnn(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm whitespace-nowrap border-b-2 transition-all flex-shrink-0 ${
                    i === activeAnn
                      ? 'border-blue-500 text-blue-600 bg-blue-50/50'
                      : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <span className={`px-1.5 py-0.5 rounded text-xs ${ann.typeColor}`}>{ann.type}</span>
                  <span className="truncate" style={{ maxWidth: 140 }}>{ann.title}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex items-start gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded text-xs flex-shrink-0 ${currentAnn.typeColor}`}>{currentAnn.type}</span>
                <h3 className="text-gray-900" style={{ fontSize: 15, fontWeight: 700 }}>{currentAnn.title}</h3>
                {!currentAnn.canSubscribe && (
                  <span className="flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-600 rounded-full text-xs border border-red-200 flex-shrink-0">
                    <AlertCircle size={10} />
                    不可订阅
                  </span>
                )}
              </div>
              <p className="text-gray-400 text-xs mb-3">发布时间：{currentAnn.date}</p>
              <p className="text-gray-700 text-sm leading-relaxed">{currentAnn.content}</p>

              {/* Model details */}
              {currentAnn.models.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">新适配模型详情</p>
                  <div className="grid gap-2">
                    {currentAnn.models.map((m) => (
                      <div key={m.name} className="bg-gray-50 rounded-xl p-3.5 border border-gray-100">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-bold text-gray-900">{m.name}</span>
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">{m.size}</span>
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">{m.license}</span>
                          {!currentAnn.canSubscribe && (
                            <span className="flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-500 border border-red-100 rounded-full text-xs ml-auto">
                              <AlertCircle size={9} />
                              不可订阅
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-xs text-gray-500">
                          <div><span className="text-gray-400">架构：</span><span className="text-gray-700 font-medium">{m.architecture}</span></div>
                          <div><span className="text-gray-400">上下文：</span><span className="text-gray-700 font-medium">{m.contextLength}</span></div>
                          <div><span className="text-gray-400">更新：</span><span className="text-gray-700 font-medium">{m.updated}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!currentAnn.canSubscribe && currentAnn.subscribeNote && (
                <div className="mt-3 flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl p-3 text-sm text-red-600">
                  <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
                  <span>{currentAnn.subscribeNote}</span>
                </div>
              )}

              <div className="flex justify-end mt-4">
                <button className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium">
                  查看公告详情 <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 content-start">
            {stats.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
                <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
                  <s.icon size={18} style={{ color: s.color }} />
                </div>
                <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                <p className="text-xl font-bold text-gray-900">
                  {s.value}
                  <span className="text-sm font-normal text-gray-400 ml-1">{s.unit}</span>
                </p>
                <p className="text-xs text-emerald-600 mt-1.5 flex items-center gap-1">
                  <TrendingUp size={10} />
                  {s.trend} 本月
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Key Capability Modules ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-1 h-5 rounded-full" style={{ background: 'linear-gradient(180deg,#1677ff,#36b0ff)' }} />
              <h2 className="text-gray-900" style={{ fontSize: 15, fontWeight: 700 }}>关键能力模块</h2>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium">
              查看全部 <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {capabilities.map((cap) => (
              <div
                key={cap.label}
                className={`${cap.bg} border ${cap.border} rounded-xl p-3.5 hover:shadow-md transition-all cursor-pointer group`}
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-3 group-hover:shadow transition-shadow">
                  <cap.icon size={20} className={cap.color} />
                </div>
                <p className="text-sm font-semibold text-gray-800">{cap.label}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{cap.desc}</p>
                <p className={`text-xs ${cap.color} mt-2 font-semibold`}>{cap.count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 嵌入标训推 Module ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-1 h-5 rounded-full" style={{ background: 'linear-gradient(180deg,#8b5cf6,#a855f7)' }} />
              <h2 className="text-gray-900" style={{ fontSize: 15, fontWeight: 700 }}>嵌入标训推模块</h2>
              <span className="px-2.5 py-0.5 bg-purple-50 text-purple-600 text-xs rounded-full border border-purple-100 font-medium">
                MLOps 全链路工作流
              </span>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium">
              进入工作台 <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {embedTrainModules.map((mod, idx) => (
              <div key={mod.label} className="relative">
                {idx < embedTrainModules.length - 1 && (
                  <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-5 h-5 bg-white rounded-full border border-gray-200 items-center justify-center shadow-sm">
                    <ChevronRight size={12} className="text-gray-400" />
                  </div>
                )}
                <div className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group h-full">
                  <div className={`bg-gradient-to-r ${mod.bg} px-4 py-3 flex items-center justify-between`}>
                    <div className="flex items-center gap-2">
                      <mod.icon size={18} className="text-white" />
                      <div>
                        <p className="text-white text-sm font-bold">{mod.label}</p>
                        <p className="text-white/70 text-xs">{mod.shortLabel}</p>
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-white/90 bg-white/20 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse" />
                      运行中
                    </span>
                  </div>
                  <div className="p-3.5 bg-white">
                    <p className="text-xs text-gray-500 leading-relaxed">{mod.desc}</p>
                    <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
                      <span className="text-xs text-gray-400">活跃任务</span>
                      <span className="text-sm font-bold text-gray-800">{mod.tasks}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Model Plaza ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
            <div className="flex items-center gap-2.5">
              <div className="w-1 h-5 rounded-full" style={{ background: 'linear-gradient(180deg,#1677ff,#36b0ff)' }} />
              <h2 className="text-gray-900" style={{ fontSize: 15, fontWeight: 700 }}>模型广场</h2>
              <span className="text-xs text-gray-400">共 {models.length} 个模型</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 bg-gray-100 rounded-xl px-3 py-2">
                <Search size={13} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索模型名称或标签..."
                  value={modelSearch}
                  onChange={(e) => setModelSearch(e.target.value)}
                  className="bg-transparent text-sm outline-none text-gray-700 w-36"
                />
              </div>
              <div className="flex gap-1">
                {modelTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={`px-2.5 py-1.5 text-xs rounded-lg transition-colors font-medium ${
                      typeFilter === t ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredModels.map((model) => (
              <div
                key={model.id}
                onClick={() => openModel(model)}
                className="border border-gray-100 rounded-xl p-4 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-2.5">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-gray-900">{model.name}</span>
                      {!model.canSubscribe && (
                        <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-red-50 text-red-500 border border-red-100 rounded text-xs">
                          <AlertCircle size={9} />
                          不可订阅
                        </span>
                      )}
                    </div>
                    <div className="flex gap-1 mt-1">
                      <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded text-xs font-medium">{model.size}</span>
                      <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-xs">{model.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400 flex-shrink-0">
                    <Star size={13} fill="currentColor" />
                    <span className="text-xs text-gray-600 font-medium">{model.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{model.desc}</p>
                <div className="flex flex-wrap gap-1 mt-2.5">
                  {model.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-xs">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Download size={11} />
                    {model.calls.toLocaleString()} 次调用
                  </span>
                  {model.canSubscribe ? (
                    <button
                      onClick={(e) => { e.stopPropagation(); }}
                      className="text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors font-medium"
                    >
                      订阅使用
                    </button>
                  ) : (
                    <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg">暂不可用</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Data Plaza ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-1 h-5 rounded-full" style={{ background: 'linear-gradient(180deg,#10b981,#34d399)' }} />
              <h2 className="text-gray-900" style={{ fontSize: 15, fontWeight: 700 }}>数据广场</h2>
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-600 text-xs rounded-full border border-emerald-100 font-medium">
                数据资源中心
              </span>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium">
              探索全部数据 <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {dataPlazaItems.map((item) => (
              <div
                key={item.type}
                className={`${item.lightBg} border ${item.border} rounded-xl p-4 hover:shadow-md transition-all cursor-pointer`}
              >
                <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center mb-3`}>
                  <item.icon size={20} className="text-white" />
                </div>
                <h3 className="text-sm font-semibold text-gray-800 mb-1.5">{item.type}</h3>
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span className="text-2xl font-bold text-gray-900">{item.count}</span>
                  <span className="text-xs text-gray-400">个资源</span>
                </div>
                <p className="text-xs text-gray-500 mb-3">总量：{item.size}</p>
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs text-gray-500 bg-white rounded px-1.5 py-0.5 border border-gray-100">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── App Ecosystem ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-1 h-5 rounded-full" style={{ background: 'linear-gradient(180deg,#f59e0b,#fb923c)' }} />
              <h2 className="text-gray-900" style={{ fontSize: 15, fontWeight: 700 }}>应用生态</h2>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium">
              更多应用 <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {appEcosystem.map((app) => (
              <div
                key={app.name}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group relative"
              >
                {app.hot && (
                  <span className="absolute top-1 right-1 px-1 py-0.5 bg-red-500 text-white rounded text-xs leading-none" style={{ fontSize: 9 }}>HOT</span>
                )}
                <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl flex items-center justify-center text-2xl group-hover:shadow-md transition-shadow">
                  {app.icon}
                </div>
                <span className="text-xs text-gray-700 text-center font-medium">{app.name}</span>
                <span className="text-xs text-gray-400 text-center">{app.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Model Detail Modal ── */}
      {selectedModel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-gray-900 font-bold" style={{ fontSize: 16 }}>{selectedModel.name}</h3>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">{selectedModel.size}</span>
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">{selectedModel.type}</span>
                {!selectedModel.canSubscribe && (
                  <span className="flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-600 border border-red-200 rounded-full text-xs">
                    <AlertCircle size={11} />
                    不可订阅
                  </span>
                )}
              </div>
              <button onClick={() => setSelectedModel(null)} className="text-gray-400 hover:text-gray-700 rounded-lg p-1.5 hover:bg-gray-100">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Description editor */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">模型简介</label>
                  <span className={`text-xs ${modelDesc.length > 1900 ? 'text-red-500' : 'text-gray-400'}`}>
                    {modelDesc.length} / 2000
                  </span>
                </div>
                <textarea
                  value={modelDesc}
                  onChange={(e) => { if (e.target.value.length <= 2000) setModelDesc(e.target.value); }}
                  maxLength={2000}
                  rows={6}
                  className="w-full border border-gray-200 rounded-xl p-3.5 text-sm text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 leading-relaxed transition-all"
                  style={{ resize: 'both', minHeight: 120, minWidth: '100%' }}
                  placeholder="输入模型简介（最多 2000 字）..."
                />
                {!selectedModel.canSubscribe && (
                  <div className="mt-2 flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl p-3 text-sm text-red-600">
                    <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                    <span>该模型当前不支持订阅，如需使用请联系系统管理员申请权限。</span>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: '调用次数', value: selectedModel.calls.toLocaleString() },
                  { label: '用户评分', value: `${selectedModel.rating} / 5.0` },
                  { label: '订阅状态', value: selectedModel.canSubscribe ? '可订阅' : '不可订阅', color: selectedModel.canSubscribe ? 'text-green-600' : 'text-red-500' },
                ].map((s) => (
                  <div key={s.label} className="bg-gray-50 rounded-xl p-3.5">
                    <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                    <p className={`text-sm font-bold ${s.color || 'text-gray-800'}`}>{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">模型标签</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedModel.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-full text-xs font-medium">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
                <button
                  onClick={() => setSelectedModel(null)}
                  className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium"
                >
                  关闭
                </button>
                {selectedModel.canSubscribe ? (
                  <button className="px-4 py-2 text-sm text-white rounded-xl font-medium" style={{ background: 'linear-gradient(135deg,#1677ff,#36b0ff)' }}>
                    立即订阅
                  </button>
                ) : (
                  <button className="px-4 py-2 text-sm text-white bg-gray-400 rounded-xl font-medium cursor-not-allowed" disabled>
                    暂不可订阅
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
