//Product container containes search filter input,
//search filter checkboxes and product overview
import { Loader, Grid } from "@mantine/core";
import { useState, useEffect } from "react";
import ProductFilter from "./ProductFilter";
import ProductOverview from "./ProductOverview";
import ProductComplianceTypeFilter from "./ProductComplianceTypeFilter";
type response = {
  results: { id: number; name: string }[];
};

type checkboxSelectionArrayType = {
  checkboxSelection: checkBoxObjectType[];
};
type checkBoxObjectType = {
  complianceTypeIdValue: number;
  checkboxStatus: boolean;
};
export default function ProductContainer() {
  const [allProducts, setAllProducts] = useState<response>({ results: [] });
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [searchFilterText, setSearchFilterText] = useState<string>("");

  //here we have initialized with a static JSON object,
  //but to make it generic we need to call the API an dget
  //distinct compliance type from it to create the compliance type checkbox
  const [checkboxSelectionArray, setCheckboxSelectionArray] =
    useState<checkboxSelectionArrayType>({
      checkboxSelection: [
        { complianceTypeIdValue: 1, checkboxStatus: false },
        { complianceTypeIdValue: 2, checkboxStatus: false },
      ],
    });
  const [complianceTypeIdArray, setComplianceTypeIdArray] = useState<number[]>(
    []
  );

  const complianceTypeSelectionModifier = (value: string) => {
    const complianceTypeIdArrayTemp: number[] = [];
    const checkboxArrtemp = checkboxSelectionArray;
    checkboxArrtemp.checkboxSelection.map((checkboxObj: checkBoxObjectType) => {
      checkboxObj.checkboxStatus =
        checkboxObj.complianceTypeIdValue === parseInt(value)
          ? !checkboxObj.checkboxStatus
          : checkboxObj.checkboxStatus;
      if (checkboxObj.checkboxStatus)
        complianceTypeIdArrayTemp.push(checkboxObj.complianceTypeIdValue);
    });

    setCheckboxSelectionArray(checkboxArrtemp);
    setComplianceTypeIdArray(complianceTypeIdArrayTemp);
  };

  useEffect(() => {
    setIsLoaded(false);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        searchText: searchFilterText,
        complianceTypeIds: complianceTypeIdArray,
      }),
    };
    fetch(
      "https://pfp-public-productdb-api.azurewebsites.net/api/product/search ",
      requestOptions
    )
      .then((response) => response.json())
      .then(
        (data: response) => {
          setAllProducts(data);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [searchFilterText, complianceTypeIdArray]);

  const filterProductArray = (value: string) => {
    setSearchFilterText(value);
  };
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (allProducts) {
    return (
      <Grid>
        <Grid.Col lg={4}>
          <Grid.Col>
            <ProductFilter filterProductArrayAction={filterProductArray} />
          </Grid.Col>
          <Grid.Col>
            <ProductComplianceTypeFilter
              complianceTypeSelectionModifier={complianceTypeSelectionModifier}
            />
          </Grid.Col>
        </Grid.Col>
        <Grid.Col lg={7}>
          {!isLoaded ? (
            <Loader />
          ) : (
            <ProductOverview results={allProducts.results} />
          )}
        </Grid.Col>
      </Grid>
    );
  }
  return <h3>Sorry..</h3>;
}
