import { React, useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import BasicModal from "../../components/Modal/Modal";
import AddItems from "../../components/AddItems/AddItems";
import UseSearch from "../../components/UseSearch/UseSearch";

export default function DeviceList() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedObjects, setSelectedObjects] = useState([]);

  console.log(selectedObjects);

  const handleSelectionChange = (event, value) => {
    setSelectedObjects(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://gps.autotracker.group/api/devices";
      const myToken =
        "RzBFAiEA92qN8JvTQ6BIgvjSTke8iQltj3SJf9vhkqyf5zcuUL4CIF1GRd1vLuSJrzzDqv80AF_BAiF91tCWPMvlhuRNrI0DeyJ1IjozLCJlIjoiMjAyMy0xMi0zMVQyMTowMDowMC4wMDArMDA6MDAifQ";

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${myToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Ошибка запроса");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <BasicModal error={error} />;
  }

  if (!data) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <UseSearch data={data} onChange={handleSelectionChange} />
        <AddItems />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">UniqueId</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">LastUpdate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedObjects.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.uniqueId}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.lastUpdate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
