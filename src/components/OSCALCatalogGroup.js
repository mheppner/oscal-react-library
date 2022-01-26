import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import FolderIcon from "@material-ui/icons/Folder";
import { makeStyles } from "@material-ui/core/styles";
import OSCALControl from "./OSCALControl";

const useStyles = makeStyles(() => ({
  OSCALControlList: {
    "padding-left": "2em",
    "padding-right": "2em",
  },
}));

export default function OSCALCatalogGroup(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  // Groups may not necessarily have an ID (it is not required per the spec);
  // therefore, we need to be able to come up with a semi-constant ID. All
  // groups will have a title. We can (poorly) hash that hopefully that will
  // be good enough.
  const groupKey = (group) => {
    if (group.id) {
      return group.id;
    }
    let hash = 7;
    // eslint-disable-next-line no-restricted-syntax
    for (const char of group.title) {
      hash = 31 * hash + char.charCodeAt(0);
    }
    return hash;
  };

  const renderGroup = (group, level) => (
    <>
      <ListItem key={groupKey(group)} button onClick={handleClick}>
        <ListItemAvatar key={`${groupKey(group)}-avatar`}>
          <Avatar variant="rounded">
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={group.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List className={classes.OSCALControlList}>
          {group.groups?.map((innerGroup) =>
            renderGroup(innerGroup, level + 1)
          )}
          {group.controls?.map((control) => (
            <OSCALControl
              control={control}
              childLevel={level}
              key={`control-${control.id}`}
            />
          ))}
        </List>
      </Collapse>
    </>
  );

  return renderGroup(props.group, 0);
}
