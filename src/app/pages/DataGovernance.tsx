import React, { useState } from 'react';
import { SidebarLayout, SidebarItem } from '../components/SidebarLayout';
import {
  Database, LayoutGrid, CheckCircle2, BookOpen, Tag, Settings, FileKey2, ShieldCheck
} from 'lucide-react';
import { MetadataConfig } from './governance/MetadataConfig';
import { AssetTagging } from './governance/AssetTagging';
import { AssetCatalog } from './governance/AssetCatalog';
import { AuditEngine } from './governance/AuditEngine';
import { ModelQuality } from './governance/ModelQuality';

const sidebarItems: SidebarItem[] = [
  {
    key: 'metadata',
    label: '元数据管理',
    icon: Database,
    children: [
      { key: 'metadata-config', label: '元数据配置', icon: Settings },
    ],
  },
  {
    key: 'assets',
    label: '数据资产管理',
    icon: LayoutGrid,
    children: [
      { key: 'assets-tagging', label: '资产标注', icon: Tag },
      { key: 'assets-catalog', label: '资产目录', icon: BookOpen },
    ],
  },
  {
    key: 'governance',
    label: '数据治理管理',
    icon: CheckCircle2,
    children: [
      { key: 'audit-engine', label: '稽核引擎', icon: FileKey2 },
      { key: 'model-quality', label: '模型质量管理', icon: ShieldCheck },
    ],
  },
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
  'metadata-config': <MetadataConfig />,
  'assets-tagging': <AssetTagging />,
  'assets-catalog': <AssetCatalog />,
  'audit-engine': <AuditEngine />,
  'model-quality': <ModelQuality />,
};

export function DataGovernance() {
  const [activeKey, setActiveKey] = useState('metadata-config');
  return (
    <SidebarLayout title="数据治理中心" items={sidebarItems} activeKey={activeKey} onSelect={setActiveKey}>
      {contentMap[activeKey] ?? <Placeholder title={activeKey} />}
    </SidebarLayout>
  );
}