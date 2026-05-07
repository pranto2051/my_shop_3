import React from 'react';
import styles from './SectionTable.module.css';

const SectionTable = ({ blocks }) => {
  if (!blocks) return null;

  const headers = blocks.filter(b => b.block_type === 'table_header');
  const rows = blocks.filter(b => b.block_type === 'table_row');

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        {headers.length > 0 && (
          <thead>
            <tr>
              {headers.map((header) => (
                <React.Fragment key={header.id}>
                  {header.col_1 && <th>{header.col_1}</th>}
                  {header.col_2 && <th>{header.col_2}</th>}
                  {header.col_3 && <th>{header.col_3}</th>}
                  {header.col_4 && <th>{header.col_4}</th>}
                </React.Fragment>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {row.col_1 && <td>{row.col_1}</td>}
              {row.col_2 && <td>{row.col_2}</td>}
              {row.col_3 && <td>{row.col_3}</td>}
              {row.col_4 && <td>{row.col_4}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SectionTable;
