import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function StoresMenu({ onShowReviewsClick, onWriteReviewClick }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const showReviewsClick = () => {
    handleClose();
    onShowReviewsClick();
  };

  const writeReviewClick = () => {
    handleClose();
    onWriteReviewClick();
  };

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={showReviewsClick}>Show Reviews</MenuItem>
        <MenuItem onClick={writeReviewClick}>Write Review</MenuItem>
      </Menu>
    </div>
  );
}
