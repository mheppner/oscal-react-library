import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import GroupIcon from '@material-ui/icons/Group';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	OSCALMetadataAdditional: {
		  padding: theme.spacing(1)
	},
	OSCALMetadataLabel: {
		'text-align': 'right',
		'color': '#0000008a'
	},
	OSCALMetadataParties: {
		backgroundColor: theme.palette.background.paper,
		position: 'relative',
	    overflow: 'auto',
		maxHeight: '12em'
	},
	OSCALMetadataPartiesHeader: {
		backgroundColor: theme.palette.background.paper
	}
	}));

export default function OSCALCatalogGroupControlGuidance(props) {
	const classes = useStyles();
	
	const getRoleLabel = (roleId) => {
		if (!props.metadata.roles) { return null; }
		var role;
		for (role of props.metadata.roles) {
			if (role.id === roleId) {
				return role.title;
			}
		}
		return null;
	}
	
	const getPartyRolesText = (party) => {
		if (!props.metadata.['responsible-parties']) { return null; }
		var partyRolesText = '';
		var delimiter = ', ';
		var responsibleParty;
		for (responsibleParty in props.metadata.['responsible-parties']) {
			var responsiblePartyUuids = props.metadata.['responsible-parties'][responsibleParty]['party-uuids'];
			if (responsiblePartyUuids && responsiblePartyUuids.includes(party.uuid)) {
				var roleLabel = getRoleLabel(responsibleParty);
				if (roleLabel) { partyRolesText += roleLabel + delimiter; }
			}
		}
		if (partyRolesText.endsWith(delimiter)) { 
			partyRolesText = partyRolesText.substring(0, partyRolesText.length - delimiter.length);
		}
		return partyRolesText;
	};
	
	return (
		<Grid container spacing={3}>
        	<Grid item xs={12}>
	        	<Typography variant="h6">
		        	{props.metadata.title}
		        </Typography>
        	</Grid>
        	<Grid item xs={8}>
        		<Paper className={classes.OSCALMetadataParties}>
		        	<List
		        		subheader={
			    	        <ListSubheader className={classes.OSCALMetadataPartiesHeader} component="div" id="oscal-metadata-parties">
			    	          Parties
			    	        </ListSubheader>
			    	      }
		        	>
		        		{props.metadata.parties.map(party => (
		        			<ListItem>
			        			<ListItemAvatar>
			                        <Avatar>
			                          {party.type === "organization" ? <GroupIcon /> : null}
			                        </Avatar>
			                    </ListItemAvatar>
		        				<ListItemText primary={party.name} secondary={getPartyRolesText(party)}/>
					        </ListItem>
				         ))}
		        	</List>
		        </Paper>
        	</Grid>
        	<Grid item xs={4}>
        		<Paper className={classes.OSCALMetadataAdditional}>
        			<Grid container spacing={1}>
	        			<Grid item xs={4}>
				        	<Typography variant="body2" className={classes.OSCALMetadataLabel}>
					          	Version:
					        </Typography>
					     </Grid>
        				<Grid item xs={8}>
				        	<Typography variant="body2">
					          	{props.metadata.version}
					        </Typography>
					     </Grid>
					     <Grid item xs={4}>
				        	<Typography variant="body2" className={classes.OSCALMetadataLabel}>
					          	Last Modified:
					        </Typography>
					     </Grid>
					     <Grid item xs={8}>
						     <Typography variant="body2">
					          	{props.metadata.['last-modified']}
					        </Typography>
					     </Grid>
					     <Grid item xs={4}>
				        	<Typography variant="body2" className={classes.OSCALMetadataLabel}>
					          	OSCAL Version:
					        </Typography>
					     </Grid>
					     <Grid item xs={8}>
						     <Typography variant="body2">
					          	{props.metadata.['oscal-version']}
					        </Typography>
					     </Grid>
					  </Grid>
				 </Paper>
			</Grid>
        </Grid>
	);
	
}