import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { Button, Label, Icon } from "semantic-ui-react";

const LikeButton = ({ user, post: { id, likeCount, Likes } }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && Likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, Likes]);

  //   console.log(Likes);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <Button
      as="div"
      labelPosition="right"
      onClick={user ? likePost : undefined}
    >
      {likeButton}
      <Label basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
};

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      Likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
