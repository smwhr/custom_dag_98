import { useState } from "react";
import { Cell, Grid } from "styled-css-grid";
import { CheckBox } from "../helpers/Checkbox";
import { ButtonCell, ContentCell } from "../helpers/LayoutCells";
import { range } from "../utils";

const availableMonths = [
  { id: "1", name: "January" },
  { id: "2", name: "February" },
  { id: "3", name: "March" },
  { id: "4", name: "April" },
  { id: "5", name: "May" },
  { id: "6", name: "June" },
  { id: "7", name: "July" },
  { id: "8", name: "August" },
  { id: "9", name: "September" },
  { id: "10", name: "October" },
  { id: "11", name: "November" },
  { id: "12", name: "December" }
];

const StepDate: React.FC<{
  initialPerimeter: string[] | "all";
  availableYears: number[];
  onBack: () => void;
  onTimePerimeter: (perimeter: string[] | "all") => void;
  cancel: () => void;
}> = ({
  initialPerimeter,
  availableYears,
  onBack,
  onTimePerimeter,
  cancel
}) => {
  const initialPerimeterType =
    typeof initialPerimeter === "string"
      ? "all"
      : initialPerimeter.length === 0
      ? "none"
      : "year_month";
  const initialYear =
    initialPerimeterType === "year_month"
      ? initialPerimeter[0].split("_")[0]
      : availableYears[0];

  const initialMonths = Array.isArray(initialPerimeter)
    ? initialPerimeter.map((p) => p.split("_")[1])
    : [];

  let [selectedPerimeter, setSelectedPerimeter] = useState(
    initialPerimeterType
  );
  let [selectedYear, setSelectedYear] = useState(initialYear);
  let [selectedMonths, setSelectedMonths] = useState(initialMonths);

  const onNext = () => {
    if (selectedPerimeter === "year_month") {
      const year = `${selectedYear}`;
      const monthStrings =
        selectedMonths.length === 0
          ? range(1, 12).map((m) => `${year}_${m}`)
          : selectedMonths.map((m) => `${year}_${m}`);
      onTimePerimeter(monthStrings);
    } else if (selectedPerimeter === "all") {
      onTimePerimeter("all");
    } else if (selectedPerimeter === "none") {
      onTimePerimeter([]);
    }
  };

  const defaultMonthCheckboxes = availableMonths.map(
    ({ id, name }) =>
      new CheckBox(
        id,
        name,
        () => {
          const checkedMonths = checkboxes
            .filter((c) => c.value)
            .map((c) => c.name);
          setSelectedMonths(checkedMonths);

          noneCheck.value = checkedMonths.length === 0;
          allCheck.value = checkedMonths.length === 12;
        },
        selectedMonths.includes(id)
      )
  );
  let [checkboxes] = useState(defaultMonthCheckboxes);

  let [allCheck] = useState(
    new CheckBox("all", "Select all", () => {
      checkboxes.map((c) => {
        c.value = true;
        return c;
      });
      allCheck.value = true;
      noneCheck.value = false;
      setSelectedMonths(availableMonths.map(({ id }) => id));
    })
  );

  let [noneCheck] = useState(
    new CheckBox("none", "Deselect all", () => {
      checkboxes.map((c) => {
        c.value = false;
        return c;
      });
      noneCheck.value = true;
      allCheck.value = false;
      setSelectedMonths([]);
    })
  );
  return (
    <>
      <ContentCell>
        <h2>Select time perimeter</h2>

        <fieldset disabled={selectedPerimeter !== "year_month"}>
          <legend>
            <input
              type="radio"
              id="year_month_perimeter_type"
              name="time_perimeter_type"
              value="year_month"
              checked={selectedPerimeter == "year_month"}
              onChange={(event) => setSelectedPerimeter(event.target.value)}
            />
            <label htmlFor="year_month_perimeter_type">
              Use a specific time perimeter (Recommended)
            </label>
          </legend>

          <div>
            <label>Please choose a year :</label>
            <select
              onChange={(event) =>
                setSelectedYear(parseInt(event.target.value, 10))
              }
            >
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <fieldset>
            <legend>Months</legend>
            <Grid>
              <Cell width={4}>
                {checkboxes.slice(0, 5).map((checkbox) => checkbox.render())}
              </Cell>
              <Cell width={4}>
                {checkboxes.slice(5, 10).map((checkbox) => checkbox.render())}
              </Cell>
              <Cell width={4}>
                {checkboxes.slice(10, 12).map((checkbox) => checkbox.render())}
                <br />
                {allCheck.render()}
                {noneCheck.render()}
              </Cell>
            </Grid>
          </fieldset>
        </fieldset>

        <input
          type="radio"
          id="all_perimeter_type"
          name="time_perimeter_type"
          value="all"
          checked={selectedPerimeter === "all"}
          onChange={(event) => setSelectedPerimeter(event.target.value)}
        />
        <label htmlFor="all_perimeter_type">
          Launch on all available year and months (Slow)
        </label>

        <input
          type="radio"
          id="none_perimeter_type"
          name="time_perimeter_type"
          value="none"
          checked={selectedPerimeter === "none"}
          onChange={(event) => setSelectedPerimeter(event.target.value)}
        />
        <label htmlFor="none_perimeter_type">
          Only compute the referential (Fast)
        </label>
      </ContentCell>
      <ButtonCell>
        <button onClick={onBack}>&lt; Back</button>
        <button onClick={onNext}>Next &gt;</button>
        &nbsp;
        <button onClick={cancel} style={{ marginLeft: "1em" }}>
          Cancel
        </button>
      </ButtonCell>
    </>
  );
};

export { StepDate };
