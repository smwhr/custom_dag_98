import { Cell, Grid } from "styled-css-grid";
import { ButtonCell, ContentCell } from "../helpers/LayoutCells";

const StepFinished: React.FC<{ 
    onBack: () => void; 
    onNext: () => void; 
    cancel: () => void;
}> = ({ onBack, onNext, cancel }) => {
  return (
    <>
      <ContentCell>
        <h2>Wizard completed</h2>
        <p>The custom DAG wizard saved all informations.</p>
        <p>Click Finish to generate your custom DAG json.</p>

        <div style={{marginTop: "5em"}}></div>
        <Grid>
          <Cell width={6}>
            <button disabled>Add custom builds</button> 
          </Cell>
          <Cell width={6} center middle>
            
          </Cell>
          <Cell width={6}>
            <button disabled>Add a custom notification</button> 
          </Cell>
          <Cell width={6} center middle>
            
          </Cell>
        </Grid>
      </ContentCell>
      <ButtonCell>
        <button onClick={onBack}>&lt; Back</button>
        <button onClick={onNext}>Finish</button>
        &nbsp;
        <button onClick={cancel} style={{ marginLeft: "1em" }}>Cancel</button>
      </ButtonCell>
    </>
  );
};

export { StepFinished };
