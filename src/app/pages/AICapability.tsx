import React, { useState } from 'react';
import { SidebarLayout, SidebarItem } from '../components/SidebarLayout';
import {
  Tag, Activity, Brain, CheckCircle, Clock, XCircle,
  Plus, Play, Pause, Upload, Settings2,
  Zap, AlertTriangle, Cpu, BarChart2, FileText,
  Database, RefreshCw, Search, Server, Monitor,
  ChevronRight, TrendingUp, Layers,
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area,
} from 'recharts';

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const sidebarItems: SidebarItem[] = [
  {
    key: 'annotation',
    label: 'AI 标注',
    icon: Tag,
    children: [
      { key: 'ann-tasks', label: '标注任务', icon: Tag },
      { key: 'ann-templates', label: '标注模板', icon: FileText },
      { key: 'ann-datasets', label: '数据集管理', icon: Database },
    ],
  },
  {
    key: 'training',
    label: 'AI 训练',
    icon: Activity,
    children: [
      { key: 'train-jobs', label: '训练任务', icon: Activity },
      { key: 'train-config', label: '训练配置', icon: Settings2 },
      { key: 'train-versions', label: '模型版本', icon: Layers },
    ],
  },
  {
    key: 'inference',
    label: 'AI 推理',
    icon: Brain,
    children: [
      { key: 'infer-services', label: '推理服务', icon: Server },
      { key: 'infer-monitor', label: '服务监控', icon: Monitor },
      { key: 'infer-api', label: 'API 文档', icon: FileText },
    ],
  },
];

// ─── Mock data ─────────────────────────────────────────────────────────────────
const annotationTasks = [
  { id: 1, name: '商品图像分类标注', type: '图像分类', total: 10000, done: 7842, status: 'running', assignee: '张明', deadline: '2026-04-15' },
  { id: 2, name: '用户评论情感标注', type: '文本分类', total: 50000, done: 50000, status: 'done', assignee: '李华', deadline: '2026-04-05' },
  { id: 3, name: '目标检测数据集', type: '目标检测', total: 5000, done: 1200, status: 'paused', assignee: '王芳', deadline: '2026-04-20' },
  { id: 4, name: '医疗报告 NER 标注', type: '命名实体识别', total: 8000, done: 0, status: 'pending', assignee: '陈磊', deadline: '2026-04-30' },
];

const trainingJobs = [
  { id: 1, name: 'ChatGLM-4 微调 · 客服场景', model: 'ChatGLM-4', method: 'LoRA', status: 'running', progress: 68, epoch: '3/5', loss: 0.42, gpu: '4×A100' },
  { id: 2, name: 'Qwen-2.5 指令微调', model: 'Qwen-2.5-7B', method: 'QLoRA', status: 'success', progress: 100, epoch: '5/5', loss: 0.31, gpu: '2×A100' },
  { id: 3, name: 'BERT 分类器训练', model: 'BERT-base-zh', method: 'Full FT', status: 'failed', progress: 34, epoch: '2/10', loss: 1.24, gpu: '1×V100' },
  { id: 4, name: 'Llama-3 代码微调', model: 'Llama-3-8B', method: 'LoRA', status: 'queued', progress: 0, epoch: '0/5', loss: '—', gpu: '4×A100' },
];

const lossData = [
  { step: 100, loss: 2.1 }, { step: 200, loss: 1.6 }, { step: 300, loss: 1.2 },
  { step: 400, loss: 0.95 }, { step: 500, loss: 0.78 }, { step: 600, loss: 0.65 },
  { step: 700, loss: 0.55 }, { step: 800, loss: 0.48 }, { step: 900, loss: 0.44 }, { step: 1000, loss: 0.42 },
];

const qpsData = [
  { time: '00:00', qps: 420 }, { time: '04:00', qps: 280 }, { time: '08:00', qps: 890 },
  { time: '12:00', qps: 1240 }, { time: '16:00', qps: 1100 }, { time: '20:00', qps: 760 }, { time: '24:00', qps: 510 },
];

const inferenceServices = [
  { id: 1, name: 'ChatGLM-4 客服对话服务', model: 'ChatGLM-4', endpoint: '/api/infer/chatglm4-cs', status: 'online', qps: '1,240', latency: '82ms', calls: '1.2M' },
  { id: 2, name: 'Qwen-2.5 通用推理服务', model: 'Qwen-2.5-72B', endpoint: '/api/infer/qwen25-general', status: 'online', qps: '856', latency: '234ms', calls: '856K' },
  { id: 3, name: 'BERT 意图识别服务', model: 'BERT-base-zh', endpoint: '/api/infer/bert-intent', status: 'online', qps: '3,412', latency: '18ms', calls: '5.4M' },
  { id: 4, name: 'Llama-3 代码补全服务', model: 'Llama-3-8B', endpoint: '/api/infer/llama3-code', status: 'stopped', qps: '0', latency: '—', calls: '142K' },
];

const annTemplates = [
  { id: 1, name: '图像多分类模板', type: '图像分类', fields: 8, used: 3 },
  { id: 2, name: '情感三分类模板', type: '文本分类', fields: 3, used: 2 },
  { id: 3, name: 'BIO 命名实体模板', type: '序列标注', fields: 12, used: 1 },
  { id: 4, name: '目标框标注模板', type: '目标检测', fields: 6, used: 2 },
];

const modelVersions = [
  { id: 1, name: 'ChatGLM-4-cs-v1.2', base: 'ChatGLM-4', method: 'LoRA', size: '6.2B', loss: 0.42, created: '2026-04-08', status: 'deployed' },
  { id: 2, name: 'Qwen-2.5-7B-instruct-v1.0', base: 'Qwen-2.5-7B', method: 'QLoRA', size: '7.1B', loss: 0.31, created: '2026-04-05', status: 'available' },
  { id: 3, name: 'BERT-intent-v2.1', base: 'BERT-base-zh', method: 'Full FT', size: '0.4B', loss: 0.18, created: '2026-03-28', status: 'deployed' },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
const ORANGE = '#fa541c';

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

function SectionHeader({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <div className="w-1 h-4 rounded-full" style={{ background: ORANGE }} />
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
      style={{ fontSize: '12px', background: `linear-gradient(135deg,${ORANGE},#ff7a45)` }}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </button>
  );
}

const taskStatusCfg: Record<string, { label: string; color: string; bg: string }> = {
  running: { label: '进行中', color: '#3b82f6', bg: '#eff6ff' },
  done:    { label: '已完成', color: '#16a34a', bg: '#dcfce7' },
  paused:  { label: '已暂停', color: '#d97706', bg: '#fef3c7' },
  pending: { label: '待启动', color: '#64748b', bg: '#f1f5f9' },
};

const trainStatusCfg: Record<string, { label: string; color: string; bg: string }> = {
  running: { label: '训练中', color: '#fa541c', bg: '#fff7ed' },
  success: { label: '完成',   color: '#16a34a', bg: '#dcfce7' },
  failed:  { label: '失败',   color: '#dc2626', bg: '#fee2e2' },
  queued:  { label: '排队中', color: '#64748b', bg: '#f1f5f9' },
};

// ─── Panels ───────────────────────────────────────────────────────────────────

function AnnTasks() {
  return (
    <div className="p-6 space-y-5">
      <SectionHeader
        title="AI 标注任务"
        action={
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border hover:bg-gray-50 transition-all" style={{ fontSize: '12px', color: '#64748b', borderColor: '#e2e8f0' }}>
              <Upload className="w-3.5 h-3.5" /> 导入数据
            </button>
            <OrangeBtn icon={Plus}>新建标注任务</OrangeBtn>
          </div>
        }
      />

      <div className="grid grid-cols-4 gap-3">
        {[
          { label: '进行中', value: '1', color: '#3b82f6' },
          { label: '已完成', value: '1', color: '#16a34a' },
          { label: '已暂停', value: '1', color: '#d97706' },
          { label: '待启动', value: '1', color: '#94a3b8' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 text-center" style={{ border: '1px solid #f1ede9' }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {annotationTasks.map((task) => {
          const pct = Math.round((task.done / task.total) * 100);
          const cfg = taskStatusCfg[task.status];
          return (
            <div key={task.id} className="bg-white rounded-xl p-4" style={{ border: '1px solid #f1ede9' }}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>{task.name}</span>
                    <span className="px-2 py-0.5 rounded" style={{ fontSize: '11px', background: '#f1f5f9', color: '#475569' }}>{task.type}</span>
                    <span className="px-2 py-0.5 rounded-full" style={{ fontSize: '11px', background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                  </div>
                  <div className="flex items-center gap-3" style={{ fontSize: '12px', color: '#94a3b8' }}>
                    <span>负责人: {task.assignee}</span>
                    <span>截止: {task.deadline}</span>
                    <span>进度: {task.done.toLocaleString()} / {task.total.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {task.status === 'running' && <button className="p-1.5 rounded hover:bg-amber-50" style={{ color: '#d97706' }}><Pause className="w-4 h-4" /></button>}
                  {task.status === 'paused' && <button className="p-1.5 rounded hover:bg-orange-50" style={{ color: ORANGE }}><Play className="w-4 h-4" /></button>}
                  <button style={{ fontSize: '12px', color: ORANGE }} className="hover:underline">标注</button>
                  <button style={{ fontSize: '12px', color: '#64748b' }} className="hover:text-slate-800">详情</button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: '#f1f5f9' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, background: task.status === 'done' ? '#16a34a' : task.status === 'running' ? ORANGE : '#cbd5e1' }}
                  />
                </div>
                <span style={{ fontSize: '12px', color: '#64748b', minWidth: '36px', textAlign: 'right' }}>{pct}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AnnTemplates() {
  return (
    <div className="p-6 space-y-5">
      <SectionHeader title="标注模板" action={<OrangeBtn icon={Plus}>新建模板</OrangeBtn>} />
      <div className="grid grid-cols-2 gap-4">
        {annTemplates.map((t) => (
          <div key={t.id} className="bg-white rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer" style={{ border: '1px solid #f1ede9' }}>
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#fff7ed' }}>
                <FileText className="w-5 h-5" style={{ color: ORANGE }} />
              </div>
              <span className="px-2 py-0.5 rounded-full" style={{ fontSize: '11px', background: '#f1f5f9', color: '#64748b' }}>{t.type}</span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>{t.name}</div>
            <div className="flex items-center gap-4" style={{ fontSize: '12px', color: '#94a3b8' }}>
              <span>{t.fields} 个字段</span>
              <span>已使用 {t.used} 次</span>
            </div>
            <div className="flex items-center gap-2 mt-3 pt-3" style={{ borderTop: '1px solid #f1f5f9' }}>
              <button style={{ fontSize: '12px', color: ORANGE }} className="hover:underline">使用模板</button>
              <button style={{ fontSize: '12px', color: '#64748b' }} className="hover:text-slate-800">编辑</button>
              <button style={{ fontSize: '12px', color: '#ef4444' }} className="hover:underline">删除</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnnDatasets() {
  return (
    <div className="p-6 space-y-5">
      <SectionHeader title="数据集管理" action={<OrangeBtn icon={Upload}>上传数据集</OrangeBtn>} />
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="数据集总数" value="8" icon={Database} color={ORANGE} />
        <StatCard label="总数据量" value="156K" icon={Layers} color="#3b82f6" />
        <StatCard label="已标注" value="73%" icon={CheckCircle} color="#16a34a" />
      </div>
      <div className="space-y-2">
        {[
          { name: '商品图像数据集-v2', type: '图像分类', size: '12.4GB', count: '10,000', ann: 78 },
          { name: '用户评论语料库', type: '文本分类', size: '2.1GB', count: '50,000', ann: 100 },
          { name: '医疗影像标注集', type: '目标检测', size: '28.6GB', count: '5,000', ann: 24 },
          { name: 'NER 医疗报告集', type: '序列标注', size: '1.3GB', count: '8,000', ann: 0 },
        ].map((ds) => (
          <div key={ds.name} className="bg-white rounded-xl p-4 flex items-center justify-between" style={{ border: '1px solid #f1ede9' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#fff7ed' }}>
                <Database className="w-4 h-4" style={{ color: ORANGE }} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>{ds.name}</div>
                <div className="flex items-center gap-2 mt-0.5" style={{ fontSize: '11px', color: '#94a3b8' }}>
                  <span>{ds.type}</span><span>·</span><span>{ds.size}</span><span>·</span><span>{ds.count} 条</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-24 h-1.5 rounded-full overflow-hidden" style={{ background: '#f1f5f9' }}>
                  <div className="h-full rounded-full" style={{ width: `${ds.ann}%`, background: ds.ann === 100 ? '#16a34a' : ORANGE }} />
                </div>
                <span style={{ fontSize: '11px', color: '#64748b' }}>{ds.ann}%</span>
              </div>
              <button style={{ fontSize: '12px', color: ORANGE }} className="hover:underline">管理</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrainJobs() {
  const [selectedJob, setSelectedJob] = useState(trainingJobs[0]);
  return (
    <div className="p-6 space-y-5">
      <SectionHeader title="训练任务" action={<OrangeBtn icon={Plus}>新建训练任务</OrangeBtn>} />
      <div className="grid grid-cols-3 gap-5">
        {/* Job list */}
        <div className="space-y-2">
          {trainingJobs.map((job) => {
            const cfg = trainStatusCfg[job.status];
            return (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className="p-3 rounded-xl cursor-pointer transition-all"
                style={{
                  border: `1.5px solid ${selectedJob.id === job.id ? ORANGE : 'transparent'}`,
                  background: selectedJob.id === job.id ? '#fff7ed' : '#fff',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span style={{ fontSize: '13px', fontWeight: 500, color: '#1e293b' }}>{job.name}</span>
                  <span className="px-1.5 py-0.5 rounded-full" style={{ fontSize: '10px', background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                </div>
                <div className="flex items-center gap-1.5" style={{ fontSize: '11px' }}>
                  <span className="px-1.5 py-0.5 rounded" style={{ background: '#f5f3ff', color: '#7c3aed' }}>{job.method}</span>
                  <span style={{ color: '#94a3b8' }}>{job.model}</span>
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

        {/* Detail */}
        <div className="col-span-2 space-y-4">
          <div className="bg-white rounded-xl p-4" style={{ border: '1px solid #f1ede9' }}>
            <div className="flex items-center justify-between mb-3">
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>{selectedJob.name}</span>
              <span className="flex items-center gap-1" style={{ fontSize: '12px', color: '#64748b' }}>
                <Cpu className="w-3.5 h-3.5" /> {selectedJob.gpu}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: '训练进度', value: `${selectedJob.progress}%`, color: ORANGE },
                { label: '当前 Epoch', value: selectedJob.epoch, color: '#3b82f6' },
                { label: '训练 Loss', value: String(selectedJob.loss), color: '#8b5cf6' },
                { label: '微调方式', value: selectedJob.method, color: '#0d9488' },
              ].map((s) => (
                <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: `${s.color}08`, border: `1px solid ${s.color}15` }}>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>{s.label}</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4" style={{ border: '1px solid #f1ede9' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}>Loss 收敛曲线</div>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={lossData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="step" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis domain={[0, 2.5]} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px', border: '1px solid #f1ede9' }} />
                <Line type="monotone" dataKey="loss" stroke={ORANGE} strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrainConfig() {
  return (
    <div className="p-6 space-y-5">
      <SectionHeader title="训练配置" action={<OrangeBtn icon={CheckCircle}>保存配置</OrangeBtn>} />
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white rounded-xl p-5" style={{ border: '1px solid #f1ede9' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '14px' }}>基础配置</div>
          <div className="space-y-3">
            {[
              { label: '基础模型', value: 'ChatGLM-4', type: 'select' },
              { label: '微调方式', value: 'LoRA', type: 'select' },
              { label: 'Batch Size', value: '16', type: 'input' },
              { label: 'Learning Rate', value: '2e-4', type: 'input' },
              { label: 'Epoch 数', value: '5', type: 'input' },
              { label: 'LoRA Rank', value: '8', type: 'input' },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-3">
                <label style={{ fontSize: '12px', color: '#64748b', minWidth: '100px' }}>{f.label}</label>
                <input
                  defaultValue={f.value}
                  className="flex-1 rounded-lg px-3 py-2 focus:outline-none transition-all"
                  style={{ fontSize: '12px', border: '1px solid #e2e8f0', background: '#f8fafc' }}
                  onFocus={(e) => (e.target.style.borderColor = ORANGE)}
                  onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl p-5" style={{ border: '1px solid #f1ede9' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '14px' }}>资源配置</div>
          <div className="space-y-3">
            {[
              { label: 'GPU 类型', value: 'NVIDIA A100' },
              { label: 'GPU 数量', value: '4' },
              { label: '显存限制', value: '80GB × 4' },
              { label: '最大时长', value: '24h' },
              { label: '优先级', value: '普通' },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-3">
                <label style={{ fontSize: '12px', color: '#64748b', minWidth: '100px' }}>{f.label}</label>
                <input
                  defaultValue={f.value}
                  className="flex-1 rounded-lg px-3 py-2 focus:outline-none transition-all"
                  style={{ fontSize: '12px', border: '1px solid #e2e8f0', background: '#f8fafc' }}
                  onFocus={(e) => (e.target.style.borderColor = ORANGE)}
                  onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TrainVersions() {
  return (
    <div className="p-6 space-y-5">
      <SectionHeader title="模型版本" />
      <div className="space-y-3">
        {modelVersions.map((v) => (
          <div key={v.id} className="bg-white rounded-xl p-4" style={{ border: '1px solid #f1ede9' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#fff7ed' }}>
                  <Brain className="w-5 h-5" style={{ color: ORANGE }} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>{v.name}</span>
                    <span className="px-2 py-0.5 rounded-full" style={{
                      fontSize: '11px',
                      background: v.status === 'deployed' ? '#dcfce7' : '#f1f5f9',
                      color: v.status === 'deployed' ? '#16a34a' : '#64748b',
                    }}>
                      {v.status === 'deployed' ? '已部署' : '可用'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-0.5" style={{ fontSize: '12px', color: '#94a3b8' }}>
                    <span>基础: {v.base}</span>
                    <span>方式: {v.method}</span>
                    <span>大小: {v.size}</span>
                    <span>Loss: {v.loss}</span>
                    <span>创建: {v.created}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {v.status !== 'deployed' && <OrangeBtn icon={Zap}>部署推理</OrangeBtn>}
                <button style={{ fontSize: '12px', color: '#64748b' }} className="hover:text-slate-800">详情</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InferServices() {
  return (
    <div className="p-6 space-y-5">
      <SectionHeader title="推理服务" action={<OrangeBtn icon={Plus}>部署推理服务</OrangeBtn>} />
      <div className="grid grid-cols-4 gap-3">
        <StatCard label="在线服务" value="3" icon={Server} color="#16a34a" />
        <StatCard label="总调用次数" value="7.6M" icon={BarChart2} color="#3b82f6" />
        <StatCard label="平均延迟" value="111ms" icon={TrendingUp} color={ORANGE} />
        <StatCard label="今日 QPS" value="5,508" icon={Zap} color="#8b5cf6" />
      </div>

      <div className="space-y-3">
        {inferenceServices.map((svc) => (
          <div key={svc.id} className="bg-white rounded-xl p-4" style={{ border: '1px solid #f1ede9' }}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>{svc.name}</span>
                  <span className="px-2 py-0.5 rounded" style={{ fontSize: '11px', background: '#f5f3ff', color: '#7c3aed' }}>{svc.model}</span>
                  <span className="px-2 py-0.5 rounded-full" style={{
                    fontSize: '11px',
                    background: svc.status === 'online' ? '#dcfce7' : '#f1f5f9',
                    color: svc.status === 'online' ? '#16a34a' : '#64748b',
                  }}>
                    {svc.status === 'online' ? '在线' : '已停止'}
                  </span>
                </div>
                <div className="flex items-center gap-4" style={{ fontSize: '12px', color: '#94a3b8' }}>
                  <span className="font-mono" style={{ color: ORANGE }}>{svc.endpoint}</span>
                  <span>QPS: <strong style={{ color: '#374151' }}>{svc.qps}</strong></span>
                  <span>延迟: <strong style={{ color: '#374151' }}>{svc.latency}</strong></span>
                  <span>总调用: <strong style={{ color: '#374151' }}>{svc.calls}</strong></span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg hover:opacity-80 transition-all" style={{ fontSize: '12px', background: '#fff7ed', color: ORANGE }}>
                  <Zap className="w-3.5 h-3.5" /> 测试
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-all" style={{ fontSize: '12px', background: '#f1f5f9', color: '#64748b' }}>
                  <Settings2 className="w-3.5 h-3.5" /> 配置
                </button>
                {svc.status === 'online'
                  ? <button className="p-1.5 rounded hover:bg-amber-50" style={{ color: '#d97706' }}><Pause className="w-4 h-4" /></button>
                  : <button className="p-1.5 rounded hover:bg-orange-50" style={{ color: ORANGE }}><Play className="w-4 h-4" /></button>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InferMonitor() {
  return (
    <div className="p-6 space-y-5">
      <SectionHeader title="服务监控" action={
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border hover:bg-gray-50 transition-all" style={{ fontSize: '12px', color: '#64748b', borderColor: '#e2e8f0' }}>
          <RefreshCw className="w-3.5 h-3.5" /> 刷新
        </button>
      } />
      <div className="grid grid-cols-4 gap-3">
        <StatCard label="在线服务" value="3" icon={Server} color="#16a34a" />
        <StatCard label="异常告警" value="0" icon={AlertTriangle} color={ORANGE} />
        <StatCard label="P99 延迟" value="342ms" icon={TrendingUp} color="#3b82f6" />
        <StatCard label="成功率" value="99.9%" icon={CheckCircle} color="#0d9488" />
      </div>

      <div className="bg-white rounded-xl p-4" style={{ border: '1px solid #f1ede9' }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}>QPS 实时趋势</div>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={qpsData}>
            <defs>
              <linearGradient id="qpsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={ORANGE} stopOpacity={0.15} />
                <stop offset="95%" stopColor={ORANGE} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#94a3b8' }} />
            <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
            <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px', border: '1px solid #f1ede9' }} />
            <Area type="monotone" dataKey="qps" stroke={ORANGE} strokeWidth={2.5} fill="url(#qpsGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {inferenceServices.map((svc) => (
          <div key={svc.id} className="bg-white rounded-xl p-4" style={{ border: '1px solid #f1ede9' }}>
            <div className="flex items-center justify-between mb-2">
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{svc.name}</span>
              <span className="px-1.5 py-0.5 rounded-full shrink-0 ml-2" style={{
                fontSize: '10px',
                background: svc.status === 'online' ? '#dcfce7' : '#f1f5f9',
                color: svc.status === 'online' ? '#16a34a' : '#64748b',
              }}>
                {svc.status === 'online' ? '在线' : '停止'}
              </span>
            </div>
            {[
              ['QPS', svc.qps], ['延迟', svc.latency], ['总调用', svc.calls],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between" style={{ fontSize: '12px' }}>
                <span style={{ color: '#94a3b8' }}>{k}</span>
                <span style={{ fontWeight: 600, color: '#374151' }}>{v}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function InferApi() {
  return (
    <div className="p-6 space-y-5">
      <SectionHeader title="API 文档" />
      <div className="space-y-4">
        {inferenceServices.slice(0, 2).map((svc) => (
          <div key={svc.id} className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #f1ede9' }}>
            <div className="px-4 py-3 flex items-center gap-3" style={{ background: '#faf7f5', borderBottom: '1px solid #f1ede9' }}>
              <span className="px-2 py-0.5 rounded font-mono" style={{ fontSize: '11px', background: '#fff7ed', color: ORANGE, border: `1px solid ${ORANGE}30` }}>POST</span>
              <code style={{ fontSize: '13px', color: '#374151', fontWeight: 600 }}>{svc.endpoint}</code>
              <span className="ml-auto" style={{ fontSize: '12px', color: '#94a3b8' }}>{svc.name}</span>
            </div>
            <div className="p-4">
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px', fontWeight: 500 }}>请求示例</div>
              <pre className="rounded-xl p-3 font-mono overflow-x-auto" style={{ fontSize: '11px', lineHeight: 1.7, background: '#0a1520', color: '#a5f3fc' }}>
{`{
  "model": "${svc.model}",
  "messages": [{"role": "user", "content": "你好"}],
  "temperature": 0.7,
  "max_tokens": 2048
}`}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Placeholder({ title }: { title: string }) {
  return (
    <div className="p-6 flex items-center justify-center h-64">
      <div className="text-center">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: '#fff7ed' }}>
          <Brain className="w-6 h-6" style={{ color: ORANGE }} />
        </div>
        <h3 style={{ fontSize: '14px', fontWeight: 500, color: '#475569', marginBottom: '4px' }}>{title}</h3>
        <p style={{ fontSize: '12px', color: '#94a3b8' }}>内容自动填充中，请稍候…</p>
      </div>
    </div>
  );
}

const contentMap: Record<string, React.ReactNode> = {
  'ann-tasks': <AnnTasks />,
  'ann-templates': <AnnTemplates />,
  'ann-datasets': <AnnDatasets />,
  'train-jobs': <TrainJobs />,
  'train-config': <TrainConfig />,
  'train-versions': <TrainVersions />,
  'infer-services': <InferServices />,
  'infer-monitor': <InferMonitor />,
  'infer-api': <InferApi />,
};

export function AICapability() {
  const [activeKey, setActiveKey] = useState('ann-tasks');
  return (
    <SidebarLayout title="AI 能力" items={sidebarItems} activeKey={activeKey} onSelect={setActiveKey}>
      {contentMap[activeKey] ?? <Placeholder title={activeKey} />}
    </SidebarLayout>
  );
}
