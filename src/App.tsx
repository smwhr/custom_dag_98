import "./styles.css";
import "98.css";
import { useEffect, useReducer, useRef, useState } from "react";
import { range } from "./utils";

import { Cell, Grid } from "styled-css-grid";

import { StepInitial } from "./steps/StepInitial";
import { StepAgency } from "./steps/StepAgency";
import { StepDate } from "./steps/StepDate";
import { StepTask } from "./steps/StepTask";
import { StepKpi } from "./steps/StepKpi";
import { StepFinished } from "./steps/StepFinished";
import { ContentCell } from "./helpers/LayoutCells";
import { StepJSON } from "./steps/StepJSON";

const initialState = {};

function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return {};
    case "agency":
      return { ...state, agency: action.payload };
    case "time_perimeter":
      return { ...state, time_perimeter: action.payload };
    case "tasks":
        return { ...state, tasks: action.payload };
    case "kpi":
        return { ...state, kpi: action.payload };
    default:
      throw new Error();
  }
}

export default function App() {
  let [agencies, setAgencies] = useState<string[]>([]);
  let [kpis, setKpis] = useState<string[]>([]);
  let [currentStep, setCurrentStep] = useState<Step>("loading");

  const [customDag, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log("Fetching agencies");
    const loadAgency = fetch("https://all-agencies.gateway.cit.io/agency.json")
      .then((data) => data.json())
      .then((data: { name: string }[]) => data.map((d) => d.name))
      .then((names) => setAgencies(names.sort()));

    console.log("Fetching kpis");
    const loadKpis = fetch("https://docs.api.staging.cit.io/_sources/api/kpis.rst.txt")
      .then((data) => data.text())
      .then((data) => data.match(/kpis\.(.*)/g))
      .then((names) => names.map(name => name.split(".")[1]))
      .then((names) => {
        // console.log(names)
        setKpis(names.sort())
      });

    
      Promise.all([loadAgency, loadKpis ])
             .then(() => setCurrentStep("initial"))

  }, []);

  const availableYears = range(2018, new Date().getFullYear()).reverse();
  const availableTasks = [
    "write-ctfs-to-gcloud",
    "initialize-ctfs",
    "clean-models",
    "initialize-cs-models",
    "initialize-kpis",
    "initialize-serialized-courses",
    "initialize-service-dates",
    "generate-report",
    "clusterize-kpis",
    "run-prediction"
  ];

  const cancel = () => {
    dispatch({ type: "reset" })
    setCurrentStep("initial");
  }

  const initStepJSON = () => {
    return <StepJSON 
              customDag={customDag}
              onBack={() => {
              setCurrentStep("end");
              }}
            />;
  }

  const initFinished = () => {
    const onNext = () => {
      setCurrentStep("json");
    };
    return <StepFinished 
              onBack={() => {
                setCurrentStep("task");
              }}
              onNext={onNext}
              cancel={cancel}
            />;
  };

  const initStepKpi = () => {
    const initialKpi = customDag.kpi || kpis[0] || "";
    return (
      <StepKpi
        initialKpi={initialKpi}
        availableKpis={kpis}
        onBack={() => {
          setCurrentStep("task");
        }}
        cancel={cancel}
        onKpi={(kpi: string) => {
          dispatch({ type: "kpi", payload: kpi });
          setCurrentStep("end");
        }}
      />
    );
  };

  const initStepTasks = () => {
    const initialTasks = customDag.tasks || [];
    return (
      <StepTask
        initialTasks={initialTasks}
        availableTasks={availableTasks}
        onBack={() => {
          setCurrentStep("date");
        }}
        cancel={cancel}
        onTasks={(tasks: string[]) => {
          dispatch({ type: "tasks", payload: tasks });
          if(tasks.includes("initialize-kpis")){
            setCurrentStep("kpi");
          }else{
            setCurrentStep("end");
          }
        }}
      />
    );
  };

  const initStepDate = () => {
    const initialPerimeter = customDag.time_perimeter || [`${availableYears[0]}_${ (new Date()).getMonth()}`];
    return (
      <StepDate
        initialPerimeter={initialPerimeter}
        availableYears={availableYears}
        onBack={() => {
          setCurrentStep("agency");
        }}
        cancel={cancel}
        onTimePerimeter={(perimeter: string[] | "all") => {
          dispatch({ type: "time_perimeter", payload: perimeter });
          setCurrentStep("task");
        }}
      />
    );
  };

  const initStepAgency = () => {
    const initialAgency = customDag.agency || agencies[0] || "";
    return (
      <StepAgency
        initialAgency={initialAgency}
        availableAgencies={agencies}
        onBack={() => {
          setCurrentStep("initial");
        }}
        cancel={cancel}
        onAgency={(agency: string) => {
          dispatch({ type: "agency", payload: agency });
          setCurrentStep("date");
        }}
      />
    );
  };

  const initStepInitial = () => {
    const onNext = () => {
      setCurrentStep("agency");
    };
    return <StepInitial onNext={onNext} cancel={cancel} />;
  };

  const initLoading = () => (
        <ContentCell>
          Preparing the wizard... <br /><br />
          Agencies {agencies.length == 0 ? "loading..." : "loaded."} <br /><br />
          KPI {kpis.length == 0 ? "loading..." : "loaded."}
        </ContentCell>
      )

  //fun stuffs
  const window98 = useRef(null)
  const [window98state, setWin98State] = useState("normal");
  
  const maximize = () => {
    setWin98State("maximized")
  }
  const restore = () => {
    setWin98State("normal")
  }
  const minimize = () => {
    setWin98State("minimized")
  }

  const close = () => {
    let confirmClose = window.confirm("Are you sure your want to quit the wizard ?")
    if(confirmClose) window98.current.remove();
  }

  return (
    <div className="App">
      <div className="window" ref={window98} style={{ 
            width: (window98state == "normal" ? "490px" 
                 : window98state == "minimized" ? "200px"
                 : window98state == "maximized" ? "100%"
                 : "480px")
        }}>
        <div className="title-bar">
          <div className="title-bar-text">Custom DAG Wizard</div>
          <div className="title-bar-controls">
            {window98state != "minimized" ?<button aria-label="Minimize" onClick={minimize}></button> : null}
            {window98state != "maximized" && window98state != "minimized"  ? <button aria-label="Maximize" onClick={maximize}></button> : null}
            {window98state != "normal" ? <button aria-label="Restore" onClick={restore}></button> : null}
            <button aria-label="Close" onClick={close}></button>
          </div>
        </div>
        <div className="window-body" style={{display: window98state == "minimized" ? "none" : "block"}}>
        <Grid columns={12} flow="row dense">
          <Cell width={4} height={4}>
            <img src="/initial.png" alt="" />
          </Cell>
          <>
            {
               currentStep == "loading" ? initLoading()
             : currentStep == "initial" ? initStepInitial()
             : currentStep == "agency" ? initStepAgency()
             : currentStep == "date" ? initStepDate()
             : currentStep == "task" ? initStepTasks()
             : currentStep == "kpi" ? initStepKpi()
             : currentStep == "end" ? initFinished()
             : currentStep == "json" ? initStepJSON()
             : <p>Step undefined !</p>
            }
          </>
        </Grid>
          
        </div>
      </div>
      <div>
      {/* <pre>{JSON.stringify(customDag)}</pre> */}
      </div>
    </div>
  );
}
