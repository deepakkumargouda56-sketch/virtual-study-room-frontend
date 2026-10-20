import { Box } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

const PremiumCard = ({children}: Props)=>{

return (

<Box

p="6"

borderWidth="1px"

borderRadius="2xl"

bg="whiteAlpha.900"

shadow="lg"

transition="all 0.25s ease"

_hover={{

transform:"translateY(-6px)",

shadow:"2xl"

}}

>

{children}

</Box>

);

};


export default PremiumCard;