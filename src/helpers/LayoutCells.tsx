import { Cell } from "styled-css-grid";

const ContentCell: React.FC = ({children}) => 
  <Cell width={8} height={2}>{children}</Cell>

const ButtonCell: React.FC = ({children}) => (
    <Cell
            height={1}
            top={4}
            left={5}
            width={8}
            style={{ textAlign: "right" }}
          >{children}
    </Cell>
)

export {ContentCell, ButtonCell}