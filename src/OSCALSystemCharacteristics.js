import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column'
  },
  OSCALSystemCharacteristicsInfo: {
	  'text-transform': 'capitalize',
	  '& .MuiTextField-root': {
	      margin: theme.spacing(1)
	   }
  },
  // TODO - This is hacky
  OSCALSystemCharacteristicsHeader: {
	  '& .MuiTypography-root': {
		  'font-size': '0.875rem',
		  color: '#0000008a'
	  }
  },
  OSCALSystemCharacteristicsStatus: {
	  'text-transform': 'capitalize'
  }
}));

export default function OSCALSystemCharacteristics(props) {
	const classes = useStyles();
	
	  return (
	    <div className={classes.paper}>
	    	<Card>
	    		<CardContent>
	    		<Grid container spacing={2}>
		    		<Grid item xs={12} className={classes.OSCALSystemCharacteristicsHeader}>
			        	<Typography>
			        		System Characteristics
				        </Typography>
		        	</Grid>
		    		<Grid item xs={7} className={classes.OSCALSystemCharacteristicsInfo}>
			        	<Typography variant="h6">
			        		{props.systemCharacteristics.['system-name']}
				        </Typography>
		        	</Grid>
		        	<Grid item xs={3} className={classes.OSCALSystemCharacteristicsInfo}>
			        	<TableContainer>
				            <Table size="small">
				              <TableBody>
				                {props.systemCharacteristics.annotations.map((annotation) => (
				                  <TableRow key={annotation.name}>
				                    <TableCell component="th" scope="row">
				                      {annotation.name}
				                    </TableCell>
				                    <TableCell align="right">{annotation.value}</TableCell>
				                  </TableRow>
				                ))}
				              </TableBody>
				            </Table>
				          </TableContainer>
				    </Grid>
		        	<Grid item xs={2} className={classes.OSCALSystemCharacteristicsInfo}>
			        	<Tooltip title={props.systemCharacteristics.status.remarks}>
				        	<TextField
				                disabled
				                id="system-characteristics-status"
				                label="status"
				                defaultValue={props.systemCharacteristics.status.state}
				                variant="outlined"
				                margin="dense"
				                fullWidth
				              />
			            </Tooltip>
	                </Grid>
	                <Grid item xs={4} className={classes.OSCALSystemCharacteristicsInfo}>
		                <TextField
			                disabled
			                id="authorization-boundary"
			                label="authorization-boundary-description"
			                defaultValue={props.systemCharacteristics.['authorization-boundary'].description}
			                variant="outlined"
			                margin="dense"
			                fullWidth
			                multiline
			              />
	                </Grid>
		        	<Grid item xs={2} className={classes.OSCALSystemCharacteristicsInfo}>
		        		<TextField
			                disabled
			                id="security-sensitivity-level"
			                label="sensitivity-level"
			                defaultValue={props.systemCharacteristics.['security-sensitivity-level']}
			                variant="outlined"
			                margin="dense"
			                fullWidth
			              />
	                </Grid>
		        	<Grid item xs={2} className={classes.OSCALSystemCharacteristicsInfo}>
			            <TextField
			                disabled
			                id="security-objective-confidentiality"
			                label="confidentiality"
			                defaultValue={props.systemCharacteristics.['security-impact-level'].['security-objective-confidentiality']}
			                variant="outlined"
			                margin="dense"
			                fullWidth
			              />
	                </Grid>
		        	<Grid item xs={2} className={classes.OSCALSystemCharacteristicsInfo}>
			              <TextField
			                disabled
			                id="security-objective-integrity"
			                label="integrity"
			                defaultValue={props.systemCharacteristics.['security-impact-level'].['security-objective-integrity']}
			                variant="outlined"
			                margin="dense"
			                fullWidth
			              />
	                </Grid>
		        	<Grid item xs={2} className={classes.OSCALSystemCharacteristicsInfo}>
			              <TextField
			                disabled
			                id="security-objective-availability"
			                label="availability"
			                defaultValue={props.systemCharacteristics.['security-impact-level'].['security-objective-availability']}
			                variant="outlined"
			                margin="dense"
			                fullWidth
			              />
		        	</Grid>
		        	<Grid item xs={12}>
			            <TableContainer>
				            <Table aria-label="System Information">
				              <TableHead>
				                <TableRow>
				                  <TableCell>System Information</TableCell>
				                  <TableCell>Categorizations</TableCell>
				                  <TableCell>Confidentiality</TableCell>
				                  <TableCell>Integrity</TableCell>
				                  <TableCell>Availability</TableCell>
				                </TableRow>
				              </TableHead>
				              <TableBody>
				                {props.systemCharacteristics.['system-information'].['information-types'].map((informationType) => (
				                  <TableRow key={informationType.uuid}>
				                    <TableCell component="th" scope="row">
				                    	<Tooltip title={informationType.description}>
				                    		<Typography variant="body2">{informationType.title}</Typography>
				                    	</Tooltip>
				                    </TableCell>
				                    <TableCell>
				                    	{informationType.categorizations.map((categorization) => (
				                    		categorization.['information-type-ids'].map((infoId) => (
			                    				<Chip label={infoId} component="a" href={categorization.system} clickable variant="outlined" />
				                    		))
				                    	))}
				                    </TableCell>
				                    <TableCell>{informationType.['confidentiality-impact'] && informationType.['confidentiality-impact'].base}</TableCell>
				                    <TableCell>{informationType.['integrity-impact'] && informationType.['integrity-impact'].base}</TableCell>
				                    <TableCell>{informationType.['availability-impact'] && informationType.['availability-impact'].base}</TableCell>
				                  </TableRow>
				                ))}
				              </TableBody>
				            </Table>
				          </TableContainer>
		        	</Grid>
	    		</Grid>
		    	</CardContent>
		    </Card>
	    </div>
	  );
	}