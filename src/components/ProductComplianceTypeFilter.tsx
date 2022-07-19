import { Checkbox, InputWrapper } from "@mantine/core";

export default function ProductComplianceTypeFilter({
  complianceTypeSelectionModifier,
}: any) {
  return (
    <InputWrapper
      style={{
        marginTop: 20,
        textAlign: "left",
      }}
      label="Filtrer på produkttype"
      size="md"
    >
      <Checkbox
        style={{
          paddingBottom: 5,
        }}
        label="Farlige produkter"
        value="2"
        onChange={(e: any) => complianceTypeSelectionModifier(e.target.value)}
      />
      <Checkbox
        label="Mangelfulde produkter"
        value="1"
        onChange={(e: any) => complianceTypeSelectionModifier(e.target.value)}
      />
    </InputWrapper>
  );
}
