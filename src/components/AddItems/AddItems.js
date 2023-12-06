import { React, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const handleOpen = () => {
    setOpen(true);
    postData({ user: 1 });
  };
  const handleClose = () => setOpen(false);

  const postData = async (requestData) => {
    const url = "https://gps.autotracker.group/api/devices";
    const myToken = "asfda";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${myToken}`,
          Accept: "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(
          `Ошибка запроса: ${response.statusText} (${response.status})`
        );
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    }
    console.log(data);
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined" sx={{ float: "right" }}>
        Add Items
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {error}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
