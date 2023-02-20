import { makeStyles } from '@material-ui/core/styles';

const useStyles= makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
}))

export {useStyles};