import { useCapabilities } from "../../hooks/useCapabilities";

interface Props {

    selected: string | null;

    onSelect: (code: string) => void;

}

export default function CapabilityExplorer({

    selected,

    onSelect,

}: Props) {

    const {

        capabilities,

        loading,

    } = useCapabilities();

    if (loading) {

        return <>Loading...</>;

    }

    return (

        <>
            Tree coming next...
        </>

    );

}