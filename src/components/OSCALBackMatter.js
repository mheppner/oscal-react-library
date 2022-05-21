import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import DescriptionIcon from "@mui/icons-material/Description";
import StyledTooltip from "./OSCALStyledTooltip";
import { getAbsoluteUrl } from "./oscal-utils/OSCALLinkUtils";
import { OSCALSection, OSCALSectionHeader } from "../styles/CommonPageStyles";

export const OSCALBackMatterCard = styled(Card)(
  ({ theme }) => `
    margin-top: ${theme.spacing(2)};
    display: flex;
    flex-direction: column;
`
);

// TODO: Temporary fix for missing media type (https://github.com/GSA/fedramp-automation/issues/103)
// Uses file extension instead
const getURLMediaType = (url) => {
  const lastUrlPath = url.split("//").pop().split("/").pop();
  return lastUrlPath.match(/\.[A-Za-z]{3,4}($|\?)/) || "Unknown";
};

function TitleDisplay(props) {
  const title = props.resource.title || "No Title";
  const color = props.resource.title ? "initial" : "error";
  return (
    <Typography color={color} variant="subtitle1">
      {title}
    </Typography>
  );
}

function DescriptionDisplay(props) {
  if (!props.resource?.description) {
    return (
      <DescriptionIcon
        color="disabled"
        fontSize="small"
        titleAccess={`${props.resource.title}-description`}
      />
    );
  }
  return (
    <StyledTooltip title={props.resource.description}>
      <DescriptionIcon
        color="primary"
        fontSize="small"
        titleAccess={`${props.resource.title}-description`}
      />
    </StyledTooltip>
  );
}

function CitationDisplay(props) {
  if (!props.resource?.citation?.text) {
    return (
      <FormatQuoteIcon
        color="disabled"
        fontSize="small"
        titleAccess={`${props.resource.title}-citation`}
      />
    );
  }
  return (
    <StyledTooltip title={props.resource.citation.text}>
      <FormatQuoteIcon
        color="primary"
        fontSize="small"
        titleAccess={`${props.resource.title}-citation`}
      />
    </StyledTooltip>
  );
}

export default function OSCALBackMatter(props) {
  if (!props.backMatter) {
    return null;
  }

  const getMediaType = (rlink) =>
    rlink["media-type"] ||
    getURLMediaType(getAbsoluteUrl(rlink.href, props.parentUrl));

  const backMatterDisplay = (resource) => (
    <Grid item xs={3} key={resource.uuid}>
      <OSCALBackMatterCard>
        <CardContent>
          <Grid container spacing={0}>
            <Grid item xs={10}>
              <TitleDisplay resource={resource} />
            </Grid>
            <Grid item xs={2}>
              <Grid container spacing={0} justifyContent="flex-end">
                <DescriptionDisplay resource={resource} />
                <CitationDisplay resource={resource} />
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <Typography>
              {resource.rlinks &&
                resource.rlinks.map((rlink) => (
                  <Chip
                    key={rlink.href}
                    label={getMediaType(rlink)}
                    component="a"
                    href={getAbsoluteUrl(rlink.href, props.parentUrl)}
                    variant="outlined"
                    clickable
                  />
                ))}
            </Typography>
          </Grid>
        </CardContent>
      </OSCALBackMatterCard>
    </Grid>
  );

  return (
    <OSCALSection>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <OSCALSectionHeader>Back Matter</OSCALSectionHeader>
            </Grid>
            <Grid item xs={7}>
              <Typography variant="body1">Resources</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {props.backMatter.resources.map((resource) =>
              backMatterDisplay(resource)
            )}
          </Grid>
        </CardContent>
      </Card>
    </OSCALSection>
  );
}
