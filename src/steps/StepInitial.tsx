import { ButtonCell, ContentCell } from "../helpers/LayoutCells";

const StepInitial: React.FC<{ 
  onNext: () => void;
  cancel: () => void;
}> = ({ onNext, cancel }) => {
  return (
    <>
      <ContentCell>
        <p>
          This wizard will help you create your custom DAG quickly and easily.
        </p>
        <p>To begin creating your custom DAG, click Next.</p>
      </ContentCell>
      <ButtonCell>
        <button disabled>&lt; Back</button>
        <button onClick={onNext}>Next &gt;</button>
        &nbsp;
        <button onClick={cancel} style={{ marginLeft: "1em" }}>Cancel</button>
      </ButtonCell>
    </>
  );
};

export { StepInitial };
