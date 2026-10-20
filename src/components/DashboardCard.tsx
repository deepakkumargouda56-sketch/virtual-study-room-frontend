import { Box, Text } from "@chakra-ui/react";

interface Props {
  title: string;
  value: number | string;
  onClick?: () => void;
}

const DashboardCard = ({ title, value, onClick }: Props) => {
  return (
    <Box
      p="6"
      borderWidth="1px"
      borderRadius="xl"
      shadow="md"
      cursor={onClick ? "pointer" : "default"}
      transition="0.2s"
      _hover={{
        transform: "translateY(-4px)",
        shadow: "xl",
      }}
      onClick={onClick}
    >
      <Text fontSize="sm" color="gray.500">
        {title}
      </Text>

      <Text
        fontSize="2xl"
        fontWeight="bold"
        mt="2"
      >
        {value}
      </Text>
    </Box>
  );
};

export default DashboardCard;