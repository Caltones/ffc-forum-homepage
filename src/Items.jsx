import { Typography, Paper, Avatar, Stack, Chip, Link } from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import ArchiveIcon from '@mui/icons-material/Archive';
import CloseIcon from '@mui/icons-material/Close';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import ReplyIcon from '@mui/icons-material/Reply';
import { styled } from '@mui/material/styles';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  width: '100vw',
  paddingLeft: theme.spacing(2),
  marginBottom: theme.spacing(1),
}));

export default function Items({ props, users }) {
  const dateConverter = (str) => {
    return new Date(str).toDateString();
  };
  const userId = props.posters[0].user_id;
  const userPf = users.filter((v) => v.id === userId)[0];
  const userName = userPf.username;
  const sizeReplace = (str) => {
    str = str.replace('{size}', '120');
    if (str.includes('https://')) return str;
    return 'https://sea1.discourse-cdn.com/freecodecamp' + str;
  };

  return (
    <>
      <Item>
        {props.pinned ? (
          <Typography color={'#ffa000'} variant="caption">
            <PushPinIcon/>Pinned
          </Typography>
        ) : (
          ''
        )}
        {props.archived ? (
          <Typography color={'#26c6da'} variant="caption">
            <ArchiveIcon></ArchiveIcon>Archived
          </Typography>
        ) : (
          ''
        )}
        {props.closed ? (
          <Typography color={'#ef5350'} variant="caption">
            <CloseIcon></CloseIcon>Closed
          </Typography>
        ) : (
          ''
        )}
        <Typography variant="overline" color={'#9e9e9e'}>
          {' ' + dateConverter(props.bumped_at)}
        </Typography>
        <Typography variant="overline" display="block">
          <Stack direction="row" sx={{ gap: 1 }}>
            <Avatar
              alt={userName}
              sx={{ width: 24, height: 24 }}
              src={sizeReplace(userPf.avatar_template)}
            />
            {userName}
            {userPf?.admin ? (
              <Chip
                color="primary"
                size="small"
                sx={{ overflow: 'hidden' }}
                icon={<AdminPanelSettingsIcon></AdminPanelSettingsIcon>}
                label="Admin"
                variant="outlined"
              />
            ) : (
              ''
            )}
            {userPf?.moderator ? (
              <Chip
                color="success"
                size="small"
                sx={{ overflow: 'hidden' }}
                icon={<AddModeratorIcon></AddModeratorIcon>}
                label="Moderator"
                variant="outlined"
              />
            ) : (
              ''
            )}
          </Stack>
        </Typography>
        <Link
          href={`https://forum.freecodecamp.org/t/${props.slug}/${props.id}`}
          variant="subtitle1"
          target='_blank'
        >
          {props.title}
        </Link>
        <Typography variant="subtitle2" color={'#9e9e9e'}>
          <ReviewsIcon></ReviewsIcon> Views: {props.views} <ThumbUpAltIcon />
          Likes:{props.like_count} <ReplyIcon></ReplyIcon> Replies:{' '}
          {props.reply_count}
        </Typography>
        {props.featured_link ? <Typography>Link:</Typography> : ''}
      </Item>
    </>
  );
}
