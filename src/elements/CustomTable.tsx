import React from "react";
import { TWHyperLink } from "./TWButton";

type fieldProps = {
  title: string;
  fld: string;
  hl?: boolean;
  fn?: (val: any) => any;
  className?: string;
};

type CustomTableProps = {
  data: any;
  fields: fieldProps[];
  indexField: fieldProps;
  linkPrefix?: string;
};

const HeaderCell = ({ children }: any) => (
  <th className="  top-0 min-w-28 text-sm font-semibold text-gray-700 bg-gray-100 p-0">
    <div className="p-2 border-b border-gray-300">{children}</div>
  </th>
);

export const HyperLinkCell = ({ value = "", linkPrefix = "", linkText = "", linkFieldValue = "" }) => (
  <td className="p-2 font-sans text-sm font-semibold text-blue-700">
    <TWHyperLink color="teal" className="pt-1" href={`${linkPrefix}${linkFieldValue || value}`} target="_blank">
      {linkText || value}
    </TWHyperLink>
  </td>
);

export const DataCell: React.FC<{ children: any; className?: string }> = ({ children, className = "" }) => (
  <td className={`p-2 font-sans text-sm font-semibold text-blue-700 ${className}`}>{children}</td>
);
export const CustomTable: React.FC<CustomTableProps> = ({ data, fields = [], indexField, linkPrefix = "" }) => {
  return (
    <div className="overflow-y-auto scrollbar-w-2 scrollbar-track-gray-lighter scrollbar-thumb-rounded scrollbar-thumb-gray scrolling-touch">
      <table className="w-full text-left table-collapse">
        <thead>
          <tr>
            {fields.map((field) => (
              <HeaderCell key={field.fld}>{field.title}</HeaderCell>
            ))}
          </tr>
        </thead>
        <tbody className="align-baseline">
          {!data || data.length === 0 ? (
            <tr>
              <DataCell>No data..</DataCell>
            </tr>
          ) : (
            data?.map((item: any) => (
              <tr key={item[indexField.fld]}>
                {fields.map((field, index) => {
                  const linkFieldValue = indexField?.fld ? item[indexField.fld] : field.fn ? field.fn(item[field.fld]) : item[field.fld];
                  if (field.hl) {
                    return (
                      <HyperLinkCell
                        key={index}
                        linkPrefix={linkPrefix}
                        linkFieldValue={linkFieldValue}
                        value={field.fn ? field.fn(item[field.fld]) : item[field.fld]}
                      />
                    );
                  } else {
                    return (
                      <DataCell className={field.className || ""} key={`${index}}`}>
                        {field.fn ? field.fn(item[field.fld]) : item[field.fld]}
                      </DataCell>
                    );
                  }
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
