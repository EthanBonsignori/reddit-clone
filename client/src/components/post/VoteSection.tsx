import { ApolloCache } from '@apollo/client';
import {
  Flex,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import gql from 'graphql-tag';
import { MouseEvent } from 'react';
import { ImArrowDown, ImArrowUp } from 'react-icons/im';
import {
  RegularPostFragment,
  useVoteMutation,
  VoteMutation,
} from '../../generated/graphql';

interface VoteSectionProps {
  post: RegularPostFragment;
}

const updateAfterVote = (
  value: number,
  postId: number,
  cache: ApolloCache<VoteMutation>,
) => {
  const data = cache.readFragment<{
    id: number;
    points: number;
    voteStatus: number | null;
  }>({
    id: `Post:${postId}`,
    fragment: gql`
      fragment __ on Post {
        id
        points
        voteStatus
      }
    `,
  });

  if (data) {
    if (data.voteStatus === value) {
      return;
    }
    const newPoints =
      (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
    cache.writeFragment({
      id: `Post:${postId}`,
      fragment: gql`
        fragment _ on Post {
          points
          voteStatus
        }
      `,
      data: { id: postId, points: newPoints, voteStatus: value },
    });
  }
};

const VoteSection: React.FC<VoteSectionProps> = ({ post }) => {
  const bg = useColorModeValue('#F8F9FA', '');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const iconBg = useColorModeValue(
    'rgba(26, 26, 27, 0.1)',
    'rgba(215, 218, 220, 0.1)',
  );
  const [vote] = useVoteMutation();

  const handleVote = (event: MouseEvent, value: number) => {
    event.preventDefault();
    if (value === post.voteStatus) {
      return;
    }
    vote({
      variables: {
        postId: post.id,
        value,
      },
      update: (cache) => updateAfterVote(value, post.id, cache),
    });
  };

  const isUpvoted = post.voteStatus === 1;
  const isDownvoted = post.voteStatus === -1;
  return (
    <Flex
      bg={bg}
      flexDir='column'
      align='center'
      w='40px'
      h='100%'
      borderLeft='4px solid transparent'
      borderRadius='4px'
      pos='absolute'
      top={0}
      left={0}
      p='8px 4px 8px 0'>
      <IconButton
        aria-label='Upvote Post'
        bg={isUpvoted ? iconBg : 'none'}
        color={isUpvoted ? 'upvoteOrange' : iconColor}
        w='24px'
        h='24px'
        minW='24px'
        minH='24px'
        border='none'
        borderRadius='2px'
        _hover={{
          bg: iconBg,
          color: 'upvoteOrange',
        }}
        _focus={{
          outline: 'none',
        }}
        onClick={(event) => handleVote(event, 1)}
        icon={<Icon as={ImArrowUp} w={4} h={4} />}
      />
      <Text
        fontSize='12px'
        fontWeight='700'
        lineHeight='16px'
        pointerEvents='none'
        color={isUpvoted ? 'upvoteOrange' : isDownvoted ? 'downvoteBlue' : ''}>
        {post.points}
      </Text>
      <IconButton
        aria-label='Downvote Post'
        bg={isDownvoted ? iconBg : 'none'}
        color={isDownvoted ? 'downvoteBlue' : iconColor}
        w='24px'
        h='24px'
        minW='24px'
        minH='24px'
        border='none'
        borderRadius='2px'
        _hover={{
          bg: iconBg,
          color: 'downvoteBlue',
        }}
        _focus={{
          outline: 'none',
        }}
        onClick={(event) => handleVote(event, -1)}
        icon={<Icon as={ImArrowDown} w={4} h={4} />}
      />
    </Flex>
  );
};

export default VoteSection;
