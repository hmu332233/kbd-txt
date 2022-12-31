import React from 'react';
import styles from './styles.module.css';

type Props = {
  rows: Array<{ code: string; display: string }>;
};

function CodeTable({ rows }: Props) {
  return (
    <table className={styles.table}>
      <tr>
        <th>Modifier</th>
        <th>Display</th>
      </tr>
      {rows.map((row) => (
        <tr>
          <td>{row.code}</td>
          <td>
            <span className="badge badge--secondary">{row.display}</span>
          </td>
        </tr>
      ))}
    </table>
  );
}

export default CodeTable;
