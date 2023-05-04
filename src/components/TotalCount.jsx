import { Flex } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { ALL_TODOS } from "../apollo/todos";

const TotalCount = () => {
  const { data } = useQuery(ALL_TODOS);

  return (
    <Flex justifyContent={"center"} borderTop={"2px"} mt='5'>
      {data?.todos && <b>Total todos: {data.todos.length}</b>}
    </Flex>
  );
};

export default TotalCount;
