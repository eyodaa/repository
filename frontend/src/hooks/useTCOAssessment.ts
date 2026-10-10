import { useState } from "react";

export interface CostRow {
    costDefinitionId: number;
    code: string;
    name: string;
    category: string;
    values: Record<number, number>;
}

export interface CategoryState {
    category: string;
    title: string;
    rows: CostRow[];
}

const defaultCategories: CategoryState[] = [
    {
        category: "EXTERNAL",
        title: "External Software Costs",
        rows: [
            {
                costDefinitionId: 1,
                code: "LICENSE",
                name: "License / Subscription Fees",
                category: "EXTERNAL",
                values: { 2027: 0, 2028: 0, 2029: 0 }
            },
            {
                costDefinitionId: 2,
                code: "EXTERNAL_MAINTENANCE",
                name: "External Maintenance",
                category: "EXTERNAL",
                values: { 2027: 0, 2028: 0, 2029: 0 }
            }
        ]
    },
    {
        category: "UPGRADE",
        title: "Software Upgrade Costs",
        rows: [
            {
                costDefinitionId: 3,
                code: "VERSION_UPGRADE",
                name: "Version Upgrades",
                category: "UPGRADE",
                values: { 2027: 0, 2028: 0, 2029: 0 }
            },
            {
                costDefinitionId: 4,
                code: "ADDITIONAL_MODULES",
                name: "Additional Modules",
                category: "UPGRADE",
                values: { 2027: 0, 2028: 0, 2029: 0 }
            }
        ]
    },
    {
        category: "LABOUR",
        title: "Maintenance & Development Labour",
        rows: [
            {
                costDefinitionId: 5,
                code: "DEVELOPER_WAGES",
                name: "Developer Wages",
                category: "LABOUR",
                values: { 2027: 0, 2028: 0, 2029: 0 }
            },
            {
                costDefinitionId: 6,
                code: "ADDITIONAL_SALARIES",
                name: "Additional Salaries",
                category: "LABOUR",
                values: { 2027: 0, 2028: 0, 2029: 0 }
            },
            {
                costDefinitionId: 7,
                code: "SUPPORT_SERVICES",
                name: "Support Services",
                category: "LABOUR",
                values: { 2027: 0, 2028: 0, 2029: 0 }
            }
        ]
    },
    {
        category: "INFRASTRUCTURE",
        title: "Infrastructure Costs",
        rows: [
            {
                costDefinitionId: 8,
                code: "PERIPHERALS",
                name: "Peripherals",
                category: "INFRASTRUCTURE",
                values: { 2027: 0, 2028: 0, 2029: 0 }
            },
            {
                costDefinitionId: 9,
                code: "SUB_SYSTEMS",
                name: "Sub-Systems",
                category: "INFRASTRUCTURE",
                values: { 2027: 0, 2028: 0, 2029: 0 }
            },
            {
                costDefinitionId: 10,
                code: "STORAGE",
                name: "Storage",
                category: "INFRASTRUCTURE",
                values: { 2027: 0, 2028: 0, 2029: 0 }
            },
            {
                costDefinitionId: 11,
                code: "SERVERS",
                name: "Servers",
                category: "INFRASTRUCTURE",
                values: { 2027: 0, 2028: 0, 2029: 0 }
            },
            {
                costDefinitionId: 12,
                code: "CLIENT_COMPUTERS",
                name: "Client Computers",
                category: "INFRASTRUCTURE",
                values: { 2027: 0, 2028: 0, 2029: 0 }
            },
            {
                costDefinitionId: 13,
                code: "NETWORK_COMPONENTS",
                name: "Network Components",
                category: "INFRASTRUCTURE",
                values: { 2027: 0, 2028: 0, 2029: 0 }
            }
        ]
    },
    {
        category: "SUPPORT",
        title: "Indirect Support Costs",
        rows: [
            {
                costDefinitionId: 14,
                code: "HELP_DESK",
                name: "Help Desk Labour",
                category: "SUPPORT",
                values: { 2027: 0, 2028: 0, 2029: 0 }
            },
            {
                costDefinitionId: 15,
                code: "TRAINING",
                name: "Developer Training Fees",
                category: "SUPPORT",
                values: { 2027: 0, 2028: 0, 2029: 0 }
            },
            {
                costDefinitionId: 16,
                code: "SKILLED_PREMIUM",
                name: "Skilled Staff Premiums",
                category: "SUPPORT",
                values: { 2027: 0, 2028: 0, 2029: 0 }
            },
            {
                costDefinitionId: 17,
                code: "TRAVEL",
                name: "Travel",
                category: "SUPPORT",
                values: { 2027: 0, 2028: 0, 2029: 0 }
            },
            {
                costDefinitionId: 18,
                code: "END_USER_TRAINING",
                name: "End User Training",
                category: "SUPPORT",
                values: { 2027: 0, 2028: 0, 2029: 0 }
            },
            {
                costDefinitionId: 19,
                code: "ADMIN_SUPPORT",
                name: "User & Administrator Support",
                category: "SUPPORT",
                values: { 2027: 0, 2028: 0, 2029: 0 }
            }
        ]
    }
];
export function useTCOAssessment() {

    const [assessmentId, setAssessmentId] = useState<number | undefined>();

    const [assessmentYear, setAssessmentYear] = useState(2027);

    const [currency, setCurrency] = useState("USD");

    const [assessedBy, setAssessedBy] = useState("");

    const [notes, setNotes] = useState("");

    const [years, setYears] = useState<number[]>([
        2027,
        2028,
        2029
    ]);


    const [categories, setCategories] =
        useState<CategoryState[]>(defaultCategories);

    function addYear() {

        const nextYear = Math.max(...years) + 1;

        setYears(prev => [...prev, nextYear]);

        setCategories(prev =>
            prev.map(category => ({
                ...category,
                rows: category.rows.map(row => ({
                    ...row,
                    values: {
                        ...row.values,
                        [nextYear]: 0
                    }
                }))
            }))
        );
    }

    function updateValue(
        categoryName: string,
        rowId: number,
        year: number,
        value: number
    ) {

        setCategories(prev =>
            prev.map(category => {

                if (category.category !== categoryName) {
                    return category;
                }

                return {
                    ...category,
                    rows: category.rows.map(row =>
                        row.costDefinitionId === rowId
                            ? {
                                ...row,
                                values: {
                                    ...row.values,
                                    [year]: value
                                }
                            }
                            : row
                    )
                };
            })
        );
    }

    function loadAssessment(response: any) {

        setAssessmentId(response.id);

        setAssessmentYear(response.assessmentYear);

        setCurrency(response.currency);

        setAssessedBy(response.assessedBy);

        setNotes(response.notes ?? "");

        const yearSet = new Set<number>();

        response.costItems.forEach((item: any) => {
            item.yearlyAmounts.forEach((y: any) => {
                yearSet.add(y.financialYear);
            });
        });

        const loadedYears = [...yearSet].sort((a, b) => a - b);

        setYears(loadedYears);

        const updated: CategoryState[] = defaultCategories.map(category => ({

            ...category,

            rows: category.rows.map(row => {

                const apiRow = response.costItems.find(
                    (x: any) =>
                        x.costDefinitionId === row.costDefinitionId
                );

                if (!apiRow) {
                    const emptyValues: Record<number, number> = {};

                    loadedYears.forEach(year => {
                        emptyValues[year] = 0;
                    });

                    return {
                        ...row,
                        values: emptyValues
                    };
                }

                const values: Record<number, number> = {};

                loadedYears.forEach(year => {
                    values[year] = 0;
                });

                apiRow.yearlyAmounts.forEach((y: any) => {
                    values[y.financialYear] = y.amount;
                });

                return {
                    ...row,
                    values
                };
            })
        }));

        setCategories(updated);
    }

    const grandTotal = categories.reduce(
        (categoryTotal, category) =>
            categoryTotal +
            category.rows.reduce(
                (rowTotal, row) =>
                    rowTotal +
                    years.reduce(
                        (yearTotal, year) =>
                            yearTotal + (row.values[year] ?? 0),
                        0
                    ),
                0
            ),
        0
    );

    return {
        assessmentId,
        setAssessmentId,

        assessmentYear,
        setAssessmentYear,

        currency,
        setCurrency,

        assessedBy,
        setAssessedBy,

        notes,
        setNotes,

        years,
        setYears,

        categories,
        setCategories,

        addYear,

        updateValue,

        loadAssessment,

        grandTotal
    };
}