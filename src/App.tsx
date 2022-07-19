import "./App.css";
import { Footer, MantineProvider } from "@mantine/core";
import ProductContainer from "./components/ProductContainer";
import { HeaderMiddle } from "./components/Header";
const links = [
  {
    link: "/",
    label: "Home",
  },
  {
    link: "/other",
    label: "Other",
  },
];

function App() {
  return (
    <div className="App">
      <MantineProvider
        theme={{
          loader: "bars",
          fontFamily: "Greycliff CF, sans-serif",
          colors: {
            "ocean-blue": [
              "#7AD1DD",
              "#5FCCDB",
              "#44CADC",
              "#2AC9DE",
              "#1AC2D9",
              "#11B7CD",
              "#09ADC3",
              "#0E99AC",
              "#128797",
              "#147885",
            ],
          },
        }}
      >
        <HeaderMiddle links={links} />
        <ProductContainer />
        <Footer />
      </MantineProvider>
    </div>
  );
}

export default App;
