import { ButtonCell, ContentCell } from "../helpers/LayoutCells";
import {CopyToClipboard} from 'react-copy-to-clipboard';


const buildValidCustomDag = (customDag) => {

    let kpiOb = {}
    console.log(customDag.tasks.includes("initialize-kpis"))
    if(customDag.kpi?.length > 0 && customDag.tasks.includes("initialize-kpis")){
        kpiOb = {"kpi" : customDag.kpi}
    }

    console.log(kpiOb)
    
    return {
        [customDag.agency] : {
            "time_perimeter": customDag.time_perimeter,
            "tasks": customDag.tasks,
            ...kpiOb
        }
    }
}

const StepJSON: React.FC<{ 
    customDag: any;
    onBack: () => void; 
}> = ({ customDag, onBack }) => {
    
    
    const validCustomDag = JSON.stringify(buildValidCustomDag(customDag));
    
  return (
    <>
      <ContentCell>
        <textarea style={{width: "100%", height: "220px"}} value={validCustomDag} readOnly>
        </textarea>
        
        <CopyToClipboard text={validCustomDag}>
          <button>Copy to clipboard</button>
        </CopyToClipboard>
      </ContentCell>
      <ButtonCell>
        <button onClick={onBack}>Cancel</button>
      </ButtonCell>
    </>
  );
};

export { StepJSON };
