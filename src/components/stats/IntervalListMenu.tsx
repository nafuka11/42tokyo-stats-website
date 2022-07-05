import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { Dispatch, MouseEvent, SetStateAction, useState } from "react";

type Props = {
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  intervalOptions: string[];
};

const IntervalListMenu = (props: Props) => {
  const { selectedIndex, setSelectedIndex, intervalOptions } = props;
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);

  const open = !!anchorElement;

  const handleClickListItem = (event: MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };
  const handleMenuItemClick = (
    event: MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    setAnchorElement(null);
  };
  const handleClose = () => {
    setAnchorElement(null);
  };

  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <Typography variant="body2">表示期間：</Typography>
      <List dense>
        <ListItem
          button
          onClick={handleClickListItem}
          sx={{ borderBottom: 1, borderColor: "grey.500", pl: 1.5, pr: 0.5 }}
        >
          <ListItemText
            primary={
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Typography sx={{ display: "inline" }} variant="body2">
                  {intervalOptions[selectedIndex]}
                </Typography>
                <ArrowDropDownIcon sx={{ fontSize: 16 }} />
              </Stack>
            }
          />
        </ListItem>
      </List>
      <Menu anchorEl={anchorElement} open={open} onClose={handleClose}>
        {intervalOptions.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  );
};

export default IntervalListMenu;
