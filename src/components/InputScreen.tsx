import { useState } from "react";
import AppHeader from "./AppHeader";
import ProjectCard from "./ProjectCard";
import SelectCard from "./SelectCard";
import QuantityCard from "./QuantityCard";
import PrimaryButton from "./PrimaryButton";

import {
  BUILDING_TYPES,
  type STPResult,
} from "@/lib/stp";

import {
  calculateWaterDemand,
  saveUsage,
} from "@/lib/appsScript";

interface Props {
  onResult: (result: STPResult) => void;
}

const buildingOptions = BUILDING_TYPES.map((b) => ({
  value: b.key,
  label: b.label,
}));

export default function InputScreen({ onResult }: Props) {
  const [project, setProject] = useState({
    architect: "",
    mobile: "",
    location: "",
  });

  const [buildingKey, setBuildingKey] = useState(
    BUILDING_TYPES[0].key
  );

  const [subCategoryKey, setSubCategoryKey] = useState<string>(
    BUILDING_TYPES[0].subCategories?.[0]?.key ?? ""
  );

  const [quantity, setQuantity] = useState("250");

  const [isCalculating, setIsCalculating] = useState(false);

  const building = BUILDING_TYPES.find(
    (b) => b.key === buildingKey
  )!;

  const hasSubCategory =
    !building.noSubCategory &&
    !!building.subCategories &&
    building.subCategories.length > 0;

  const subOptions =
    building.subCategories?.map((s) => ({
      value: s.key,
      label: s.label,
    })) ?? [];

  const handleBuildingChange = (key: string) => {
    setBuildingKey(key);

    const selectedBuilding = BUILDING_TYPES.find(
      (b) => b.key === key
    )!;

    setSubCategoryKey(
      selectedBuilding.subCategories?.[0]?.key ?? ""
    );
  };

  const handleCalculate = async () => {
    const qty = parseInt(quantity, 10);

    if (!qty || qty <= 0) {
      return;
    }

    if (isCalculating) {
      return;
    }

    setIsCalculating(true);

    const payload = {
      architectFirm: project.architect.trim(),
      mobile: project.mobile.trim(),
      location: project.location.trim(),

      // IMPORTANT:
      // Apps Script expects the building key,
      // not the displayed label.
      buildingType: building.key,

      // Apps Script expects null when there
      // is no sub-category.
      subType: subCategoryKey || null,

      quantity: qty,
    };

    try {
      /**
       * STEP 1
       * Ask Apps Script to perform the calculation.
       */
      const serverResult = await calculateWaterDemand(payload);

      /**
       * STEP 2
       * Convert Apps Script's response into the
       * STPResult structure already used by
       * your existing ResultScreen.
       */
      const result: STPResult = {
        buildingType: serverResult.buildingType,

        subCategory: serverResult.subType,

        quantity: serverResult.quantity,

        quantityUnit: serverResult.unit,

        personsPerUnit: serverResult.personsPerUnit,

        designPopulation: serverResult.designPopulation,

        lpcd: serverResult.rate,

        waterDemandL: serverResult.waterLitres,

        waterDemandKL: serverResult.waterKL,

        sewageKL: serverResult.sewageKL,

        stpCapacityKL: serverResult.stpKL,

        architect: project.architect,

        mobile: project.mobile,

        location: project.location,
      };

      /**
       * STEP 3
       * Show the result immediately.
       *
       * The user does NOT wait for Sheet1 logging.
       */
      onResult(result);

      /**
       * STEP 4
       * Save usage separately.
       *
       * If saving fails, the calculation result
       * is still already displayed.
       */
      saveUsage(payload).catch((error) => {
        console.error(
          "Usage logging failed:",
          error
        );
      });
    } catch (error) {
      console.error(
        "STP calculation failed:",
        error
      );

      alert(
        "Unable to calculate right now. Please try again."
      );
    } finally {
      setIsCalculating(false);
    }
  };

  const isValid =
    parseInt(quantity, 10) > 0 &&
    !isCalculating;

  return (
    <div
      className="screen-in min-h-screen flex flex-col"
      style={{ background: "var(--background)" }}
    >
      <AppHeader showInfo />

      {/* Page heading */}
      <div className="px-5 pt-6 pb-5">
        <h1
          className="font-semibold leading-tight"
          style={{
            fontSize: 30,
            color: "var(--foreground)",
            letterSpacing: "-0.01em",
          }}
        >
          Calculate your
          <br />
          <span style={{ color: "var(--primary)" }}>
            STP requirement
          </span>
        </h1>

        <p
          className="mt-2 text-sm leading-relaxed"
          style={{
            color: "var(--muted-foreground)",
            maxWidth: "32ch",
          }}
        >
          Quick indicative calculation based on
          building water-consumption standards.
        </p>
      </div>

      {/* Scrollable form area */}
      <div className="flex-1 px-5 pb-8 flex flex-col gap-4 overflow-y-auto">

        {/* Project card */}
        <ProjectCard
          values={project}
          onChange={(key, value) =>
            setProject((previous) => ({
              ...previous,
              [key]: value,
            }))
          }
        />

        {/* Inputs card */}
        <div
          className="flex flex-col gap-5 p-5"
          style={{
            background: "var(--card)",
            borderRadius: "var(--radius-card)",
            border: "1px solid var(--border)",
          }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{
              color: "var(--muted-foreground)",
              letterSpacing: "0.12em",
            }}
          >
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
              label={
                building.key === "hotel"
                  ? "Hotel Category"
                  : building.key === "hospital"
                  ? "Hospital Category"
                  : building.key === "school"
                  ? "School Type"
                  : "Type"
              }
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
        <RateChip
          building={building}
          subCategoryKey={subCategoryKey}
        />

        {/* CTA */}
        <div className="pt-2">
          <PrimaryButton
            onClick={handleCalculate}
            disabled={!isValid}
            fullWidth
          >
            {isCalculating
              ? "Calculating..."
              : "Calculate →"}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

/**
 * Displays the current LPCD rate.
 */
function RateChip({
  building,
  subCategoryKey,
}: {
  building: (typeof BUILDING_TYPES)[0];
  subCategoryKey: string;
}) {
  let lpcd: number;
  let label: string;

  if (
    building.noSubCategory ||
    !building.subCategories
  ) {
    lpcd = building.defaultRate!;
    label = building.label;
  } else {
    const sub =
      building.subCategories.find(
        (s) => s.key === subCategoryKey
      ) ??
      building.subCategories[0];

    lpcd = sub.lpcd;
    label = sub.label;
  }

  return (
    <div
      className="flex items-center gap-2 px-4 py-2 self-start"
      style={{
        background: "var(--card-deep)",
        borderRadius: "var(--radius-pill)",
        border: "1px solid var(--border)",
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{
          background: "var(--water)",
          boxShadow:
            "0 0 4px var(--water)",
        }}
      />

      <span
        className="text-xs"
        style={{
          color: "var(--secondary-text)",
        }}
      >
        {label} ·{" "}
        <strong
          style={{
            color: "var(--water)",
          }}
        >
          {lpcd} LPCD
        </strong>
      </span>
    </div>
  );
}