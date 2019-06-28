import React from "react";
import "./App.css";
import Grid from "@material-ui/core/Grid";

interface AppProps {}
interface AppState {
  count: number;
  values: string[];
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    const values: string[] = ["", ""];
    values.length = 2;
    this.state = {
      count: values.length,
      values
    };
  }

  render() {
    const { values } = this.state;
    return (
      <div>
        <h1 className="title">Odds Converter</h1>
        <Grid className="container" container>
          <Grid item xs={4} />
          <Grid item xs={2}>
            <h1>Input</h1>
            {values.map((value, index) => {
              return <div>{index}</div>;
            })}
          </Grid>

          <Grid item xs={1} />

          <Grid item xs={4}>
            <h1>Output</h1>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
