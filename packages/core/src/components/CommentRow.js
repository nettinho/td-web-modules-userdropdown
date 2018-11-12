import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Comment } from "semantic-ui-react";
import Moment from "react-moment";

const retrieveUserName = ({ user_name, full_name }) =>
  full_name ? full_name : user_name;

const avatarStyle = {
  borderRadius: "50%",
  width: "35px",
  height: "35px",
  backgroundColor: "lightBlue",
  color: "white",
  float: "left",
  textAlign: "center",
  lineHeight: "35px",
  textTransform: "uppercase"
};

const avatarSeparatorStyle = {
  height: `calc(100% - 40px)`,
  backgroundColor: "lightGrey",
  marginLeft: "15px",
  marginTop: "5px",
  width: "5px",
  position: "absolute"
};

const colors = [
  "#375E97",
  "#FB6542",
  "#FFBB00",
  "#3F681C",
  "#4CB5F5",
  "#CB0000",
  "#626D71",
  "#258039",
  "#4C3F54",
  "#A10115",
  "#F78B2D",
  "#556DAC"
];

const getHashString = str => {
  return str.split("").reduce(function(a, b) {
    a = a + b.charCodeAt(0);
    return a;
  }, 0);
};

const getColor = user =>
  typeof user === "string"
    ? colors[getHashString(user) % colors.length]
    : _.sample(colors);

const UserAvatar = ({ userName }) => (
  <React.Fragment>
    <div
      className="avatar"
      style={{ ...avatarStyle, backgroundColor: getColor(userName) }}
    >
      {userName[0]}
      <div className="avatar-separator" style={avatarSeparatorStyle} />
    </div>
  </React.Fragment>
);

UserAvatar.propTypes = {
  userName: PropTypes.string
};

export const CommentRow = ({ user, content, created_at }, i) => (
  <Comment key={i}>
    <UserAvatar userName={user.user_name} />
    <Comment.Content>
      <Comment.Author as="a">{retrieveUserName(user)}</Comment.Author>
      <Comment.Metadata>
        <Moment locale="es" fromNow date={created_at} />
      </Comment.Metadata>
      <Comment.Text>{content}</Comment.Text>
    </Comment.Content>
  </Comment>
);

CommentRow.propTypes = {
  user: PropTypes.object,
  content: PropTypes.string,
  created_at: PropTypes.string
};

export default CommentRow;
