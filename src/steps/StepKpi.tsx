import { useState } from "react";
import { ButtonCell, ContentCell } from "../helpers/LayoutCells";

const StepKpi: React.FC<{
  initialKpi: string;
  availableKpis: string[];
  onBack: () => void;
  cancel: () => void;
  onKpi: (kpi: string) => void;
}> = ({ initialKpi, availableKpis, onBack, cancel, onKpi }) => {
  let [selectedKpi, setSelectedKpi] = useState(initialKpi);

  const onNext = () => {
    onKpi(selectedKpi);
  };

  return (
    <>
      <ContentCell>
        
        <h2>Select Kpi</h2>
        
        <p>Select the kpi :</p>
        <div>
          <select onChange={(event) => setSelectedKpi(event.target.value)}
                  defaultValue={initialKpi}
            >
            {availableKpis.map((kpi) => (
              <option key={kpi} value={kpi}>
                {kpi}
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

export { StepKpi };
