"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MagnifyingGlass,
  Bell,
  Pulse,
  Sparkle,
  Question,
  Plus,
  CaretLeft,
  CaretRight,
  CaretDown,
  CaretUp,
  Info,
  FunnelSimple,
  Eye,
  PencilSimple,
  Trash,
  Broadcast,
  UserCircle,
  FileText,
  TipJar,
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
  X,
} from "@phosphor-icons/react";
import {
  Button,
  ButtonType,
  ButtonSize,
  ButtonSubType,
  TextInput,
  TextInputSize,
  Stepper,
  StepperType,
  StepState,
  Breadcrumb,
  SingleSelect,
  SelectMenuSize,
  SelectMenuSide,
  DateRangePicker,
  DateRangePickerSize,
  Tooltip,
  TooltipSide,
  TooltipAlign,
  Menu,
  MenuSide,
  MenuAlignment,
  Modal,
  DataTable,
  Tag,
  TagVariant,
  TagColor,
  TagShape,
  TagSize,
  Checkbox,
  MultiSelect,
  MultiSelectMenuSide,
  MultiSelectMenuAlignment,
  MultiSelectVariant,
  MultiSelectSelectionTagType,
  MultiSelectMenuSize,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerBody,
  TextArea,
  KeyValuePair,
  KeyValuePairSize,
  KeyValuePairStateType,
  Accordion,
  AccordionItem,
  AccordionType,
  AccordionChevronPosition,
} from "@juspay/blend-design-system";
import { ColumnType } from "@juspay/blend-design-system";
import type { DirectoryData, LeftPanelInfo } from "@juspay/blend-design-system";
import { useRouter } from "next/navigation";

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

// ─── Sidebar nav ──────────────────────────────────────────────────────────────
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
      { label: "Release",        leftSlot: <Cards size={16} />,   items: [] },
      { label: "Workflow",       leftSlot: <GitFork size={16} /> },
      { label: "Recipe",         leftSlot: <ChartBar size={16} />, items: [] },
      { label: "Stack Creation", leftSlot: <Cube size={16} /> },
      { label: "Autopilot",      leftSlot: <Robot size={16} />,   items: [] },
      { label: "Alert Manager",  leftSlot: <Bell size={16} />,    items: [] },
      { label: "Configs",        leftSlot: <Gear size={16} />,    items: [] },
      { label: "AMI Pipeline",   leftSlot: <Stack size={16} /> },
    ],
  },
];

// ─── Topbar ───────────────────────────────────────────────────────────────────
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

// ─── EC2 table data ────────────────────────────────────────────────────────────
const EC2_INSTANCES = [
  { id: "1", instanceName: "r7g.metal",    cpu: "64", memory: "512 GB",  network: "Linux", networkPerf: "30 Gigabit",        price: 4.5696, demandPrice: 4.5696 },
  { id: "2", instanceName: "m6i.32xlarge", cpu: "128", memory: "512 GB", network: "Linux", networkPerf: "50 Gigabit",        price: 6.144,  demandPrice: 6.144  },
  { id: "3", instanceName: "c6g.16xlarge", cpu: "64", memory: "128 GB",  network: "Linux", networkPerf: "25 Gigabit",        price: 2.176,  demandPrice: 2.176  },
  { id: "4", instanceName: "i3.16xlarge",  cpu: "64", memory: "488 GB",  network: "Linux", networkPerf: "Up to 25 Gigabit",  price: 4.992,  demandPrice: 4.992  },
  { id: "5", instanceName: "p4d.24xlarge", cpu: "96", memory: "1152 GB", network: "Linux", networkPerf: "400 Gigabit",       price: 32.773, demandPrice: 32.773 },
];

const EC2_VOLUME_TYPES = ["gp2", "gp3", "io1", "io2", "sc1", "st1", "standard"];
const EC2_UNITS = ["GB (Gigabytes)", "TB (Terabytes)"];
const EC2_SNAPSHOT_FREQ = ["Hourly", "Daily", "Weekly", "Monthly"];

// ─── RDS table data ───────────────────────────────────────────────────────────
const RDS_INSTANCES = [
  { id: "1", instanceName: "db.m5.12xlarge",  cpu: "48",  memory: "192 GB",  network: "10 Gbps",  price: 6.204  },
  { id: "2", instanceName: "db.r6g.16xlarge", cpu: "64",  memory: "512 GB",  network: "25 Gbps",  price: 8.640  },
  { id: "3", instanceName: "db.x2g.16xlarge", cpu: "64",  memory: "1024 GB", network: "25 Gbps",  price: 19.349 },
  { id: "4", instanceName: "db.m6i.32xlarge", cpu: "128", memory: "512 GB",  network: "50 Gbps",  price: 12.288 },
  { id: "5", instanceName: "db.r5.24xlarge",  cpu: "96",  memory: "768 GB",  network: "25 Gbps",  price: 14.400 },
];
const RDS_VOLUME_TYPES = ["gp2", "gp3", "io1", "io2"];
const RDS_PROXY_OPTIONS = ["Yes", "No"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RDS_COLUMNS: any[] = [
  { field: "instanceName", header: "Instance Name",       type: ColumnType.TEXT, isSortable: true },
  { field: "cpu",          header: "CPU",                 type: ColumnType.TEXT, isSortable: true },
  { field: "memory",       header: "Memory",              type: ColumnType.TEXT, isSortable: true },
  { field: "network",      header: "Network Performance", type: ColumnType.TEXT, isSortable: true },
  {
    field: "price",
    header: "On demand Price",
    type: ColumnType.REACT_ELEMENT,
    isSortable: true,
    renderCell: (v: unknown) => (
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <span style={{ fontSize: 13, color: "#99a0ae" }}>$</span>
        <span style={{ fontSize: 14, color: "#222530" }}>{String(v)}</span>
      </div>
    ),
  },
];

// ─── ElastiCache table data ────────────────────────────────────────────────────
const ELASTICACHE_INSTANCES = [
  { id: "1", instanceName: "cache.t1.med",    cpu: "2",  memory: "3.09 GB",  network: "Linux", networkPerf: "Up to 5 Gigabit",   price: 342 },
  { id: "2", instanceName: "cache.t3.medium", cpu: "2",  memory: "3.09 GB",  network: "Linux", networkPerf: "Up to 5 Gigabit",   price: 342 },
  { id: "3", instanceName: "9Fin.xlarge",     cpu: "48", memory: "32 GB",    network: "RHEL",  networkPerf: "25 Gigabit",         price: 342 },
  { id: "4", instanceName: "gd.9xlmedium",    cpu: "32", memory: "512 GB",   network: "RHEL",  networkPerf: "10 Gigabit",         price: 342 },
  { id: "5", instanceName: "i3.16xlarge",     cpu: "64", memory: "256 GB",   network: "Linux", networkPerf: "Up to 25 Gigabit",   price: 342 },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ELASTICACHE_COLUMNS: any[] = [
  { field: "instanceName", header: "Instance Name",       type: ColumnType.TEXT, isSortable: true },
  { field: "cpu",          header: "CPU",                 type: ColumnType.TEXT, isSortable: true },
  { field: "memory",       header: "Memory",              type: ColumnType.TEXT, isSortable: true },
  { field: "network",      header: "Network Performance", type: ColumnType.TEXT, isSortable: true },
  {
    field: "price",
    header: "On demand Price",
    type: ColumnType.REACT_ELEMENT,
    isSortable: true,
    renderCell: (v: unknown) => (
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <span style={{ fontSize: 13, color: "#99a0ae" }}>$</span>
        <span style={{ fontSize: 14, color: "#222530" }}>{String(v)}</span>
      </div>
    ),
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EC2_COLUMNS: any[] = [
  { field: "instanceName", header: "Instance Name",       type: ColumnType.TEXT, isSortable: true },
  { field: "cpu",          header: "CPU",                 type: ColumnType.TEXT, isSortable: true },
  { field: "memory",       header: "Memory",              type: ColumnType.TEXT, isSortable: true },
  { field: "network",      header: "Network Performance", type: ColumnType.TEXT, isSortable: true },
  {
    field: "demandPrice",
    header: "On demand Price",
    type: ColumnType.REACT_ELEMENT,
    isSortable: true,
    renderCell: (v: unknown) => (
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <span style={{ fontSize: 13, color: "#99a0ae" }}>$</span>
        <span style={{ fontSize: 14, color: "#222530" }}>{String(v)}</span>
      </div>
    ),
  },
];

// ─── Filter categories ────────────────────────────────────────────────────────
const FILTER_CATEGORIES = ["Region Code", "Operating System", "Processors", "Tenancy", "Others"];
const FILTER_VALUES: Record<string, string[]> = {
  "Region Code":        ["ap_south", "ap_northeast", "ap_west", "ap_north", "ap_northwest"],
  "Operating System":   ["Linux", "Windows", "RHEL", "SUSE", "Ubuntu"],
  "Processors":         ["Intel", "AMD", "ARM", "Graviton"],
  "Tenancy":            ["Shared", "Dedicated", "Host"],
  "Others":             ["Reserved", "Spot", "On-Demand"],
};

// ─── Labeled field wrapper ────────────────────────────────────────────────────
function FieldLabel({ label, required, tooltip }: { label: string; required?: boolean; tooltip?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}>
      <span style={{ fontSize: 13, fontWeight: 500, color: "#2b303b" }}>{label}</span>
      {required && <span style={{ color: "#e7000b", fontSize: 13 }}>*</span>}
      {tooltip ? (
        <Tooltip content={tooltip} side={TooltipSide.TOP} align={TooltipAlign.CENTER} showArrow>
          <span style={{ display: "inline-flex", cursor: "default" }}>
            <Info size={13} color="#99a0ae" />
          </span>
        </Tooltip>
      ) : (
        <Info size={13} color="#99a0ae" />
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function RaiseRequestPage() {
  const router = useRouter();
  const [teamName, setTeamName]       = useState("");
  const [startDate, setStartDate]     = useState<Date | null>(null);
  const [endDate, setEndDate]         = useState<Date | null>(null);
  const [provisionType, setProvisionType] = useState("");
  const [account, setAccount]         = useState("");
  const [purpose, setPurpose]         = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [addedServices, setAddedServices] = useState<Array<{
    instanceName: string; service: string; totalCost: number; numInstances: number;
    ec2?: { storageCost: number; snapshotCost: number; totalStorageCost: number; instanceCost: number; unitPrice: number; totalCost730: number; volumeType: string; storageAmount: string; storageUnit: string; snapshotFreq: string; snapshotAmount: string; snapshotUnit: string; };
    rds?: { instanceCost: number; storageCost: number; proxyCost: number; unitPrice: number; totalCost730: number; volumeType: string; iopsPerVolume: string; useProxy: string; };
    aurora?: { instanceCost: number; iopsCost: number; storageCost: number; proxyCost: number; unitPrice: number; totalCost730: number; storageGB: number; baselineHrs: number; storageAmount: string; storageUnit: string; baselineIops: string; peakIops: string; hoursOfPeakIops: string; useProxy: string; };
    other?: { title: string; cost: number; description: string };
  }>>([]);
  const isFormComplete = !!(teamName.trim() && startDate && endDate && provisionType && account && purpose.trim());
  const [hoverNext, setHoverNext]     = useState(false);

  // ElastiCache modal state
  const [elastiCacheOpen, setElastiCacheOpen] = useState(false);
  // EC2 modal state
  const [ec2Open, setEc2Open] = useState(false);
  const [ec2SpecTableOpen, setEc2SpecTableOpen] = useState(true);
  const [ec2SelectedInstance, setEc2SelectedInstance] = useState("");
  const [ec2NumInstances, setEc2NumInstances] = useState("");
  const [ec2VolumeType, setEc2VolumeType] = useState("");
  const [ec2StorageAmount, setEc2StorageAmount] = useState("");
  const [ec2StorageUnit, setEc2StorageUnit] = useState("");
  const [ec2SnapshotFreq, setEc2SnapshotFreq] = useState("");
  const [ec2SnapshotAmount, setEc2SnapshotAmount] = useState("");
  const [ec2SnapshotUnit, setEc2SnapshotUnit] = useState("");
  const [ec2EditOriginal, setEc2EditOriginal] = useState<{ instanceName: string; numInstances: string; volumeType: string; storageAmount: string; storageUnit: string; snapshotFreq: string; snapshotAmount: string; snapshotUnit: string; } | null>(null);
  const [specTableOpen, setSpecTableOpen]     = useState(true);
  const [selectedInstance, setSelectedInstance] = useState("");
  const [numInstances, setNumInstances]       = useState("");

  // RDS modal state
  const [rdsOpen, setRdsOpen] = useState(false);
  const [rdsSpecTableOpen, setRdsSpecTableOpen] = useState(true);
  const [rdsSelectedInstance, setRdsSelectedInstance] = useState("");
  const [rdsNumInstances, setRdsNumInstances] = useState("");
  const [rdsVolumeType, setRdsVolumeType] = useState("");
  const [rdsIopsPerVolume, setRdsIopsPerVolume] = useState("");
  const [rdsUseProxy, setRdsUseProxy] = useState("");
  const [rdsEditOriginal, setRdsEditOriginal] = useState<{ instanceName: string; numInstances: string; volumeType: string; iopsPerVolume: string; useProxy: string; } | null>(null);

  // Aurora RDS modal state
  const [auroraOpen, setAuroraOpen] = useState(false);
  const [auroraSpecTableOpen, setAuroraSpecTableOpen] = useState(true);
  const [auroraSelectedInstance, setAuroraSelectedInstance] = useState("");
  const [auroraNumInstances, setAuroraNumInstances] = useState("");
  const [auroraStorageAmount, setAuroraStorageAmount] = useState("");
  const [auroraStorageUnit, setAuroraStorageUnit] = useState("");
  const [auroraBaselineIops, setAuroraBaselineIops] = useState("");
  const [auroraPeakIops, setAuroraPeakIops] = useState("");
  const [auroraHoursOfPeakIops, setAuroraHoursOfPeakIops] = useState("");
  const [auroraUseProxy, setAuroraUseProxy] = useState("");
  const [auroraEditOriginal, setAuroraEditOriginal] = useState<{ instanceName: string; numInstances: string; storageAmount: string; storageUnit: string; baselineIops: string; peakIops: string; hoursOfPeakIops: string; useProxy: string; } | null>(null);

  // Summary step state
  const [summaryOpenServices, setSummaryOpenServices] = useState<number | null>(null);
  const summaryScrollRef = useRef<HTMLDivElement>(null);

  // Auto-open single service when entering step 3
  useEffect(() => {
    if (currentStep === 3) {
      setSummaryOpenServices(addedServices.length === 1 ? 0 : null);
    }
  }, [currentStep]);

  // Others modal state
  const [otherOpen, setOtherOpen] = useState(false);
  const [otherTitle, setOtherTitle] = useState("");
  const [otherCost, setOtherCost] = useState("");
  const [otherDescription, setOtherDescription] = useState("");
  const [otherEditOriginal, setOtherEditOriginal] = useState<{ title: string; cost: string; description: string } | null>(null);

  // Delete confirmation state
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  // Edit mode state
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editOriginal, setEditOriginal] = useState<{ instanceName: string; numInstances: string } | null>(null);

  // View details drawer state
  const [viewIndex, setViewIndex] = useState<number | null>(null);

  // Numeric field validation
  const [numericError, setNumericError] = useState<string | null>(null);
  const [shakingField, setShakingField] = useState<string | null>(null);
  function handleNumericInput(value: string, key: string, setter: (v: string) => void) {
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setter(value);
      if (numericError === key) setNumericError(null);
    } else {
      setNumericError(key);
      setShakingField(key);
      setTimeout(() => setShakingField(null), 400);
    }
  }

  // Filters panel state
  const [filtersOpen, setFiltersOpen]             = useState(false);
  const [filterSearch, setFilterSearch]           = useState("");
  const [activeCategory, setActiveCategory]       = useState("Region Code");
  // checkedValues: per-category pending selections (before Apply)
  const [checkedValues, setCheckedValues]         = useState<Record<string, string[]>>({});
  // appliedFilters: committed after "Apply Filter"
  const [appliedFilters, setAppliedFilters]       = useState<Record<string, string[]>>({});
  const filtersRef    = useRef<HTMLDivElement>(null);
  const filtersBtnRef = useRef<HTMLDivElement>(null);
  const [filtersPanelPos, setFiltersPanelPos] = useState({ top: 0, left: 0 });

  // Close filters on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        filtersRef.current && !filtersRef.current.contains(e.target as Node) &&
        filtersBtnRef.current && !filtersBtnRef.current.contains(e.target as Node)
      ) {
        setFiltersOpen(false);
      }
    }
    if (filtersOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [filtersOpen]);

  function openFilters() {
    if (filtersBtnRef.current) {
      const rect = filtersBtnRef.current.getBoundingClientRect();
      setFiltersPanelPos({ top: rect.bottom + 8, left: rect.left });
    }
    setFiltersOpen(o => !o);
  }

  // ElastiCache cost calculations
  const instanceData  = ELASTICACHE_INSTANCES.find(i => i.instanceName === selectedInstance);
  const instancePrice = instanceData?.price ?? 0;
  const numInst       = parseInt(numInstances) || 0;
  const costPerHour   = instancePrice > 0 ? (instancePrice / 730) : 0;
  const totalCost730  = instancePrice;
  const totalCostAll  = instancePrice * numInst;
  const canAddEstimate = !!(selectedInstance && numInstances && parseInt(numInstances) > 0);
  const hasEditChanges = editIndex !== null && editOriginal !== null && (selectedInstance !== editOriginal.instanceName || numInstances !== editOriginal.numInstances);

  // EC2 cost calculations
  const ec2InstanceData    = EC2_INSTANCES.find(i => i.instanceName === ec2SelectedInstance);
  const ec2InstancePrice   = ec2InstanceData?.price ?? 0;
  const ec2NumInst         = parseInt(ec2NumInstances) || 0;
  const ec2CostPerHour     = ec2InstancePrice;
  const ec2TotalCost730    = ec2InstancePrice * 730;
  const ec2TotalInstanceCost = ec2TotalCost730 * ec2NumInst;
  const ec2StorageAmtNum   = parseFloat(ec2StorageAmount) || 0;
  const ec2StorageIsGB     = !ec2StorageUnit.includes("TB");
  const ec2StorageGB       = ec2StorageIsGB ? ec2StorageAmtNum : ec2StorageAmtNum * 1024;
  const ec2StorageCost     = ec2StorageGB * 0.1 * (8760 / 730); // ~$0.1/GB-month × 12 months
  const ec2SnapshotAmtNum  = parseFloat(ec2SnapshotAmount) || 0;
  const ec2SnapshotIsGB    = !ec2SnapshotUnit.includes("TB");
  const ec2SnapshotGB      = ec2SnapshotIsGB ? ec2SnapshotAmtNum : ec2SnapshotAmtNum * 1024;
  const ec2SnapshotMultiplier = ec2SnapshotFreq === "Hourly" ? 8760 : ec2SnapshotFreq === "Daily" ? 365 : ec2SnapshotFreq === "Weekly" ? 52 : 12;
  const ec2TotalSnapshotCost = ec2SnapshotGB * 0.05 * ec2SnapshotMultiplier;
  const ec2TotalStorageCost  = ec2StorageCost + ec2TotalSnapshotCost;
  const ec2GrandTotal        = ec2TotalInstanceCost + ec2TotalStorageCost;
  const canAddEc2 = !!(ec2SelectedInstance && ec2NumInstances && parseInt(ec2NumInstances) > 0 && ec2VolumeType && ec2StorageAmount && ec2StorageUnit && ec2SnapshotFreq && ec2SnapshotAmount && ec2SnapshotUnit);
  const ec2HasEditChanges = editIndex !== null && ec2EditOriginal !== null && (
    ec2SelectedInstance !== ec2EditOriginal.instanceName ||
    ec2NumInstances !== ec2EditOriginal.numInstances ||
    ec2VolumeType !== ec2EditOriginal.volumeType ||
    ec2StorageAmount !== ec2EditOriginal.storageAmount ||
    ec2StorageUnit !== ec2EditOriginal.storageUnit ||
    ec2SnapshotFreq !== ec2EditOriginal.snapshotFreq ||
    ec2SnapshotAmount !== ec2EditOriginal.snapshotAmount ||
    ec2SnapshotUnit !== ec2EditOriginal.snapshotUnit
  );

  // RDS cost calculations
  const rdsInstanceData      = RDS_INSTANCES.find(i => i.instanceName === rdsSelectedInstance);
  const rdsInstancePrice     = rdsInstanceData?.price ?? 0;
  const rdsNumInst           = parseInt(rdsNumInstances) || 0;
  const rdsTotalCost730      = rdsInstancePrice * 730;
  const rdsTotalInstanceCost = rdsTotalCost730 * rdsNumInst;
  const rdsIopsNum           = parseFloat(rdsIopsPerVolume) || 0;
  const rdsIopsCost          = rdsIopsNum * 0.026;
  const rdsTotalStorageCost  = rdsIopsCost;
  const rdsVCpus             = parseInt(rdsInstanceData?.cpu ?? "0") || 0;
  const rdsTotalHours        = 730 * rdsNumInst;
  const rdsProxyCost         = rdsUseProxy === "Yes" ? rdsVCpus * rdsTotalHours * 0.022 : 0;
  const rdsGrandTotal        = rdsTotalInstanceCost + rdsTotalStorageCost + rdsProxyCost;
  const canAddRds = !!(rdsSelectedInstance && rdsNumInstances && parseInt(rdsNumInstances) > 0 && rdsVolumeType && rdsIopsPerVolume && rdsUseProxy);
  const rdsHasEditChanges = editIndex !== null && rdsEditOriginal !== null && (
    rdsSelectedInstance !== rdsEditOriginal.instanceName ||
    rdsNumInstances !== rdsEditOriginal.numInstances ||
    rdsVolumeType !== rdsEditOriginal.volumeType ||
    rdsIopsPerVolume !== rdsEditOriginal.iopsPerVolume ||
    rdsUseProxy !== rdsEditOriginal.useProxy
  );

  // Aurora RDS cost calculations
  const auroraInstanceData      = RDS_INSTANCES.find(i => i.instanceName === auroraSelectedInstance);
  const auroraInstancePrice     = auroraInstanceData?.price ?? 0;
  const auroraNumInst           = parseInt(auroraNumInstances) || 0;
  const auroraTotalCost730      = auroraInstancePrice * 730;
  const auroraTotalInstanceCost = auroraTotalCost730 * auroraNumInst;
  const auroraStorageAmtNum     = parseFloat(auroraStorageAmount) || 0;
  const auroraStorageIsGB       = !auroraStorageUnit.includes("TB");
  const auroraStorageGB         = auroraStorageIsGB ? auroraStorageAmtNum : auroraStorageAmtNum * 1024;
  const auroraBaselineIopsNum   = parseFloat(auroraBaselineIops) || 0;
  const auroraPeakIopsNum       = parseFloat(auroraPeakIops) || 0;
  const auroraHoursOfPeakNum    = parseFloat(auroraHoursOfPeakIops) || 0;
  const auroraBaselineHrs       = 730 - auroraHoursOfPeakNum;
  const auroraTotalIopsCost     = (auroraBaselineIopsNum * auroraBaselineHrs * 3600 + auroraPeakIopsNum * auroraHoursOfPeakNum * 3600) / 1_000_000 * 0.22;
  const auroraTotalStorageCost  = auroraStorageGB * 0.031;
  const auroraVCpus             = parseInt(auroraInstanceData?.cpu ?? "0") || 0;
  const auroraTotalHours        = 730 * auroraNumInst;
  const auroraProxyCost         = auroraUseProxy === "Yes" ? auroraStorageGB * 0.11 : 0;
  const auroraGrandTotal        = auroraTotalInstanceCost + auroraTotalIopsCost + auroraTotalStorageCost + auroraProxyCost;
  const canAddAurora = !!(auroraSelectedInstance && auroraNumInstances && parseInt(auroraNumInstances) > 0 && auroraStorageAmount && auroraStorageUnit && auroraBaselineIops && auroraPeakIops && auroraHoursOfPeakIops && auroraUseProxy);
  const auroraHasEditChanges = editIndex !== null && auroraEditOriginal !== null && (
    auroraSelectedInstance !== auroraEditOriginal.instanceName ||
    auroraNumInstances !== auroraEditOriginal.numInstances ||
    auroraStorageAmount !== auroraEditOriginal.storageAmount ||
    auroraStorageUnit !== auroraEditOriginal.storageUnit ||
    auroraBaselineIops !== auroraEditOriginal.baselineIops ||
    auroraPeakIops !== auroraEditOriginal.peakIops ||
    auroraHoursOfPeakIops !== auroraEditOriginal.hoursOfPeakIops ||
    auroraUseProxy !== auroraEditOriginal.useProxy
  );

  const otherCostNum = parseFloat(otherCost) || 0;
  const canAddOther = !!(otherTitle.trim() && otherCost && otherCostNum >= 0 && otherDescription.trim());
  const otherHasEditChanges = editIndex !== null && otherEditOriginal !== null && (
    otherTitle !== otherEditOriginal.title ||
    otherCost !== otherEditOriginal.cost ||
    otherDescription !== otherEditOriginal.description
  );

  const DYNAMIC_STEPS = [
    { id: 1, title: "Basic Details",                description: "1-2 line description can be added here", status: currentStep > 1 ? StepState.COMPLETED : currentStep === 1 ? StepState.CURRENT : StepState.PENDING },
    { id: 2, title: "Estimate Cost Configuration", description: "1-2 line description can be added here", status: currentStep > 2 ? StepState.COMPLETED : currentStep === 2 ? StepState.CURRENT : StepState.PENDING },
    { id: 3, title: "Summary",                      description: "1-2 line description can be added here", status: currentStep === 3 ? StepState.CURRENT : StepState.PENDING },
  ];

  function formatDate(d: Date | null) {
    if (!d) return "dd - mm - yyyy";
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  }

  function handleSubmit() {
    const accountLabel = account === "acs" ? "ACS-0086553729485" : account;
    const totalCost = addedServices.reduce((sum, s) => sum + s.totalCost, 0);
    const newRequest = {
      id: `req-${Date.now()}`,
      teamName: teamName || "—",
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      raisedBy: "Samantha Smith",
      status: "approval",
      amount: totalCost.toFixed(2),
      accountLabel,
      actions: ["withdraw"],
    };
    sessionStorage.setItem("infra_new_request", JSON.stringify(newRequest));
    router.push("/spriha/infra-scale-up");
  }

  function toggleValue(val: string) {
    setCheckedValues(prev => {
      const existing = prev[activeCategory] ?? [];
      const next = existing.includes(val) ? existing.filter(v => v !== val) : [...existing, val];
      return { ...prev, [activeCategory]: next };
    });
  }

  const currentValues   = FILTER_VALUES[activeCategory] ?? [];
  const categoryChecked = checkedValues[activeCategory] ?? [];
  const allChecked      = currentValues.length > 0 && currentValues.every(v => categoryChecked.includes(v));
  const hasApplied      = Object.values(appliedFilters).some(vals => vals.length > 0);

  // Filter table rows based on applied filters
  const osFilter = appliedFilters["Operating System"] ?? [];
  const filteredInstances = osFilter.length > 0
    ? ELASTICACHE_INSTANCES.filter(inst => osFilter.includes(inst.network))
    : ELASTICACHE_INSTANCES;


  return (
    <>
      <div id="raise-request-root" style={{ filter: (elastiCacheOpen || ec2Open || rdsOpen || auroraOpen || otherOpen || deleteIndex !== null || viewIndex !== null) ? "blur(4px)" : "none", transition: "filter 0.15s ease" }}>
        <div style={{ flex: 1, padding: "32px 40px", background: "#fcfcfd", display: "flex", flexDirection: "column", gap: 0, height: "calc(100vh - 48px)", overflow: "hidden", boxSizing: "border-box", scrollbarGutter: "stable" } as React.CSSProperties}>
              <style>{`
                @keyframes shake-input {
                  0%, 100% { transform: translateX(0); }
                  20%  { transform: translateX(-6px); }
                  40%  { transform: translateX(6px); }
                  60%  { transform: translateX(-4px); }
                  80%  { transform: translateX(4px); }
                }
                .shake-field { animation: shake-input 0.4s ease; }
                .raise-req-breadcrumb li:first-child a,
                .raise-req-breadcrumb li:first-child > a,
                .raise-req-breadcrumb > nav > ol > li:first-child a,
                .raise-req-breadcrumb > nav > ol > li:first-child > a {
                  padding-left: 0 !important;
                }
                [data-stepper="stepper"] > * {
                  min-height: 90px !important;
                }
                [role="option"]:hover, [data-highlighted="true"] {
                  background-color: #f2f4f8 !important;
                  cursor: pointer;
                }
                [data-element="menu-item"]:hover {
                  background-color: #f2f4f8 !important;
                  cursor: pointer;
                }
                .date-field-full > *, .date-field-full > * > * {
                  width: 100% !important;
                  display: block !important;
                }
                button:disabled {
                  cursor: not-allowed !important;
                  pointer-events: none !important;
                }
                .prev-btn button:disabled span,
                .prev-btn button:disabled svg {
                  color: #99a0ae !important;
                  fill: #99a0ae !important;
                }
                .next-btn-wrapper {
                  display: inline-block;
                  pointer-events: all;
                }
                .next-btn-wrapper button:disabled {
                  pointer-events: none !important;
                }
                .select-normalized [data-element="trigger-text"],
                .select-normalized [data-element="selected-label"],
                .select-normalized button span,
                .select-normalized [data-element="trigger"] span {
                  font-weight: 400 !important;
                  color: #2b303b !important;
                }
                .select-normalized svg { display: none !important; }
                .select-normalized .select-chevron svg { display: flex !important; }
              `}</style>

              {/* Centered content wrapper */}
              <div style={{ width: "100%", maxWidth: 1072, margin: "0 auto", display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>

              {/* Breadcrumb */}
              <div className="raise-req-breadcrumb" style={{ marginBottom: 18 }}>
                <Breadcrumb
                  items={[
                    { label: "Resource Request", href: "/spriha/infra-scale-up" },
                    { label: "Raise a Request",  href: "/spriha/infra-scale-up/raise-request" },
                  ]}
                />
              </div>

              {/* Page title */}
              <div style={{ marginBottom: 32 }}>
                <p style={{ fontSize: 20, fontWeight: 600, color: "#222530", lineHeight: "28px" }}>Raise a Request</p>
                <p style={{ fontSize: 14, color: "#717784", marginTop: 4, lineHeight: "20px" }}>
                  Description for the module comes here, you can remove this from the properties panel
                </p>
              </div>

              {/* Two-column layout */}
              <div style={{ display: "flex", gap: 32, alignItems: "flex-start", flex: 1, minHeight: 0 }}>

                {/* Form card */}
                <div style={{ width: 800, flexShrink: 0, background: "white", border: "1px solid #e1e4ea", borderRadius: 12, overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}>
                  {/* Card header */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 32px", borderBottom: "1px solid #e1e4ea", background: "#fafafa" }}>
                    <span style={{ fontSize: 18, fontWeight: 600, color: "#222530" }}>
                      {currentStep === 1 ? "Basic Details" : currentStep === 2 ? "Estimate Cost Configuration" : "Summary"}
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#99a0ae" }}>STEP {currentStep} / 3</span>
                  </div>

                  {/* Step 1 body */}
                  {currentStep === 1 && (
                    <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: 40, flex: 1, overflowY: "auto" }}>
                      <div>
                        <FieldLabel label="Team Name" required tooltip="Enter your team name" />
                        <TextInput size={TextInputSize.MEDIUM} placeholder="Enter -" value={teamName} onChange={e => setTeamName(e.target.value)} />
                      </div>
                      <div style={{ display: "flex", gap: 32 }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <FieldLabel label="Start Date" required tooltip="Select resource scale up start date" />
                          <div className="date-field-full" style={{ width: "100%" }}>
                            <DateRangePicker isSingleDatePicker showPresets={false} disablePastDates size={DateRangePickerSize.MEDIUM} value={startDate ? { startDate } : undefined} onChange={r => setStartDate(r.startDate)}
                              triggerElement={
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", height: 40, padding: "0 12px", border: "1px solid #e1e4ea", borderRadius: 8, background: "white", cursor: "pointer", fontSize: 14, color: startDate ? "#2b303b" : "#99a0ae", boxSizing: "border-box" }}>
                                  <span>{formatDate(startDate)}</span>
                                  <CaretRight size={14} color="#717784" style={{ transform: "rotate(90deg)", flexShrink: 0 }} />
                                </div>
                              }
                            />
                          </div>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <FieldLabel label="End Date" required tooltip="Select resource scale up end date" />
                          <div className="date-field-full" style={{ width: "100%" }}>
                            <DateRangePicker isSingleDatePicker showPresets={false} disablePastDates size={DateRangePickerSize.MEDIUM} value={endDate ? { startDate: endDate } : undefined} onChange={r => setEndDate(r.startDate)}
                              triggerElement={
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", height: 40, padding: "0 12px", border: "1px solid #e1e4ea", borderRadius: 8, background: "white", cursor: "pointer", fontSize: 14, color: endDate ? "#2b303b" : "#99a0ae", boxSizing: "border-box" }}>
                                  <span>{formatDate(endDate)}</span>
                                  <CaretRight size={14} color="#717784" style={{ transform: "rotate(90deg)", flexShrink: 0 }} />
                                </div>
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 32 }}>
                        <div style={{ flex: 1 }}>
                          <FieldLabel label="Provision Type" required tooltip="Select the type of resource provisioning" />
                          <div className="select-normalized" style={{ position: "relative" }}>
                            <SingleSelect placeholder="Select -" size={SelectMenuSize.MEDIUM} side={SelectMenuSide.BOTTOM} selected={provisionType} onSelect={v => setProvisionType(v as string)} fullWidth
                              items={[{ items: [
                                { label: "Permanent Provisioning", value: "permanent", checked: provisionType === "permanent" },
                                { label: "Temporary Provisioning", value: "temporary", checked: provisionType === "temporary" },
                              ] }]}
                            />
                            <div className="select-chevron" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                              <CaretDown size={14} color="#99a0ae" />
                            </div>
                          </div>
                        </div>
                        <div style={{ flex: 1 }}>
                          <FieldLabel label="Account" required tooltip="Select the account for this resource request" />
                          <div className="select-normalized" style={{ position: "relative" }}>
                            <SingleSelect placeholder="Select -" size={SelectMenuSize.MEDIUM} side={SelectMenuSide.BOTTOM} selected={account} onSelect={v => setAccount(v as string)} fullWidth
                              items={[{ items: [{ label: "ACS-0086553729485", value: "acs", checked: account === "acs" }] }]}
                            />
                            <div className="select-chevron" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                              <CaretDown size={14} color="#99a0ae" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <FieldLabel label="Purpose of the request" required tooltip="Describe the purpose of this infrastructure scale up request" />
                        <textarea placeholder="Type -" value={purpose} onChange={e => setPurpose(e.target.value)} rows={5}
                          style={{ width: "100%", padding: "10px 12px", fontSize: 14, border: "1px solid #e1e4ea", borderRadius: 8, color: "#2b303b", background: "white", outline: "none", resize: "none", boxSizing: "border-box", fontFamily: "inherit", lineHeight: "20px" }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2 body */}
                  {currentStep === 2 && (
                    <div style={{ overflowY: "auto", padding: "32px", display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
                      <div>
                        <p style={{ fontSize: 16, fontWeight: 600, color: "#222530", lineHeight: "22px" }}>Service wise Cost Estimates</p>
                        <p style={{ fontSize: 14, fontWeight: 500, color: "#717784", marginTop: 4, lineHeight: "20px" }}>
                          Select and configure services to generate an overall infrastructure cost estimate for this request.
                        </p>
                      </div>
                      {addedServices.length > 0 && (
                        <div style={{ border: "1px solid #e1e4ea", borderRadius: 12, overflow: "hidden", background: "white" }}>
                          {addedServices.map((svc, i) => (
                            <div key={i} style={{ padding: "28px 24px", borderBottom: i < addedServices.length - 1 ? "1px solid #e1e4ea" : "none" }}>
                              {/* Top row: instance name + service tag + icons */}
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                  <span style={{ fontSize: 16, fontWeight: 600, color: "#2b303b", lineHeight: 1 }}>{svc.instanceName}</span>
                                  <Tag text={svc.service} variant={TagVariant.SUBTLE} size={TagSize.SM} color={svc.service === "Amazon EC2" ? TagColor.WARNING : svc.service === "Amazon RDS" ? TagColor.PURPLE : svc.service === "Aurora RDS" ? TagColor.SUCCESS : svc.service === "Other" ? TagColor.NEUTRAL : TagColor.PRIMARY} shape={TagShape.SQUARICAL} />
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                  <Tooltip content="View details" side={TooltipSide.TOP} align={TooltipAlign.CENTER} showArrow open={viewIndex !== null || deleteIndex !== null || elastiCacheOpen ? false : undefined}>
                                    <button
                                      onClick={() => setViewIndex(i)}
                                      style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", color: "#717784", padding: 0 }}
                                    >
                                      <Eye size={16} />
                                    </button>
                                  </Tooltip>
                                  <Tooltip content="Edit" side={TooltipSide.TOP} align={TooltipAlign.CENTER} showArrow open={viewIndex !== null || deleteIndex !== null || elastiCacheOpen ? false : undefined}>
                                    <button
                                      onClick={() => {
                                        const svcToEdit = addedServices[i];
                                        setEditIndex(i);
                                        setEditOriginal({ instanceName: svcToEdit.instanceName, numInstances: String(svcToEdit.numInstances) });
                                        setFiltersOpen(false);
                                        setFilterSearch("");
                                        setActiveCategory("Region Code");
                                        setCheckedValues({});
                                        setAppliedFilters({});
                                        if (svcToEdit.service === "Amazon EC2") {
                                          const origInst = svcToEdit.instanceName;
                                          const origNum = String(svcToEdit.numInstances);
                                          const origVol = svcToEdit.ec2?.volumeType ?? "";
                                          const origAmt = svcToEdit.ec2?.storageAmount ?? "";
                                          const origUnit = svcToEdit.ec2?.storageUnit ?? "";
                                          const origFreq = svcToEdit.ec2?.snapshotFreq ?? "";
                                          const origSnapAmt = svcToEdit.ec2?.snapshotAmount ?? "";
                                          const origSnapUnit = svcToEdit.ec2?.snapshotUnit ?? "";
                                          setEc2SelectedInstance(origInst);
                                          setEc2NumInstances(origNum);
                                          setEc2VolumeType(origVol);
                                          setEc2StorageAmount(origAmt);
                                          setEc2StorageUnit(origUnit);
                                          setEc2SnapshotFreq(origFreq);
                                          setEc2SnapshotAmount(origSnapAmt);
                                          setEc2SnapshotUnit(origSnapUnit);
                                          setEc2EditOriginal({ instanceName: origInst, numInstances: origNum, volumeType: origVol, storageAmount: origAmt, storageUnit: origUnit, snapshotFreq: origFreq, snapshotAmount: origSnapAmt, snapshotUnit: origSnapUnit });
                                          setEc2SpecTableOpen(true);
                                          setEc2Open(true);
                                        } else if (svcToEdit.service === "Amazon RDS") {
                                          const origInstance = svcToEdit.instanceName;
                                          const origNum = String(svcToEdit.numInstances);
                                          const origVolume = svcToEdit.rds?.volumeType ?? "";
                                          const origIops = svcToEdit.rds?.iopsPerVolume ?? "";
                                          const origProxy = svcToEdit.rds?.useProxy ?? "";
                                          setRdsSelectedInstance(origInstance);
                                          setRdsNumInstances(origNum);
                                          setRdsVolumeType(origVolume);
                                          setRdsIopsPerVolume(origIops);
                                          setRdsUseProxy(origProxy);
                                          setRdsEditOriginal({ instanceName: origInstance, numInstances: origNum, volumeType: origVolume, iopsPerVolume: origIops, useProxy: origProxy });
                                          setRdsSpecTableOpen(true);
                                          setRdsOpen(true);
                                        } else if (svcToEdit.service === "Aurora RDS") {
                                          const o = svcToEdit.aurora;
                                          const origInst = svcToEdit.instanceName;
                                          const origNum = String(svcToEdit.numInstances);
                                          const origStorageAmt = o?.storageAmount ?? "";
                                          const origStorageUnit = o?.storageUnit ?? "";
                                          const origBaseline = o?.baselineIops ?? "";
                                          const origPeak = o?.peakIops ?? "";
                                          const origHours = o?.hoursOfPeakIops ?? "";
                                          const origProxy = o?.useProxy ?? "";
                                          setAuroraSelectedInstance(origInst);
                                          setAuroraNumInstances(origNum);
                                          setAuroraStorageAmount(origStorageAmt);
                                          setAuroraStorageUnit(origStorageUnit);
                                          setAuroraBaselineIops(origBaseline);
                                          setAuroraPeakIops(origPeak);
                                          setAuroraHoursOfPeakIops(origHours);
                                          setAuroraUseProxy(origProxy);
                                          setAuroraEditOriginal({ instanceName: origInst, numInstances: origNum, storageAmount: origStorageAmt, storageUnit: origStorageUnit, baselineIops: origBaseline, peakIops: origPeak, hoursOfPeakIops: origHours, useProxy: origProxy });
                                          setAuroraSpecTableOpen(true);
                                          setAuroraOpen(true);
                                        } else if (svcToEdit.service === "Other") {
                                          const origTitle = svcToEdit.other?.title ?? svcToEdit.instanceName;
                                          const origCost = String(svcToEdit.other?.cost ?? svcToEdit.totalCost);
                                          const origDesc = svcToEdit.other?.description ?? "";
                                          setOtherTitle(origTitle);
                                          setOtherCost(origCost);
                                          setOtherDescription(origDesc);
                                          setOtherEditOriginal({ title: origTitle, cost: origCost, description: origDesc });
                                          setOtherOpen(true);
                                        } else {
                                          setSelectedInstance(svcToEdit.instanceName);
                                          setNumInstances(String(svcToEdit.numInstances));
                                          setSpecTableOpen(true);
                                          setElastiCacheOpen(true);
                                        }
                                      }}
                                      style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", color: "#717784", padding: 0 }}
                                    >
                                      <PencilSimple size={16} />
                                    </button>
                                  </Tooltip>
                                  <Tooltip content="Delete service" side={TooltipSide.TOP} align={TooltipAlign.CENTER} showArrow open={viewIndex !== null || deleteIndex !== null || elastiCacheOpen ? false : undefined}>
                                    <button
                                      onClick={() => setDeleteIndex(i)}
                                      style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", color: "#717784", padding: 0 }}
                                    >
                                      <Trash size={16} />
                                    </button>
                                  </Tooltip>
                                </div>
                              </div>
                              {/* Bottom row: total cost */}
                              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
                                <span style={{ fontSize: 14, color: "#717784" }}>
                                  {svc.service === "Amazon EC2"
                                    ? "Total Cost ( Instance cost + Storage Cost )"
                                    : svc.service === "Amazon RDS"
                                    ? "Total Cost ( Instance cost + Storage Cost + Proxy Cost )"
                                    : svc.service === "Aurora RDS"
                                    ? "Total Cost ( Instance cost + Storage Cost + Proxy Cost )"
                                    : "Total Instance Cost"}
                                </span>
                                <span style={{ fontSize: 14, color: "#717784" }}>=</span>
                                <span style={{ fontSize: 14, fontWeight: 600, color: "#2b303b" }}>$ {svc.totalCost.toFixed(2)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      <div>
                        <Menu
                          trigger={
                            <Button
                              text="Add Services"
                              buttonType={ButtonType.SECONDARY}
                              size={ButtonSize.MEDIUM}
                              leadingIcon={<Plus size={14} weight="bold" />}
                            />
                          }
                          side={MenuSide.BOTTOM}
                          alignment={MenuAlignment.START}
                          items={[{
                            items: [
                              { label: "Amazon ElastiCache", onClick: () => {
                                setSelectedInstance("");
                                setNumInstances("");
                                setSpecTableOpen(true);
                                setFiltersOpen(false);
                                setFilterSearch("");
                                setActiveCategory("Region Code");
                                setCheckedValues({});
                                setAppliedFilters({});
                                setElastiCacheOpen(true);
                              }},
                              { label: "Amazon EC2", onClick: () => {
                                setEc2SelectedInstance(""); setEc2NumInstances(""); setEc2VolumeType("");
                                setEc2StorageAmount(""); setEc2StorageUnit(""); setEc2SnapshotFreq("");
                                setEc2SnapshotAmount(""); setEc2SnapshotUnit("");
                                setEc2SpecTableOpen(true);
                                setEc2Open(true);
                              }},
                              { label: "Amazon RDS", onClick: () => {
                                setRdsSelectedInstance(""); setRdsNumInstances(""); setRdsVolumeType("");
                                setRdsIopsPerVolume(""); setRdsUseProxy("");
                                setRdsSpecTableOpen(true);
                                setRdsOpen(true);
                              }},
                              { label: "Aurora RDS", onClick: () => {
                                setAuroraSelectedInstance(""); setAuroraNumInstances(""); setAuroraStorageAmount("");
                                setAuroraStorageUnit(""); setAuroraBaselineIops(""); setAuroraPeakIops("");
                                setAuroraHoursOfPeakIops(""); setAuroraUseProxy("");
                                setAuroraSpecTableOpen(true);
                                setAuroraOpen(true);
                              }},
                              { label: "Other",              onClick: () => { setOtherTitle(""); setOtherCost(""); setOtherDescription(""); setOtherEditOriginal(null); setOtherOpen(true); } },
                            ],
                          }]}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 3 body */}
                  {currentStep === 3 && (() => {
                    const totalEstimated = addedServices.reduce((sum, s) => sum + s.totalCost, 0);
                    const provisionLabel = provisionType === "permanent" ? "Permanent Provisioning" : provisionType === "temporary" ? "Temporary Provisioning" : provisionType;
                    const accountLabel = account === "acs" ? "ACS-0086553729485" : account;
                    return (
                      <div ref={summaryScrollRef} style={{ overflowY: "auto", padding: "32px", display: "flex", flexDirection: "column", flex: 1 }}>

                        {/* Basic Detail — flat, no accordion */}
                        <style>{`
  .summary-kv [data-element="value"] { font-size: 14px !important; font-weight: 600 !important; }
`}</style>
                        <div className="summary-kv" style={{ paddingBottom: 20 }}>
                          {/* Header row */}
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 40 }}>
                            <div style={{ borderRadius: 4, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", width: 18, height: 18 }}>
                              <FileText size={18} color="#222530" weight="regular" />
                            </div>
                            <span style={{ fontSize: 16, fontWeight: 600, color: "#222530" }}>Basic Detail</span>
                            {teamName && (
                              <Tag
                                text={`Team: ${teamName}`}
                                variant={TagVariant.SUBTLE}
                                size={TagSize.SM}
                                color={TagColor.NEUTRAL}
                                shape={TagShape.SQUARICAL}
                              />
                            )}
                          </div>
                          {/* KV grid */}
                          <div style={{ display: "flex", gap: 52, marginBottom: 32, flexWrap: "nowrap" }}>
                            <KeyValuePair
                              keyString="Account Name"
                              value={accountLabel || "—"}
                              size={KeyValuePairSize.MEDIUM}
                              keyValuePairState={KeyValuePairStateType.vertical}
                              maxWidth="160px"
                              textOverflow="truncate"
                              showTooltipOnTruncate
                            />
                            <KeyValuePair
                              keyString="Provision Type"
                              size={KeyValuePairSize.MEDIUM}
                              keyValuePairState={KeyValuePairStateType.vertical}
                              maxWidth="160px"
                              valueLeftSlot={
                                <Tag
                                  text={provisionLabel || "—"}
                                  variant={TagVariant.SUBTLE}
                                  size={TagSize.SM}
                                  color={TagColor.PRIMARY}
                                  shape={TagShape.SQUARICAL}
                                />
                              }
                            />
                            <KeyValuePair
                              keyString="Start Date"
                              value={formatDate(startDate) || "—"}
                              size={KeyValuePairSize.MEDIUM}
                              keyValuePairState={KeyValuePairStateType.vertical}
                              maxWidth="160px"
                              textOverflow="truncate"
                              showTooltipOnTruncate
                            />
                            <KeyValuePair
                              keyString="End Date"
                              value={formatDate(endDate) || "—"}
                              size={KeyValuePairSize.MEDIUM}
                              keyValuePairState={KeyValuePairStateType.vertical}
                              maxWidth="160px"
                              textOverflow="truncate"
                              showTooltipOnTruncate
                            />
                          </div>
                          {purpose && (
                            <div style={{ width: "100%" }}>
                              <KeyValuePair
                                keyString="Purpose"
                                value={purpose}
                                size={KeyValuePairSize.MEDIUM}
                                keyValuePairState={KeyValuePairStateType.vertical}
                                maxWidth="100%"
                                textOverflow="wrap"
                              />
                            </div>
                          )}
                        </div>

                        {/* Dashed divider */}
                        <div style={{ paddingTop: 24, marginBottom: 44 }}>
                          <div style={{ height: 1, backgroundImage: "repeating-linear-gradient(to right, #e1e4ea 0px, #e1e4ea 4px, transparent 4px, transparent 8px)" }} />
                        </div>

                        {/* Service wise Cost Estimates */}
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                            <TipJar size={18} color="#222530" weight="regular" />
                            <span style={{ fontSize: 16, fontWeight: 600, color: "#222530" }}>Service wise Cost Estimates</span>
                          </div>

                          {/* Total cost banner */}
                          <div style={{ background: "#f2f4f7", borderRadius: 12, padding: "16px 24px", marginBottom: 16 }}>
                            <p style={{ fontSize: 24, fontWeight: 700, color: "#222530", marginBottom: 4 }}>$ {totalEstimated.toFixed(2)}</p>
                            <p style={{ fontSize: 14, fontWeight: 500, color: "#717784" }}>Total Estimated Cost of all services</p>
                          </div>

                          {/* Service rows — no outer container */}
                          <div style={{ borderBottom: "1px solid #e1e4ea" }}>
                            {addedServices.map((svc, i) => {
                              const isOpen = summaryOpenServices === i;
                              const isEc2 = svc.service === "Amazon EC2";
                              const isRds = svc.service === "Amazon RDS";
                              const isAurora = svc.service === "Aurora RDS";
                              const isOther = svc.service === "Other";
                              const tagColor = isEc2 ? TagColor.WARNING : isRds ? TagColor.PURPLE : isAurora ? TagColor.SUCCESS : isOther ? TagColor.NEUTRAL : TagColor.PRIMARY;
                              const costLabel = isEc2 ? "Instance cost + Storage Cost"
                                : isRds ? "Instance cost + Storage Cost + Proxy Cost"
                                : isAurora ? "Instance cost + Storage Cost + Proxy Cost"
                                : isOther ? "Total Cost"
                                : "Total Instance Cost";
                              const instData = isEc2
                                ? EC2_INSTANCES.find(inst => inst.instanceName === svc.instanceName)
                                : (isRds || isAurora)
                                ? RDS_INSTANCES.find(inst => inst.instanceName === svc.instanceName)
                                : ELASTICACHE_INSTANCES.find(inst => inst.instanceName === svc.instanceName);
                              const cph = instData ? ((isRds || isAurora) ? instData.price : instData.price / 730) : 0;
                              const instanceCost = isEc2 ? (svc.ec2?.instanceCost ?? svc.totalCost) : isRds ? (svc.rds?.instanceCost ?? svc.totalCost) : isAurora ? (svc.aurora?.instanceCost ?? svc.totalCost) : svc.totalCost;
                              return (
                                <div key={i} style={{ borderTop: i > 0 ? "1px solid #e1e4ea" : "none" }}>
                                  {/* Row header */}
                                  <div
                                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0", cursor: "pointer", userSelect: "none" }}
                                    onClick={() => {
                                      const opening = summaryOpenServices !== i;
                                      setSummaryOpenServices(opening ? i : null);
                                      if (opening && summaryScrollRef.current) {
                                        const el = summaryScrollRef.current;
                                        el.scrollBy({ top: el.clientHeight * 0.6, behavior: "smooth" });
                                      }
                                    }}
                                  >
                                    <div>
                                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                                        <span style={{ fontSize: 14, fontWeight: 600, color: "#2b303b" }}>{svc.instanceName}</span>
                                        <Tag text={svc.service} variant={TagVariant.SUBTLE} size={TagSize.SM} color={tagColor} shape={TagShape.SQUARICAL} />
                                      </div>
                                      <p style={{ fontSize: 13, color: "#717784" }}>
                                        {"Total Cost = "}
                                        <span style={{ fontWeight: 600, color: "#2b303b" }}>$ {svc.totalCost.toFixed(2)}</span>
                                        {!isOther && <span style={{ color: "#99a0ae" }}>&nbsp;&nbsp;{costLabel}</span>}
                                      </p>
                                    </div>
                                    <div style={{ flexShrink: 0 }}>{isOpen ? <CaretUp size={14} color="#717784" /> : <CaretDown size={14} color="#717784" />}</div>
                                  </div>

                                  {/* Expanded breakdown — inside a bordered card */}
                                  {isOpen && (
                                    <div style={{ marginBottom: 20 }}>
                                    <div style={{ border: "1px solid #e1e4ea", borderRadius: 12, padding: 20, background: "white" }}>
                                      {isOther ? (
                                        <>
                                          <p style={{ fontSize: 22, fontWeight: 700, color: "#222530", marginBottom: 4 }}>$ {svc.totalCost.toFixed(2)}</p>
                                          <p style={{ fontSize: 13, color: "#717784", marginBottom: svc.other?.description ? 16 : 0 }}>Total Cost</p>
                                          {svc.other?.description && (
                                            <p style={{ fontSize: 13, color: "#2b303b", lineHeight: 1.6 }}>{svc.other.description}</p>
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          <p style={{ fontSize: 22, fontWeight: 700, color: "#222530", marginBottom: 4, paddingTop: 16 }}>$ {svc.totalCost.toFixed(2)}</p>
                                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                                            {(isEc2 || isRds || isAurora) ? (
                                              <>
                                                <span style={{ fontSize: 13, color: "#717784" }}>Total Cost</span>
                                                <Tag text={costLabel} variant={TagVariant.SUBTLE} size={TagSize.XS} color={TagColor.NEUTRAL} shape={TagShape.SQUARICAL} maxWidth="none" />
                                              </>
                                            ) : (
                                              <span style={{ fontSize: 13, color: "#717784" }}>Total Instance Cost</span>
                                            )}
                                          </div>

                                          {/* Instance Cost Calcs */}
                                          <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
                                            <span style={{ fontSize: 11, fontWeight: 600, color: "#99a0ae", letterSpacing: "0.08em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const }}>Instance Cost Calculations</span>
                                            <div style={{ flex: 1, height: 1, background: "#e1e4ea", marginLeft: 10 }} />
                                          </div>
                                          {[
                                            { label: "Unit Price",             value: instData ? `$ ${cph.toFixed(isRds ? 3 : 4)}` : "$ 0" },
                                            { label: "Total Hours",            value: "730" },
                                            { label: "Total Cost for 730 Hrs", value: instData ? `$ ${(isEc2 ? (svc.ec2?.totalCost730 ?? 0) : isRds ? (svc.rds?.totalCost730 ?? 0) : isAurora ? (svc.aurora?.totalCost730 ?? 0) : instData.price).toFixed(2)}` : "$ 0" },
                                            { label: "Total Instances",        value: String(svc.numInstances) },
                                          ].map(row => (
                                            <div key={row.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                              <span style={{ fontSize: 13, color: "#717784" }}>{row.label}</span>
                                              <span style={{ fontSize: 13, fontWeight: 600, color: "#2b303b" }}>{row.value}</span>
                                            </div>
                                          ))}
                                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: (isEc2 || isRds || isAurora) ? 20 : 0 }}>
                                            <span style={{ fontSize: 13, color: "#16a34a" }}>Total Cost ({svc.numInstances} instance{svc.numInstances !== 1 ? "s" : ""} for 730hrs)</span>
                                            <span style={{ fontSize: 13, fontWeight: 600, color: "#16a34a" }}>$ {instanceCost.toFixed(2)}</span>
                                          </div>

                                          {/* Storage Cost — EC2 */}
                                          {isEc2 && svc.ec2 && (
                                            <>
                                              <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
                                                <span style={{ fontSize: 11, fontWeight: 600, color: "#99a0ae", letterSpacing: "0.08em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const }}>Storage Cost Calculations</span>
                                                <div style={{ flex: 1, height: 1, background: "#e1e4ea", marginLeft: 10 }} />
                                              </div>
                                              {[
                                                { label: "Total hours",         value: "8760 hrs" },
                                                { label: "Storage Cost",        value: `$ ${svc.ec2.storageCost.toFixed(2)}` },
                                                { label: "Total Snapshot cost", value: `$ ${svc.ec2.snapshotCost.toFixed(2)}` },
                                              ].map(row => (
                                                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                                  <span style={{ fontSize: 13, color: "#717784" }}>{row.label}</span>
                                                  <span style={{ fontSize: 13, fontWeight: 600, color: "#2b303b" }}>{row.value}</span>
                                                </div>
                                              ))}
                                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <span style={{ fontSize: 13, color: "#16a34a" }}>Total Storage Cost</span>
                                                <span style={{ fontSize: 13, fontWeight: 600, color: "#16a34a" }}>$ {svc.ec2.totalStorageCost.toFixed(2)}</span>
                                              </div>
                                            </>
                                          )}

                                          {/* Storage + Proxy — RDS */}
                                          {isRds && svc.rds && (
                                            <>
                                              <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
                                                <span style={{ fontSize: 11, fontWeight: 600, color: "#99a0ae", letterSpacing: "0.08em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const }}>Storage Cost Calculations</span>
                                                <div style={{ flex: 1, height: 1, background: "#e1e4ea", marginLeft: 10 }} />
                                              </div>
                                              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                                <span style={{ fontSize: 13, color: "#717784" }}>IOPS Cost</span>
                                                <span style={{ fontSize: 13, fontWeight: 600, color: "#2b303b" }}>$ {svc.rds.storageCost.toFixed(5)}</span>
                                              </div>
                                              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                                                <span style={{ fontSize: 13, color: "#16a34a" }}>Total Storage Cost</span>
                                                <span style={{ fontSize: 13, fontWeight: 600, color: "#16a34a" }}>$ {svc.rds.storageCost.toFixed(2)}</span>
                                              </div>
                                              <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
                                                <span style={{ fontSize: 11, fontWeight: 600, color: "#99a0ae", letterSpacing: "0.08em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const }}>Proxy Cost Calculations</span>
                                                <div style={{ flex: 1, height: 1, background: "#e1e4ea", marginLeft: 10 }} />
                                              </div>
                                              {[
                                                { label: "Total hours (Hrs × No. of instances)", value: String(730 * svc.numInstances) },
                                                { label: "Total vCPU's", value: instData ? instData.cpu : "0" },
                                              ].map(row => (
                                                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                                  <span style={{ fontSize: 13, color: "#717784" }}>{row.label}</span>
                                                  <span style={{ fontSize: 13, fontWeight: 600, color: "#2b303b" }}>{row.value}</span>
                                                </div>
                                              ))}
                                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <span style={{ fontSize: 13, color: "#16a34a" }}>Total Proxy cost (vCPU × Hrs × No. of instances)</span>
                                                <span style={{ fontSize: 13, fontWeight: 600, color: "#16a34a" }}>$ {svc.rds.proxyCost.toFixed(2)}</span>
                                              </div>
                                            </>
                                          )}

                                          {/* Storage + Proxy — Aurora */}
                                          {isAurora && svc.aurora && (
                                            <>
                                              <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
                                                <span style={{ fontSize: 11, fontWeight: 600, color: "#99a0ae", letterSpacing: "0.08em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const }}>Storage Cost Calculations</span>
                                                <div style={{ flex: 1, height: 1, background: "#e1e4ea", marginLeft: 10 }} />
                                              </div>
                                              {[
                                                { label: "Total IOPS Cost",  value: `$ ${svc.aurora.iopsCost.toFixed(2)}` },
                                                { label: "Baseline Hours",   value: `${svc.aurora.baselineHrs.toFixed(0)} Hrs (730 - ${svc.aurora.hoursOfPeakIops})` },
                                              ].map(row => (
                                                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                                  <span style={{ fontSize: 13, color: "#717784" }}>{row.label}</span>
                                                  <span style={{ fontSize: 13, fontWeight: 600, color: "#2b303b" }}>{row.value}</span>
                                                </div>
                                              ))}
                                              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                                                <span style={{ fontSize: 13, color: "#16a34a" }}>Total Storage Cost</span>
                                                <span style={{ fontSize: 13, fontWeight: 600, color: "#16a34a" }}>$ {svc.aurora.storageCost.toFixed(2)}</span>
                                              </div>
                                              <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
                                                <span style={{ fontSize: 11, fontWeight: 600, color: "#99a0ae", letterSpacing: "0.08em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const }}>Proxy Cost Calculations</span>
                                                <div style={{ flex: 1, height: 1, background: "#e1e4ea", marginLeft: 10 }} />
                                              </div>
                                              {[
                                                { label: "Total hours (Hrs × No. of instances)", value: String(730 * svc.numInstances) },
                                                { label: "Total vCPU's", value: instData ? instData.cpu : "0" },
                                              ].map(row => (
                                                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                                  <span style={{ fontSize: 13, color: "#717784" }}>{row.label}</span>
                                                  <span style={{ fontSize: 13, fontWeight: 600, color: "#2b303b" }}>{row.value}</span>
                                                </div>
                                              ))}
                                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <span style={{ fontSize: 13, color: "#16a34a" }}>Total Proxy cost ({svc.aurora.storageGB > 0 ? svc.aurora.storageGB.toFixed(0) : "0"} GB × $0.11 × 1 month)</span>
                                                <span style={{ fontSize: 13, fontWeight: 600, color: "#16a34a" }}>$ {svc.aurora.proxyCost.toFixed(2)}</span>
                                              </div>
                                            </>
                                          )}
                                        </>
                                      )}
                                    </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Card footer */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: currentStep === 2 ? "space-between" : "flex-end", gap: 16, padding: "0 32px", height: 85, flexShrink: 0, borderTop: "1px solid #e1e4ea" }}>
                    {currentStep === 2 && (
                      <div>
                        <span style={{ fontSize: 20, fontWeight: 700, color: "#222530" }}>$ {addedServices.reduce((sum, s) => sum + s.totalCost, 0).toFixed(2)}</span>
                        <p style={{ fontSize: 12, color: "#717784", marginTop: 2 }}>Total Estimated Cost of all services</p>
                      </div>
                    )}
                    <div style={{ display: "flex", gap: 16 }}>
                      <div className="prev-btn" style={{ width: 100 }}>
                        <Button
                          text="Prev"
                          buttonType={ButtonType.SECONDARY}
                          size={ButtonSize.LARGE}
                          subType={ButtonSubType.DEFAULT}
                          leadingIcon={<CaretLeft size={14} weight="bold" color="currentColor" />}
                          disabled={currentStep === 1}
                          onClick={() => setCurrentStep(s => s - 1)}
                          fullWidth
                        />
                      </div>
                      {currentStep === 3 ? (
                        <div style={{ width: 100 }}>
                          <Button text="Submit" buttonType={ButtonType.PRIMARY} size={ButtonSize.LARGE} trailingIcon={<CaretRight size={14} weight="bold" />} onClick={handleSubmit} fullWidth />
                        </div>
                      ) : currentStep === 1 ? (
                        <Tooltip content="Fill in all details to continue to the next step" open={!isFormComplete && hoverNext} side={TooltipSide.TOP} align={TooltipAlign.CENTER} showArrow>
                          <div style={{ width: 100 }} onMouseEnter={() => setHoverNext(true)} onMouseLeave={() => setHoverNext(false)}>
                            <Button text="Next" buttonType={ButtonType.PRIMARY} size={ButtonSize.LARGE} trailingIcon={<CaretRight size={14} weight="bold" />} disabled={!isFormComplete} onClick={() => setCurrentStep(2)} fullWidth />
                          </div>
                        </Tooltip>
                      ) : (
                        <Tooltip content="Add at least one service to continue" open={currentStep === 2 && addedServices.length === 0 && hoverNext} side={TooltipSide.TOP} align={TooltipAlign.CENTER} showArrow>
                          <div style={{ width: 100 }} onMouseEnter={() => setHoverNext(true)} onMouseLeave={() => setHoverNext(false)}>
                            <Button text="Next" buttonType={ButtonType.PRIMARY} size={ButtonSize.LARGE} trailingIcon={<CaretRight size={14} weight="bold" />} disabled={currentStep === 2 && addedServices.length === 0} onClick={() => setCurrentStep(s => s + 1)} fullWidth />
                          </div>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </div>

                {/* Vertical stepper */}
                <div style={{ width: 240, paddingTop: 8 }}>
                  <Stepper steps={DYNAMIC_STEPS} stepperType={StepperType.VERTICAL} />
                </div>
              </div>
              </div>{/* end centered content wrapper */}
        </div>
      </div>

      {/* ── Amazon ElastiCache modal ───────────────────────────────────────────── */}
      <Modal
        isOpen={elastiCacheOpen}
        onClose={() => setElastiCacheOpen(false)}
        showHeader
        showFooter
        showCloseButton
        closeOnBackdropClick={false}
        title="Amazon Elasti Cache"
        subtitle="One line description of the modal"
        minWidth="1472px"
        maxWidth="1472px"
        primaryAction={{
          text: editIndex !== null ? "Save Changes" : "Add to Estimate",
          buttonType: ButtonType.PRIMARY,
          size: ButtonSize.LARGE,
          disabled: editIndex !== null ? (!hasEditChanges || !canAddEstimate) : !canAddEstimate,
          onClick: () => {
            if (editIndex !== null) {
              setAddedServices(prev => prev.map((s, i) => i === editIndex ? { ...s, instanceName: selectedInstance, totalCost: totalCostAll, numInstances: numInst } : s));
              setEditIndex(null);
              setEditOriginal(null);
            } else {
              setAddedServices(prev => [...prev, { instanceName: selectedInstance, service: "Amazon ElastiCache", totalCost: totalCostAll, numInstances: numInst }]);
              setCurrentStep(2);
            }
            setElastiCacheOpen(false);
          },
        }}
        secondaryAction={{
          text: "Cancel",
          buttonType: ButtonType.SECONDARY,
          size: ButtonSize.LARGE,
          onClick: () => { setElastiCacheOpen(false); setEditIndex(null); setEditOriginal(null); },
        }}
      >
        <div style={{ display: "flex", gap: 0, alignItems: "flex-start" }}>

          {/* ── Left column ── */}
          <div style={{ flex: 1, minWidth: 0, overflowY: "auto" }}>
            {/* Section label */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#99a0ae", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                Instance Cost Calculations
              </span>
              <div style={{ flex: 1, height: 1, background: "#e1e4ea" }} />
            </div>

            {/* Accordion header (no card container) */}
            <div
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}
              onClick={() => setSpecTableOpen(o => !o)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#222530" }}>Instance Specification Table</span>
                <Tag text="Only for Review" variant={TagVariant.SUBTLE} size={TagSize.XS} color={TagColor.NEUTRAL} shape={TagShape.SQUARICAL} />
              </div>
              {specTableOpen ? <CaretUp size={14} color="#717784" /> : <CaretDown size={14} color="#717784" />}
            </div>

            {/* Table section (no container) */}
            {specTableOpen && (
              <div style={{ marginTop: 16 }}>
                {/* Filter row: button + applied chips */}
                <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 18 }}>
                  <div ref={filtersBtnRef} style={{ position: "relative", display: "inline-block" }}>
                    <Button
                      text="Filters"
                      buttonType={ButtonType.SECONDARY}
                      size={ButtonSize.SMALL}
                      leadingIcon={<FunnelSimple size={13} />}
                      trailingIcon={filtersOpen ? <CaretUp size={12} weight="bold" /> : <CaretDown size={12} weight="bold" />}
                      onClick={openFilters}
                    />
                    {hasApplied && (
                      <span style={{ position: "absolute", top: 0, right: 0, width: 8, height: 8, borderRadius: "50%", background: "#e7000b", border: "1.5px solid white", transform: "translate(30%, -30%)" }} />
                    )}
                  </div>

                  {/* Divider between Filters button and chips */}
                  {hasApplied && (
                    <div style={{ width: 1, height: 20, background: "#e1e4ea", flexShrink: 0 }} />
                  )}

                  {/* Applied filter chips */}
                  {Object.entries(appliedFilters).filter(([, vals]) => vals.length > 0).map(([cat, vals]) => {
                    const shortLabel = cat === "Region Code" ? "Region" : cat;
                    return (
                      <div key={cat} style={{ alignSelf: "center", flexShrink: 0 }}>
                        <MultiSelect
                          label=""
                          placeholder=""
                          slot={<span style={{ fontSize: 13, fontWeight: 600, color: "#2b303b", whiteSpace: "nowrap" }}>{shortLabel}</span>}
                          selectedValues={vals}
                          onChange={(val) => {
                            setAppliedFilters(prev => {
                              const existing = prev[cat] ?? [];
                              const next = existing.includes(val) ? existing.filter(v => v !== val) : [...existing, val];
                              if (next.length === 0) { const n = { ...prev }; delete n[cat]; return n; }
                              return { ...prev, [cat]: next };
                            });
                            setCheckedValues(prev => {
                              const existing = prev[cat] ?? [];
                              const next = existing.includes(val) ? existing.filter(v => v !== val) : [...existing, val];
                              return { ...prev, [cat]: next };
                            });
                          }}
                          items={[{ items: (FILTER_VALUES[cat] ?? []).map(v => ({ label: v, value: v })) }]}
                          variant={MultiSelectVariant.CONTAINER}
                          selectionTagType={MultiSelectSelectionTagType.TEXT}
                          size={MultiSelectMenuSize.SMALL}
                          showClearButton
                          onClearAllClick={() => {
                            setAppliedFilters(prev => { const n = { ...prev }; delete n[cat]; return n; });
                            setCheckedValues(prev => { const n = { ...prev }; delete n[cat]; return n; });
                          }}
                          maxTriggerWidth={247}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Table */}
                <DataTable
                  data={filteredInstances}
                  idField="id"
                  columns={ELASTICACHE_COLUMNS}
                  pagination={{ currentPage: 1, totalRows: filteredInstances.length, pageSize: 4, pageSizeOptions: [4] }}
                  enableColumnManager={false}
                />
              </div>
            )}

            {/* Instance + No. of instances */}
            <div style={{ display: "flex", gap: 24, marginTop: 24 }}>
              <div style={{ flex: 3 }}>
                <FieldLabel label="Instance" required tooltip="Select the instance type for ElastiCache" />
                <SingleSelect
                  placeholder="Select -"
                  size={SelectMenuSize.MEDIUM}
                  side={SelectMenuSide.BOTTOM}
                  selected={selectedInstance}
                  onSelect={v => setSelectedInstance(v as string)}
                  fullWidth
                  items={[{ items: ELASTICACHE_INSTANCES.map(inst => ({ label: inst.instanceName, value: inst.instanceName })) }]}
                />
                {instanceData && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 13, color: "#525866" }}><span style={{ fontWeight: 600 }}>vCPU:</span> {instanceData.cpu}</span>
                    <span style={{ color: "#c8cdd8", fontSize: 13 }}>|</span>
                    <span style={{ fontSize: 13, color: "#525866" }}><span style={{ fontWeight: 600 }}>Memory:</span> {instanceData.memory}</span>
                    <span style={{ color: "#c8cdd8", fontSize: 13 }}>|</span>
                    <span style={{ fontSize: 13, color: "#525866" }}><span style={{ fontWeight: 600 }}>Network Performance:</span> {instanceData.networkPerf}</span>
                  </div>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <FieldLabel label="No. of instances" required tooltip="Enter the number of instances required" />
                <div className={shakingField === "elasti_numInst" ? "shake-field" : ""}>
                  <TextInput
                    size={TextInputSize.MEDIUM}
                    placeholder="Enter -"
                    value={numInstances}
                    error={numericError === "elasti_numInst"}
                    errorMessage="Only numeric values accepted"
                    onChange={e => handleNumericInput(e.target.value, "elasti_numInst", setNumInstances)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* gap */}
          <div style={{ width: 32, flexShrink: 0 }} />

          {/* ── Right column — cost card ── */}
          <div style={{ width: 500, flexShrink: 0 }}>
            <div style={{ background: "white", border: "1px solid #e1e4ea", borderRadius: 12, padding: 24, minHeight: 560, boxSizing: "border-box" }}>
              {/* Total cost */}
              <p style={{ fontSize: 28, fontWeight: 700, color: "#222530", lineHeight: "36px" }}>
                $ {totalCostAll.toFixed(2)}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
                <span style={{ fontSize: 13, color: "#717784" }}>Total Instance Cost</span>
              </div>

              <div style={{ marginTop: 32 }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 18 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#99a0ae", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    Instance Cost Calculations
                  </span>
                  <div style={{ flex: 1, height: 1, background: "#e1e4ea", marginLeft: 12 }} />
                </div>
                {[
                  { label: "Cost per instance per hour", value: instancePrice > 0 ? `$ ${costPerHour.toFixed(4)}` : "$ 0" },
                  { label: "Total Hours",                value: instancePrice > 0 ? "730" : "0" },
                  { label: "Total Cost for 730 Hrs",     value: instancePrice > 0 ? `$ ${totalCost730}` : "$ 0" },
                  { label: "Total Instances",            value: numInst > 0 ? String(numInst) : "0" },
                ].map(row => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: 14, color: "#717784", flex: 1 }}>{row.label}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#2b303b", flexShrink: 0 }}>{row.value}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginTop: 4 }}>
                  <span style={{ fontSize: 14, color: "#16a34a", flex: 1 }}>
                    Total Cost ({numInst > 0 ? numInst : 1} instance{numInst !== 1 ? "s" : ""} for 730hrs)
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#16a34a", flexShrink: 0 }}>
                    $ {totalCostAll > 0 ? totalCostAll.toFixed(2) : "0"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* ── Delete confirmation Modal ── */}
      <Modal
        isOpen={deleteIndex !== null}
        onClose={() => setDeleteIndex(null)}
        showHeader={false}
        showFooter={false}
        showCloseButton={false}
        closeOnBackdropClick={false}
        minWidth="550px"
        maxWidth="550px"
        minHeight="324px"
      >
        <div style={{ display: "flex", flexDirection: "column", padding: "48px 40px 40px", position: "relative" }}>
          {/* Close button */}
          <button onClick={() => setDeleteIndex(null)} style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", color: "#717784", padding: 0 }}>
            <X size={20} />
          </button>
          {/* Illustration */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
            <div style={{ width: 92, height: 92, borderRadius: 8, background: "#f3e8ff", border: "1.5px dashed #c084fc" }} />
          </div>
          {/* Text */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#222530", margin: "0 0 6px", lineHeight: "28px" }}>
              Are you sure you want to delete &ldquo;{deleteIndex !== null ? addedServices[deleteIndex]?.instanceName : ""}&rdquo; ?
            </p>
            <p style={{ fontSize: 14, color: "#717784", margin: 0 }}>One or two line description of the modal</p>
          </div>
          {/* Buttons */}
          <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
            <Button text="Cancel" buttonType={ButtonType.SECONDARY} size={ButtonSize.LARGE} onClick={() => setDeleteIndex(null)} />
            <Button
              text="Yes, Delete"
              buttonType={ButtonType.PRIMARY}
              size={ButtonSize.LARGE}
              onClick={() => {
                setAddedServices(prev => prev.filter((_, idx) => idx !== deleteIndex));
                setDeleteIndex(null);
              }}
            />
          </div>
        </div>
      </Modal>

      {/* ── Amazon EC2 modal ── */}
      <Modal
        isOpen={ec2Open}
        onClose={() => { setEc2Open(false); setEditIndex(null); setEditOriginal(null); setEc2EditOriginal(null); }}
        showHeader
        showFooter
        showCloseButton
        closeOnBackdropClick={false}
        title="Amazon EC2"
        subtitle="One line description of the modal"
        minWidth="1472px"
        maxWidth="1472px"
        minHeight="840px"
        maxHeight="840px"
        primaryAction={{
          text: editIndex !== null ? "Save Changes" : "Add to Estimate",
          buttonType: ButtonType.PRIMARY,
          size: ButtonSize.LARGE,
          disabled: editIndex !== null ? (!ec2HasEditChanges || !canAddEc2) : !canAddEc2,
          onClick: () => {
            const ec2Data = { storageCost: ec2StorageCost, snapshotCost: ec2TotalSnapshotCost, totalStorageCost: ec2TotalStorageCost, instanceCost: ec2TotalInstanceCost, unitPrice: ec2CostPerHour, totalCost730: ec2TotalCost730, volumeType: ec2VolumeType, storageAmount: ec2StorageAmount, storageUnit: ec2StorageUnit, snapshotFreq: ec2SnapshotFreq, snapshotAmount: ec2SnapshotAmount, snapshotUnit: ec2SnapshotUnit };
            if (editIndex !== null) {
              setAddedServices(prev => prev.map((s, i) => i === editIndex ? { ...s, instanceName: ec2SelectedInstance, totalCost: ec2GrandTotal, numInstances: ec2NumInst, ec2: ec2Data } : s));
              setEditIndex(null);
              setEditOriginal(null);
            } else {
              setAddedServices(prev => [...prev, { instanceName: ec2SelectedInstance, service: "Amazon EC2", totalCost: ec2GrandTotal, numInstances: ec2NumInst, ec2: ec2Data }]);
              setCurrentStep(2);
            }
            setEc2Open(false);
            setEc2EditOriginal(null);
          },
        }}
        secondaryAction={{
          text: "Cancel",
          buttonType: ButtonType.SECONDARY,
          size: ButtonSize.LARGE,
          onClick: () => { setEc2Open(false); setEditIndex(null); setEditOriginal(null); setEc2EditOriginal(null); },
        }}
      >
        <div style={{ display: "flex", gap: 0, alignItems: "flex-start" }}>
          {/* ── Left column ── */}
          <div style={{ flex: 1, minWidth: 0, maxHeight: 632, overflowY: "auto" }}>

            {/* INSTANCE COST CALCULATIONS */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#99a0ae", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                Instance Cost Calculations
              </span>
              <div style={{ flex: 1, height: 1, background: "#e1e4ea" }} />
            </div>

            {/* Accordion: Instance Specification Table */}
            <div
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", marginBottom: ec2SpecTableOpen ? 16 : 24 }}
              onClick={() => setEc2SpecTableOpen(o => !o)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#222530" }}>Instance Specification Table</span>
                <Tag text="Only for Review" variant={TagVariant.SUBTLE} size={TagSize.XS} color={TagColor.NEUTRAL} shape={TagShape.SQUARICAL} />
              </div>
              {ec2SpecTableOpen ? <CaretUp size={14} color="#717784" /> : <CaretDown size={14} color="#717784" />}
            </div>

            {ec2SpecTableOpen && (
              <div style={{ marginBottom: 24 }}>
                <DataTable
                  data={EC2_INSTANCES}
                  idField="id"
                  columns={EC2_COLUMNS}
                  pagination={{ currentPage: 1, totalRows: EC2_INSTANCES.length, pageSize: 4, pageSizeOptions: [4] }}
                  enableColumnManager={false}
                />
              </div>
            )}

            {/* Instance + No. of instances */}
            <div style={{ display: "flex", gap: 24, marginBottom: 32 }}>
              <div style={{ flex: 3 }}>
                <FieldLabel label="Instance" required tooltip="Select the EC2 instance type" />
                <SingleSelect
                  placeholder="Select -"
                  size={SelectMenuSize.MEDIUM}
                  side={SelectMenuSide.BOTTOM}
                  selected={ec2SelectedInstance}
                  onSelect={v => setEc2SelectedInstance(v as string)}
                  fullWidth
                  items={[{ items: EC2_INSTANCES.map(inst => ({ label: inst.instanceName, value: inst.instanceName })) }]}
                />
                {ec2InstanceData && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 13, color: "#525866" }}><span style={{ fontWeight: 600 }}>vCPU:</span> {ec2InstanceData.cpu}</span>
                    <span style={{ color: "#c8cdd8", fontSize: 13 }}>|</span>
                    <span style={{ fontSize: 13, color: "#525866" }}><span style={{ fontWeight: 600 }}>Memory:</span> {ec2InstanceData.memory}</span>
                    <span style={{ color: "#c8cdd8", fontSize: 13 }}>|</span>
                    <span style={{ fontSize: 13, color: "#525866" }}><span style={{ fontWeight: 600 }}>Network Performance:</span> {ec2InstanceData.networkPerf}</span>
                    <span style={{ color: "#c8cdd8", fontSize: 13 }}>|</span>
                    <span style={{ fontSize: 13, color: "#525866" }}><span style={{ fontWeight: 600 }}>Demand Price:</span> ${ec2InstanceData.demandPrice} / hr</span>
                  </div>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <FieldLabel label="No. of instances" required tooltip="Enter the number of EC2 instances" />
                <div className={shakingField === "ec2_numInst" ? "shake-field" : ""}>
                  <TextInput
                    size={TextInputSize.MEDIUM}
                    placeholder="Enter -"
                    value={ec2NumInstances}
                    error={numericError === "ec2_numInst"}
                    errorMessage="Only numeric values accepted"
                    onChange={e => handleNumericInput(e.target.value, "ec2_numInst", setEc2NumInstances)}
                  />
                </div>
              </div>
            </div>

            {/* STORAGE COST CALCULATIONS */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#99a0ae", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                Storage Cost Calculations
              </span>
              <div style={{ flex: 1, height: 1, background: "#e1e4ea" }} />
            </div>

            {/* Row 1: Volume Type, Storage Amount, Unit */}
            <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
              <div style={{ flex: 1 }}>
                <FieldLabel label="Volume Type" required tooltip="Select the EBS volume type" />
                <SingleSelect
                  placeholder="Select -"
                  size={SelectMenuSize.MEDIUM}
                  side={SelectMenuSide.BOTTOM}
                  selected={ec2VolumeType}
                  onSelect={v => setEc2VolumeType(v as string)}
                  fullWidth
                  items={[{ items: EC2_VOLUME_TYPES.map(v => ({ label: v, value: v })) }]}
                />
              </div>
              <div style={{ flex: 1 }}>
                <FieldLabel label="Storage Amount" required tooltip="Enter the storage amount" />
                <div className={shakingField === "ec2_storageAmt" ? "shake-field" : ""}>
                  <TextInput
                    size={TextInputSize.MEDIUM}
                    placeholder="Enter -"
                    value={ec2StorageAmount}
                    error={numericError === "ec2_storageAmt"}
                    errorMessage="Only numeric values accepted"
                    onChange={e => handleNumericInput(e.target.value, "ec2_storageAmt", setEc2StorageAmount)}
                  />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <FieldLabel label="Unit" required tooltip="Select the storage unit" />
                <SingleSelect
                  placeholder="Select -"
                  size={SelectMenuSize.MEDIUM}
                  side={SelectMenuSide.BOTTOM}
                  selected={ec2StorageUnit}
                  onSelect={v => setEc2StorageUnit(v as string)}
                  fullWidth
                  items={[{ items: EC2_UNITS.map(v => ({ label: v, value: v })) }]}
                />
              </div>
            </div>

            {/* Row 2: Snapshot Frequency, Amount changed per snapshot, Unit */}
            <div style={{ display: "flex", gap: 24 }}>
              <div style={{ flex: 1 }}>
                <FieldLabel label="Snapshot Frequency" required tooltip="Select how often snapshots are taken" />
                <SingleSelect
                  placeholder="Select -"
                  size={SelectMenuSize.MEDIUM}
                  side={SelectMenuSide.BOTTOM}
                  selected={ec2SnapshotFreq}
                  onSelect={v => setEc2SnapshotFreq(v as string)}
                  fullWidth
                  items={[{ items: EC2_SNAPSHOT_FREQ.map(v => ({ label: v, value: v })) }]}
                />
              </div>
              <div style={{ flex: 1 }}>
                <FieldLabel label="Amount changed per snapshot" required tooltip="Data changed per snapshot" />
                <div className={shakingField === "ec2_snapAmt" ? "shake-field" : ""}>
                  <TextInput
                    size={TextInputSize.MEDIUM}
                    placeholder="Enter -"
                    value={ec2SnapshotAmount}
                    error={numericError === "ec2_snapAmt"}
                    errorMessage="Only numeric values accepted"
                    onChange={e => handleNumericInput(e.target.value, "ec2_snapAmt", setEc2SnapshotAmount)}
                  />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <FieldLabel label="Unit" required tooltip="Select the snapshot unit" />
                <SingleSelect
                  placeholder="Select -"
                  size={SelectMenuSize.MEDIUM}
                  side={SelectMenuSide.BOTTOM}
                  selected={ec2SnapshotUnit}
                  onSelect={v => setEc2SnapshotUnit(v as string)}
                  fullWidth
                  items={[{ items: EC2_UNITS.map(v => ({ label: v, value: v })) }]}
                />
              </div>
            </div>
          </div>

          {/* gap */}
          <div style={{ width: 32, flexShrink: 0 }} />

          {/* ── Right column — cost card ── */}
          <div style={{ width: 500, flexShrink: 0, display: "flex", flexDirection: "column" }}>
            <div style={{ background: "white", border: "1px solid #e1e4ea", borderRadius: 12, height: 632, boxSizing: "border-box", padding: 24, overflow: "hidden" }}>
              {/* Total cost */}
              <p style={{ fontSize: 28, fontWeight: 700, color: "#222530", lineHeight: "36px", margin: "0 0 4px" }}>
                $ {ec2GrandTotal.toFixed(2)}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
                <span style={{ fontSize: 13, color: "#717784" }}>Total Cost</span>
                <Tag text="Instance cost + Storage Cost" variant={TagVariant.SUBTLE} size={TagSize.XS} color={TagColor.NEUTRAL} shape={TagShape.SQUARICAL} />
              </div>

              {/* INSTANCE COST CALCULATIONS */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 18 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#99a0ae", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    Instance Cost Calculations
                  </span>
                  <div style={{ flex: 1, height: 1, background: "#e1e4ea", marginLeft: 12 }} />
                </div>
                {[
                  { label: "Unit Price",             value: ec2InstancePrice > 0 ? `$ ${ec2CostPerHour.toFixed(4)}` : "$ 0" },
                  { label: "Total Hours",             value: "730" },
                  { label: "Total Cost for 730 Hrs",  value: ec2InstancePrice > 0 ? `$ ${ec2TotalCost730.toFixed(2)}` : "$ 0" },
                  { label: "Total Instances",         value: ec2NumInst > 0 ? String(ec2NumInst) : "0" },
                ].map(row => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: 14, color: "#717784", flex: 1 }}>{row.label}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#2b303b", flexShrink: 0 }}>{row.value}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <span style={{ fontSize: 14, color: "#16a34a", flex: 1 }}>
                    Total Cost ({ec2NumInst > 0 ? ec2NumInst : 1} instance{ec2NumInst !== 1 ? "s" : ""} for 730hrs)
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#16a34a", flexShrink: 0 }}>
                    $ {ec2TotalInstanceCost.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* STORAGE COST CALCULATIONS */}
              <div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 18 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#99a0ae", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    Storage Cost Calculations
                  </span>
                  <div style={{ flex: 1, height: 1, background: "#e1e4ea", marginLeft: 12 }} />
                </div>
                {[
                  { label: "Total hours",         value: "8760 hrs",                             tooltip: "Total hours in a year (365 × 24)" },
                  { label: "Storage Cost",        value: `$ ${ec2StorageCost.toFixed(2)}`,       tooltip: "Calculated based on storage amount and volume type pricing" },
                  { label: "Total Snapshot cost", value: `$ ${ec2TotalSnapshotCost.toFixed(2)}`, tooltip: "Calculated based on snapshot frequency and changed data per snapshot" },
                ].map(row => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: 14, color: "#717784", flex: 1 }}>{row.label}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#2b303b" }}>{row.value}</span>
                      <Tooltip content={row.tooltip} side={TooltipSide.TOP} align={TooltipAlign.CENTER} showArrow>
                        <span style={{ display: "flex", alignItems: "center", cursor: "default" }}>
                          <Info size={13} color="#99a0ae" />
                        </span>
                      </Tooltip>
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <span style={{ fontSize: 14, color: "#16a34a", flex: 1 }}>Total Cost</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#16a34a", flexShrink: 0 }}>
                    $ {ec2TotalStorageCost.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* ── Amazon RDS modal ── */}
      <Modal
        isOpen={rdsOpen}
        onClose={() => { setRdsOpen(false); setEditIndex(null); setEditOriginal(null); setRdsEditOriginal(null); }}
        showHeader
        showFooter
        showCloseButton
        closeOnBackdropClick={false}
        title="Amazon RDS"
        subtitle="One line description of the modal"
        minWidth="1472px"
        maxWidth="1472px"
        minHeight="840px"
        maxHeight="840px"
        primaryAction={{
          text: editIndex !== null ? "Save Changes" : "Add to Estimate",
          buttonType: ButtonType.PRIMARY,
          size: ButtonSize.LARGE,
          disabled: editIndex !== null ? (!rdsHasEditChanges || !canAddRds) : !canAddRds,
          onClick: () => {
            const rdsData = { instanceCost: rdsTotalInstanceCost, storageCost: rdsTotalStorageCost, proxyCost: rdsProxyCost, unitPrice: rdsInstancePrice, totalCost730: rdsTotalCost730, volumeType: rdsVolumeType, iopsPerVolume: rdsIopsPerVolume, useProxy: rdsUseProxy };
            if (editIndex !== null) {
              setAddedServices(prev => prev.map((s, i) => i === editIndex ? { ...s, instanceName: rdsSelectedInstance, totalCost: rdsGrandTotal, numInstances: rdsNumInst, rds: rdsData } : s));
              setEditIndex(null);
              setEditOriginal(null);
            } else {
              setAddedServices(prev => [...prev, { instanceName: rdsSelectedInstance, service: "Amazon RDS", totalCost: rdsGrandTotal, numInstances: rdsNumInst, rds: rdsData }]);
              setCurrentStep(2);
            }
            setRdsOpen(false);
            setRdsEditOriginal(null);
          },
        }}
        secondaryAction={{
          text: "Cancel",
          buttonType: ButtonType.SECONDARY,
          size: ButtonSize.LARGE,
          onClick: () => { setRdsOpen(false); setEditIndex(null); setEditOriginal(null); setRdsEditOriginal(null); },
        }}
      >
        <div style={{ display: "flex", gap: 0, alignItems: "flex-start" }}>
          {/* ── Left column ── */}
          <div style={{ flex: 1, minWidth: 0, maxHeight: 632, overflowY: "auto" }}>
            {/* INSTANCE COST CALCULATIONS */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#99a0ae", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                Instance Cost Calculations
              </span>
              <div style={{ flex: 1, height: 1, background: "#e1e4ea" }} />
            </div>

            {/* Accordion: Instance Specification Table */}
            <div
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", marginBottom: rdsSpecTableOpen ? 16 : 24 }}
              onClick={() => setRdsSpecTableOpen(o => !o)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#222530" }}>Instance Specification Table</span>
                <Tag text="Only for Review" variant={TagVariant.SUBTLE} size={TagSize.XS} color={TagColor.NEUTRAL} shape={TagShape.SQUARICAL} />
              </div>
              {rdsSpecTableOpen ? <CaretUp size={14} color="#717784" /> : <CaretDown size={14} color="#717784" />}
            </div>

            {rdsSpecTableOpen && (
              <div style={{ marginBottom: 24 }}>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <DataTable data={RDS_INSTANCES as any} columns={RDS_COLUMNS} idField="id" pagination={{ pageSize: 4, pageSizeOptions: [4] } as any} enableColumnManager={false} />
              </div>
            )}

            {/* Instance + No. of instances */}
            <div style={{ display: "flex", gap: 24, marginBottom: 48 }}>
              <div style={{ flex: 3 }}>
                <FieldLabel label="Instance" required tooltip="Select the RDS instance type" />
                <SingleSelect
                  placeholder="Select -"
                  size={SelectMenuSize.MEDIUM}
                  side={SelectMenuSide.BOTTOM}
                  selected={rdsSelectedInstance}
                  onSelect={v => setRdsSelectedInstance(v as string)}
                  fullWidth
                  items={[{ items: RDS_INSTANCES.map(inst => ({ label: inst.instanceName, value: inst.instanceName })) }]}
                />
                {rdsInstanceData && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 13, color: "#525866" }}><span style={{ fontWeight: 600 }}>vCPU:</span> {rdsInstanceData.cpu}</span>
                    <span style={{ color: "#c8cdd8", fontSize: 13 }}>|</span>
                    <span style={{ fontSize: 13, color: "#525866" }}><span style={{ fontWeight: 600 }}>Memory:</span> {rdsInstanceData.memory}</span>
                    <span style={{ color: "#c8cdd8", fontSize: 13 }}>|</span>
                    <span style={{ fontSize: 13, color: "#525866" }}><span style={{ fontWeight: 600 }}>Network Performance:</span> {rdsInstanceData.network}</span>
                    <span style={{ color: "#c8cdd8", fontSize: 13 }}>|</span>
                    <span style={{ fontSize: 13, color: "#525866" }}><span style={{ fontWeight: 600 }}>Demand Price:</span> ${rdsInstanceData.price} / hr</span>
                  </div>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <FieldLabel label="No. of instances" required tooltip="Enter the number of RDS instances" />
                <div className={shakingField === "rds_numInst" ? "shake-field" : ""}>
                  <TextInput
                    size={TextInputSize.MEDIUM}
                    placeholder="Enter -"
                    value={rdsNumInstances}
                    error={numericError === "rds_numInst"}
                    errorMessage="Only numeric values accepted"
                    onChange={e => handleNumericInput(e.target.value, "rds_numInst", setRdsNumInstances)}
                  />
                </div>
              </div>
            </div>

            {/* STORAGE COST CALCULATIONS */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#99a0ae", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                Storage Cost Calculations
              </span>
              <div style={{ flex: 1, height: 1, background: "#e1e4ea" }} />
            </div>

            <div style={{ display: "flex", gap: 24, marginBottom: 48 }}>
              <div style={{ flex: 1 }}>
                <FieldLabel label="Volume Type" required tooltip="Select the RDS volume type" />
                <SingleSelect
                  placeholder="Select -"
                  size={SelectMenuSize.MEDIUM}
                  side={SelectMenuSide.BOTTOM}
                  selected={rdsVolumeType}
                  onSelect={v => setRdsVolumeType(v as string)}
                  fullWidth
                  items={[{ items: RDS_VOLUME_TYPES.map(v => ({ label: v, value: v })) }]}
                />
              </div>
              <div style={{ flex: 1 }}>
                <FieldLabel label="IOPS per volume" required tooltip="Enter the number of IOPS per volume" />
                <div className={shakingField === "rds_iops" ? "shake-field" : ""}>
                  <TextInput
                    size={TextInputSize.MEDIUM}
                    placeholder="Enter -"
                    value={rdsIopsPerVolume}
                    error={numericError === "rds_iops"}
                    errorMessage="Only numeric values accepted"
                    onChange={e => handleNumericInput(e.target.value, "rds_iops", setRdsIopsPerVolume)}
                  />
                </div>
              </div>
            </div>

            {/* PROXY COST CALCULATIONS */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#99a0ae", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                Proxy Cost Calculations
              </span>
              <div style={{ flex: 1, height: 1, background: "#e1e4ea" }} />
            </div>

            <div style={{ width: "50%", paddingRight: 12 }}>
              <FieldLabel label="Use RDS Proxy ?" required tooltip="Enable RDS Proxy for connection pooling" />
              <SingleSelect
                placeholder="Select -"
                size={SelectMenuSize.MEDIUM}
                side={SelectMenuSide.BOTTOM}
                selected={rdsUseProxy}
                onSelect={v => setRdsUseProxy(v as string)}
                fullWidth
                items={[{ items: RDS_PROXY_OPTIONS.map(v => ({ label: v, value: v })) }]}
              />
            </div>
          </div>

          {/* gap */}
          <div style={{ width: 32, flexShrink: 0 }} />

          {/* ── Right column — cost card ── */}
          <div style={{ width: 500, flexShrink: 0, display: "flex", flexDirection: "column" }}>
            <div style={{ background: "white", border: "1px solid #e1e4ea", borderRadius: 12, height: 632, boxSizing: "border-box", padding: 24, overflow: "hidden" }}>
              {/* Total cost */}
              <p style={{ fontSize: 28, fontWeight: 700, color: "#222530", lineHeight: "36px", margin: "0 0 4px" }}>
                $ {rdsGrandTotal.toFixed(2)}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
                <span style={{ fontSize: 13, color: "#717784" }}>Total Cost</span>
                <Tag text="Instance cost + Storage Cost + Proxy Cost" variant={TagVariant.SUBTLE} size={TagSize.XS} color={TagColor.NEUTRAL} shape={TagShape.SQUARICAL} maxWidth="none" />
              </div>

              {/* INSTANCE COST CALCULATIONS */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#99a0ae", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    Instance Cost Calculations
                  </span>
                  <div style={{ flex: 1, height: 1, background: "#e1e4ea", marginLeft: 12 }} />
                </div>
                {[
                  { label: "Unit Price",             value: rdsInstancePrice > 0 ? `$ ${rdsInstancePrice.toFixed(2)}` : "$ 0" },
                  { label: "Total Hours",             value: "730" },
                  { label: "Total Cost for 730 Hrs",  value: rdsInstancePrice > 0 ? `$ ${rdsTotalCost730.toFixed(2)}` : "$ 0" },
                  { label: "Total Instances",         value: rdsNumInst > 0 ? String(rdsNumInst) : "0" },
                ].map(row => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: "#717784", flex: 1 }}>{row.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#2b303b", flexShrink: 0 }}>{row.value}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <span style={{ fontSize: 13, color: "#16a34a", flex: 1 }}>
                    Total Cost ({rdsNumInst > 0 ? rdsNumInst : 1} instance{rdsNumInst !== 1 ? "s" : ""} for 730hrs)
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#16a34a", flexShrink: 0 }}>
                    $ {rdsTotalInstanceCost.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* STORAGE COST CALCULATIONS */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#99a0ae", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    Storage Cost Calculations
                  </span>
                  <div style={{ flex: 1, height: 1, background: "#e1e4ea", marginLeft: 12 }} />
                </div>
                {[
                  { label: "Total hours (Hrs × No. of instances)", value: rdsTotalHours > 0 ? String(rdsTotalHours) : "730", tooltip: "730 hours × number of instances" },
                  { label: "Total months",                          value: "0",                                               tooltip: "Billing months in the period" },
                  { label: "IOPS Cost",                             value: `$ ${rdsIopsCost.toFixed(5)}`,                     tooltip: "IOPS per volume × $0.026 per IOPS-month" },
                ].map(row => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: "#717784", flex: 1 }}>{row.label}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#2b303b" }}>{row.value}</span>
                      <Tooltip content={row.tooltip} side={TooltipSide.TOP} align={TooltipAlign.CENTER} showArrow>
                        <span style={{ display: "flex", alignItems: "center", cursor: "default" }}>
                          <Info size={13} color="#99a0ae" />
                        </span>
                      </Tooltip>
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <span style={{ fontSize: 13, color: "#16a34a", flex: 1 }}>Total Storage Cost</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#16a34a", flexShrink: 0 }}>$ {rdsTotalStorageCost.toFixed(2)}</span>
                </div>
              </div>

              {/* PROXY COST CALCULATIONS */}
              <div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#99a0ae", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    Proxy Cost Calculations
                  </span>
                  <div style={{ flex: 1, height: 1, background: "#e1e4ea", marginLeft: 12 }} />
                </div>
                {[
                  { label: "Total hours (Hrs × No. of instances)", value: rdsTotalHours > 0 ? String(rdsTotalHours) : "730", tooltip: "730 × number of instances" },
                  { label: "Total vCPU's",                          value: rdsVCpus > 0 ? String(rdsVCpus) : "0",             tooltip: "vCPUs from selected instance" },
                ].map(row => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: "#717784", flex: 1 }}>{row.label}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#2b303b" }}>{row.value}</span>
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <span style={{ fontSize: 13, color: "#16a34a", flex: 1 }}>
                    Total Proxy cost (vCPU × Hrs × No. of instances)
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#16a34a", flexShrink: 0 }}>$ {rdsProxyCost.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* ── Aurora RDS modal ── */}
      <Modal
        isOpen={auroraOpen}
        onClose={() => { setAuroraOpen(false); setEditIndex(null); setEditOriginal(null); setAuroraEditOriginal(null); }}
        showHeader
        showFooter
        showCloseButton
        closeOnBackdropClick={false}
        title="Aurora RDS"
        subtitle="One line description of the modal"
        minWidth="1472px"
        maxWidth="1472px"
        minHeight="840px"
        maxHeight="840px"
        primaryAction={{
          text: editIndex !== null ? "Save Changes" : "Add to Estimate",
          buttonType: ButtonType.PRIMARY,
          size: ButtonSize.LARGE,
          disabled: editIndex !== null ? (!auroraHasEditChanges || !canAddAurora) : !canAddAurora,
          onClick: () => {
            const auroraData = { instanceCost: auroraTotalInstanceCost, iopsCost: auroraTotalIopsCost, storageCost: auroraTotalStorageCost, proxyCost: auroraProxyCost, unitPrice: auroraInstancePrice, totalCost730: auroraTotalCost730, storageGB: auroraStorageGB, baselineHrs: auroraBaselineHrs, storageAmount: auroraStorageAmount, storageUnit: auroraStorageUnit, baselineIops: auroraBaselineIops, peakIops: auroraPeakIops, hoursOfPeakIops: auroraHoursOfPeakIops, useProxy: auroraUseProxy };
            if (editIndex !== null) {
              setAddedServices(prev => prev.map((s, i) => i === editIndex ? { ...s, instanceName: auroraSelectedInstance, totalCost: auroraGrandTotal, numInstances: auroraNumInst, aurora: auroraData } : s));
              setEditIndex(null); setEditOriginal(null);
            } else {
              setAddedServices(prev => [...prev, { instanceName: auroraSelectedInstance, service: "Aurora RDS", totalCost: auroraGrandTotal, numInstances: auroraNumInst, aurora: auroraData }]);
              setCurrentStep(2);
            }
            setAuroraOpen(false); setAuroraEditOriginal(null);
          },
        }}
        secondaryAction={{
          text: "Cancel",
          buttonType: ButtonType.SECONDARY,
          size: ButtonSize.LARGE,
          onClick: () => { setAuroraOpen(false); setEditIndex(null); setEditOriginal(null); setAuroraEditOriginal(null); },
        }}
      >
        <div style={{ display: "flex", gap: 0, alignItems: "flex-start" }}>
          {/* ── Left column ── */}
          <div style={{ flex: 1, minWidth: 0, maxHeight: 632, overflowY: "auto" }}>

            {/* INSTANCE COST CALCULATIONS */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#99a0ae", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>Instance Cost Calculations</span>
              <div style={{ flex: 1, height: 1, background: "#e1e4ea" }} />
            </div>

            {/* Accordion: Instance Specification Table */}
            <div
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", marginBottom: auroraSpecTableOpen ? 16 : 24 }}
              onClick={() => setAuroraSpecTableOpen(o => !o)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#222530" }}>Instance Specification Table</span>
                <Tag text="Only for Review" variant={TagVariant.SUBTLE} size={TagSize.XS} color={TagColor.NEUTRAL} shape={TagShape.SQUARICAL} />
              </div>
              {auroraSpecTableOpen ? <CaretUp size={14} color="#717784" /> : <CaretDown size={14} color="#717784" />}
            </div>
            {auroraSpecTableOpen && (
              <div style={{ marginBottom: 24 }}>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <DataTable data={RDS_INSTANCES as any} columns={RDS_COLUMNS} idField="id" pagination={{ pageSize: 4, pageSizeOptions: [4] } as any} enableColumnManager={false} />
              </div>
            )}

            {/* Instance + No. of instances */}
            <div style={{ display: "flex", gap: 24, marginBottom: 48 }}>
              <div style={{ flex: 3 }}>
                <FieldLabel label="Instance" required tooltip="Select the Aurora RDS instance type" />
                <SingleSelect
                  placeholder="Select -"
                  size={SelectMenuSize.MEDIUM}
                  side={SelectMenuSide.BOTTOM}
                  selected={auroraSelectedInstance}
                  onSelect={v => setAuroraSelectedInstance(v as string)}
                  fullWidth
                  items={[{ items: RDS_INSTANCES.map(inst => ({ label: inst.instanceName, value: inst.instanceName })) }]}
                />
                {auroraInstanceData && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 13, color: "#525866" }}><span style={{ fontWeight: 600 }}>vCPU:</span> {auroraInstanceData.cpu}</span>
                    <span style={{ color: "#c8cdd8", fontSize: 13 }}>|</span>
                    <span style={{ fontSize: 13, color: "#525866" }}><span style={{ fontWeight: 600 }}>Memory:</span> {auroraInstanceData.memory}</span>
                    <span style={{ color: "#c8cdd8", fontSize: 13 }}>|</span>
                    <span style={{ fontSize: 13, color: "#525866" }}><span style={{ fontWeight: 600 }}>Network Performance:</span> {auroraInstanceData.network}</span>
                    <span style={{ color: "#c8cdd8", fontSize: 13 }}>|</span>
                    <span style={{ fontSize: 13, color: "#525866" }}><span style={{ fontWeight: 600 }}>Demand Price:</span> ${auroraInstanceData.price} / hr</span>
                  </div>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <FieldLabel label="No. of instances" required tooltip="Number of Aurora instances" />
                <div className={shakingField === "aurora_numInst" ? "shake-field" : ""}>
                  <TextInput size={TextInputSize.MEDIUM} placeholder="Enter -" value={auroraNumInstances} error={numericError === "aurora_numInst"} errorMessage="Only numeric values accepted" onChange={e => handleNumericInput(e.target.value, "aurora_numInst", setAuroraNumInstances)} />
                </div>
              </div>
            </div>

            {/* STORAGE COST CALCULATIONS */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#99a0ae", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>Storage Cost Calculations</span>
              <div style={{ flex: 1, height: 1, background: "#e1e4ea" }} />
            </div>

            {/* Storage amount + Unit — grid-col span matches Baseline+Peak width exactly */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginBottom: 24 }}>
              <div style={{ gridColumn: "1 / 3" }}>
                <FieldLabel label="Storage amount" required tooltip="Total storage in GB or TB" />
                <div className={shakingField === "aurora_storageAmt" ? "shake-field" : ""}>
                  <TextInput size={TextInputSize.MEDIUM} placeholder="Enter -" value={auroraStorageAmount} error={numericError === "aurora_storageAmt"} errorMessage="Only numeric values accepted" onChange={e => handleNumericInput(e.target.value, "aurora_storageAmt", setAuroraStorageAmount)} />
                </div>
              </div>
              <div>
                <FieldLabel label="Unit" required tooltip="Select the storage unit" />
                <SingleSelect
                  placeholder="Select -"
                  size={SelectMenuSize.MEDIUM}
                  side={SelectMenuSide.BOTTOM}
                  selected={auroraStorageUnit}
                  onSelect={v => setAuroraStorageUnit(v as string)}
                  fullWidth
                  items={[{ items: EC2_UNITS.map(v => ({ label: v, value: v })) }]}
                />
              </div>
            </div>

            {/* Baseline IOPS + Peak IOPS + Hours of peak IOPS */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginBottom: 48 }}>
              <div style={{ flex: 1 }}>
                <FieldLabel label="Baseline IOPS ( per second )" required tooltip="Baseline I/O operations per second" />
                <div className={shakingField === "aurora_baselineIops" ? "shake-field" : ""}>
                  <TextInput size={TextInputSize.MEDIUM} placeholder="Enter -" value={auroraBaselineIops} error={numericError === "aurora_baselineIops"} errorMessage="Only numeric values accepted" onChange={e => handleNumericInput(e.target.value, "aurora_baselineIops", setAuroraBaselineIops)} />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <FieldLabel label="Peak IOPS ( per second )" required tooltip="Peak I/O operations per second" />
                <div className={shakingField === "aurora_peakIops" ? "shake-field" : ""}>
                  <TextInput size={TextInputSize.MEDIUM} placeholder="Enter -" value={auroraPeakIops} error={numericError === "aurora_peakIops"} errorMessage="Only numeric values accepted" onChange={e => handleNumericInput(e.target.value, "aurora_peakIops", setAuroraPeakIops)} />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <FieldLabel label="Hours of peak IOPS ( per month )" required tooltip="Number of hours per month at peak IOPS" />
                <div className={shakingField === "aurora_hoursOfPeak" ? "shake-field" : ""}>
                  <TextInput size={TextInputSize.MEDIUM} placeholder="Enter -" value={auroraHoursOfPeakIops} error={numericError === "aurora_hoursOfPeak"} errorMessage="Only numeric values accepted" onChange={e => handleNumericInput(e.target.value, "aurora_hoursOfPeak", setAuroraHoursOfPeakIops)} />
                </div>
              </div>
            </div>

            {/* PROXY COST CALCULATIONS */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#99a0ae", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>Proxy Cost Calculations</span>
              <div style={{ flex: 1, height: 1, background: "#e1e4ea" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
              <div>
                <FieldLabel label="Use RDS Proxy ?" required tooltip="Enable RDS Proxy for connection pooling" />
                <SingleSelect
                  placeholder="Select -"
                  size={SelectMenuSize.MEDIUM}
                  side={SelectMenuSide.BOTTOM}
                  selected={auroraUseProxy}
                  onSelect={v => setAuroraUseProxy(v as string)}
                  fullWidth
                  items={[{ items: RDS_PROXY_OPTIONS.map(v => ({ label: v, value: v })) }]}
                />
              </div>
            </div>
          </div>

          {/* gap */}
          <div style={{ width: 32, flexShrink: 0 }} />

          {/* ── Right column — cost card ── */}
          <div style={{ width: 500, flexShrink: 0, display: "flex", flexDirection: "column" }}>
            <div style={{ background: "white", border: "1px solid #e1e4ea", borderRadius: 12, height: 632, boxSizing: "border-box", padding: 24, overflow: "hidden" }}>
              <p style={{ fontSize: 28, fontWeight: 700, color: "#222530", lineHeight: "36px", margin: "0 0 4px" }}>$ {auroraGrandTotal.toFixed(2)}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
                <span style={{ fontSize: 13, color: "#717784" }}>Total Cost</span>
                <Tag text="Instance cost + Storage Cost + Proxy Cost" variant={TagVariant.SUBTLE} size={TagSize.XS} color={TagColor.NEUTRAL} shape={TagShape.SQUARICAL} maxWidth="none" />
              </div>

              {/* INSTANCE COST CALCULATIONS */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#99a0ae", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>Instance Cost Calculations</span>
                  <div style={{ flex: 1, height: 1, background: "#e1e4ea", marginLeft: 12 }} />
                </div>
                {[
                  { label: "Unit Price",            value: auroraInstancePrice > 0 ? `$ ${auroraInstancePrice.toFixed(2)}` : "$ 0" },
                  { label: "Total Hours",            value: "730" },
                  { label: "Total Cost for 730 Hrs", value: auroraInstancePrice > 0 ? `$ ${auroraTotalCost730.toFixed(2)}` : "$ 0" },
                  { label: "Total Instances",        value: auroraNumInst > 0 ? String(auroraNumInst) : "0" },
                ].map(row => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: "#717784", flex: 1 }}>{row.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#2b303b", flexShrink: 0 }}>{row.value}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                  <span style={{ fontSize: 13, color: "#16a34a", flex: 1 }}>Total Cost ({auroraNumInst > 0 ? auroraNumInst : 1} instance{auroraNumInst !== 1 ? "s" : ""} for 730hrs)</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#16a34a", flexShrink: 0 }}>$ {auroraTotalInstanceCost.toFixed(2)}</span>
                </div>
              </div>

              {/* STORAGE COST CALCULATIONS */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#99a0ae", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>Storage Cost Calculations</span>
                  <div style={{ flex: 1, height: 1, background: "#e1e4ea", marginLeft: 12 }} />
                </div>
                {[
                  { label: "Total IOPS Cost", value: `$ ${auroraTotalIopsCost.toFixed(2)}`, tooltip: "( Baseline IOPS × Baseline Hrs + Peak IOPS × Peak Hrs ) × 3600 ÷ 1M × $0.22" },
                  { label: `Baseline Hours`, value: `${auroraBaselineHrs.toFixed(0)} Hrs (730 - ${auroraHoursOfPeakNum.toFixed(0)})`, tooltip: "730 total hours minus hours of peak IOPS" },
                ].map(row => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: "#717784", flex: 1 }}>{row.label}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#2b303b" }}>{row.value}</span>
                      <Tooltip content={row.tooltip} side={TooltipSide.TOP} align={TooltipAlign.CENTER} showArrow>
                        <span style={{ display: "flex", alignItems: "center", cursor: "default" }}><Info size={13} color="#99a0ae" /></span>
                      </Tooltip>
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                  <span style={{ fontSize: 13, color: "#16a34a", flex: 1 }}>Total Storage Cost</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#16a34a", flexShrink: 0 }}>$ {auroraTotalStorageCost.toFixed(2)}</span>
                </div>
              </div>

              {/* PROXY COST CALCULATIONS */}
              <div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#99a0ae", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>Proxy Cost Calculations</span>
                  <div style={{ flex: 1, height: 1, background: "#e1e4ea", marginLeft: 12 }} />
                </div>
                {[
                  { label: "Total hours ( Hrs × No. of instances )", value: auroraTotalHours > 0 ? String(auroraTotalHours) : "730" },
                  { label: "Total vCPU's",                           value: auroraVCpus > 0 ? String(auroraVCpus) : "0" },
                ].map(row => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: "#717784", flex: 1 }}>{row.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#2b303b", flexShrink: 0 }}>{row.value}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                  <span style={{ fontSize: 13, color: "#16a34a", flex: 1 }}>
                    Total Proxy cost ({auroraStorageGB > 0 ? auroraStorageGB.toFixed(0) : "0"} GB × $0.11 × 1 month)
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#16a34a", flexShrink: 0 }}>$ {auroraProxyCost.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* ── Others modal ── */}
      <Modal
        isOpen={otherOpen}
        onClose={() => { setOtherOpen(false); setEditIndex(null); setEditOriginal(null); setOtherEditOriginal(null); }}
        showHeader
        showFooter
        showCloseButton
        closeOnBackdropClick
        minWidth="1472px"
        maxWidth="1472px"
        title="Others"
        subtitle="One line description of the modal"
        headerRightSlot={
          <Tag text="Other" variant={TagVariant.SUBTLE} size={TagSize.SM} color={TagColor.NEUTRAL} shape={TagShape.SQUARICAL} />
        }
        primaryAction={{
          text: editIndex !== null ? "Save Changes" : "Add to Estimate",
          buttonType: ButtonType.PRIMARY,
          size: ButtonSize.LARGE,
          disabled: editIndex !== null ? (!otherHasEditChanges || !canAddOther) : !canAddOther,
          onClick: () => {
            if (editIndex !== null) {
              setAddedServices(prev => prev.map((s, i) => i === editIndex ? { ...s, instanceName: otherTitle, totalCost: otherCostNum, numInstances: 1, other: { title: otherTitle, cost: otherCostNum, description: otherDescription } } : s));
              setEditIndex(null); setEditOriginal(null);
            } else {
              setAddedServices(prev => [...prev, { instanceName: otherTitle, service: "Other", totalCost: otherCostNum, numInstances: 1, other: { title: otherTitle, cost: otherCostNum, description: otherDescription } }]);
              setCurrentStep(2);
            }
            setOtherOpen(false); setOtherEditOriginal(null);
          },
        }}
        secondaryAction={{
          text: "Cancel",
          buttonType: ButtonType.SECONDARY,
          size: ButtonSize.LARGE,
          onClick: () => { setOtherOpen(false); setEditIndex(null); setEditOriginal(null); setOtherEditOriginal(null); },
        }}
      >
        {/* Title + Total cost row */}
        <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
          <div style={{ flex: 1 }}>
            <FieldLabel label="Title" required tooltip="Name of the service or resource" />
            <TextInput
              size={TextInputSize.MEDIUM}
              placeholder="Enter -"
              value={otherTitle}
              onChange={e => setOtherTitle(e.target.value)}
            />
          </div>
          <div style={{ flex: 1 }}>
            <FieldLabel label="Total cost ( in USD )" required tooltip="Estimated monthly cost in USD" />
            <TextInput
              size={TextInputSize.MEDIUM}
              placeholder="Enter -"
              value={otherCost}
              leftSlot={<span style={{ fontSize: 13, color: "#717784", paddingLeft: 4 }}>$</span>}
              error={numericError === "other_cost"}
              errorMessage="Only numeric values accepted"
              onChange={e => handleNumericInput(e.target.value, "other_cost", setOtherCost)}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <FieldLabel label="Description" required tooltip="Describe what this service is used for" />
          <TextArea
            value={otherDescription}
            placeholder="Enter -"
            rows={6}
            resize="none"
            onChange={e => setOtherDescription(e.target.value)}
          />
        </div>
      </Modal>

      {/* ── View details Drawer ── */}
      {viewIndex !== null && (
        <>
          {/* Overlay */}
          <div style={{ position: "fixed", inset: 0, background: "rgba(5,5,6,0.48)", zIndex: 9998 }} />
          {/* Panel */}
          <div style={{ position: "fixed", top: 40, right: 40, bottom: 40, width: 500, background: "white", zIndex: 9999, display: "flex", flexDirection: "column", overflowY: "auto", borderRadius: 16 }}>
            {(() => {
              const svc = addedServices[viewIndex];
              const isEc2 = svc.service === "Amazon EC2";
              const isRds = svc.service === "Amazon RDS";
              const isAurora = svc.service === "Aurora RDS";
              const isOther = svc.service === "Other";
              const instData = isEc2
                ? EC2_INSTANCES.find(inst => inst.instanceName === svc.instanceName)
                : (isRds || isAurora)
                ? RDS_INSTANCES.find(inst => inst.instanceName === svc.instanceName)
                : ELASTICACHE_INSTANCES.find(inst => inst.instanceName === svc.instanceName);
              const cph = instData ? ((isRds || isAurora) ? instData.price : instData.price / 730) : 0;
              const tagColor = isEc2 ? TagColor.WARNING : isRds ? TagColor.PURPLE : isAurora ? TagColor.SUCCESS : svc.service === "Other" ? TagColor.NEUTRAL : TagColor.PRIMARY;
              const instanceCost = isEc2 ? (svc.ec2?.instanceCost ?? svc.totalCost) : isRds ? (svc.rds?.instanceCost ?? svc.totalCost) : isAurora ? (svc.aurora?.instanceCost ?? svc.totalCost) : svc.totalCost;
              return (
                <>
                  {/* Header */}
                  <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #e1e4ea" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                      <div style={{ display: "flex", alignItems: "flex-end", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 16, fontWeight: 600, color: "#2b303b" }}>{svc.instanceName}</span>
                        <Tag text={svc.service} variant={TagVariant.SUBTLE} size={TagSize.SM} color={tagColor} shape={TagShape.SQUARICAL} />
                      </div>
                      <button onClick={() => setViewIndex(null)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", color: "#717784", padding: 0, flexShrink: 0 }}>
                        <X size={18} />
                      </button>
                    </div>
                    <p style={{ fontSize: 14, color: "#717784", marginTop: 4, fontWeight: 400 }}>One line description of the modal</p>
                  </div>

                  {/* Body */}
                  <div style={{ padding: "20px 20px 32px", flex: 1, overflowY: "auto" }}>
                    {/* Other service: simple view */}
                    {isOther && (
                      <>
                        <p style={{ fontSize: 26, fontWeight: 700, color: "#222530", margin: "0 0 4px", lineHeight: 1 }}>$ {svc.totalCost.toFixed(2)}</p>
                        <p style={{ fontSize: 13, color: "#717784", marginBottom: 24 }}>Total Cost</p>
                        {svc.other?.description && (
                          <>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
                              <span style={{ fontSize: 11, fontWeight: 600, color: "#99a0ae", letterSpacing: "0.08em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const }}>Description</span>
                              <div style={{ flex: 1, height: 1, background: "#e1e4ea", marginLeft: 10 }} />
                            </div>
                            <p style={{ fontSize: 14, color: "#2b303b", lineHeight: 1.6 }}>{svc.other.description}</p>
                          </>
                        )}
                      </>
                    )}
                    {/* Non-Other services */}
                    {!isOther && (
                    <>
                    {/* Total cost */}
                    <p style={{ fontSize: 26, fontWeight: 700, color: "#222530", margin: "0 0 8px", lineHeight: 1 }}>$ {svc.totalCost.toFixed(2)}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                      <span style={{ fontSize: 13, color: "#717784" }}>{(isEc2 || isRds || isAurora) ? "Total Cost" : "Total Instance Cost"}</span>
                      {isEc2 && <Tag text="Instance cost + Storage Cost" variant={TagVariant.SUBTLE} size={TagSize.XS} color={TagColor.NEUTRAL} shape={TagShape.SQUARICAL} />}
                      {isRds && <Tag text="Instance cost + Storage Cost + Proxy Cost" variant={TagVariant.SUBTLE} size={TagSize.XS} color={TagColor.NEUTRAL} shape={TagShape.SQUARICAL} maxWidth="none" />}
                      {isAurora && <Tag text="Instance cost + Storage Cost + Proxy Cost" variant={TagVariant.SUBTLE} size={TagSize.XS} color={TagColor.NEUTRAL} shape={TagShape.SQUARICAL} maxWidth="none" />}
                    </div>

                    {/* Instance Cost Calculations */}
                    <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: "#99a0ae", letterSpacing: "0.08em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const }}>Instance Cost Calculations</span>
                      <div style={{ flex: 1, height: 1, background: "#e1e4ea", marginLeft: 10 }} />
                    </div>
                    {[
                      { label: "Unit Price",             value: instData ? `$ ${cph.toFixed(isRds ? 3 : 4)}` : "$ 0" },
                      { label: "Total Hours",            value: "730" },
                      { label: "Total Cost for 730 Hrs", value: instData ? `$ ${(isEc2 ? (svc.ec2?.totalCost730 ?? 0) : isRds ? (svc.rds?.totalCost730 ?? 0) : isAurora ? (svc.aurora?.totalCost730 ?? 0) : instData.price).toFixed(2)}` : "$ 0" },
                      { label: "Total Instances",        value: String(svc.numInstances) },
                    ].map(row => (
                      <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                        <span style={{ fontSize: 13, color: "#717784" }}>{row.label}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#2b303b" }}>{row.value}</span>
                      </div>
                    ))}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6, marginBottom: (isEc2 || isRds || isAurora) ? 24 : 0 }}>
                      <span style={{ fontSize: 13, color: "#16a34a" }}>Total Cost ({svc.numInstances} instance{svc.numInstances !== 1 ? "s" : ""} for 730hrs)</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#16a34a" }}>$ {instanceCost.toFixed(2)}</span>
                    </div>

                    {/* Storage + Proxy Cost Calculations — RDS only */}
                    {isRds && svc.rds && (
                      <>
                        <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
                          <span style={{ fontSize: 11, fontWeight: 600, color: "#99a0ae", letterSpacing: "0.08em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const }}>Storage Cost Calculations</span>
                          <div style={{ flex: 1, height: 1, background: "#e1e4ea", marginLeft: 10 }} />
                        </div>
                        {[
                          { label: "Total hours (Hrs × No. of instances)", value: String(730 * svc.numInstances), tooltip: "730 × number of instances" },
                          { label: "Total months",                          value: "0",                           tooltip: "Billing months in the period" },
                          { label: "IOPS Cost",                             value: `$ ${svc.rds.storageCost.toFixed(5)}`, tooltip: "IOPS per volume × $0.026 per IOPS-month" },
                        ].map(row => (
                          <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                            <span style={{ fontSize: 13, color: "#717784", flex: 1 }}>{row.label}</span>
                            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                              <span style={{ fontSize: 13, fontWeight: 600, color: "#2b303b" }}>{row.value}</span>
                              <Tooltip content={row.tooltip} side={TooltipSide.TOP} align={TooltipAlign.CENTER} showArrow>
                                <span style={{ display: "flex", alignItems: "center", cursor: "default" }}><Info size={12} color="#99a0ae" /></span>
                              </Tooltip>
                            </div>
                          </div>
                        ))}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6, marginBottom: 24 }}>
                          <span style={{ fontSize: 13, color: "#16a34a" }}>Total Storage Cost</span>
                          <span style={{ fontSize: 13, fontWeight: 600, color: "#16a34a" }}>$ {svc.rds.storageCost.toFixed(2)}</span>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
                          <span style={{ fontSize: 11, fontWeight: 600, color: "#99a0ae", letterSpacing: "0.08em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const }}>Proxy Cost Calculations</span>
                          <div style={{ flex: 1, height: 1, background: "#e1e4ea", marginLeft: 10 }} />
                        </div>
                        {[
                          { label: "Total hours (Hrs × No. of instances)", value: String(730 * svc.numInstances), tooltip: "730 × number of instances" },
                          { label: "Total vCPU's", value: instData ? instData.cpu : "0", tooltip: "vCPUs from the selected instance" },
                        ].map(row => (
                          <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                            <span style={{ fontSize: 13, color: "#717784", flex: 1 }}>{row.label}</span>
                            <span style={{ fontSize: 13, fontWeight: 600, color: "#2b303b" }}>{row.value}</span>
                          </div>
                        ))}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                          <span style={{ fontSize: 13, color: "#16a34a" }}>Total Proxy cost (vCPU × Hrs × No. of instances)</span>
                          <span style={{ fontSize: 13, fontWeight: 600, color: "#16a34a" }}>$ {svc.rds.proxyCost.toFixed(2)}</span>
                        </div>
                      </>
                    )}

                    {/* Storage + IOPS + Proxy Cost Calculations — Aurora only */}
                    {isAurora && svc.aurora && (
                      <>
                        <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
                          <span style={{ fontSize: 11, fontWeight: 600, color: "#99a0ae", letterSpacing: "0.08em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const }}>Storage Cost Calculations</span>
                          <div style={{ flex: 1, height: 1, background: "#e1e4ea", marginLeft: 10 }} />
                        </div>
                        {[
                          { label: "Total IOPS Cost", value: `$ ${svc.aurora.iopsCost.toFixed(2)}`, tooltip: "( Baseline IOPS × Baseline Hrs + Peak IOPS × Peak Hrs ) × 3600 ÷ 1M × $0.22" },
                          { label: "Baseline Hours",  value: `${svc.aurora.baselineHrs.toFixed(0)} Hrs (730 - ${svc.aurora.hoursOfPeakIops})`, tooltip: "730 total hours minus hours of peak IOPS" },
                        ].map(row => (
                          <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                            <span style={{ fontSize: 13, color: "#717784", flex: 1 }}>{row.label}</span>
                            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                              <span style={{ fontSize: 13, fontWeight: 600, color: "#2b303b" }}>{row.value}</span>
                              <Tooltip content={row.tooltip} side={TooltipSide.TOP} align={TooltipAlign.CENTER} showArrow>
                                <span style={{ display: "flex", alignItems: "center", cursor: "default" }}><Info size={12} color="#99a0ae" /></span>
                              </Tooltip>
                            </div>
                          </div>
                        ))}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6, marginBottom: 24 }}>
                          <span style={{ fontSize: 13, color: "#16a34a" }}>Total Storage Cost</span>
                          <span style={{ fontSize: 13, fontWeight: 600, color: "#16a34a" }}>$ {svc.aurora.storageCost.toFixed(2)}</span>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
                          <span style={{ fontSize: 11, fontWeight: 600, color: "#99a0ae", letterSpacing: "0.08em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const }}>Proxy Cost Calculations</span>
                          <div style={{ flex: 1, height: 1, background: "#e1e4ea", marginLeft: 10 }} />
                        </div>
                        {[
                          { label: "Total hours ( Hrs × No. of instances )", value: String(730 * svc.numInstances) },
                          { label: "Total vCPU's", value: instData ? instData.cpu : "0" },
                        ].map(row => (
                          <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                            <span style={{ fontSize: 13, color: "#717784", flex: 1 }}>{row.label}</span>
                            <span style={{ fontSize: 13, fontWeight: 600, color: "#2b303b" }}>{row.value}</span>
                          </div>
                        ))}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                          <span style={{ fontSize: 13, color: "#16a34a" }}>Total Proxy cost ({svc.aurora.storageGB.toFixed(0)} GB × $0.11 × 1 month)</span>
                          <span style={{ fontSize: 13, fontWeight: 600, color: "#16a34a" }}>$ {svc.aurora.proxyCost.toFixed(2)}</span>
                        </div>
                      </>
                    )}

                    {/* Storage Cost Calculations — EC2 only */}
                    {isEc2 && svc.ec2 && (
                      <>
                        <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
                          <span style={{ fontSize: 11, fontWeight: 600, color: "#99a0ae", letterSpacing: "0.08em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const }}>Storage Cost Calculations</span>
                          <div style={{ flex: 1, height: 1, background: "#e1e4ea", marginLeft: 10 }} />
                        </div>
                        {[
                          { label: "Total hours",         value: "8760 hrs",                              tooltip: "Total hours in a year" },
                          { label: "Storage Cost",        value: `$ ${svc.ec2.storageCost.toFixed(2)}`,   tooltip: "Based on storage amount and volume type" },
                          { label: "Total Snapshot cost", value: `$ ${svc.ec2.snapshotCost.toFixed(2)}`,  tooltip: "Based on snapshot frequency and changed data" },
                        ].map(row => (
                          <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                            <span style={{ fontSize: 13, color: "#717784" }}>{row.label}</span>
                            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                              <span style={{ fontSize: 13, fontWeight: 600, color: "#2b303b" }}>{row.value}</span>
                              <Tooltip content={row.tooltip} side={TooltipSide.TOP} align={TooltipAlign.CENTER} showArrow>
                                <span style={{ display: "flex", alignItems: "center", cursor: "default" }}><Info size={12} color="#99a0ae" /></span>
                              </Tooltip>
                            </div>
                          </div>
                        ))}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                          <span style={{ fontSize: 13, color: "#16a34a" }}>Total Storage Cost</span>
                          <span style={{ fontSize: 13, fontWeight: 600, color: "#16a34a" }}>$ {svc.ec2.totalStorageCost.toFixed(2)}</span>
                        </div>
                      </>
                    )}
                    </>
                    )}
                  </div>
                </>
              );
            })()}
          </div>
        </>
      )}

      {/* ── Filters panel — fixed portal above everything ── */}
      {filtersOpen && (
        <div
          ref={filtersRef}
          style={{ position: "fixed", top: filtersPanelPos.top, left: filtersPanelPos.left, zIndex: 9999, width: 620, background: "white", border: "1px solid #e1e4ea", borderRadius: 12, boxShadow: "0px 8px 24px rgba(5,5,6,0.12)", overflow: "hidden" }}
        >
          {/* Top bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: "1px solid #e1e4ea" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#2b303b" }}>Saved View</span>
              <CaretDown size={14} color="#717784" />
            </div>
            <Button text="Save as View" buttonType={ButtonType.PRIMARY} size={ButtonSize.SMALL} subType={ButtonSubType.INLINE} />
          </div>

          {/* Search bar */}
          <div style={{ padding: "12px 20px", borderBottom: "1px solid #e1e4ea", display: "flex", alignItems: "center" }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
              <MagnifyingGlass size={15} color="#99a0ae" />
              <input
                placeholder="Search"
                value={filterSearch}
                onChange={e => setFilterSearch(e.target.value)}
                style={{ border: "none", outline: "none", fontSize: 14, color: "#2b303b", background: "transparent", width: "100%" }}
              />
            </div>
            <div style={{ width: 1, height: 20, background: "#e1e4ea", marginRight: 16 }} />
            <Button
              text="Genius AI"
              buttonType={ButtonType.PRIMARY}
              size={ButtonSize.MEDIUM}
              subType={ButtonSubType.INLINE}
              leadingIcon={
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#2b7fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 11, color: "white", fontWeight: 700 }}>+</span>
                </div>
              }
            />
          </div>

          {/* Two-column body */}
          <div style={{ display: "flex", minHeight: 280 }}>
            {/* Left: categories */}
            <div style={{ width: 200, borderRight: "1px solid #e1e4ea", padding: "12px 0" }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#99a0ae", letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 16px 8px" }}>Filters</p>
              {FILTER_CATEGORIES.map(cat => (
                <div
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", cursor: "pointer", background: activeCategory === cat ? "#f2f4f8" : "transparent", borderRadius: activeCategory === cat ? 6 : 0, margin: "0 4px" }}
                >
                  <span style={{ fontSize: 12, fontWeight: 500, color: "#2b303b" }}>{cat}</span>
                  <CaretRight size={14} color="#99a0ae" />
                </div>
              ))}
            </div>

            {/* Right: values */}
            <div style={{ flex: 1, padding: "12px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", borderRadius: 6 }}>
                <span style={{ fontSize: 14, color: "#2b303b" }}>Select All</span>
                <Checkbox
                  checked={allChecked}
                  onCheckedChange={checked => {
                    setCheckedValues(prev => ({ ...prev, [activeCategory]: checked ? [...currentValues] : [] }));
                  }}
                />
              </div>
              {currentValues.map(val => (
                <div
                  key={val}
                  onClick={() => toggleValue(val)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", borderRadius: 6, cursor: "pointer", background: categoryChecked.includes(val) ? "#f2f4f8" : "transparent" }}
                >
                  <span style={{ fontSize: 14, color: "#2b303b" }}>{val}</span>
                  <span onClick={e => e.stopPropagation()}>
                    <Checkbox checked={categoryChecked.includes(val)} onCheckedChange={() => toggleValue(val)} />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 12, padding: "14px 20px", borderTop: "1px solid #e1e4ea" }}>
            <Button
              text="Clear All"
              buttonType={ButtonType.SECONDARY}
              size={ButtonSize.MEDIUM}
              onClick={() => { setCheckedValues({}); setAppliedFilters({}); }}
            />
            <Button
              text="Apply Filter"
              buttonType={ButtonType.PRIMARY}
              size={ButtonSize.MEDIUM}
              disabled={Object.values(checkedValues).every(vals => vals.length === 0)}
              onClick={() => { setAppliedFilters({ ...checkedValues }); setFiltersOpen(false); }}
            />
          </div>
        </div>
      )}
    </>
  );
}
