import {
    Paper,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField
} from "@mui/material";

export interface CostRow {

    costDefinitionId: number;

    code: string;

    name: string;

    category: string;

    values: Record<number, number>;

}

interface Props {

    title: string;

    years: number[];

    rows: CostRow[];

    onValueChange: (
        rowId: number,
        year: number,
        value: number
    ) => void;

}

export default function TCOCategorySection({

    title,
    years,
    rows,
    onValueChange

}: Props) {

    const getRowTotal = (row: CostRow) =>

        years.reduce(
            (sum, year) => sum + (row.values[year] ?? 0),
            0
        );

    const getYearTotal = (year: number) =>

        rows.reduce(
            (sum, row) => sum + (row.values[year] ?? 0),
            0
        );

    const getGrandTotal = () =>

        rows.reduce(
            (sum, row) => sum + getRowTotal(row),
            0
        );

    return (

        <Paper
            sx={{
                p: 3,
                mt: 4
            }}
        >

            <Typography
                variant="h6"
                gutterBottom
            >
                {title}
            </Typography>

            <Table size="small">

                <TableHead>

                    <TableRow>

                        <TableCell>
                            Cost Item
                        </TableCell>

                        {years.map(year => (

                            <TableCell
                                key={year}
                                align="right"
                            >
                                {year}
                            </TableCell>

                        ))}

                        <TableCell align="right">
                            Total
                        </TableCell>

                    </TableRow>

                </TableHead>

                <TableBody>

                    {rows.map(row => (

                        <TableRow key={row.costDefinitionId}>

                            <TableCell>

                                {row.name}

                            </TableCell>

                            {years.map(year => (

                                <TableCell key={year}>

                                    <TextField
                                        fullWidth
                                        size="small"
                                        type="number"
                                        value={row.values[year] ?? 0}
                                        onChange={(e) =>
                                            onValueChange(
                                                row.costDefinitionId,
                                                year,
                                                Number(e.target.value)
                                            )
                                        }
                                    />

                                </TableCell>

                            ))}

                            <TableCell align="right">

                                <strong>

                                    £{getRowTotal(row).toLocaleString()}

                                </strong>

                            </TableCell>

                        </TableRow>

                    ))}

                    <TableRow>

                        <TableCell>

                            <strong>Category Total</strong>

                        </TableCell>

                        {years.map(year => (

                            <TableCell
                                key={year}
                                align="right"
                            >

                                <strong>

                                    £{getYearTotal(year).toLocaleString()}

                                </strong>

                            </TableCell>

                        ))}

                        <TableCell align="right">

                            <strong>

                                £{getGrandTotal().toLocaleString()}

                            </strong>

                        </TableCell>

                    </TableRow>

                </TableBody>

            </Table>

        </Paper>

    );

}