import React, { useState } from 'react';
import { SidebarLayout, SidebarItem } from '../components/SidebarLayout';
import {
  Code2, Download, Terminal, Settings, ListTodo, Wrench, PackageSearch
} from 'lucide-react';

import { WebIDE } from './devtools/WebIDE';
import { DataCollection } from './devtools/DataCollection';
import { DataSync } from './devtools/DataSync';
import { DataSharing } from './devtools/DataSharing';
import { TaskCreation } from './devtools/TaskCreation';
import { TaskExecution } from './devtools/TaskExecution';
import { TaskScheduling } from './devtools/TaskScheduling';
import { OfflineDev } from './devtools/OfflineDev';
import { DataStandardMgmt } from './devtools/DataStandardMgmt';
import { ModelLifecycle } from './devtools/ModelLifecycle';

// ─── Sidebar ─────────────────────────────────────────────────────────────────
const sidebarItems: SidebarItem[] = [
  {
    key: 'data-dev-tool',
    label: '数据开发工具',
    icon: Wrench,
    children: [
      { key: 'offline-dev', label: '离线开发' },
    ],
  },
  {
    key: 'app-dev',
    label: '数据应用开发工具',
    icon: Code2,
    children: [
      { key: 'web-ide', label: 'WEB IDE', icon: Terminal },
    ],
  },
  {
    key: 'collect',
    label: '共享采集工具',
    icon: Download,
    children: [
      { key: 'data-collect', label: '数据采集' },
      { key: 'data-sync', label: '数据同步' },
      { key: 'data-share', label: '数据共享' },
    ],
  },
  {
    key: 'task-mgmt',
    label: '任务管理工具',
    icon: ListTodo,
    children: [
      { key: 'task-creation', label: '任务制定' },
      { key: 'task-execution', label: '任务执行' },
      { key: 'task-scheduling', label: '任务调度' },
    ],
  },
  {
    key: 'model-mgmt-tool',
    label: '数据模型管理工具',
    icon: PackageSearch,
    children: [
      { key: 'data-standard', label: '数据标注管理' },
      { key: 'model-lifecycle', label: '模型生命周期管理' },
    ],
  }
];

function Placeholder({ title }: { title: string }) {
  return (
    <div className="p-6 flex items-center justify-center h-64 bg-slate-50/50">
      <div className="text-center">
        <h3 className="text-slate-600 mb-1" style={{ fontSize: '14px', fontWeight: 500 }}>{title} 正在建设</h3>
      </div>
    </div>
  );
}

const contentMap: Record<string, React.ReactNode> = {
  'offline-dev': <OfflineDev />,
  'web-ide': <WebIDE />,
  'data-collect': <DataCollection />,
  'data-sync': <DataSync />,
  'data-share': <DataSharing />,
  'task-creation': <TaskCreation />,
  'task-execution': <TaskExecution />,
  'task-scheduling': <TaskScheduling />,
  'data-standard': <DataStandardMgmt />,
  'model-lifecycle': <ModelLifecycle />,
};

export function DevTools() {
  const [activeKey, setActiveKey] = useState('offline-dev');
  return (
    <SidebarLayout title="大数据开发工具" items={sidebarItems} activeKey={activeKey} onSelect={setActiveKey}>
      {contentMap[activeKey] ?? <Placeholder title={activeKey} />}
    </SidebarLayout>
  );
}