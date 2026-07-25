import { Paper, TextField, List, ListItemButton, ListItemText } from "@mui/material";
import { useMemo, useState } from "react";
import type { BuildingModel } from "./types";

interface Props {

    buildings: BuildingModel[];

    onSelect: (building: BuildingModel) => void;

}

export default function SearchPanel({

    buildings,

    onSelect,

}: Props) {

    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {

        if (!search.trim()) return [];

        return buildings.filter(b =>

            b.name.toLowerCase().includes(search.toLowerCase())

        );

    }, [search, buildings]);

    return (

        <Paper
            sx={{
                position: "absolute",
                top: 20,
                left: 20,
                width: 320,
                zIndex: 1000,
                p: 2,
            }}
        >

            <TextField
                fullWidth
                placeholder="Search Artifact..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <List>

                {filtered.map(building => (

                    <ListItemButton
                        key={building.id}
                        onClick={() => {

                            onSelect(building);

                            setSearch("");

                        }}
                    >

                        <ListItemText
                            primary={building.name}
                            secondary={building.type}
                        />

                    </ListItemButton>

                ))}

            </List>

        </Paper>

    );

}