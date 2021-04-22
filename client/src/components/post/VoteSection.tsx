import {
  Flex,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ImArrowDown, ImArrowUp } from 'react-icons/im';
import { PostSnippetFragment, useVoteMutation } from '../../generated/graphql';

interface VoteSectionProps {
  post: PostSnippetFragment;
}

const VoteSection: React.FC<VoteSectionProps> = ({ post }) => {
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const iconBg = useColorModeValue(
    'rgba(26, 26, 27, 0.1)',
    'rgba(215, 218, 220, 0.1)',
  );
  const [, vote] = useVoteMutation();

  const handleVote = (value: number) => {
    if (value === post.voteStatus) {
      return;
    }
    vote({ postId: post.id, value });
  };

  const isUpvoted = post.voteStatus === 1;
  const isDownvoted = post.voteStatus === -1;
  return (
    <Flex flexDir='column' align='center'>
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
        onClick={() => handleVote(1)}
        icon={<Icon as={ImArrowUp} w={4} h={4} />}
      />
      <Text
        fontSize='12px'
        fontWeight='700'
        lineHeight='16px'
        pointerEvents='none'
        color={isUpvoted ? 'upvoteOrange' : 'downvoteBlue'}>
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
        onClick={() => handleVote(-1)}
        icon={<Icon as={ImArrowDown} w={4} h={4} />}
      />
    </Flex>
  );
};

export default VoteSection;
