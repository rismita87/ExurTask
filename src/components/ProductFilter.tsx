import { TextInput } from "@mantine/core";

export default function ProductFilter({ filterProductArrayAction }: any) {
  return (
    <TextInput
      sx={{ maxWidth: 200 }}
      placeholder="Search"
      onChange={(e: any) => filterProductArrayAction(e.target.value)}
    />
  );
}
