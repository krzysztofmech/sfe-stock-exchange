import React, { useEffect, useState } from "react";
import { CompanyInterface } from "../interfaces/company";

interface SelectProps {
  name: string;
  data: CompanyInterface[];
  handleChange: any;
}

export const Select: React.FC<SelectProps> = ({ name, data, handleChange }) => {
  return (
    <select name={name} onChange={handleChange}>
      {data.map(({ id, dataset_code }) => (
        <option key={id} value={dataset_code}>
          {dataset_code}
        </option>
      ))}
    </select>
  );
};
