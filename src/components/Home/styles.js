import { makeStyles } from '@material-ui/core/styles';

const useStyles= makeStyles(() => ({
  appBar: {
    borderRadius: 4,
    marginBottom: '5rem',
    display: 'flex',
    padding: '16px'
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
  },
  image: {
    marginLeft: '15px',
  },
}));

export {useStyles};