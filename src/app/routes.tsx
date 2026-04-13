import { createHashRouter, Navigate } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { CapabilityDev } from './pages/CapabilityDev';
import { DataGovernance } from './pages/DataGovernance';
import { DevTools } from './pages/DevTools';
import { AIAnnotation } from './pages/AIAnnotation';
import { AITraining } from './pages/AITraining';
import { AIInference } from './pages/AIInference';
import { SystemMgmt } from './pages/SystemMgmt';

function NotFound() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-56px)]" style={{ background: '#f4f5f7' }}>
      <div className="text-center">
        <div className="text-slate-300" style={{ fontSize: '72px', fontWeight: 700 }}>404</div>
        <div className="text-slate-500 mt-2" style={{ fontSize: '16px' }}>页面不存在或功能即将上线</div>
        <a href="/" className="mt-4 inline-block px-4 py-2 text-white rounded-lg hover:opacity-90 transition-all" style={{ fontSize: '14px', background: '#fa541c' }}>
          返回首页
        </a>
      </div>
    </div>
  );
}

export const router = createHashRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'capability-dev', Component: CapabilityDev },
      { path: 'data-governance', Component: DataGovernance },
      { path: 'dev-tools', Component: DevTools },
      // AI sub-routes
      { path: 'ai', element: <Navigate to="/ai/annotation" replace /> },
      { path: 'ai/annotation', Component: AIAnnotation },
      { path: 'ai/annotation/:tab', Component: AIAnnotation },
      { path: 'ai/training', Component: AITraining },
      { path: 'ai/training/:tab', Component: AITraining },
      { path: 'ai/inference', Component: AIInference },
      { path: 'ai/inference/:tab', Component: AIInference },
      { path: 'system-mgmt', Component: SystemMgmt },
      { path: '*', Component: NotFound },
    ],
  },
]);
