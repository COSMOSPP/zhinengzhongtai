import React from 'react';
import { CalendarClock, Shield, HardDrive, Zap, Tag, Code2, AlertTriangle, Blocks } from 'lucide-react';

export function TaskScheduling() {
  return (
    <div className="p-6 h-[calc(100vh-60px)] flex flex-col bg-slate-50/50">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600 }}>超大型任务调度枢纽 (Scheduler Hub)</h2>
          <p className="text-[12px] text-slate-500 mt-1 max-w-4xl">
            提供基于信号量及时间的双擎触发机制。增强系统高并发执行安全，周期性清理服务端日志保障磁盘空间。支持客户端元数据访问提速、超长 SQL 承载、及复杂地域批次实例的规则衍生。
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4 overflow-hidden">
         
         {/* Top Stats & Quick Rules */}
         <div className="grid grid-cols-4 gap-4 shrink-0">
            {[
              { i: Shield, label: '调度引擎安全级别', sub: '加强防宕机保护', v: '高保障' },
              { i: HardDrive, label: '服务端废弃日志', sub: '保障系统磁盘不拉爆', v: '周期性清理在轨' },
              { i: Zap, label: '客户端访问链路', sub: '元数据双端缓存架构', v: '已提速优化' },
              { i: Code2, label: '风险脚本环境', sub: '单独立点隔离运行', v: '超长 SQL 承载就绪' },
            ].map((s, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-lg p-3 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                       <s.i className="w-4 h-4"/>
                    </div>
                    <div>
                      <div className="text-[12px] font-semibold text-slate-700">{s.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{s.sub}</div>
                    </div>
                 </div>
                 <div className="text-orange-600 text-[11px] font-medium whitespace-nowrap bg-orange-50 px-2 py-0.5 rounded border border-orange-100">{s.v}</div>
              </div>
            ))}
         </div>

         {/* Main Config Areas */}
         <div className="flex-1 grid grid-cols-3 gap-4 overflow-hidden">
            {/* Left: General Sch Config */}
            <div className="bg-white border text-[12px] border-gray-100 rounded-xl shadow-sm p-4 overflow-auto">
               <h3 className="font-semibold text-[13px] text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                 <CalendarClock className="w-4 h-4 text-orange-500"/> 调度基本特征与衍生实例标签
               </h3>
               <div className="space-y-4 text-slate-600">
                  <div className="grid grid-cols-2 gap-3">
                     <div>
                       <label className="block text-slate-400 mb-1 text-[11px]">批次生成号格式</label>
                       <input readOnly value="SCH_BATCH_[yyyyMMdd]" className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none" />
                     </div>
                     <div>
                       <label className="block text-slate-400 mb-1 text-[11px]">自定义批次偏移运算</label>
                       <input readOnly value="T-1, T+0 保留窗口" className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none" />
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                     <div>
                       <label className="block text-slate-400 mb-1 text-[11px]">生效卡点时间</label>
                       <input readOnly value="2026-04-01 00:00:00" className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none" />
                     </div>
                     <div>
                       <label className="block text-slate-400 mb-1 text-[11px]">强制失效期限</label>
                       <input readOnly value="永久有效 (9999-12-31)" className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none" />
                     </div>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 text-[11px]">并发与运行约束 (Locks)</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 focus:outline-none">
                       <option>前一实例挂起时不触发新实例</option>
                    </select>
                  </div>
                  <div className="pt-2">
                    <label className="text-slate-400 text-[11px] flex gap-1 mb-2 items-center"><Tag className="w-3 h-3"/> 运行时环境标签打标注入</label>
                    <div className="flex gap-2 flex-wrap">
                       <span className="bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded text-[11px]">大数据高优组</span>
                       <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded text-[11px]">只读隔离库</span>
                    </div>
                  </div>
               </div>
            </div>

            {/* Middle: Instantiation Rules via Geography */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 overflow-auto flex flex-col">
               <h3 className="font-semibold text-[13px] text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                 <Blocks className="w-4 h-4 text-orange-500"/> 基于地域模型的实例繁衍规则
               </h3>
               <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">
                  在调度生成庞大子任务实例群时，可根据实例预制规则组生成多种切割运行的算子，极大简化分片业务（如省份核算）。
               </p>
               <div className="flex-1 space-y-2 text-[12px]">
                  {[
                    { n: '集团及31分省标准视图', sub: '1个主表实例 + 31个并行自省计算实例' },
                    { n: '1:32 分账省份矩阵', sub: '拆分32个物理流并行' },
                    { n: '26个转售子商切片', sub: '基于转售商维度隔离 26 个实例' },
                    { n: '1:1 特定点对点化', sub: '非拆分模式单体运行' },
                    { n: '1:32 分省计算资源 (800型)', sub: '专供高负载型800节点路由实例化' },
                    { n: '1:31 分省缩写码/旧码转化', sub: '自动衍生兼容旧码本的调度批次' },
                    { n: '24时精确账期维度', sub: '将大表依照24小时窗口劈分为24个独立小任务' }
                  ].map((r, i) => (
                    <div key={i} className="flex justify-between items-center p-2 rounded hover:bg-orange-50 border border-transparent hover:border-orange-100 cursor-pointer">
                       <div>
                         <div className="font-medium text-slate-700">{r.n}</div>
                         <div className="text-[10px] text-slate-400 mt-0.5">{r.sub}</div>
                       </div>
                       <input type="radio" name="instance_rule" className="accent-orange-500 w-3 h-3" defaultChecked={i===0} />
                    </div>
                  ))}
               </div>
            </div>

            {/* Right: Emergency Controls */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm p-4 overflow-auto flex flex-col text-slate-300">
               <h3 className="font-semibold text-[13px] text-white mb-4 pb-2 border-b border-slate-700 flex items-center gap-2">
                 <AlertTriangle className="w-4 h-4 text-red-400"/> 防雪崩制动阀门与警官接口
               </h3>
               <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
                  深入管控数据采集与前接核心环境的异常雪崩情况，提供状态监听。
               </p>
               
               <div className="space-y-4">
                  <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/50">
                     <label className="flex items-start gap-3">
                        <input type="checkbox" defaultChecked className="mt-1 accent-orange-500" />
                        <div>
                           <div className="text-[12px] font-medium text-red-200">Warning 接口暴露维测感知</div>
                           <div className="text-[10px] text-slate-400 mt-1">通过暴露专用的 WARNING Hook 接口，同步任务底层状态栈和多维环境报警信息给第三方监控大盘。</div>
                        </div>
                     </label>
                  </div>
                  <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/50">
                     <label className="flex items-start gap-3">
                        <input type="checkbox" defaultChecked className="mt-1 accent-orange-500" />
                        <div>
                           <div className="text-[12px] font-medium text-orange-200">CHECK 文件强依赖超时制裁结单</div>
                           <div className="text-[10px] text-slate-400 mt-1">当强核对账的 CHECK 文件由于底层数仓发车故障持续挂起未到达时，延迟特定的容忍时间戳后，强制抛出异常结束本次采集任务轮转，释放线程池。</div>
                        </div>
                     </label>
                  </div>
                  <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/50">
                     <label className="flex items-start gap-3">
                        <input type="checkbox" defaultChecked className="mt-1 accent-orange-500" />
                        <div>
                           <div className="text-[12px] font-medium text-orange-200">阻断性质量稽核级联挂起控制</div>
                           <div className="text-[10px] text-slate-400 mt-1">在通过网关下放接口文件时，如果前置的数据质量规则引擎评估处于`Failed`阶段，直接在调度队列斩杀该次采集数据分发，避免差错穿透。</div>
                        </div>
                     </label>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
