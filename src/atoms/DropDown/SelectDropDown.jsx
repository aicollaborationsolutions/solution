import React from "react";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import "./DropDown.css";
/**
 * @author
 * @function SelectDropDown
 **/
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SelectDropDown = ({ data, classname, name, label, handleInputChange, optional, defaultSelectValue }) => {
  const _label = label ? true : false;
  const _optional = optional || "";
  return (
    <>
      <FormControl sx={{ m: 1, width: 300 }}>
        {_label && <InputLabel id="demo-multiple-name-label" className="inputFieldOrgDetailLabel">{label}</InputLabel>}

        <Select
          className={` SelectDropDown ${classname}`}
          value={defaultSelectValue}
          onChange={(e) => handleInputChange(e.target.value, name, _optional)}
          labelId="demo-multiple-name-label"
          MenuProps={MenuProps}
        >
          {data.map((item, index) => (
            <MenuItem
              key={index}
              value={item.value}
            >
              {item.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectDropDown;










// import React from "react";
// import { Form } from "react-bootstrap";
// import "./DropDown.css";
// /**
//  * @author
//  * @function SelectDropDown
//  **/

// const SelectDropDown = ({ data, classname, label }) => {
//   const onChangefn = (value) => {
//     var a = JSON.parse(value);
//     console.log(value);
//   };
//   const _label = label ? true : false;

//   return (
//     <>
//       {_label && <div className="inputFieldOrgDetailLabel">{label}</div>}
//       <Form.Control
//         className={` SelectDropDown ${classname}`}
//         as="select"
//         custom
//         onChange={(event) => onChangefn(event.target.value)}
//       >
//         {data.map((item, index) => (
//           <option key={index} value={JSON.stringify(item)}>
//             {item.label}
//           </option>
//         ))}
//       </Form.Control>
//     </>
//   );
// };

// export default SelectDropDown;