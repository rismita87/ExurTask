//Product filter contains search input and
//the search is automatically submitted out after each kyestroke.
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
