import { Card, Image, Text, SimpleGrid, Grid } from "@mantine/core";
interface ProdList {
  results: { id: number; name: string }[];
}

export default function ProductOverview({ results }: ProdList) {
  if (results.length > 0) {
    const productItems = results.map((product) => (
      <div>
        <Card shadow="sm" p="sm" component="a" target="_blank">
          <Card.Section>
            <Image
              src={
                "https://pfp-public-productdb-api.azurewebsites.net/api/picture/" +
                product.id
              }
              height={200}
              alt="No Image"
            />
          </Card.Section>

          <Text weight={500} size="lg">
            {product.name}
          </Text>
        </Card>
      </div>
    ));

    return (
      <SimpleGrid
        style={{ marginTop: 10 }}
        sx={(theme: any) => ({
          backgroundColor: theme.colors.gray[0],
          "&:hover": {
            backgroundColor: theme.colors.gray[1],
          },
        })}
        cols={3}
        spacing="lg"
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: "md" },
          { maxWidth: 500, cols: 2, spacing: "sm" },
          { maxWidth: 300, cols: 1, spacing: "sm" },
        ]}
      >
        {productItems}
      </SimpleGrid>
    );
  } else {
    return <h3>Sorry..no products found!!</h3>;
  }
}
