"use client";

import { useState } from "react";
import {
  Buildings,
  Storefront,
  User,
  CaretRight,
  CaretDown,
  DotsThree,
} from "@phosphor-icons/react";
import { Tag, TagColor, TagVariant, TagSize, TagShape } from "@juspay/blend-design-system";

// ─── Custom hierarchy SVG icons ───────────────────────────────────────────────

// Sub-merchant: simple stroke circle
function SubMerchantIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="5.5" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

// Sub-sub-merchant: 1 circle top + 2 rectangles bottom
function SubSubMerchantIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Top circle */}
      <circle cx="10" cy="3.5" r="2.5" stroke={color} strokeWidth="1.4" />
      {/* Vertical stem */}
      <line x1="10" y1="6" x2="10" y2="9" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      {/* Horizontal crossbar */}
      <line x1="4" y1="9" x2="16" y2="9" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      {/* Left drop */}
      <line x1="4" y1="9" x2="4" y2="11" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      {/* Right drop */}
      <line x1="16" y1="9" x2="16" y2="11" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      {/* Bottom-left rectangle */}
      <rect x="1" y="11" width="6" height="4" rx="1" stroke={color} strokeWidth="1.4" />
      {/* Bottom-right rectangle */}
      <rect x="13" y="11" width="6" height="4" rx="1" stroke={color} strokeWidth="1.4" />
    </svg>
  );
}

// Sub-sub-sub-merchant: 1 circle top + 3 rectangles bottom
function SubSubSubMerchantIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Top circle */}
      <circle cx="10" cy="3.5" r="2.5" stroke={color} strokeWidth="1.4" />
      {/* Vertical stem */}
      <line x1="10" y1="6" x2="10" y2="9" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      {/* Horizontal crossbar */}
      <line x1="3" y1="9" x2="17" y2="9" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      {/* Left drop */}
      <line x1="3" y1="9" x2="3" y2="11" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      {/* Centre drop */}
      <line x1="10" y1="9" x2="10" y2="11" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      {/* Right drop */}
      <line x1="17" y1="9" x2="17" y2="11" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      {/* Bottom-left rect */}
      <rect x="0.5" y="11" width="5" height="3.5" rx="1" stroke={color} strokeWidth="1.4" />
      {/* Bottom-centre rect */}
      <rect x="7.5" y="11" width="5" height="3.5" rx="1" stroke={color} strokeWidth="1.4" />
      {/* Bottom-right rect */}
      <rect x="14.5" y="11" width="5" height="3.5" rx="1" stroke={color} strokeWidth="1.4" />
    </svg>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

type NodeType =
  | "tenant"
  | "reseller"
  | "merchant"
  | "sub-merchant"
  | "sub-sub-merchant"
  | "sub-sub-sub-merchant";

interface TreeNode {
  id: string;
  label: string;
  type: NodeType;
  level: number;
  children?: TreeNode[];
  parentId?: string;
  status: "Active" | "Inactive";
}

// ─── Config per node type ─────────────────────────────────────────────────────

type NodeConfig = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: any;
  bgColor: string;
  iconColor: string;
  typeLabel: string;
};

function getNodeConfig(type: NodeType): NodeConfig {
  switch (type) {
    case "tenant":
      return { Icon: Buildings,     bgColor: "#DBEAFE", iconColor: "#1D4ED8", typeLabel: "Tenant" };
    case "reseller":
      return { Icon: Storefront,    bgColor: "#DCFCE7", iconColor: "#15803D", typeLabel: "Reseller" };
    case "merchant":
      return { Icon: User,          bgColor: "#EDE9FE", iconColor: "#6D28D9", typeLabel: "Merchant" };
    case "sub-merchant":
      return { Icon: SubMerchantIcon,       bgColor: "#FEF3C7", iconColor: "#D97706", typeLabel: "Sub-merchant" };
    case "sub-sub-merchant":
      return { Icon: SubSubMerchantIcon,    bgColor: "#FFEDD5", iconColor: "#EA580C", typeLabel: "Sub-sub-merchant" };
    case "sub-sub-sub-merchant":
      return { Icon: SubSubSubMerchantIcon, bgColor: "#FEE2E2", iconColor: "#DC2626", typeLabel: "Sub-sub-sub-merchant" };
  }
}

function levelLabel(level: number): string {
  return `L${level}`;
}

// ─── Tree data ────────────────────────────────────────────────────────────────

const TREE_DATA: TreeNode[] = [
  {
    id: "globalpay",
    label: "GlobalPay",
    type: "tenant",
    level: 0,
    status: "Active",
    children: [
      {
        id: "apex-resellers",
        label: "Apex Resellers",
        type: "reseller",
        level: 1,
        status: "Active",
        parentId: "globalpay",
        children: [
          {
            id: "acme-corp",
            label: "Acme Corp",
            type: "merchant",
            level: 2,
            status: "Active",
            parentId: "apex-resellers",
            children: [
              {
                id: "acme-north",
                label: "Acme North",
                type: "sub-merchant",
                level: 3,
                status: "Active",
                parentId: "acme-corp",
                children: [
                  {
                    id: "delhi-retail",
                    label: "Delhi Retail",
                    type: "sub-sub-merchant",
                    level: 4,
                    status: "Active",
                    parentId: "acme-north",
                    children: [
                      { id: "delhi-cp",      label: "Delhi CP",        type: "sub-sub-sub-merchant", level: 5, status: "Active", parentId: "delhi-retail" },
                      { id: "delhi-south",   label: "Delhi South",     type: "sub-sub-sub-merchant", level: 5, status: "Active", parentId: "delhi-retail" },
                      { id: "delhi-north",   label: "Delhi North",     type: "sub-sub-sub-merchant", level: 5, status: "Active", parentId: "delhi-retail" },
                    ],
                  },
                  {
                    id: "mumbai-retail",
                    label: "Mumbai Retail",
                    type: "sub-sub-merchant",
                    level: 4,
                    status: "Active",
                    parentId: "acme-north",
                    children: [
                      { id: "mumbai-west",   label: "Mumbai West",     type: "sub-sub-sub-merchant", level: 5, status: "Active", parentId: "mumbai-retail" },
                      { id: "mumbai-east",   label: "Mumbai East",     type: "sub-sub-sub-merchant", level: 5, status: "Active", parentId: "mumbai-retail" },
                    ],
                  },
                ],
              },
              {
                id: "acme-south",
                label: "Acme South",
                type: "sub-merchant",
                level: 3,
                status: "Active",
                parentId: "acme-corp",
                children: [
                  {
                    id: "pune-retail",
                    label: "Pune Retail",
                    type: "sub-sub-merchant",
                    level: 4,
                    status: "Active",
                    parentId: "acme-south",
                    children: [
                      { id: "pune-hinjewadi", label: "Pune Hinjewadi", type: "sub-sub-sub-merchant", level: 5, status: "Active", parentId: "pune-retail" },
                      { id: "pune-kothrud",   label: "Pune Kothrud",   type: "sub-sub-sub-merchant", level: 5, status: "Active", parentId: "pune-retail" },
                    ],
                  },
                  { id: "hyderabad-retail",  label: "Hyderabad Retail",  type: "sub-sub-merchant", level: 4, status: "Active", parentId: "acme-south" },
                  { id: "bangalore-retail",  label: "Bangalore Retail",  type: "sub-sub-merchant", level: 4, status: "Active", parentId: "acme-south" },
                  { id: "chennai-retail",    label: "Chennai Retail",    type: "sub-sub-merchant", level: 4, status: "Active", parentId: "acme-south" },
                ],
              },
              { id: "acme-east", label: "Acme East", type: "sub-merchant", level: 3, status: "Active", parentId: "acme-corp" },
            ],
          },
          { id: "zeta-payments",  label: "Zeta Payments",  type: "merchant", level: 2, status: "Active", parentId: "apex-resellers" },
          { id: "bluestar-retail", label: "BlueStar Retail", type: "merchant", level: 2, status: "Active", parentId: "apex-resellers" },
        ],
      },
      { id: "nova-resellers",  label: "Nova Resellers",  type: "reseller", level: 1, status: "Active", parentId: "globalpay" },
      { id: "orbit-partners",  label: "Orbit Partners",  type: "reseller", level: 1, status: "Active", parentId: "globalpay" },
    ],
  },
];

// ─── Tree utilities ───────────────────────────────────────────────────────────

function findNodeById(nodes: TreeNode[], id: string): TreeNode | null {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return null;
}

function getAncestorPath(nodes: TreeNode[], targetId: string, path: TreeNode[] = []): TreeNode[] | null {
  for (const node of nodes) {
    const newPath = [...path, node];
    if (node.id === targetId) return newPath;
    if (node.children) {
      const result = getAncestorPath(node.children, targetId, newPath);
      if (result) return result;
    }
  }
  return null;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ROW_H = 32;
const INDENT = 28;   // INDENT/2 = 14 = paddingLeft(4) + iconWidth/2(10) → lines align under icon center
const LINE_COLOR = "#D1D5DB";

// ─── Tree node row ────────────────────────────────────────────────────────────

interface TreeRowProps {
  node: TreeNode;
  expanded: Set<string>;
  selectedId: string;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
  isLast: boolean;
  parentLines: boolean[];
}

function TreeRow({ node, expanded, selectedId, onToggle, onSelect, isLast, parentLines }: TreeRowProps) {
  const config = getNodeConfig(node.type);
  const isExpanded = expanded.has(node.id);
  const isSelected = node.id === selectedId;
  const hasChildren = !!(node.children && node.children.length > 0);
  const childCount = node.children?.length ?? 0;
  const depth = parentLines.length;
  const [hovered, setHovered] = useState(false);

  const childParentLines = [...parentLines, !isLast];

  return (
    <>
      <div
        style={{ display: "flex", alignItems: "center", height: ROW_H, cursor: "pointer", userSelect: "none" }}
        onClick={() => { onSelect(node.id); if (hasChildren && depth > 0) onToggle(node.id); }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Ancestor guide-line columns — vertical pass-through if that ancestor still has siblings below */}
        {parentLines.slice(1).map((showLine, i) => (
          <div key={i} style={{ width: INDENT, height: ROW_H, flexShrink: 0, position: "relative" }}>
            {showLine && (
              <div style={{ position: "absolute", left: INDENT / 2, top: 0, bottom: 0, width: 1, background: LINE_COLOR }} />
            )}
          </div>
        ))}

        {/* Connector column — always rendered for non-root nodes */}
        {depth > 0 && (
          <div style={{ width: INDENT, height: ROW_H, flexShrink: 0, position: "relative" }}>
            {/* Rounded L-shape: top half vertical + curve into horizontal */}
            <div style={{
              position: "absolute",
              left: INDENT / 2,
              top: 0,
              height: ROW_H / 2 + 6,
              width: INDENT / 2,
              borderLeft: `1px solid ${LINE_COLOR}`,
              borderBottom: `1px solid ${LINE_COLOR}`,
              borderBottomLeftRadius: 6,
            }} />
            {/* Continue vertical below curve only if this node has more siblings */}
            {!isLast && (
              <div style={{ position: "absolute", left: INDENT / 2, top: ROW_H / 2 + 6, bottom: 0, width: 1, background: LINE_COLOR }} />
            )}
          </div>
        )}

        {/* Node content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 6,
            height: ROW_H - 4,
            borderRadius: 6,
            paddingLeft: 4,
            paddingRight: 10,
            marginRight: 6,
            background: isSelected ? "#F3F4F6" : hovered ? "#F8FAFC" : "transparent",
            transition: "background 0.1s",
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: 20, height: 20, borderRadius: 5,
              background: config.bgColor,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}
          >
            <config.Icon size={12} color={config.iconColor} weight="regular" />
          </div>

          {/* Label */}
          <span
            style={{
              fontSize: 13,
              fontWeight: isSelected ? 600 : 400,
              color: isSelected ? "#111827" : "#374151",
              flex: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              lineHeight: "18px",
            }}
          >
            {node.label}
          </span>

          {/* Count badge — only when collapsed and has children */}
          {hasChildren && !isExpanded && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: isSelected ? "#374151" : "#6B7280",
                background: isSelected ? "#E5E7EB" : "#F3F4F6",
                borderRadius: 10,
                padding: "1px 6px",
                lineHeight: "16px",
                flexShrink: 0,
              }}
            >
              {childCount}
            </span>
          )}

          {/* Tenant tag — only on root node */}
          {depth === 0 && (
            <span style={{ display: "inline-flex", alignItems: "center", fontSize: 11, fontWeight: 500, color: "#3B72F6", background: "#EEF3FF", border: "1px solid #C7D7FD", borderRadius: 999, padding: "2px 10px", lineHeight: "16px", flexShrink: 0 }}>
              Tenant
            </span>
          )}

          {/* Caret */}
          {hasChildren && depth > 0 && (
            isExpanded
              ? <CaretDown size={12} color={isSelected ? "#374151" : "#9CA3AF"} weight="bold" />
              : <CaretRight size={12} color={isSelected ? "#374151" : "#9CA3AF"} weight="bold" />
          )}
        </div>
      </div>

      {/* Children */}
      {isExpanded && hasChildren &&
        node.children!.map((child, idx) => (
          <TreeRow
            key={child.id}
            node={child}
            expanded={expanded}
            selectedId={selectedId}
            onToggle={onToggle}
            onSelect={onSelect}
            isLast={idx === node.children!.length - 1}
            parentLines={childParentLines}
          />
        ))}
    </>
  );
}

// ─── Detail panel ─────────────────────────────────────────────────────────────

function DetailField({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div
      style={{
        flex: "1 1 calc(50% - 12px)", minWidth: 200,
        background: "#FAFAFA", borderRadius: 8, padding: "14px 18px",
        display: "flex", flexDirection: "column", gap: 6,
      }}
    >
      <span style={{ fontSize: 11, fontWeight: 500, color: "#9CA3AF", lineHeight: "16px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
        {label}
      </span>
      <span style={{ fontSize: 14, fontWeight: 500, color: "#111827", lineHeight: "20px" }}>{value}</span>
    </div>
  );
}

function DetailPanel({ nodeId }: { nodeId: string }) {
  const node = findNodeById(TREE_DATA, nodeId);
  const path = getAncestorPath(TREE_DATA, nodeId) ?? [];
  if (!node) return null;

  const config = getNodeConfig(node.type);
  const parentNode = node.parentId ? findNodeById(TREE_DATA, node.parentId) : null;

  let crumbs: Array<{ label: string; dots?: boolean }> = [];
  if (path.length <= 4) {
    crumbs = path.map((n) => ({ label: n.label }));
  } else {
    crumbs = [
      { label: path[0].label },
      { label: "...", dots: true },
      ...path.slice(-3).map((n) => ({ label: n.label })),
    ];
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Breadcrumb */}
      <div style={{ padding: "14px 28px", borderBottom: "1px solid #F3F4F6", display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
        {crumbs.map((crumb, idx) => (
          <span key={idx} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {idx > 0 && <span style={{ color: "#D1D5DB", fontSize: 13 }}>/</span>}
            {crumb.dots
              ? <DotsThree size={16} color="#9CA3AF" weight="bold" />
              : <span style={{ fontSize: 13, color: idx === crumbs.length - 1 ? "#111827" : "#6B7280", fontWeight: idx === crumbs.length - 1 ? 500 : 400 }}>{crumb.label}</span>
            }
          </span>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "32px 28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: config.bgColor, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <config.Icon size={22} color={config.iconColor} weight="regular" />
          </div>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111827", lineHeight: "28px", margin: 0 }}>{node.label}</h1>
            <p style={{ fontSize: 13, color: "#9CA3AF", lineHeight: "18px", margin: 0 }}>{config.typeLabel} · {levelLabel(node.level)}</p>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <DetailField label="Type" value={config.typeLabel} />
          <DetailField label="Level" value={levelLabel(node.level)} />
          <DetailField label="Parent" value={parentNode?.label ?? "—"} />
          <DetailField
            label="Status"
            value={
              <Tag
                text={node.status}
                variant={TagVariant.SUBTLE}
                size={TagSize.XS}
                color={node.status === "Active" ? TagColor.SUCCESS : TagColor.NEUTRAL}
                shape={TagShape.SQUARICAL}
              />
            }
          />
        </div>
      </div>
    </div>
  );
}

// ─── Legend ───────────────────────────────────────────────────────────────────

const LEGEND_ITEMS: { type: NodeType; description: string }[] = [
  { type: "tenant",              description: "Top-level owner" },
  { type: "reseller",            description: "Sells to merchants" },
  { type: "merchant",            description: "Accepts payments" },
  { type: "sub-merchant",        description: "Branch of a merchant" },
  { type: "sub-sub-merchant",    description: "Branch of a sub-merchant" },
  { type: "sub-sub-sub-merchant", description: "Deepest branch" },
];

function Legend() {
  return (
    <div style={{ borderTop: "1px solid #F3F4F6", padding: "12px 10px", display: "flex", flexDirection: "column", gap: 12 }}>
      {LEGEND_ITEMS.map(({ type, description }) => {
        const cfg = getNodeConfig(type);
        return (
          <div key={type} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 16, height: 16, borderRadius: 4, background: cfg.bgColor, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <cfg.Icon size={10} color={cfg.iconColor} weight="regular" />
            </div>
            <span style={{ fontSize: 11, color: "#6B7280", lineHeight: "16px" }}>
              <strong style={{ fontWeight: 600, color: "#374151" }}>{cfg.typeLabel}</strong>{" — "}{description}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const DEFAULT_EXPANDED = new Set(["globalpay", "apex-resellers", "acme-corp", "acme-north", "acme-south"]);

export default function SubMerchantsPage() {
  const [expanded, setExpanded] = useState<Set<string>>(DEFAULT_EXPANDED);
  const [selectedId, setSelectedId] = useState<string>("delhi-retail");

  function toggleExpand(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div style={{ display: "flex", height: "100%", background: "#FAFAFA", overflow: "hidden" }}>
      {/* Left hierarchy panel */}
      <div style={{ width: 320, flexShrink: 0, display: "flex", flexDirection: "column", background: "#FFFFFF", borderRight: "1px solid #F3F4F6", overflow: "hidden" }}>
        <div style={{ flex: 1, overflowY: "auto", padding: "12px 12px 12px 12px" }}>
          {TREE_DATA.map((node, idx) => (
            <TreeRow
              key={node.id}
              node={node}
              expanded={expanded}
              selectedId={selectedId}
              onToggle={toggleExpand}
              onSelect={setSelectedId}
              isLast={idx === TREE_DATA.length - 1}
              parentLines={[]}
            />
          ))}
        </div>

        <Legend />
      </div>

      <DetailPanel nodeId={selectedId} />
    </div>
  );
}
