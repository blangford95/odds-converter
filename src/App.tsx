import React from "react";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button'



interface OutputValues {
  percentage: String;
  winningValue: number;
  EV: number;
}




interface AppProps {}
interface AppState {
  count: number;
  values: string[];
  outputValues: OutputValues[];
  vig: number;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    const values: string[] = ["", ""];
    values.length = 2;
    this.state = {
      count: values.length,
      values,
      outputValues: [],
      vig: 0.0
    };

    this.handleChange = this.handleChange.bind(this);
    this.isInputValid = this.isInputValid.bind(this);
    this.addInput = this.addInput.bind(this);
    this.removeInput = this.removeInput.bind(this);
  }


  handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const {values } = this.state;
    values[index] = event.target.value;
    this.setState({values});
    event.preventDefault();
  }

  isInputValid = (): boolean => {
    let isValid: boolean = true;
    this.state.values.forEach((value) => {
      if(!value){
        isValid = false;
      }
    })

    return isValid;
  }

  addInput = () => {
    let { values, count} = this.state;
    values[count ] = ""
    count = count + 1;
    this.setState({values, count});

  }

  removeInput = (index:number) => {
    let{ values, count} = this.state;
    values.splice(index, 1);
    count = count -1;
    this.setState({values, count});
    return undefined;

  }

  calculateOdds = () => {
    const outputValues: OutputValues[] = [];
    const numericOutputValues: number[] = [];

    let vig = 0;

    this.state.values.forEach((value, index) => {
      if(parseInt(value) > 0) {
        const numericResult = (100 / (parseInt(value) + 100) * 100);
        numericOutputValues[index] = numericResult;
        vig = vig + numericResult;
      } else {
        const numericResult = (parseInt(value) *-1 / (parseInt(value) *-1 + 100) * 100) ;
        numericOutputValues[index] = numericResult;
        
        vig = vig + numericResult
      }
    })

    numericOutputValues.forEach((value, index) => {
      console.log(value);
      const vigRemovedValue = value / vig * 100;
      let result = vigRemovedValue.toString();
      let winningValue;
      if(parseInt(this.state.values[index] ) > 0 ){
        winningValue = 1 * parseInt(this.state.values[index]) / 100 + 1
      } else {
        winningValue = 100 / parseInt(this.state.values[index]) * -1 + 1
      }
      result = result + '%';
      outputValues[index]  = {
        winningValue,
        percentage: result, 
        EV:  1 / (vigRemovedValue / 100) 
      };
 


    })



    vig = vig -100;

    this.setState({outputValues, vig})
  }

  render() {
    return (
      <div>
        <h1 className="title">Odds Converter</h1>
        <Grid className="container" container>
          <Grid item xs={3} />
          <Grid item xs={3}>
            <h1>Input</h1>
            {this.state.values.map((value, index) => {
              return <Grid key={index}><input value={value} type="number" onChange={event => this.handleChange(event, index)}  />
              {index > 1 && (<Button variant="contained" color="secondary" onClick={event => this.removeInput(index)} >-</Button>)}
               </Grid>;
            })}
            <Grid>
            <Button onClick={this.addInput} variant="contained" color="primary" >
            
        +
      </Button>
      </Grid>
           <Grid> <Button onClick={this.calculateOdds} variant="contained" color="secondary" disabled={!this.isInputValid()}>Submit</Button></Grid>
          </Grid>

          <Grid item xs={1} />

          <Grid item xs={4}>
            <h1>Output</h1>
            {this.state.outputValues.map((value, index) => {
              return <div key={index}>{value.percentage} {value.winningValue} {value.EV}</div>
            })}
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={5} />
          <Grid item xs={1}>
            <h1>Vig: {this.state.vig}</h1>
          </Grid>
        </Grid>
        
      </div>
    );
  }
}

export default App;
