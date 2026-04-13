import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export interface SidebarItem {
  key: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: SidebarItem[];
}

interface SidebarLayoutProps {
  title: string;
  items: SidebarItem[];
  activeKey: string;
  onSelect: (key: string) => void;
  children: React.ReactNode;
}

function SidebarNode({
  item,
  depth,
  activeKey,
  onSelect,
}: {
  item: SidebarItem;
  depth: number;
  activeKey: string;
  onSelect: (key: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = activeKey === item.key;

  return (
    <div>
      <button
        onClick={() => {
          if (hasChildren) setOpen((v) => !v);
          else onSelect(item.key);
        }}
        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-left ${
          isActive && !hasChildren
            ? 'text-white shadow-sm'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        }`}
        style={{
          paddingLeft: `${12 + depth * 16}px`,
          fontSize: '13px',
          background: isActive && !hasChildren ? '#fa541c' : undefined,
        }}
      >
        {item.icon && <item.icon className="w-4 h-4 shrink-0" />}
        <span className="flex-1">{item.label}</span>
        {hasChildren &&
          (open ? (
            <ChevronDown className="w-3.5 h-3.5 shrink-0" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          ))}
      </button>
      {hasChildren && open && (
        <div>
          {item.children!.map((child) => (
            <SidebarNode
              key={child.key}
              item={child}
              depth={depth + 1}
              activeKey={activeKey}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function SidebarLayout({
  title,
  items,
  activeKey,
  onSelect,
  children,
}: SidebarLayoutProps) {
  return (
    <div className="flex h-[calc(100vh-56px)]">
      {/* Sidebar */}
      <aside
        className="w-56 shrink-0 bg-white border-r border-gray-100 flex flex-col overflow-y-auto"
        style={{ boxShadow: '2px 0 8px rgba(0,0,0,0.04)' }}
      >
        <div
          className="px-4 py-3 border-b border-gray-100"
          style={{ background: 'linear-gradient(135deg,#fff7ed,#fff9f5)' }}
        >
          <span className="text-slate-700" style={{ fontSize: '13px', fontWeight: 600 }}>
            {title}
          </span>
        </div>
        <nav className="flex-1 p-2 space-y-0.5">
          {items.map((item) => (
            <SidebarNode
              key={item.key}
              item={item}
              depth={0}
              activeKey={activeKey}
              onSelect={onSelect}
            />
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto" style={{ background: '#f4f5f7' }}>
        {children}
      </main>
    </div>
  );
}