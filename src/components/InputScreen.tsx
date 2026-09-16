import { useState } from "react";
import AppHeader from "./AppHeader";
import ProjectCard from "./ProjectCard";
import SelectCard from "./SelectCard";
import QuantityCard from "./QuantityCard";
import PrimaryButton from "./PrimaryButton";
import { BUILDING_TYPES, computeSTP, type STPResult } from "@/lib/stp";

interface Props {
  onResult: (result: STPResult) => void;
}

const buildingOptions = BUILDING_TYPES.map((b) => ({ value: b.key, label: b.label }));

export default function InputScreen({ onResult }: Props) {
  const [project, setProject] = useState({ architect: "", mobile: "", location: "" });
  const [buildingKey, setBuildingKey] = useState(BUILDING_TYPES[0].key);
  const [subCategoryKey, setSubCategoryKey] = useState<string>(BUILDING_TYPES[0].subCategories?.[0]?.key ?? "");
  const [quantity, setQuantity] = useState("250");

  const building = BUILDING_TYPES.find((b) => b.key === buildingKey)!;
  const hasSubCategory = !building.noSubCategory && building.subCategories && building.subCategories.length > 0;
  const subOptions = building.subCategories?.map((s) => ({ value: s.key, label: s.label })) ?? [];

  const handleBuildingChange = (key: string) => {
    setBuildingKey(key);
    const b = BUILDING_TYPES.find((t) => t.key === key)!;
    setSubCategoryKey(b.subCategories?.[0]?.key ?? "");
  };

  const handleCalculate = () => {
    const qty = parseInt(quantity, 10);
    if (!qty || qty <= 0) return;
    const result = computeSTP(building, subCategoryKey || null, qty, project);
    onResult(result);
  };

  const isValid = parseInt(quantity, 10) > 0;

  return (
    <div className="screen-in min-h-screen flex flex-col" style={{ background: "var(--background)" }}>
      <AppHeader showInfo />

      {/* Page heading */}
      <div className="px-5 pt-6 pb-5">
        <h1
          className="font-semibold leading-tight"
          style={{ fontSize: 30, color: "var(--foreground)", letterSpacing: "-0.01em" }}
        >
          Calculate your
          <br />
          <span style={{ color: "var(--primary)" }}>STP requirement</span>
        </h1>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--muted-foreground)", maxWidth: "32ch" }}>
          Quick indicative calculation based on building water-consumption standards.
        </p>
      </div>

      {/* Scrollable form area */}
      <div className="flex-1 px-5 pb-8 flex flex-col gap-4 overflow-y-auto">

        {/* Project card */}
        <ProjectCard values={project} onChange={(k, v) => setProject((p) => ({ ...p, [k]: v }))} />

        {/* Inputs card */}
        <div
          className="flex flex-col gap-5 p-5"
          style={{ background: "var(--card)", borderRadius: "var(--radius-card)", border: "1px solid var(--border)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted-foreground)", letterSpacing: "0.12em" }}>
            Project Inputs
          </p>

          <SelectCard
            label="Building Type"
            options={buildingOptions}
            value={buildingKey}
            onChange={handleBuildingChange}
          />

          {hasSubCategory && (
            <SelectCard
              label={building.key === "hotel" ? "Hotel Category" : building.key === "hospital" ? "Hospital Category" : building.key === "school" ? "School Type" : "Type"}
              options={subOptions}
              value={subCategoryKey}
              onChange={setSubCategoryKey}
            />
          )}

          <QuantityCard
            label={building.quantityLabel}
            value={quantity}
            onChange={setQuantity}
            unit={building.quantityUnit}
          />
        </div>

        {/* Rate preview chip */}
        <RateChip building={building} subCategoryKey={subCategoryKey} />

        {/* CTA */}
        <div className="pt-2">
          <PrimaryButton onClick={handleCalculate} disabled={!isValid} fullWidth>
            Calculate →
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

function RateChip({ building, subCategoryKey }: { building: (typeof BUILDING_TYPES)[0]; subCategoryKey: string }) {
  let lpcd: number;
  let label: string;

  if (building.noSubCategory || !building.subCategories) {
    lpcd = building.defaultRate!;
    label = building.label;
  } else {
    const sub = building.subCategories.find((s) => s.key === subCategoryKey) ?? building.subCategories[0];
    lpcd = sub.lpcd;
    label = sub.label;
  }

  return (
    <div
      className="flex items-center gap-2 px-4 py-2 self-start"
      style={{ background: "var(--card-deep)", borderRadius: "var(--radius-pill)", border: "1px solid var(--border)" }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: "var(--water)", boxShadow: "0 0 4px var(--water)" }}
      />
      <span className="text-xs" style={{ color: "var(--secondary-text)" }}>
        {label} · <strong style={{ color: "var(--water)" }}>{lpcd} LPCD</strong>
      </span>
    </div>
  );
}
