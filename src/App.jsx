import { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Stack,
  Divider,
  Skeleton,
  Paper,
  Fab,
  Tooltip,
} from '@mui/material';
import './App.css';
import { styled } from '@mui/material/styles';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Zoom from '@mui/material/Zoom';
import Items from './Items';
const fabStyle = {
  position: 'fixed',
  bottom: 16,
  right: 16,
};
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  width: '100%',
}));

function App() {
  const [topics, setTopics] = useState([]);
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true);
  const fetchingArr = () => {
    let temp = [];
    for (let i = 0; i < 30; i++) {
      temp.push(i);
    }
    return temp;
  };
  useEffect(() => {
    fetch(
      'https://cors-anywhere.herokuapp.com/https://forum.freecodecamp.org/latest.json'
    )
      .then((data) => data.json())
      .then((res) => {
        setTopics(res.topic_list.topics);
        setUsers(res.users);
        setLoading(false);
      });
  }, []);
  return (
    <div className="App">
      <Box sx={{ borderBottom: 2, borderColor: '#9e9e9e' }}>
        <Typography variant="h4">Recent posts</Typography>
      </Box>
      <Box sx={{ width: '100vw', marginTop: '20px' }}>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={1}
          divider={<Divider orientation="horizontal" flexItem />}
        >
          {loading
            ? fetchingArr().map((_v, i) => (
                <Skeleton
                sx={{marginLeft:2}}
                  key={i}
                  animation="wave"
                  variant="text"
                  width={'100vw'}
                  height={'127px'}
                />
              ))
            : topics.map((v, i) => (
                <Items users={users} props={v} key={i}>
                  <Skeleton></Skeleton>
                </Items>
              ))}
        </Stack>
      </Box>
      {loading ? (
        ''
      ) : (
        <Tooltip TransitionComponent={Zoom} title="Scroll to top">
          <Fab
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            sx={fabStyle}
            color="primary"
            aria-label="scrollToTop"
          >
            <ArrowUpwardIcon />
          </Fab>
        </Tooltip>
      )}
    </div>
  );
}

export default App;
