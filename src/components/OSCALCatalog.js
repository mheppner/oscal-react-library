import React from "react";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import { useLoaderStyles } from "./OSCALLoaderStyles";
import OSCALMetadata from "./OSCALMetadata";
import OSCALCatalogGroup from "./OSCALCatalogGroup";
import OSCALBackMatter from "./OSCALBackMatter";

export default function OSCALCatalog(props) {
  const classes = useLoaderStyles();
  props.onResolutionComplete();

  const partialRestData = {
    catalog: {
      uuid: props.catalog.uuid,
    },
  };

  return (
    <div className={classes.paper}>
      <OSCALMetadata
        metadata={props.catalog.metadata}
        isEditable={props.isEditable}
        onFieldSave={props.onFieldSave}
        partialRestData={partialRestData}
      />
      <List
        subheader={
          <ListSubheader
            component="div"
            disableSticky
            id="nested-list-subheader"
          >
            Control Groups
          </ListSubheader>
        }
      >
        {props.catalog.groups.map((group) => (
          <OSCALCatalogGroup group={group} key={group.id} />
        ))}
      </List>
      <OSCALBackMatter
        backMatter={props.catalog["back-matter"]}
        parentUrl={props.parentUrl}
      />
    </div>
  );
}
