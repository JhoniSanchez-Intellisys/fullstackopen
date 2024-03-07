export const StatisticsLine = ({ value, text, simbol }) => {
    return (
      <>
        <tbody>
          <tr>
            <td>{text}:</td>
            <td>
              {value} {simbol}
            </td>
          </tr>
        </tbody>
      </>
    );
  };
  