import { Box } from '@chakra-ui/react';

const SideNavItemWrapper = ({
  selected,
  id,
  children,
}: {
  id: string;
  selected: string | null;
  children: React.ReactNode;
}) => (
  <Box display={selected === id ? 'block' : 'none'} w="100%">
    {children}
  </Box>
);

export default SideNavItemWrapper;
