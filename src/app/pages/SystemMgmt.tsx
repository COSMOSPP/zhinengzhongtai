import React, { useState } from 'react';
import { SidebarLayout, SidebarItem } from '../components/SidebarLayout';
import {
  Users, Shield, Network, FileText, Monitor, BellRing
} from 'lucide-react';
import { UserMgmt } from './system/UserMgmt';
import { RoleMgmt } from './system/RoleMgmt';
import { OrgMgmt } from './system/OrgMgmt';
import { LogConfig } from './system/LogConfig';
import { MonitorMgmt } from './system/MonitorMgmt';
import { AlertMgmt } from './system/AlertMgmt';

const sidebarItems: SidebarItem[] = [
  {
    key: 'account',
    label: '账号管理',
    icon: Users,
    children: [
      { key: 'user-mgmt', label: '用户管理', icon: Users },
      { key: 'role-mgmt', label: '权限配置', icon: Shield },
      { key: 'org-mgmt', label: '组织建构管理', icon: Network },
    ],
  },
  {
    key: 'log',
    label: '安全日志审计',
    icon: FileText,
    children: [
      { key: 'log-config', label: '日志配置规范', icon: FileText },
    ],
  },
  {
    key: 'monitor',
    label: '监控告警',
    icon: Monitor,
    children: [
      { key: 'monitor-mgmt', label: '监控管理', icon: Monitor },
      { key: 'alert-mgmt', label: '告警管理', icon: BellRing },
    ],
  },
];

function Placeholder({ title }: { title: string }) {
  return (
    <div className="p-6 flex items-center justify-center h-[calc(100vh-56px)] bg-slate-50/30">
      <div className="text-center">
        <div className="w-14 h-14 bg-white border border-gray-100 shadow-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Monitor className="w-7 h-7 text-[#fa541c]" />
        </div>
        <h3 className="text-slate-700 mb-1.5" style={{ fontSize: '15px', fontWeight: 600 }}>{title} 正在建设</h3>
        <p className="text-slate-500" style={{ fontSize: '12.5px' }}>该模块功能页面配置将随后续需求持续补充</p>
      </div>
    </div>
  );
}

const contentMap: Record<string, React.ReactNode> = {
  'user-mgmt': <UserMgmt />,
  'role-mgmt': <RoleMgmt />,
  'org-mgmt': <OrgMgmt />,
  'log-config': <LogConfig />,
  'monitor-mgmt': <MonitorMgmt />,
  'alert-mgmt': <AlertMgmt />,
};

export function SystemMgmt() {
  const [activeKey, setActiveKey] = useState('user-mgmt');
  
  return (
    <SidebarLayout title="系统管理" items={sidebarItems} activeKey={activeKey} onSelect={setActiveKey}>
      {contentMap[activeKey] ?? <Placeholder title={activeKey} />}
    </SidebarLayout>
  );
}