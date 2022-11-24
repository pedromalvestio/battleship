import { Select, SelectShipContainer } from "./styles";

const SelectShip = ({index, options, onChange}) => {
    return ( 
        <SelectShipContainer>
            <Select 
                value={index}
                onChange={e => onChange(e.target.value)}
            >
                {Object.keys(options).map(b =>
                    <option key={b} value={b}>{options[b].name}</option>
                )}
            </Select>
        </SelectShipContainer>
    );
}
 
export default SelectShip;