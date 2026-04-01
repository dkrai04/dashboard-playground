"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  MagnifyingGlass,
  Bell,
  Pulse,
  Sparkle,
  Question,
  Plus,
  Trash,
  File,
  FileX,
  Gear,
  UserSwitch,
  ArrowsOut,
  BookOpen,
  User,
  Broadcast,
  UserCircle,
  CheckFat,
  FadersHorizontal,
  Cards,
  GitFork,
  ChartBar,
  Cube,
  Robot,
  Stack,
  X,
  Hash,
} from "@phosphor-icons/react";
import {
  Tag,
  TagVariant,
  TagSize,
  TagColor,
  TagShape,
  Button,
  ButtonType,
  ButtonSize,
  ButtonSubType,
  TextInput,
  TextInputSize,
  KeyValuePair,
  KeyValuePairSize,
  DataTable,
  Tooltip,
  TooltipSide,
  TooltipAlign,
  Snackbar,
  addSnackbar,
  SnackbarVariant,
  SnackbarPosition,
} from "@juspay/blend-design-system";
import { ColumnType } from "@juspay/blend-design-system";

// ─── Table data ───────────────────────────────────────────────────────────────
type StatusKey = "review" | "approval" | "timeline" | "active" | "rejected" | "discarded";
type ActionKey = "withdraw" | "fillDetails" | "file" | "gear" | "trash";

interface TableRow extends Record<string, unknown> {
  id: string;
  teamName: string;
  startDate: string;
  endDate: string;
  raisedBy: string;
  status: StatusKey;
  amount: string;
  actions: ActionKey[];
}

const BASE_TABLE_ROWS: TableRow[] = [
  { id: "abc",     teamName: "ABC Team",        startDate: "15th Feb 2025", endDate: "12th Aug 2025", raisedBy: "Samantha Smith", status: "review",    amount: "3245.91", actions: ["withdraw", "fillDetails"] },
  { id: "omega",   teamName: "Omega Squad",      startDate: "20th Mar 2025", endDate: "12th Aug 2025", raisedBy: "Samantha Smith", status: "approval",  amount: "4123.75", actions: ["withdraw"] },
  { id: "delta",   teamName: "Delta Force",      startDate: "5th Apr 2025",  endDate: "12th Aug 2025", raisedBy: "Samantha Smith", status: "timeline",  amount: "3650.00", actions: ["trash"] },
  { id: "alpha",   teamName: "Alpha Crew",       startDate: "18th May 2025", endDate: "12th Aug 2025", raisedBy: "Samantha Smith", status: "active",    amount: "2789.50", actions: [] },
  { id: "gamma",   teamName: "Gamma Group",      startDate: "30th Jun 2025", endDate: "12th Aug 2025", raisedBy: "Samantha Smith", status: "rejected",  amount: "4999.99", actions: [] },
  { id: "phoenix", teamName: "Phoenix Alliance", startDate: "22nd Jul 2025", endDate: "6th Aug 2026",  raisedBy: "Samantha Smith", status: "discarded", amount: "1532.45", actions: [] },
];

const STATUS_MAP: Record<StatusKey, { label: string; color: TagColor; variant: TagVariant }> = {
  review:    { label: "Review In Progress",      color: TagColor.PRIMARY, variant: TagVariant.SUBTLE },
  approval:  { label: "Approval Pending",        color: TagColor.WARNING, variant: TagVariant.SUBTLE },
  timeline:  { label: "Timeline limit breached", color: TagColor.PURPLE,  variant: TagVariant.SUBTLE },
  active:    { label: "Resource Active",         color: TagColor.SUCCESS, variant: TagVariant.SUBTLE },
  rejected:  { label: "Rejected",               color: TagColor.ERROR,   variant: TagVariant.SUBTLE },
  discarded: { label: "Discarded",              color: TagColor.NEUTRAL, variant: TagVariant.SUBTLE },
};

// ─── Column definitions ───────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const COLUMNS: any[] = [
  {
    field: "teamName",
    header: "Team Name",
    type: ColumnType.TEXT,
    width: "210px",
    isSortable: true,
  },
  {
    field: "startDate",
    header: "Start Date",
    type: ColumnType.TEXT,
    width: "180px",
    isSortable: true,
  },
  {
    field: "endDate",
    header: "End Date",
    type: ColumnType.TEXT,
    width: "180px",
    isSortable: true,
  },
  {
    field: "raisedBy",
    header: "Raised By",
    type: ColumnType.REACT_ELEMENT,
    isSortable: false,
    width: "180px",
    renderCell: (value: unknown) => (
      <Tag
        text={String(value)}
        variant={TagVariant.SUBTLE}
        size={TagSize.XS}
        color={TagColor.NEUTRAL}
        shape={TagShape.ROUNDED}
        leftSlot={<User size={12} color="#717784" />}
      />
    ),
  },
  {
    field: "status",
    header: "Status",
    type: ColumnType.REACT_ELEMENT,
    isSortable: false,
    width: "200px",
    renderCell: (value: unknown) => {
      const s = STATUS_MAP[value as StatusKey];
      return (
        <Tag
          text={s.label}
          variant={s.variant}
          size={TagSize.XS}
          color={s.color}
          shape={TagShape.SQUARICAL}
        />
      );
    },
  },
  {
    field: "amount",
    header: "Amount",
    type: ColumnType.REACT_ELEMENT,
    isSortable: false,
    width: "180px",
    renderCell: (value: unknown) => (
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <span style={{ fontSize: 14, color: "#99A0AE" }}>$</span>
        <span style={{ fontSize: 14, color: "#222530" }}>{String(value)}</span>
      </div>
    ),
  },
] as any[];

// Factory — call inside component so onWithdraw can close over state
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function makeActionColumn(onWithdraw: (id: string) => void, onFillDetails: (row: TableRow) => void): any {
  return {
    field: "actions",
    header: "Action",
    type: ColumnType.REACT_ELEMENT,
    isSortable: false,
    width: "160px",
    renderCell: (value: unknown, row: unknown) => {
      const acts = value as ActionKey[];
      const typedRow = row as TableRow;
      if (!acts || acts.length === 0) return <span style={{ fontSize: 14, color: "#99a0ae" }}>-</span>;
      const iconBtn = (icon: React.ReactNode, tooltip: string, onClick?: () => void) => (
        <Tooltip content={tooltip} side={TooltipSide.TOP} align={TooltipAlign.CENTER} showArrow>
          <button
            onClick={(e) => { e.stopPropagation(); onClick?.(); }}
            style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, border: "none", background: "transparent", cursor: "pointer", color: "#717784", transition: "background 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#f2f4f8")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            {icon}
          </button>
        </Tooltip>
      );
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {acts.includes("withdraw") && iconBtn(<FileX size={16} />, "Withdraw Request", () => onWithdraw(typedRow.id))}
          {acts.includes("fillDetails") && iconBtn(<UserSwitch size={16} />, "Fill Resource Details", () => onFillDetails(typedRow))}
          {acts.includes("file") && iconBtn(<File size={16} />, "View File")}
          {acts.includes("gear") && iconBtn(<Gear size={16} />, "Settings")}
          {acts.includes("trash") && iconBtn(<Trash size={16} />, "Delete")}
        </div>
      );
    },
  };
}

// ─── Expanded row card ────────────────────────────────────────────────────────
function ExpandedCard() {
  return (
    <>
      <style>{`
        @keyframes infra-expand {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        td:has(> .infra-expanded-card) {
          background-color: white !important;
          padding: 0 !important;
          border-top: 1.5px solid #ECEFF3 !important;
        }
        tr:has(+ tr td > .infra-expanded-card) td {
          background-color: #F5F7FA !important;
        }
        .infra-expanded-card {
          animation: infra-expand 0.2s ease forwards;
        }
      `}</style>
      <div className="infra-expanded-card" style={{ background: "white", padding: "24px 64px 24px" }}>
      <div style={{
        border: "1px solid #e1e4ea",
        borderRadius: 12,
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 28,
      }}>
        {/* Top row — flex, fixed 170px for first two, Purpose fills rest */}
        <div style={{ display: "flex", gap: 32, alignItems: "start" }}>
          <div style={{ width: 350, flexShrink: 0, display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 500, color: "#99a0ae", lineHeight: "16px" }}>Provision Type</span>
            <Tag text="Permanent Provisioning" variant={TagVariant.SUBTLE} size={TagSize.XS} color={TagColor.NEUTRAL} shape={TagShape.SQUARICAL} />
          </div>
          <div style={{ width: 350, flexShrink: 0 }}>
            <KeyValuePair keyString="Account Name" value="ACS-0086553729485" size={KeyValuePairSize.MEDIUM} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <KeyValuePair
              keyString="Purpose"
              value="Lorem ipsum dolor sit amet, consectetur adipiscing elit t amet...."
              size={KeyValuePairSize.MEDIUM}
            />
          </div>
        </div>

        {/* Resource Details */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 12, textTransform: "uppercase", color: "#99a0ae", lineHeight: "18px", whiteSpace: "nowrap", letterSpacing: "0.04em" }}>
              Resource Details
            </span>
            <div style={{ flex: 1, height: 1, background: "#e1e4ea" }} />
          </div>
          {/* Bottom row — flex, 170px max per item */}
          <div style={{ display: "flex", gap: 32, alignItems: "start" }}>
            <div style={{ width: 350, flexShrink: 0 }}>
              <KeyValuePair keyString="Resource ARN" value="# 0086553729485" size={KeyValuePairSize.MEDIUM} />
            </div>
            <div style={{ width: 350, flexShrink: 0 }}>
              <KeyValuePair keyString="SRE Resource Name" value="Card storage" size={KeyValuePairSize.MEDIUM} />
            </div>
            <div style={{ width: 350, flexShrink: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 500, color: "#99a0ae", lineHeight: "16px" }}>Resource Tags</span>
              <Tag text="Infra_dashboard" variant={TagVariant.SUBTLE} size={TagSize.XS} color={TagColor.NEUTRAL} shape={TagShape.SQUARICAL} />
            </div>
            <div style={{ width: 350, flexShrink: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 500, color: "#99a0ae", lineHeight: "16px" }}>Json</span>
              <Tag
                text="xyz.json"
                variant={TagVariant.SUBTLE}
                size={TagSize.XS}
                color={TagColor.NEUTRAL}
                shape={TagShape.SQUARICAL}
                rightSlot={<ArrowsOut size={10} color="#717784" />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function InfraScaleUpPage() {
  const router = useRouter();
  const [tableRows, setTableRows] = useState<TableRow[]>(BASE_TABLE_ROWS);
  const [expandedRowId, setExpandedRowId] = useState<string | null>("alpha");
  const [withdrawModalRowId, setWithdrawModalRowId] = useState<string | null>(null);
  const [fillDetailsRow, setFillDetailsRow] = useState<TableRow | null>(null);
  const [fillForm, setFillForm] = useState({ arn: "", sreName: "", tags: "", json: "" });

  const onWithdrawRef = useRef<(id: string) => void>(() => {});
  onWithdrawRef.current = (id: string) => setWithdrawModalRowId(id);

  const onFillDetailsRef = useRef<(row: TableRow) => void>(() => {});
  onFillDetailsRef.current = (row: TableRow) => {
    setFillDetailsRow(row);
    setFillForm({ arn: "", sreName: "", tags: "", json: "" });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = useMemo(() => [...COLUMNS, makeActionColumn(
    (id) => onWithdrawRef.current(id),
    (row) => onFillDetailsRef.current(row),
  )], []);

  useEffect(() => {
    const raw = sessionStorage.getItem("infra_new_request");
    if (raw) {
      sessionStorage.removeItem("infra_new_request");
      try {
        const newRow = JSON.parse(raw) as TableRow;
        setTableRows(prev => [newRow, ...prev]);
        addSnackbar({
          header: "Request submitted successfully",
          description: "Your request is under review. Track its progress anytime in the request status section.",
          variant: SnackbarVariant.SUCCESS,
          position: SnackbarPosition.BOTTOM_RIGHT,
          actionButton: { label: "Ok, Got it", onClick: () => {} },
          duration: 6000,
        });
      } catch { /* ignore */ }
    }

    const withdrawnId = sessionStorage.getItem("infra_withdrawn_id");
    if (withdrawnId) {
      sessionStorage.removeItem("infra_withdrawn_id");
      setTableRows(prev => prev.filter(r => r.id !== withdrawnId));
      addSnackbar({
        header: "Request withdrawn successfully",
        description: "Your provisioning request has been cancelled.",
        variant: SnackbarVariant.SUCCESS,
        position: SnackbarPosition.BOTTOM_RIGHT,
        actionButton: { label: "Ok, Got it", onClick: () => {} },
        duration: 6000,
      });
    }
  }, []);
  const expandedRowIdRef = useRef<string | null>("alpha");
  const toggleFnRef = useRef<Map<string, () => void>>(new Map());

  // Keep ref in sync so callbacks always read the latest value
  expandedRowIdRef.current = expandedRowId;

  return (
    <>
      <style>{`
        [data-sonner-toast], [class*="toast"], [class*="snackbar-toast"] {
          width: 420px !important;
          min-width: 420px !important;
          min-height: 140px !important;
        }
      `}</style>
      <div style={{ flex: 1, padding: "20px 40px", background: "#fcfcfd", display: "flex", flexDirection: "column" }}>
              {/* Custom header: title + description + Raise a Request */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: 20, fontWeight: 600, color: "#222530", lineHeight: "28px" }}>Resource</p>
                  <p style={{ fontSize: 14, color: "#717784", marginTop: 4, lineHeight: "20px" }}>Description for the module comes here, you can remove this from the properties panel</p>
                </div>
                <div style={{ marginTop: 32 }}>
                  <Button
                    text="Raise a Request"
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.MEDIUM}
                    leadingIcon={<Plus size={14} weight="bold" />}
                    onClick={() => router.push("/spriha/infra-scale-up/raise-request")}
                  />
                </div>
              </div>
              {/* Search bar */}
              <div style={{ marginTop: 32, marginBottom: 20, width: 320 }}>
                <TextInput
                  size={TextInputSize.MEDIUM}
                  placeholder="Search"
                  leftSlot={<MagnifyingGlass size={16} color="#99a0ae" />}
                  onChange={() => {}}
                  value=""
                />
              </div>
              <Snackbar position={SnackbarPosition.BOTTOM_RIGHT} />
              <DataTable
                tableBodyHeight="auto"
                data={tableRows}
                columns={columns}
                idField="id"
                isHoverable
                onRowClick={(row) => {
                  sessionStorage.setItem("infra_view_row", JSON.stringify(row));
                  router.push("/spriha/infra-scale-up/request");
                }}
                enableRowExpansion
                isRowExpandable={() => true}
                onRowExpansionChange={(rowId, isExpanded) => {
                  const newId = String(rowId);
                  if (isExpanded) {
                    const prevId = expandedRowIdRef.current;
                    expandedRowIdRef.current = newId;
                    setExpandedRowId(newId);
                    // Defer collapse so the new row's expansion commits first
                    if (prevId && prevId !== newId) {
                      setTimeout(() => {
                        toggleFnRef.current.get(prevId)?.();
                      }, 0);
                    }
                  } else {
                    // Only clear state if this is still the active row
                    if (expandedRowIdRef.current === newId) {
                      expandedRowIdRef.current = null;
                      setExpandedRowId(null);
                    }
                  }
                }}
                getRowStyle={(row) =>
                  String(row.id) === expandedRowId
                    ? { background: "#F5F7FA" }
                    : {}
                }
                renderExpandedRow={({ row, toggleExpansion }) => {
                  toggleFnRef.current.set(String(row.id), toggleExpansion);
                  return <ExpandedCard />;
                }}
                pagination={{
                  currentPage: 2,
                  pageSize: 10,
                  totalRows: 40,
                  pageSizeOptions: [10, 20, 50],
                }}
              />
      </div>
      {/* Withdraw confirmation overlay */}
      {withdrawModalRowId && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)", background: "rgba(0,0,0,0.25)" }}
          onClick={() => setWithdrawModalRowId(null)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ width: 550, background: "#fff", borderRadius: 16, padding: 20, display: "flex", flexDirection: "column", gap: 20, boxShadow: "0 8px 40px rgba(0,0,0,0.18)" }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
              <p style={{ fontSize: 18, fontWeight: 600, color: "#2b303b", lineHeight: "26px" }}>Are you sure you want to withdraw your request?</p>
              <button onClick={() => setWithdrawModalRowId(null)} style={{ border: "none", background: "transparent", cursor: "pointer", padding: 0, color: "#717784", flexShrink: 0 }}>
                <X size={18} />
              </button>
            </div>
            <p style={{ fontSize: 14, fontWeight: 400, color: "#717784", lineHeight: "20px" }}>
              This will cancel your provisioning request. You can raise a new request anytime.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <Button
                text="Cancel"
                buttonType={ButtonType.SECONDARY}
                size={ButtonSize.MEDIUM}
                subType={ButtonSubType.DEFAULT}
                onClick={() => setWithdrawModalRowId(null)}
              />
              <Button
                text="Withdraw"
                buttonType={ButtonType.PRIMARY}
                size={ButtonSize.MEDIUM}
                subType={ButtonSubType.DEFAULT}
                onClick={() => {
                  const id = withdrawModalRowId;
                  setWithdrawModalRowId(null);
                  setTableRows(prev => prev.filter(r => r.id !== id));
                  addSnackbar({
                    header: "Request withdrawn successfully",
                    description: "Your provisioning request has been cancelled.",
                    variant: SnackbarVariant.SUCCESS,
                    position: SnackbarPosition.BOTTOM_RIGHT,
                    actionButton: { label: "Ok, Got it", onClick: () => {} },
                    duration: 6000,
                  });
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Fill Resource Details drawer */}
      {fillDetailsRow && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", justifyContent: "flex-end", alignItems: "flex-start", padding: "40px 40px 40px 0", backdropFilter: "blur(4px)", background: "rgba(0,0,0,0.25)" }}
          onClick={() => setFillDetailsRow(null)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ width: 500, height: "100%", background: "#fff", display: "flex", flexDirection: "column", borderRadius: 12, border: "1px solid #eceff3", boxShadow: "0 8px 40px rgba(0,0,0,0.14)", overflow: "hidden" }}
          >
            {/* Header */}
            <div style={{ padding: 16, display: "flex", alignItems: "flex-start", gap: 16, borderBottom: "1px solid #e1e4ea", flexShrink: 0 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <p style={{ fontSize: 16, fontWeight: 600, color: "#2b303b", lineHeight: "24px" }}>Resource Details</p>
                  <Tag text={fillDetailsRow.teamName} variant={TagVariant.SUBTLE} size={TagSize.SM} color={TagColor.NEUTRAL} shape={TagShape.SQUARICAL} />
                </div>
                <p style={{ fontSize: 14, fontWeight: 400, color: "#717784", lineHeight: "20px" }}>Fill in the resource details for this provisioning request.</p>
              </div>
              <button onClick={() => setFillDetailsRow(null)} style={{ border: "none", background: "transparent", cursor: "pointer", padding: 0, color: "#717784", flexShrink: 0 }}>
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div style={{ flex: 1, overflowY: "auto", padding: "28px 20px", display: "flex", flexDirection: "column", gap: 28 }}>
              {/* Resource arn */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "#2b303b" }}>Resource arn</span>
                  <span style={{ color: "#e7000b", fontSize: 14 }}>*</span>
                </div>
                <TextInput
                  size={TextInputSize.LARGE}
                  placeholder="Enter -"
                  leftSlot={<Hash size={14} color="#99a0ae" />}
                  value={fillForm.arn}
                  onChange={e => setFillForm(f => ({ ...f, arn: (e.target as HTMLInputElement).value }))}
                />
              </div>

              {/* SRE Resource Name */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "#2b303b" }}>SRE Resource Name</span>
                  <span style={{ color: "#e7000b", fontSize: 14 }}>*</span>
                </div>
                <TextInput
                  size={TextInputSize.LARGE}
                  placeholder="Enter -"
                  value={fillForm.sreName}
                  onChange={e => setFillForm(f => ({ ...f, sreName: (e.target as HTMLInputElement).value }))}
                />
              </div>

              {/* Tags for Resource */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "#2b303b" }}>Tags for Resource</span>
                  <span style={{ color: "#e7000b", fontSize: 14 }}>*</span>
                </div>
                <TextInput
                  size={TextInputSize.LARGE}
                  placeholder="eg. : Infra_dashboard , Euler, etc."
                  value={fillForm.tags}
                  onChange={e => setFillForm(f => ({ ...f, tags: (e.target as HTMLInputElement).value }))}
                />
              </div>

              {/* Resource json */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "#2b303b" }}>Resource json</span>
                  <span style={{ color: "#e7000b", fontSize: 14 }}>*</span>
                </div>
                <textarea
                  placeholder="Paste JSON here..."
                  value={fillForm.json}
                  onChange={e => setFillForm(f => ({ ...f, json: e.target.value }))}
                  style={{
                    height: 312, width: "100%", boxSizing: "border-box",
                    background: "#fcfcfd", border: "1px solid #e1e4ea", borderRadius: 12,
                    padding: "16px", fontFamily: "JetBrains Mono, monospace", fontSize: 12,
                    color: "#222530", lineHeight: "18px", resize: "none", outline: "none",
                  }}
                />
              </div>
            </div>

            {/* Footer */}
            <div style={{ height: 72, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 12, padding: "0 20px", borderTop: "1px solid #e1e4ea", flexShrink: 0 }}>
              <Button
                text="Cancel"
                buttonType={ButtonType.SECONDARY}
                size={ButtonSize.SMALL}
                subType={ButtonSubType.DEFAULT}
                onClick={() => setFillDetailsRow(null)}
              />
              <Button
                text="Save Details"
                buttonType={ButtonType.PRIMARY}
                size={ButtonSize.SMALL}
                subType={ButtonSubType.DEFAULT}
                disabled={!fillForm.arn.trim() || !fillForm.sreName.trim() || !fillForm.tags.trim() || !fillForm.json.trim()}
                onClick={() => {
                  setFillDetailsRow(null);
                  addSnackbar({
                    header: "Resource details saved",
                    description: "The resource details have been updated successfully.",
                    variant: SnackbarVariant.SUCCESS,
                    position: SnackbarPosition.BOTTOM_RIGHT,
                    actionButton: { label: "Ok, Got it", onClick: () => {} },
                    duration: 6000,
                  });
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
