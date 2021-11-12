import { useState } from "react";
import { CheckBox } from "../helpers/Checkbox";
import { ButtonCell, ContentCell } from "../helpers/LayoutCells";

const StepTask: React.FC<{
  initialTasks: string[];
  availableTasks: string[];
  onBack: () => void;
  cancel: () => void;
  onTasks: (tasks: string[]) => void;
}> = ({ initialTasks, availableTasks, onBack, cancel, onTasks }) => {

  let [selectedTasks, setSelectedTasks] = useState(initialTasks);

  const onNext = () => {
    onTasks(selectedTasks);
  };

  const defaultCheckboxes = availableTasks.map(task => new CheckBox(task, task, () => {
    setSelectedTasks(checkboxes.filter(c => c.value).map(c => c.name))
  }, initialTasks.includes(task)));
  let [checkboxes] = useState(defaultCheckboxes);

  return (
    <>
      <ContentCell>
        
        <h2>Select Tasks</h2>
        
        <p>Select the task(s) to :</p>
        <div>
            {checkboxes.map((checkbox) => checkbox.render())}
        </div>
      </ContentCell>
      <ButtonCell>
        <button onClick={onBack}>&lt; Back</button>
        <button onClick={onNext} disabled={selectedTasks.length < 1}>Next &gt;</button>
        &nbsp;
        <button onClick={cancel} style={{ marginLeft: "1em" }}>Cancel</button>
      </ButtonCell>
    </>
  );
};

export { StepTask };
