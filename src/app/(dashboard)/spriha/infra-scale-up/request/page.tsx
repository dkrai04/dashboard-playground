"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  MagnifyingGlass,
  Bell,
  Pulse,
  Sparkle,
  Question,
  FileX,
  CaretDown,
  CaretUp,
  Broadcast,
  UserCircle,
  BookOpen,
  CheckFat,
  FadersHorizontal,
  Cards,
  GitFork,
  ChartBar,
  Cube,
  Robot,
  Stack,
  Gear,
  ArrowsClockwise,
  FileText,
  TipJar,
  Info,
  X,
  ArrowSquareOut,
} from "@phosphor-icons/react";
import {
  Button,
  ButtonType,
  ButtonSize,
  ButtonSubType,
  Breadcrumb,
  Tag,
  TagVariant,
  TagColor,
  TagShape,
  TagSize,
  KeyValuePair,
  KeyValuePairSize,
  KeyValuePairStateType,
} from "@juspay/blend-design-system";
import type { DirectoryData, LeftPanelInfo } from "@juspay/blend-design-system";

// ─── Left panel ───────────────────────────────────────────────────────────────
const LEFT_PANEL: LeftPanelInfo = {
  items: [
    {
      label: "Productview",
      value: "productview",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="6" stroke="#2B7FFF" strokeWidth="2.2" fill="none" />
          <circle cx="9" cy="9" r="2.2" fill="#2B7FFF" />
        </svg>
      ),
    },
    {
      label: "Tenant 2",
      value: "tenant2",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="1" width="5.5" height="5.5" rx="1" fill="#E53935" />
          <rect x="9.5" y="1" width="5.5" height="5.5" rx="1" fill="#E53935" />
          <rect x="1" y="9.5" width="5.5" height="5.5" rx="1" fill="#E53935" />
          <rect x="9.5" y="9.5" width="5.5" height="5.5" rx="1" fill="#E53935" />
        </svg>
      ),
    },
    {
      label: "Tenant 3",
      value: "tenant3",
      icon: (
        <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
          <polygon points="0,5 4.5,0 9,5 4.5,10" fill="#CC0000" />
          <polygon points="11,5 15.5,0 20,5 15.5,10" fill="#CC0000" />
        </svg>
      ),
    },
  ],
  selected: "productview",
  onSelect: () => {},
};

const SIDEBAR_DATA: DirectoryData[] = [
  {
    label: "V2 Modules",
    defaultOpen: true,
    items: [
      { label: "Blueprint Management", leftSlot: <Broadcast size={16} /> },
      { label: "Product Deployment",   leftSlot: <UserCircle size={16} /> },
      { label: "Resource",             leftSlot: <BookOpen size={16} />, isSelected: true },
      { label: "Application Deployment", leftSlot: <CheckFat size={16} /> },
      { label: "Environment Config",   leftSlot: <FadersHorizontal size={16} /> },
    ],
  },
  {
    label: "V1 Modules",
    defaultOpen: true,
    items: [
      { label: "Release",        leftSlot: <Cards size={16} />,    items: [] },
      { label: "Workflow",       leftSlot: <GitFork size={16} /> },
      { label: "Recipe",         leftSlot: <ChartBar size={16} />, items: [] },
      { label: "Stack Creation", leftSlot: <Cube size={16} /> },
      { label: "Autopilot",      leftSlot: <Robot size={16} />,    items: [] },
      { label: "Alert Manager",  leftSlot: <Bell size={16} />,     items: [] },
      { label: "Configs",        leftSlot: <Gear size={16} />,     items: [] },
      { label: "AMI Pipeline",   leftSlot: <Stack size={16} /> },
    ],
  },
];

function TopbarContent() {
  return (
    <>
      <style>{`
        [data-topbar] {
          height: 48px !important;
          min-height: 48px !important;
          padding-top: 0 !important;
          padding-bottom: 0 !important;
        }
      `}</style>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", height: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <MagnifyingGlass size={16} color="#99a0ae" />
          <span style={{ fontSize: 14, color: "#99a0ae" }}>Search&nbsp;&nbsp;⌘K</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Pulse size={18} color="#22c55e" />
          <Bell size={18} color="#717784" />
          <Question size={18} color="#717784" />
          <div style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
            <Sparkle size={14} color="#1a56db" weight="fill" />
            <span style={{ fontSize: 14, fontWeight: 600, color: "#1a56db" }}>Ask Genius</span>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Timeline ─────────────────────────────────────────────────────────────────
const TIMELINE_EVENTS = [
  { timestamp: "May 05, 11:30:45 PM", title: "Request Sent for Approval", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { timestamp: "May 06, 11:30:45 PM", title: "SRE Assigned", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
];

const ACTIVE_TIMELINE_EVENTS = [
  { timestamp: "May 05, 11:30:45 PM", title: "Request Sent for Approval", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", avatar: null },
  { timestamp: "May 06, 11:30:45 PM", title: "SRE Assigned", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", avatar: null },
  { timestamp: "May 07, 11:30:45 PM", title: "Request Approved", description: null, avatar: { name: "Arvind Kumar", src: "" } },
  { timestamp: "May 08, 11:30:45 PM", title: "Resource Details Updated", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", avatar: null },
];

const RESOURCE_DETAILS = [
  { label: "Resource arn", value: "Value", link: false, tag: false },
  { label: "SRE Resource Name", value: "Value", link: false, tag: false },
  { label: "Tags for Resource", value: "Infra", link: false, tag: true },
  { label: "Resource json", value: "xyz.json", link: true, tag: true },
  { label: "Resource Updated On", value: "May 08, 11:30:45 PM", link: false, tag: false },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function RequestDetailPage() {
  const router = useRouter();
  const [row, setRow] = useState<Record<string, unknown> | null>(null);
  const [openService, setOpenService] = useState<number | null>(null);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("infra_view_row");
    if (raw) {
      try { setRow(JSON.parse(raw)); } catch { /* ignore */ }
    }
  }, []);

  const teamName   = (row?.teamName as string) ?? "Omega Squad";
  const startDate  = (row?.startDate as string) ?? "23rd Feb 2026";
  const endDate    = (row?.endDate as string) ?? "28th Mar 2026";
  const amount     = (row?.amount as string) ?? "11801.46";
  const status     = (row?.status as string) ?? "approval";

  const STATUS_LABEL: Record<string, { label: string; color: TagColor }> = {
    review:    { label: "Review In Progress",      color: TagColor.PRIMARY },
    approval:  { label: "Approval Pending",        color: TagColor.WARNING },
    timeline:  { label: "Timeline limit breached", color: TagColor.PURPLE  },
    active:    { label: "Resource Active",         color: TagColor.SUCCESS },
    rejected:  { label: "Rejected",               color: TagColor.ERROR   },
    discarded: { label: "Discarded",              color: TagColor.NEUTRAL },
  };
  const statusInfo = STATUS_LABEL[status] ?? STATUS_LABEL.approval;

  // Mock services for detail view
  const services = [
    { instanceName: "db.m5.12xlarge", service: "Amazon EC2",  totalCost: 4200.90, costLabel: "Instance cost + Storage Cost" },
    { instanceName: "i3.16xlarge",    service: "Amazon RDS",  totalCost: 5300.11, costLabel: "Instance cost + Storage Cost + Proxy Cost" },
    { instanceName: "db.m5.12xlarge", service: "Aurora RDS",  totalCost: 2300.45, costLabel: "Instance cost + Storage Cost + IOPS Cost + Proxy cost" },
  ];

  const tagColor = (svc: string) =>
    svc === "Amazon EC2" ? TagColor.WARNING
    : svc === "Amazon RDS" ? TagColor.PURPLE
    : svc === "Aurora RDS" ? TagColor.SUCCESS
    : TagColor.PRIMARY;

  return (
    <>
      <div style={{ flex: 1, padding: "32px", background: "#fcfcfd", display: "flex", flexDirection: "column", height: "calc(100vh - 48px)", overflow: "hidden", boxSizing: "border-box" }}>
              <div style={{ width: "100%", maxWidth: 1188, margin: "0 auto", display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>

              {/* Breadcrumb */}
              <div className="detail-breadcrumb" style={{ marginBottom: 20 }}>
                <style>{`
                  .detail-breadcrumb li:first-child a,
                  .detail-breadcrumb li:first-child > a,
                  .detail-breadcrumb > nav > ol > li:first-child a,
                  .detail-breadcrumb > nav > ol > li:first-child > a {
                    padding-left: 0 !important;
                  }
                `}</style>
                <Breadcrumb
                  items={[
                    { label: "Resource Request", href: "/spriha/infra-scale-up" },
                    { label: teamName, href: "#" },
                  ]}
                />
              </div>

              {/* Page title row */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                  <span style={{ fontSize: 20, fontWeight: 600, color: "#222530" }}>{teamName}</span>
                  <Tag
                    text={statusInfo.label}
                    variant={TagVariant.SUBTLE}
                    color={statusInfo.color}
                    size={TagSize.SM}
                    shape={TagShape.SQUARICAL}
                  />
                </div>
                <p style={{ fontSize: 14, color: "#717784", lineHeight: "20px" }}>
                  View provisioning request details, service cost breakdown, and track request status updates.
                </p>
              </div>

              {/* Two-column layout */}
              <div style={{ display: "flex", gap: 32, alignItems: "stretch", flex: 1, minHeight: 0 }}>

                {/* Left column — single 800px container, scrolls internally */}
                <div style={{ width: 800, flexShrink: 0, background: "white", border: "1px solid #e1e4ea", borderRadius: 12, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                  <div style={{ height: 32, flexShrink: 0 }} />
                  <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>

                  {/* Basic Detail — always expanded, no accordion */}
                  <div>
                    {/* Header */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 32px 0" }}>
                      <div style={{ borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", width: 18, height: 18 }}>
                        <FileText size={18} color="#222530" weight="regular" />
                      </div>
                      <span style={{ fontSize: 16, fontWeight: 600, color: "#222530" }}>Basic Detail</span>
                      <Tag text="Team : Euler India" variant={TagVariant.SUBTLE} size={TagSize.SM} color={TagColor.PURPLE} shape={TagShape.SQUARICAL} />
                    </div>

                    <style>{`
                      [data-element="value"] p { font-size: 14px !important; font-weight: 600 !important; }
                    `}</style>
                    <div className="basic-detail-kv" style={{ padding: "40px 32px 32px", display: "flex", flexDirection: "column", gap: 36 }}>
                      <div style={{ display: "flex", gap: 40, flexWrap: "nowrap" }}>
                        <div style={{ minWidth: 170, maxWidth: 170 }}><KeyValuePair keyString="Account Name" value="ACS-0086553729485" size={KeyValuePairSize.MEDIUM} keyValuePairState={KeyValuePairStateType.vertical} maxWidth="170px" textOverflow="truncate" showTooltipOnTruncate /></div>
                        <div style={{ minWidth: 170, maxWidth: 170 }}><KeyValuePair keyString="Provision Type" size={KeyValuePairSize.MEDIUM} keyValuePairState={KeyValuePairStateType.vertical} maxWidth="170px" valueLeftSlot={<Tag text="Permanent Provisioning" variant={TagVariant.SUBTLE} size={TagSize.XS} color={TagColor.NEUTRAL} shape={TagShape.SQUARICAL} />} /></div>
                        <div style={{ minWidth: 140, maxWidth: 140 }}><KeyValuePair keyString="Start Date" value={startDate} size={KeyValuePairSize.MEDIUM} keyValuePairState={KeyValuePairStateType.vertical} maxWidth="140px" /></div>
                        <div style={{ minWidth: 140, maxWidth: 140 }}><KeyValuePair keyString="End Date" value={endDate} size={KeyValuePairSize.MEDIUM} keyValuePairState={KeyValuePairStateType.vertical} maxWidth="140px" /></div>
                      </div>
                      <KeyValuePair
                        keyString="Purpose"
                        value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore."
                        size={KeyValuePairSize.MEDIUM}
                        keyValuePairState={KeyValuePairStateType.vertical}
                        maxWidth="100%"
                        textOverflow="wrap"
                      />
                    </div>
                  </div>

                  <div style={{ padding: "12px 32px 0" }}><div style={{ height: 1, background: "#e1e4ea" }} /></div>

                  {/* Service wise Cost Estimates */}
                  <div style={{ padding: "44px 32px 32px" }}>
                    {/* Section heading */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                      <TipJar size={18} color="#222530" weight="regular" />
                      <span style={{ fontSize: 16, fontWeight: 600, color: "#222530" }}>Service wise Cost Estimates</span>
                    </div>

                    {/* Total cost card */}
                    <div style={{ background: "#f5f7fa", borderRadius: 12, padding: "20px 24px", marginBottom: 12 }}>
                      <p style={{ fontSize: 22, fontWeight: 700, color: "#222530", marginBottom: 4 }}>$ {amount}</p>
                      <p style={{ fontSize: 14, color: "#717784" }}>Total Estimated Cost of all services</p>
                    </div>

                    {/* Service accordion list */}
                    <div>
                      {services.map((svc, i) => {
                        const isOpen = openService === i;
                        return (
                          <div key={i} style={{ borderBottom: i < services.length - 1 ? "1px solid #e1e4ea" : "none" }}>
                            <div
                              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 20px", cursor: "pointer", userSelect: "none" }}
                              onClick={() => setOpenService(isOpen ? null : i)}
                            >
                              <div>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                                  <span style={{ fontSize: 14, fontWeight: 600, color: "#2b303b" }}>{svc.instanceName}</span>
                                  <Tag text={svc.service} variant={TagVariant.SUBTLE} size={TagSize.SM} color={tagColor(svc.service)} shape={TagShape.SQUARICAL} />
                                </div>
                                <p style={{ fontSize: 13, color: "#717784" }}>
                                  {"Total Cost = "}
                                  <span style={{ fontWeight: 600, color: "#2b303b" }}>$ {svc.totalCost.toFixed(2)}</span>
                                  <span style={{ color: "#99a0ae" }}>&nbsp;&nbsp;{svc.costLabel}</span>
                                </p>
                              </div>
                              <div style={{ flexShrink: 0 }}>
                                {isOpen ? <CaretUp size={14} color="#717784" /> : <CaretDown size={14} color="#717784" />}
                              </div>
                            </div>

                            {isOpen && (
                              <div style={{ padding: "0 20px 20px" }}>
                                <div style={{ border: "1px solid #e1e4ea", borderRadius: 12, padding: "20px 24px" }}>
                                  <p style={{ fontSize: 28, fontWeight: 700, color: "#222530", marginBottom: 8 }}>$ {svc.totalCost.toFixed(2)}</p>
                                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                                    <span style={{ fontSize: 13, color: "#2b303b", fontWeight: 500 }}>Total Cost</span>
                                    <Tag text={svc.costLabel} variant={TagVariant.SUBTLE} size={TagSize.XS} color={TagColor.NEUTRAL} shape={TagShape.SQUARICAL} maxWidth="none" />
                                  </div>

                                  {/* Instance cost section */}
                                  <SectionDivider label="INSTANCE COST CALCULATIONS" />
                                  <CostRow label="Unit Price" value="$ 6.20" />
                                  <CostRow label="Total Hours" value="730" />
                                  <CostRow label="Total Cost for 730 Hrs" value="$ 4528.92" />
                                  <CostRow label="Total Instances" value="1" />
                                  <CostRow label="Total Cost" sublabel="( 1 instance for 730hrs )" value="$ 4528.92" valueColor="#008236" bold />

                                  {/* Storage cost section */}
                                  <SectionDivider label="STORAGE COST CALCULATIONS" />
                                  <CostRow label="Total IOPS Cost" value="$ 5.79" />
                                  <CostRow label="Baseline Hours" value="722 Hrs (730 - 8)" />
                                  <CostRow label="Total Storage Cost" value="$ 0.31" valueColor="#008236" bold />

                                  {/* Proxy cost section */}
                                  <SectionDivider label="PROXY COST CALCULATIONS" />
                                  <CostRow label="Total hours" sublabel="( Hrs x No. of instances )" value="730" />
                                  <CostRow label="Total vCPU's" value="48" />
                                  <CostRow label="Total Proxy cost" sublabel="( 10 GB x $0.11 × 1 month )" value="$ 1.10" valueColor="#008236" bold />
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  </div>{/* end scroll area */}
                  <div style={{ height: 32, flexShrink: 0 }} />
                </div>{/* end left 800px container */}

                {/* Right column — Request Updates (no container) */}
                <div style={{ width: 364, flexShrink: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
                    <span style={{ fontSize: 18, fontWeight: 600, color: "#222530", fontFamily: "var(--font-inter-display)" }}>Request Updates</span>
                    <Tag
                      text="Last updated 12 mins ago"
                      variant={TagVariant.SUBTLE}
                      size={TagSize.SM}
                      color={TagColor.NEUTRAL}
                      shape={TagShape.SQUARICAL}
                      rightSlot={<ArrowsClockwise size={12} color="#717784" />}
                    />
                  </div>

                  {/* Timeline */}
                  {(() => {
                    const events = status === "active" ? ACTIVE_TIMELINE_EVENTS : TIMELINE_EVENTS;
                    return (
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        {events.map((event, i) => {
                          const isLast = i === events.length - 1;
                          return (
                            <div key={i} style={{ display: "flex", gap: 12, alignItems: "stretch" }}>
                              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                                <div style={{ width: 16, height: 16, borderRadius: "50%", border: "1.5px solid #c8cdd8", background: "white", flexShrink: 0 }} />
                                {!isLast && <div style={{ width: 1, flex: 1, background: "#e1e4ea", marginTop: 4 }} />}
                              </div>
                              <div style={{ flex: 1, paddingBottom: isLast ? 0 : 32 }}>
                                <p style={{ fontSize: 12, fontWeight: 500, color: "#99a0ae", lineHeight: "18px", marginBottom: 10 }}>{event.timestamp}</p>
                                <p style={{ fontSize: 14, fontWeight: 500, color: "#525866", lineHeight: "20px", marginBottom: 6 }}>{event.title}</p>
                                {"avatar" in event && event.avatar ? (
                                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#e1e4ea", overflow: "hidden", flexShrink: 0 }}>
                                      <img src="https://i.pravatar.cc/24?img=11" alt={event.avatar.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    </div>
                                    <p style={{ fontSize: 14, fontWeight: 500, color: "#99a0ae" }}>By {event.avatar.name}</p>
                                  </div>
                                ) : (
                                  "description" in event && event.description && (
                                    <p style={{ fontSize: 14, fontWeight: 500, color: "#99a0ae", lineHeight: "20px" }}>{event.description}</p>
                                  )
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}

                  {/* Resource Details — active status only */}
                  {status === "active" && (
                    <div style={{ marginTop: 0 }}>
                      <div style={{ height: 1, background: "#e1e4ea", marginTop: 40, marginBottom: 40 }} />
                      <p style={{ fontSize: 18, fontWeight: 600, color: "#222530", marginBottom: 24 }}>Resource Details</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        {RESOURCE_DETAILS.map((item, i) => (
                          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: 14, color: "#717784", fontWeight: 400 }}>{item.label}</span>
                            {item.tag ? (
                              <Tag
                                text={item.value}
                                variant={TagVariant.SUBTLE}
                                color={TagColor.NEUTRAL}
                                size={TagSize.XS}
                                shape={TagShape.SQUARICAL}
                                rightSlot={item.link ? <ArrowSquareOut size={10} color="#717784" /> : undefined}
                              />
                            ) : (
                              <span style={{ fontSize: 14, fontWeight: 600, color: "#2b303b" }}>{item.value}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Withdraw section — only for review/approval statuses */}
                  {(status === "review" || status === "approval") && <div style={{ width: 430, marginTop: 40 }}>
                    <div style={{ height: 1, background: "#e1e4ea", marginBottom: 40 }} />
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                      <div style={{ maxWidth: 280 }}>
                        <p style={{ fontSize: 16, fontWeight: 600, color: "#2b303b", marginBottom: 4 }}>Want to withdraw your request ?</p>
                        <p style={{ fontSize: 12, fontWeight: 500, color: "#99a0ae" }}>This will cancel your provisioning request. You can raise a new request anytime.</p>
                      </div>
                      <Button
                        text="Withdraw"
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        subType={ButtonSubType.DEFAULT}
                        leadingIcon={<FileX size={14} />}
                        onClick={() => setShowWithdrawModal(true)}
                      />
                    </div>
                  </div>}
                </div>
              </div>
            </div>
      </div>
      {showWithdrawModal && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)", background: "rgba(0,0,0,0.25)" }}
          onClick={() => setShowWithdrawModal(false)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ width: 550, background: "#fff", borderRadius: 16, padding: 20, display: "flex", flexDirection: "column", gap: 20, boxShadow: "0 8px 40px rgba(0,0,0,0.18)" }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
              <p style={{ fontSize: 18, fontWeight: 600, color: "#222530", lineHeight: "26px", flex: 1 }}>
                Are you sure you want to withdraw the request for {teamName}?
              </p>
              <button
                onClick={() => setShowWithdrawModal(false)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "#717784", flexShrink: 0, marginTop: 2 }}
              >
                <X size={18} color="#717784" />
              </button>
            </div>
            <p style={{ fontSize: 14, fontWeight: 400, color: "#717784", lineHeight: "22px" }}>
              This action will cancel your provisioning request. You will need to raise a new request if required.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <Button
                text="Cancel"
                buttonType={ButtonType.SECONDARY}
                size={ButtonSize.MEDIUM}
                subType={ButtonSubType.DEFAULT}
                onClick={() => setShowWithdrawModal(false)}
              />
              <Button
                text="Withdraw"
                buttonType={ButtonType.PRIMARY}
                size={ButtonSize.MEDIUM}
                onClick={() => {
                  const rowId = row?.id as string;
                  if (rowId) sessionStorage.setItem("infra_withdrawn_id", rowId);
                  setShowWithdrawModal(false);
                  router.push("/spriha/infra-scale-up");
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, marginTop: 16 }}>
      <span style={{ fontSize: 12, fontWeight: 500, color: "#99a0ae", letterSpacing: "0.06em", whiteSpace: "nowrap", textTransform: "uppercase" }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: "#e1e4ea" }} />
    </div>
  );
}

function CostRow({ label, sublabel, value, valueColor, bold }: { label: string; sublabel?: string; value: string; valueColor?: string; bold?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
      <span style={{ fontSize: 14, fontWeight: bold ? 600 : 400, color: valueColor ?? "#717784" }}>
        {label}{sublabel && <span style={{ fontWeight: 400, color: valueColor ?? "#717784" }}> {sublabel}</span>}
      </span>
      <span style={{ fontSize: 14, fontWeight: 600, color: valueColor ?? "#2b303b" }}>{value}</span>
    </div>
  );
}
