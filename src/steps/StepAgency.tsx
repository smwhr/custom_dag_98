import { useState } from "react";
import { ButtonCell, ContentCell } from "../helpers/LayoutCells";

const StepAgency: React.FC<{
  initialAgency: string;
  availableAgencies: string[];
  onBack: () => void;
  onAgency: (agency: string) => void;
  cancel: () => void;
}> = ({ initialAgency, availableAgencies, onBack, onAgency, cancel }) => {
  let [selectedAgency, setSelectedAgency] = useState(initialAgency);

  const onNext = () => {
    onAgency(selectedAgency);
  };

  return (
    <>
      <ContentCell>
        
        <h2>Select Agency</h2>
        
        <p>Select the agency :</p>
        <div>
          <select onChange={(event) => setSelectedAgency(event.target.value)}
                  defaultValue={initialAgency}
            >
            {availableAgencies.map((agency) => (
              <option key={agency} value={agency}>
                {agency}
              </option>
            ))}
          </select>
        </div>
      </ContentCell>
      <ButtonCell>
        <button onClick={onBack}>&lt; Back</button>
        <button onClick={onNext}>Next &gt;</button>
        &nbsp;
        <button onClick={cancel} style={{ marginLeft: "1em" }}>Cancel</button>
      </ButtonCell>
    </>
  );
};

export { StepAgency };
