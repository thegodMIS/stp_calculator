export interface SubCategory {
  key: string;
  label: string;
  lpcd: number;
  personsPerUnit: number;
}

export interface BuildingType {
  key: string;
  label: string;
  quantityLabel: string;
  quantityUnit: string;
  subCategories?: SubCategory[];
  defaultRate?: number;
  defaultPersonsPerUnit?: number;
  noSubCategory?: boolean;
}

export const BUILDING_TYPES: BuildingType[] = [
  {
    key: "hotel",
    label: "Hotel",
    quantityLabel: "Number of Beds",
    quantityUnit: "beds",
    subCategories: [
      { key: "3star",  label: "3 Star",       lpcd: 180, personsPerUnit: 1 },
      { key: "4star",  label: "4 Star",       lpcd: 180, personsPerUnit: 1 },
      { key: "5star",  label: "5 Star & Above", lpcd: 320, personsPerUnit: 1 },
    ],
  },
  {
    key: "hospital",
    label: "Hospital",
    quantityLabel: "Number of Beds",
    quantityUnit: "beds",
    subCategories: [
      { key: "upto100",  label: "Up to 100 Beds",  lpcd: 340, personsPerUnit: 2 },
      { key: "above100", label: "Above 100 Beds",  lpcd: 450, personsPerUnit: 2 },
    ],
  },
  {
    key: "hostel",
    label: "Hostel",
    quantityLabel: "Number of Beds",
    quantityUnit: "beds",
    noSubCategory: true,
    defaultRate: 135,
    defaultPersonsPerUnit: 1,
  },
  {
    key: "factory",
    label: "Factory",
    quantityLabel: "Number of Workers",
    quantityUnit: "workers",
    subCategories: [
      { key: "with_bath",    label: "With Bath Rooms",    lpcd: 45, personsPerUnit: 1 },
      { key: "without_bath", label: "Without Bath Rooms", lpcd: 30, personsPerUnit: 1 },
    ],
  },
  {
    key: "office",
    label: "Office",
    quantityLabel: "Number of Persons",
    quantityUnit: "persons",
    noSubCategory: true,
    defaultRate: 45,
    defaultPersonsPerUnit: 1,
  },
  {
    key: "restaurant",
    label: "Restaurant",
    quantityLabel: "Number of Seats",
    quantityUnit: "seats",
    noSubCategory: true,
    defaultRate: 70,
    defaultPersonsPerUnit: 1,
  },
  {
    key: "school",
    label: "School",
    quantityLabel: "Number of Students",
    quantityUnit: "students",
    subCategories: [
      { key: "day",      label: "Day School",      lpcd: 45,  personsPerUnit: 1 },
      { key: "boarding", label: "Boarding School",  lpcd: 135, personsPerUnit: 1 },
    ],
  },
  {
    key: "cinema",
    label: "Cinema / Theatre",
    quantityLabel: "Number of Seats",
    quantityUnit: "seats",
    noSubCategory: true,
    defaultRate: 15,
    defaultPersonsPerUnit: 1,
  },
];

export interface STPResult {
  buildingType: string;
  subCategory: string | null;
  quantity: number;
  quantityUnit: string;
  personsPerUnit: number;
  designPopulation: number;
  lpcd: number;
  waterDemandL: number;
  waterDemandKL: number;
  sewageKL: number;
  stpCapacityKL: number;
  architect: string;
  mobile: string;
  location: string;
}

export function computeSTP(
  building: BuildingType,
  subCategoryKey: string | null,
  quantity: number,
  project: { architect: string; mobile: string; location: string }
): STPResult {
  let lpcd: number;
  let personsPerUnit: number;

  if (building.noSubCategory || !building.subCategories) {
    lpcd = building.defaultRate!;
    personsPerUnit = building.defaultPersonsPerUnit!;
  } else {
    const sub = building.subCategories.find((s) => s.key === subCategoryKey) ?? building.subCategories[0];
    lpcd = sub.lpcd;
    personsPerUnit = sub.personsPerUnit;
  }

  const subLabel = building.subCategories?.find((s) => s.key === subCategoryKey)?.label ?? null;

  const designPopulation = quantity * personsPerUnit;
  const waterDemandL = designPopulation * lpcd;
  const waterDemandKL = waterDemandL / 1000;
  const sewageKL = waterDemandKL * 0.8;
  const stpCapacityKL = sewageKL * 1.0;

  return {
    buildingType: building.label,
    subCategory: subLabel,
    quantity,
    quantityUnit: building.quantityUnit,
    personsPerUnit,
    designPopulation,
    lpcd,
    waterDemandL,
    waterDemandKL: Math.round(waterDemandKL * 10) / 10,
    sewageKL: Math.round(sewageKL * 10) / 10,
    stpCapacityKL: Math.round(sewageKL * 10) / 10,
    ...project,
  };
}
