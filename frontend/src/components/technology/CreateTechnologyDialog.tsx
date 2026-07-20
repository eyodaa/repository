import { useState } from "react";

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

    onClose: () => void;

    onCreated: () => void;

}

const emptyTechnology: Technology = {

    id: 0,

    code: "",

    name: "",

    description: "",

    artifactType: "TECHNOLOGY",

    technologyType: "",

    vendor: "",

    productName: "",

    version: "",

    deploymentModel: "",

    platform: "",

    licenseType: "",

    lifecycleStatus: "ACTIVE",

    supportStatus: "",

    endOfSupportDate: "",

    endOfLifeDate: "",

    owner: "",

    supportGroup: "",

    website: "",

    documentation: "",

};

export default function CreateTechnologyDialog({

    open,

    onClose,

    onCreated,

}: Props) {

    const [formData, setFormData] =
        useState<Technology>(emptyTechnology);

    const [saving, setSaving] =
        useState(false);

    function change(

        field: keyof Technology,

        value: any

    ) {

        setFormData({

            ...formData,

            [field]: value,

        });

    }

    async function handleCreate() {

        if (!formData.name) return;

        setSaving(true);

        try {

            await technologyService.create({

                ...formData,

                artifactType: "TECHNOLOGY",

            });

            setFormData(emptyTechnology);

            onCreated();

            onClose();

        }

        finally {

            setSaving(false);

        }

    }

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >

            <DialogTitle>

                Create Technology

            </DialogTitle>

            <DialogContent>

                <TechnologyForm

                    formData={formData}

                    onChange={change}

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
                    onClick={handleCreate}
                    disabled={saving}
                >
                    Create
                </Button>

            </DialogActions>

        </Dialog>

    );

}