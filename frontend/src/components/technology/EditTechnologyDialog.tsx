import { useEffect, useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";

import TechnologyForm from "./TechnologyForm";

import { technologyService } from "../../services/technologyService";

import type { Technology } from "../../types/technology";

interface Props {

    open: boolean;

    technology: Technology | null;

    onClose: () => void;

    onUpdated: () => void;

}

export default function EditTechnologyDialog({

    open,

    technology,

    onClose,

    onUpdated,

}: Props) {

    const [formData, setFormData] =
        useState<Technology | null>(null);

    const [saving, setSaving] =
        useState(false);

    useEffect(() => {

        if (technology) {

            setFormData({ ...technology });

        }

    }, [technology]);

    function change(

        field: keyof Technology,

        value: any

    ) {

        if (!formData) return;

        setFormData({

            ...formData,

            [field]: value,

        });

    }

    async function handleSave() {

        if (!formData) return;

        setSaving(true);

        try {

            await technologyService.update(

                formData.id,

                formData

            );

            onUpdated();

            onClose();

        }

        finally {

            setSaving(false);

        }

    }

    if (!formData) return null;

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >

            <DialogTitle>

                Edit Technology

            </DialogTitle>

            <DialogContent>

                <TechnologyForm
                    formData={formData}
                    onChange={change}
                    readOnlyCode
                />

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={saving}
                >
                    Save Changes
                </Button>

            </DialogActions>

        </Dialog>

    );

}